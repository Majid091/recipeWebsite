const ContactUs = require('../Models/contactUs.model');



const createContact = async(req, res)=>{
    try
    {
        const {firstName, lastName, eamil, description} = req.body;
        if(!firstName || !lastName || !eamil || !description)
        {
            return res.status(401).json({
                message: "please fill all the fields",
                error: true,
                success: false
            })
        }

        return res.status(201).json({
            message: "your data is submitted successfully...",
            error: false,
            success: true
        })
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


const getContactData = async(req, res)=>{
    try
    {
        
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

module.exports = {createContact, getContactData};