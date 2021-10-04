const express = require('express')
const router = express.Router()

const {
  getVehicleByVin,
  partVectorTaxonomy,
  partVectorSummary,
  partVectorDetails,
  testAPI,
} = require('../controllers/motor')

router.route('/vehicle/:vin').get(getVehicleByVin)
router.route('/part/vector/taxonomy/:baseVehicleID').get(partVectorTaxonomy)
router.route('/part/vector/summary/:baseVehicleID').get(partVectorSummary)
router
  .route('/part/vector/details/:baseVehicleID/:applicationID')
  .get(partVectorDetails)
router.route('/test').get(testAPI)

module.exports = router
