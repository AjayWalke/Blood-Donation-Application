const mongoose = require('mongoose');
const inventorymodel = require('../models/inventorymodel');

const getBloodData = async (req, res) => {
    try {
        const BloodData = [];   
        const BloodGroups = ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'];
        const organisation = new mongoose.Types.ObjectId(req.body.userId);

        await Promise.all(BloodGroups.map(async (bloodGroup) => {
            const In = await inventorymodel.aggregate([
                {
                    $match: {
                        organisation,
                        bloodGroup : bloodGroup,
                        inventoryType : 'in',
                    }
                },
                {
                    $group : {
                        _id : null,
                        total : {$sum : '$quantity'}
                    }
                }
            ])
            const Out = await inventorymodel.aggregate([
                {
                    $match: {
                        organisation,
                        bloodGroup : bloodGroup,
                        inventoryType : 'out',
                    }
                },
                {
                    $group : {
                        _id : null,
                        total : {$sum : '$quantity'}
                    }
                }
            ])
            const Total = (In[0]?.total || 0) - (Out[0]?.total || 0);
            BloodData.push({
                bloodGroup,
                In : In[0]?.total || 0,
                Out : Out[0]?.total || 0,
                Total,
            })
        }))

        return res.status(200).send({
            success : true,
            message : 'Access the Blood Data',
            BloodData
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({
            message : 'get blood data error',
            success : false,
        })
    }
}

module.exports = getBloodData;