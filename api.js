const axios = require('axios')
const { generateSignature } = require('./signature')

const generateAxios = (url) => {
  const PublicKey = 'BngKX33aYF'
  const { signature, timestamp } = generateSignature(url)
  const date = new Date()
  const reqAxios = axios.create({
    baseURL: 'https://api.motor.com',
    timout: 1000,
    headers: {
      Authorization: `Shared ${PublicKey}:${signature}`,
      Date: date.toUTCString(),
    },
  })

  return { signature, timestamp, reqAxios }
}

module.exports = {
  generateAxios,
}
