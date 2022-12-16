const postRouter = require('express').Router();
const verifyToken = require("../verifyToken");
const VeteranService = require("../services/Veteran.service");
const PostSchema = require("../models/Posts");
// Import Veteran Service
let veteranService = new VeteranService();
postRouter.route("/add-post").post(verifyToken,async (req,res) =>
{
    try
    {
        let user = await veteranService.getVeteranById({ "_id": req.user_id.id });
        let NewPost = new PostSchema({ title: req.body.postTitle,description: req.body.postDescription,vet_id: req.user_id.id,vet_name: user.fullName });

        NewPost.save();
        return res.status(200).json("New Post Has Been Added");
    } catch (error)
    {
        console.log("Error : ",error);
        return res.status(500).json("Internal Server Error");
    }
});


postRouter.route("/get-userposts").get(verifyToken,async (req,res) =>
{
    try
    {
        let user = await veteranService.getVeteranById({ "_id": req.user_id.id });
        let posts = await PostSchema.find({ vet_id: user._id });
        return res.status(200).json(posts);
    }
    catch (error)
    {
        console.log("Error : ",error);
        return res.status(500).json("Internal Server Error");
    }
});
// Get All Posts 
postRouter.route("/get-allposts").get(verifyToken,async (req,res) =>
{
    console.log("Geting All Posts")
    try
    {
        let posts = await PostSchema.find();
        return res.status(200).json(posts);
    }
    catch (error)
    {
        console.log("Error : ",error);
        return res.status(500).json("Internal Server Error");
    }
});

module.exports = postRouter;