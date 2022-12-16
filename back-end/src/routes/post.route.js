let jwt = require("jsonwebtoken");

let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
// Post Model
let postSchema = require("../Models/Models/Post");


// CREATE Post
// router.route("/create-post").post((req, res, next) => {

//   console.log("create Post Call ")

//   console.log(req)

//   const token = req.cookies.accessToken;

//   console.log(token)



//   if (!token) return res.status(401).json("Not logged in!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");


//     const user = new postSchema({
//       userid: req.body.name,
//       username: req.body.email,
//       postdescription: req.body.postdescription,
//       setstars:req.body.setstars,


//   });
//   try
//   {
//       const savedUser = user.save()
//       res.json({ id: user._id })
//   } catch (error)
//   {
//       console.log("Error is occuring on the way")
//       res.status(400).send(error)
//   }


//   });
// });


router.route("/create-post").post((req,res,next) =>
{

  postSchema.create(req.body,(error,data) =>
  {
    if (error)
    {
      return next(error);
    } else
    {
      console.log(data);
      res.json(data);
    }
  });

});



// // READ Post
// router.route("/").get((req, res) => {
//   const userId = req.query.userId;
//   const token = req.cookies.accessToken;

//   console.log("Get Call in Post")
//   console.log(token)


//   if (!token) return res.status(401).json("Not logged in!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     console.log(userId);

//     postSchema.find((error, data) => {
//       if (error) {
//         return next(error);
//       } else {
//         res.json(data);
//       }
//     });
//   });
// });

router.route("/").get((req,res) =>
{

  postSchema.find((error,data) =>
  {
    console.log("Hit")
    if (error)
    {
      return next(error);
    } else
    {
      res.json(data);
    }
  });

});

// Get Single Post
router.route("/edit-post/:id").get((req,res) =>
{
  postSchema.findById(req.params.id,(error,data) =>
  {
    if (error)
    {
      return next(error);
    } else
    {
      res.json(data);
    }
  });
});

// Update Post
router.route("/update-post/:id").put((req,res,next) =>
{
  postSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error,data) =>
    {
      if (error)
      {
        return next(error);
        console.log(error);
      } else
      {
        res.json(data);
        console.log("Post updated successfully !");
      }
    }
  );
});
// Delete Post
router.route("/delete-post/:id").delete((req,res,next) =>
{
  postSchema.findByIdAndRemove(req.params.id,(error,data) =>
  {
    if (error)
    {
      return next(error);
    } else
    {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
module.exports = router;
