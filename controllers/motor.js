const { motor } = require('../api')
const axios = require('axios')
const mongoose = require('mongoose')

const Vehicle = require('../models/vehicle')

const getVehicleByVin = (req, res) => {
  const { vin } = req.params
  console.log('vin: ', vin)
  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: 'dGEOi5CUMhhfaZc%2BEtS4tdwVp9%2BBVMM9J7yrUJ5S%2Bd4%3D',
    XDate: '1633088915',
    VIN: vin,
  }
  axios
    .get(
      `https://api.motor.com/v1/Information/Vehicles/Search/ByVIN?VIN=${params.VIN}&AttributeStandadrd=MOTOR&Scheme=Shared&ApiKey=BngKX33aYF&Sig=${params.Sig}&Xdate=${params.XDate}`
    )
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
      vehicle
        .save()
        .then((result) => {
          return res.status(200).json({ body: result })
        })
        .catch((error) => {
          return res.status(404).json({ message: error })
        })
    })
    .catch((error) => {
      return res.status(404).json({ message: error })
    })
}

const partVectorTaxonomy = (req, res) => {
  const { baseVehicleID } = req.params
  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: '3TVS8%2BzZKS5X2kaHL%2F8cYVAS4ge%2FxDaZGo4%2Fndit0jA%3D',
    XDate: '1633083486',
    BaseVehicleID: baseVehicleID,
  }
  axios
    .get(
      `https://api.motor.com/v1/Information/Vehicles/Attributes/BaseVehicleID/${params.BaseVehicleID}/Content/Taxonomies/Of/PartVectorIllustrations?ContentSilos=32&ResultType=List&AttributeStandard=MOTOR&Scheme=Shared&ApiKey=BngKX33aYF&Sig=${params.Sig}&Xdate=${params.XDate}`
    )
    .then((response) => {
      const body = response.data
      return res.status(200).json({ body: body })
    })
    .catch((error) => {
      return res.status(404).json({ message: error })
    })
}

const partVectorSummary = (req, res) => {
  const { baseVehicleID } = req.params
  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: '1%2B5swzhDsgQqHI0DJW4Yo9QsqJVXUn7rxzQJt1mv0TI%3D',
    XDate: '1633084056',
    BaseVehicleID: baseVehicleID,
  }
  axios
    .get(
      `https://api.motor.com/v1/Information/Vehicles/Attributes/BaseVehicleID/22617/Content/Summaries/Of/PartVectorIllustrations?ContentSilos=32&AttributeStandard=MOTOR&Scheme=Shared&ApiKey=BngKX33aYF&Sig=${params.Sig}&Xdate=${params.XDate}`
    )
    .then((response) => {
      const body = response.data
      return res.status(200).json({ body: body })
    })
    .catch((error) => {
      return res.status(404).json({ message: error })
    })
}

const partVectorDetails = (req, res) => {
  const { baseVehicleID, applicationID } = req.params
  const params = {
    AttributeStandard: 'MOTOR',
    Scheme: 'Shared',
    ApiKey: 'BngKX33aYF',
    Sig: '7UCZNiytxp7FopIIvE%2FGGNXCYCBtesnXdzzyF8vLJfc%3D',
    XDate: '1633084498',
    BaseVehicleID: baseVehicleID,
    ApplicationID: applicationID,
  }
  axios
    .get(
      `https://api.motor.com/v1/Information/Vehicles/Attributes/BaseVehicleID/22617/Content/Details/Of/PartVectorIllustrations/${params.ApplicationID}?AttributeStandard=MOTOR&Scheme=Shared&ApiKey=BngKX33aYF&Sig=${params.Sig}&Xdate=${params.XDate}`
    )
    .then((response) => {
      const body = response.data
      return res.status(200).json({ body: body })
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
}
