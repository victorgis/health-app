const express = require('express')
const router = express.Router()
const {
  getFacilities,
  setFacility,
  updateFacility,
  deleteFacility,
} = require('../controllers/facilitiesControllers')

// const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getFacilities).post(setFacility)
router.route('/:id').delete(deleteFacility).put(updateFacility)

module.exports = router