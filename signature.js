const generateSignature = (url) => {
  const HmacSHA256 = require('crypto-js/hmac-sha256')
  const Base64 = require('crypto-js/enc-base64')

  const timestamp = parseInt((new Date().getTime() / 1000).toFixed(0))

  const PublicKey = 'BngKX33aYF'
  const PrivateKey = 'jY8uWxb0pFVYhSt5ZpIoXH4oD'

  const SignatureData = PublicKey + '\n' + 'GET' + '\n' + timestamp + '\n' + url

  const hashDigest = HmacSHA256(SignatureData, PrivateKey)
  const hmacDigest = Base64.stringify(hashDigest)

  return { signature: hmacDigest, timestamp: timestamp }
}

module.exports = {
  generateSignature,
}
