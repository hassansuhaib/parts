// These URLs are being used in controllers/motor.js to fetch data
// Please don't change these if you don't know what you're doing

const testURL = `/v1/Information/YMME/Years`
const byVINURL = `/v1/Information/Vehicles/Search/ByVIN`
const partVectorTaxonomiesURL = (baseVehicleID) =>
  `/v1/Information/Vehicles/Attributes/BaseVehicleID/${baseVehicleID}/Content/Taxonomies/Of/PartVectorIllustrations`
const partVectorSummaryURL = (baseVehicleID) =>
  `/v1/Information/Vehicles/Attributes/BaseVehicleID/${baseVehicleID}/Content/Summaries/Of/PartVectorIllustrations`
const partVectorDetailsURL = (baseVehicleID, applicationID) =>
  `/v1/Information/Vehicles/Attributes/BaseVehicleID/${baseVehicleID}/Content/Details/Of/PartVectorIllustrations/${applicationID}`

module.exports = {
  testURL,
  byVINURL,
  partVectorTaxonomiesURL,
  partVectorSummaryURL,
  partVectorDetailsURL,
}
