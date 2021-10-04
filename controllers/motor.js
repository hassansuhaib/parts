const mongoose = require('mongoose')
const { generateAxios } = require('../api')
const {
  testURL,
  byVINURL,
  partVectorTaxonomiesURL,
  partVectorSummaryURL,
  partVectorDetailsURL,
} = require('../urls')

const { getApplications, getPartVectorDetails } = require('../utils')

const Vehicle = require('../models/vehicle')

const getVehicleByVin = (req, res) => {
  const { signature, timestamp, reqAxios } = generateAxios(byVINURL)
  const { vin } = req.params
  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: signature,
    XDate: timestamp,
    VIN: vin,
  }

  reqAxios
    .get(byVINURL, {
      params,
    })
    .then((response) => {
      const { BaseVehicleID, MakeName, ModelName, SubModelName, Year } =
        response.data.Body.Vehicles[0]
      // Creating a vehicle object in the database
      const vehicle = new Vehicle({
        _id: mongoose.Types.ObjectId(),
        BaseVehicleID: BaseVehicleID,
        MakeName: MakeName,
        ModelName: ModelName,
        SubModelName: SubModelName,
        Year: Year,
      })
      console.log('Response: ', response)
      return res.status(200).json({ response: response.data })
    })
    .catch((error) => {
      return res.status(404).json({ message: error })
    })
}

const partVectorTaxonomy = (req, res) => {
  const { baseVehicleID } = req.params
  const { signature, timestamp, reqAxios } = generateAxios(
    partVectorTaxonomiesURL(baseVehicleID)
  )
  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: signature,
    XDate: timestamp,
    ContentSilos: 32,
    ResultType: 'List',
  }

  reqAxios
    .get(partVectorTaxonomiesURL(baseVehicleID), { params })
    .then((response) => {
      const body = response.data.Body.Systems
      body.forEach((system) => {
        const sName = system.Name
        const iSystemID = system.SystemID
        const groups = system.Groups
        groups.forEach(async (group) => {
          const iGroupID = group.GroupID
          const sGroupName = group.Name
          const applications = await getApplications(baseVehicleID)
          if (applications && applications.length > 0) {
            applications.forEach(async (application) => {
              const DisplayName = application['DisplayName']
              const ApplicationID = application['ApplicationID']
              const DocumentCaption = application['Document']['Caption']
              const DocumentDocumentID = application['Document']['DocumentID']
              const DocumentFormat = application['Document']['Format']
              const DocumentSVGURL = application['Document']['Links'][0]['Href']
              const DocumentIsActive = application['Document']['IsActive']
              const DocumentName = application['Document']['Name']
              const DocumentNotes = application['Document']['Notes']
              const DocumentSequence = application['Document']['Sequence']
              const details = await getPartVectorDetails(
                baseVehicleID,
                ApplicationID
              )
              if (details && details.length > 0) {
                console.log('Deep nested resolved!')
                details.forEach((PVI) => {
                  const layers = PVI.Layers
                  layers.forEach((layer) => {
                    const AssetReferenceAssetID =
                      layer['AssetReference']['AssetID']
                    const AssetReferenceAssetReferenceID =
                      layer['AssetReference']['AssetReferenceID']
                    const AssetReferenceReference =
                      layer['AssetReference']['Reference']
                    let PartNumbersList = ''
                    AssetReferencePartNumbers =
                      layer['AssetReference']['ReferencePartNumbers'][
                        'ReferencePartNumber'
                      ]
                    AssetReferencePartNumbers.forEach((part) => {
                      const partNumber = part.PartNumber
                      if (PartNumbersList === '') {
                        PartNumbersList = partNumber
                      } else {
                        PartNumbersList =
                          PartNumbersList.concat(', ').concat(partNumber)
                      }
                    })
                    const Qualifiers = layer.Qualifiers
                    let QualifierList = ''
                    Qualifiers.forEach((qualifier) => {
                      const QDescription = qualifier['Description']
                      const QFamily = qualifier['Family']
                      const QIsActive = qualifier['IsActive']
                      const QID = qualifier['qualifierID']
                      const QSequence = qualifier['Sequence']
                      const QType = qualifier['Type']
                      if (QualifierList === '') {
                        QualifierList = QDescription.concat('|')
                          .concat(QFamily)
                          .concat('|')
                          .concat(QIsActive)
                          .concat('|')
                          .concat(QID)
                          .concat('|')
                          .concat(QSequence)
                          .concat('|')
                          .concat(QType)
                      } else {
                        QualifierList = QualifierList.concat(' & ')
                          .concat(QDescription)
                          .concat('|')
                          .concat(QFamily)
                          .concat('|')
                          .concat(QIsActive)
                          .concat('|')
                          .concat(QID)
                          .concat('|')
                          .concat(QSequence)
                          .concat('|')
                          .concat(QType)
                      }
                    })
                    const OEMComponentInfoDescription =
                      layer['OEMComponentInfo']['Description']
                    const OEMComponentInfoID = layer['OEMComponentInfo']['ID']
                    const OEMComponentInfoIsActive =
                      layer['OEMComponentInfo']['IsActive']
                    const PCDBPartCategoryID =
                      layer['PCDBPart']['Category']['ID']
                    const PCDBPartCategoryName =
                      layer['PCDBPart']['Category']['Name']
                    const PCDBPartSubCategoryID =
                      layer['PCDBPart']['Category']['SubCategory']['ID']
                    const PCDBPartSubCategoryName =
                      layer['PCDBPart']['Category']['SubCategory']['Name']
                    const PCDBPartPartTerminologyID =
                      layer['PCDBPart']['PartTerminologyID']
                    const PCDBPartPartTerminologyName =
                      layer['PCDBPart']['PartTerminologyName']
                  })
                })
              }
            })
          }
        })
      })
      return res.status(200).json({ body: 'Success' })
    })
    .catch((error) => {
      console.log('The message was generated in parent')
      console.log('Error: ', error)
      return res.status(404).json({ message: error })
    })
}

const partVectorSummary = (req, res) => {
  const { baseVehicleID } = req.params
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
  }
  reqAxios
    .get(partVectorSummaryURL(baseVehicleID), { params })
    .then((response) => {
      const body = response.data.Body
      return res.status(200).json({ body: body })
    })
    .catch((error) => {
      return res.status(404).json({ message: error })
    })
}

const partVectorDetails = (req, res) => {
  const { baseVehicleID, applicationID } = req.params
  const { signature, timestamp, reqAxios } = generateAxios(
    partVectorDetailsURL(baseVehicleID, applicationID)
  )
  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: signature,
    XDate: timestamp,
  }
  reqAxios
    .get(partVectorDetailsURL(baseVehicleID, applicationID), { params })
    .then((response) => {
      const body = response.data.Body
      return res.status(200).json({ body: body })
    })
    .catch((error) => {
      return res.status(404).json({ message: error })
    })
}

const testAPI = (req, res) => {
  const { signature, timestamp, reqAxios } = generateAxios(testURL)

  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: signature,
    XDate: timestamp,
  }

  reqAxios
    .get(testURL, {
      params,
    })
    .then((response) => {
      return res.status(200).json({ body: response.data.Body })
    })
    .catch((error) => {
      return res.status(404).json({ message: error })
    })
}

module.exports = {
  getVehicleByVin,
  partVectorTaxonomy,
  partVectorSummary,
  partVectorDetails,
  testAPI,
}
