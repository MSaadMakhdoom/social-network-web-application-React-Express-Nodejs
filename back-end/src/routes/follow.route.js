
let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();
// Follow Model
let studentSchema = require('../Models/Models/Follow');
// CREATE Follow
router.route('/create-follow').post((req, res, next) => {
studentSchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});

// READ Follow
router.route('/').get((req, res) => {
studentSchema.find((error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})
// Get Single Follow
router.route('/edit-follow/:id').get((req, res) => {
studentSchema.findById(req.params.id, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})



// Update Follow
router.route('/update-follow/:id').put((req, res, next) => {
studentSchema.findByIdAndUpdate(req.params.id, {
  $set: req.body
}, (error, data) => {
  if (error) {
    return next(error);
    console.log(error)
  } else {
    res.json(data)
    console.log('Follow updated successfully !')
  }
})
})
// Delete Follow
router.route('/delete-follow/:id').delete((req, res, next) => {
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




