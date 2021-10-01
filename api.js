const axios = require('axios')

const motorURL =
  'https://api.motor.com/v1/documentation#operation/get/Information'

const motor = axios.create({
  baseURL: 'https://api.motor.com/v1/documentation#operation/get/Information',
})

motor.interceptors.request.use(
  (config) => {
    config.headers.TokenKey = 'tGsrr'
    config.headers.Token = 'iocdQbzt4uGcP0kKEgDEF1z6f'
    return config
  },
  (error) => Promise.reject(error)
)

module.exports = { motor }
