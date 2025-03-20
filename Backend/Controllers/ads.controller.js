const Ads = require('../Models/ads.model');




const showAdsData = async(req, res)=>{
    try
    {
        const {title, description, image} = req.body;

        return res.status(200).json({
            message: "ads data",
            error: false,
            success: true,
            data:{
                title,
                description,
                image
            }
        })
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: error.message,
            success: false
        })
    }
}


module.exports = showAdsData;