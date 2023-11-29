const Joi = require('joi');
const { User } = require('../../schemas')
const { BadRequest, NotFound } = require('http-errors')

const schema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required()
});

const updateSubscription = async(req, res) => {
  const { _id } = req.user
  const { subscription } = req.body

  const { error } = schema.validate({ subscription });
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true })

  if (!result) {
    throw new NotFound(`User with id=${_id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = updateSubscription
