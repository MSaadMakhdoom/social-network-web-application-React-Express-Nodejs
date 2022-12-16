// Import Router
const VeteranRouter = require('express').Router();
const VetService = require("../services/Veteran.service")
const verifyToken = require("../verifyToken");
let verteranService = new VetService()


const jwt = require("jsonwebtoken");
const VeteranService = require('../services/Veteran.service');


VeteranRouter.route('/register').post(async (req,res) =>
{

    // Hashing of password will be implemented here
    let execStatus = await verteranService.registerVeteran(req.body);

    if (execStatus)
    {
        return res.status(409).send(execStatus);
    }
    return res.status(201).send("Registered Successfully"); // user successfully created
});

// Login Route
VeteranRouter.route('/login').post(async (req,res) =>
{

    let user = await verteranService.getUserByEmail(req.body);
    if (!user)
    {
        return res.status(401).send("Invalid Credentials");
    }
    // Otherwise Check password
    if (user.password != req.body.password)
    {
        return res.status(401).send("Invalid Credentials")
    }
    console.log("User Ready to be loged in : ",user);
    // Generate Token
    let token = jwt.sign({ id: user._id },"kashifkarman");
    return res.status(200).send({ token });

});
VeteranRouter.route('/get-profiledata').get(verifyToken,async (req,res) =>
{
    let veteran = await verteranService.getVeteranById(req.user_id.id);
    console.log("Getting Veteran Info : ",veteran);
    return res.status(200).json(veteran);
});
VeteranRouter.route('/add-newhobby').post(verifyToken,async (req,res) =>
{
    let veteran = await verteranService.getVeteranById(req.user_id.id);
    veteran.hobbies.push(req.body.hobby);
    veteran.save();
    return res.status(200).json("New Hobby Added");
});
// Get All Veterans

// Get All Hobbies
VeteranRouter.route('/get-allhobbies').get(verifyToken,async (req,res) =>
{
    console.log("Get ALl Hobbies");
    let veteran = await verteranService.getVeteranById(req.user_id.id);
    return res.status(200).json(veteran.hobbies);
});
// 
VeteranRouter.route('/get-allVeterans').get(verifyToken,async (req,res) =>
{
    console.log("End Point Hit")
    let veterans = await verteranService.getAllVeterans();
    return res.status(200).json(veterans);
});
VeteranRouter.route("/get-userData/:userId").get(verifyToken,async (req,res) =>
{
    let user = await verteranService.getVeteranById(req.params.userId);
    console.log("User Data : ",user)
    return res.status(200).json(user);
});
VeteranRouter.route("/follow/:userId").get(verifyToken,async (req,res) =>
{
    verteranService.followVeteran(req.user_id.id,req.params.userId);
    res.status(200).send("Followed")
});

VeteranRouter.route("/get-followers").get(verifyToken,async (req,res) =>
{
    console.log("Getting Followers : ",req.user_id.id)
    let veteran = await verteranService.getVeteranById(req.user_id.id);
    let followers = [];
    // 
    console.log("Followers End : ",followers)
    for (let i = 0; i < veteran.followers.veternFollowers.length; i++)
    {
        let user = await verteranService.getVeteranById(veteran.followers.veternFollowers[i]);
        followers.push(user);
    }
    res.status(200).json(followers);

})


module.exports = VeteranRouter;