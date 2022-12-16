
let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();
// Invite Model
let studentSchema = require('../Models/Models/Invite');
// CREATE Invite
router.route('/create-invite').post((req, res, next) => {
studentSchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});

// READ Invite
router.route('/').get((req, res) => {
studentSchema.find((error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})
// Get Single Invite
router.route('/edit-invite/:id').get((req, res) => {
studentSchema.findById(req.params.id, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})



// Update Invite
router.route('/update-invite/:id').put((req, res, next) => {
studentSchema.findByIdAndUpdate(req.params.id, {
  $set: req.body
}, (error, data) => {
  if (error) {
    return next(error);
    console.log(error)
  } else {
    res.json(data)
    console.log('Invite updated successfully !')
  }
})
})
// Delete Invite
router.route('/delete-invite/:id').delete((req, res, next) => {
studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
  if (error) {
    return next(error);
  } else {
    res.status(200).json({
      msg: data
    })
  }
})
})
module.exports = router;




