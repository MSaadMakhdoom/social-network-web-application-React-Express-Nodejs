const veteranSchema = require("../models/Veteran");

class VeteranService
{
    constructor()
    {
        this.veteranSchema = veteranSchema;
    }
    async registerVeteran(veteran)
    {
        let user = await veteranSchema.findOne({ email: veteran.email });
        if (user)
        {
            // Condition when email is found
            return {
                error: {
                    message: "Email is already taken"
                }
            }
        }
        // If Email is Not Taken then new User will be added
        const newVeteran = new this.veteranSchema(veteran);
        newVeteran.starts = 0;

        newVeteran.save();
    }
    async getUserByEmail(validationData)
    {
        return await veteranSchema.findOne({ email: validationData.email });

    }
    async getVeteranById(id)
    {
        return veteranSchema.findOne({ _id: id })
    }
    // Get All Veteans
    async getAllVeterans()
    {
        return veteranSchema.find();
    }
    async getUserById(userId)
    {
        return veteranSchema.findOne({ _id: userId });
    }
    async followVeteran(veteranId,followerId)
    {
        let veteran = await veteranSchema.findOne({ _id: veteranId });
        let follower = await veteranSchema.findOne({ _id: followerId });
        console.log("Veteran : ",veteran)
        console.log("Follower : ",follower)
        follower.followers.veternFollowers.push(veteranId);
        veteran.followings.veternFollowings.push(followerId)
        veteran.save();
        follower.save();
    }
}
module.exports = VeteranService;