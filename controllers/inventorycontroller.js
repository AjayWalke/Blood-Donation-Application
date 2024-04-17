const { default: mongoose } = require("mongoose");
const inventorymodel = require("../models/inventorymodel");
const usermodels = require("../models/usermodels");
const { hashSync } = require("bcryptjs");

const createinvencontroller = async (req, res) => {
    try {
        // check the email
        const {email, inventoryType} = req.body;
        const user = await usermodels.findOne({email});
        if(!user) {
            throw new Error("no user");
        }
        // if(user.role !== req.body.role) {
        //     return res.status(404).send({
        //         message : 'role not matched',
        //         success : false
        //     });
        // }

        // rule =====>> role that is playing by the user
        // if(inventoryType === 'In' && user.rule !== 'donar') {
        //     throw new Error('Not a donar');
        // }
        // if(inventoryType === 'Out' && user.rule !== 'hospital') {
        //     throw new Error('Not a hospital');
        // }

        if(req.body.inventoryType == 'out') {
            const bd_gp = req.body.bloodGroup;
            const qty = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId); // fulfill with request id

            // total in
            const totalIn = await inventorymodel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'in',
                        bloodGroup: bd_gp
                    }
                },
                {
                    $group: {
                        _id:'$bloodGroup',
                        total : {$sum : '$quantity'}
                    }
                }
            ])

            // total out
            const totalOut = await inventorymodel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'out',
                        bloodGroup: bd_gp
                    }
                },
                {
                    $group: {
                        _id:'$bloodGroup',
                        total : {$sum : '$quantity'}
                    }
                }
            ])
            const a = totalIn[0]?.total || 0
            const b = totalOut[0]?.total || 0
            const tempblood = a - b;
            console.log(a, b, qty, tempblood);
            if(tempblood < qty) {
                return res.status(500).send({
                    message: `Available : ${tempblood}`,
                    success: false,
                })
            }
            req.body.hospital = user?._id
        }
        else {
            req.body.donar = user?._id  // incoming email -> validate from database -> present then okay
        }
        

        const inventory = new inventorymodel(req.body);
        await inventory.save();
        return res.status(200).send({
            message : 'blood saved',
            success : true
        });
    }
    catch(error) {
        console.log(`error in inve. controller : ${error}`);
        return res.status(500).send({
            success : false,
            message : 'denied'
        });
    }
};


// get the inventory blood records
const getinvencontroller = async (req, res) => {
    try {
        const inventory = await inventorymodel.find({organisation: req.body.userId}).populate('donar').populate('hospital').sort({createdAt: -1}); // !!!!!!!!!!  in this part  we have to use req.body.userId
        return res.status(200).send({
            success : true,
            message : 'accessed inventory',
            inventory,
        })
    }
    catch{error} {
        console.log(`error in the get inventory : ${error}`);
        return res.status(500).send({
            message : 'get inventory error',
            success : false
        })
    }
};


// get the donar details
const getDonar = async(req, res) => {
    try {
        const organisation = req.body.userId
        const donarId = await inventorymodel.distinct('donar', {organisation})
        const donars = await usermodels.find({_id:{$in : donarId}})
        return res.status(200).send({
            success: true,
            message: 'donars accessed',
            donars,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({
            message:'get donar error',
            success: false
        })
    }
}


// get Hospital
const getHospital = async(req, res) => {
    try {
        const organisation = req.body.userId;
        const hospitalId = await inventorymodel.distinct('hospital', {organisation});
        const hospital = await usermodels.find({_id:{$in : hospitalId}});
        return res.status(200).send({
            success : true,
            message : 'accessed hospitals',
            hospital
        })
    }  
    catch(error) {
        console.log(error);
        return res.status(500).send({
            message : 'error in get hospitals',
            success : false
        })
    }
}

// get organization
const getOrganization = async (req, res) => {
    try {
        const donar = req.body.userId;
        const temp = await inventorymodel.distinct('organisation', {donar})
        const organizations = await usermodels.find({_id: {$in : temp}})
        return res.status(200).send({
            success : true,
            message : 'accessed the organizations',
            organizations
        }) 
    }   
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : 'error in get organization controller'
        })
    }
}


module.exports = {createinvencontroller, getinvencontroller, getDonar, getHospital, getOrganization};