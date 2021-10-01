const express = require('express')
const router = express.Router()

const {
  getVehicleByVin,
  partVectorTaxonomy,
  partVectorSummary,
  partVectorDetails,
} = require('../controllers/motor')

router.route('/vehicle/:vin').get(getVehicleByVin)
router.route('/part/vector/taxonomy/:baseVehicleID').get(partVectorTaxonomy)
router.route('/part/vector/summary/:baseVehicleID').get(partVectorSummary)
router
  .route('/part/vector/details/:baseVehicleID/:applicationID')
  .get(partVectorDetails)

module.exports = router
