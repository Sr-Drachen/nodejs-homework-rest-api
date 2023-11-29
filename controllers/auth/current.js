const { User } = require('../../schemas')
const { Unauthorized } = require('http-errors')

const current = async(req, res) => {
  const { email, subscription } = req.user

  if (!email || !subscription) {
    throw new Unauthorized('Not authorized')
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: {
        email,
        subscription
      }
    }
  })
}
module.exports = current