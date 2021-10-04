// Important file being used in motor.js so don't delete!!!
const { generateAxios } = require('./api')
const { partVectorSummaryURL, partVectorDetailsURL } = require('./urls')

const getApplications = (baseVehicleID, groupID, systemID) => {
  const { signature, timestamp, reqAxios } = generateAxios(
    partVectorSummaryURL(baseVehicleID)
  )
  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: signature,
    XDate: timestamp,
    ContentSilos: 32,
    // GroupID: groupID,
    // SystemID: systemID,
  }

  return reqAxios
    .get(partVectorSummaryURL(baseVehicleID), { params })
    .then((response) => {
      return response.data.Body.Applications
    })
    .catch((error) => {
      return console.log('Error: ', error)
    })
}

const getPartVectorDetails = (baseVehicleID, applicationID) => {
  const { signature, timestamp, reqAxios } = generateAxios(
    partVectorDetailsURL(baseVehicleID, applicationID)
  )
  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: signature,
    XDate: timestamp,
    ContentSilos: 32,
  }

  return reqAxios
    .get(partVectorDetailsURL(baseVehicleID, applicationID), { params })
    .then((response) => {
      console.log('And here')
      return response.data.Body
    })
    .catch((error) => {
      return console.log('Error: ', error)
    })
}

module.exports = { getApplications, getPartVectorDetails }
