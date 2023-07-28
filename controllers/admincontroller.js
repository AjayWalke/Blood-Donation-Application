const usermodels = require('../models/usermodels')

const getAdminDonar = async (req, res) => {
  try {
    const donar = await usermodels.find({rule: 'donar'})
    // console.log(donar);
    return res.status(200).send({
      success : true,
      message : 'accessed all the donars',
      donar
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      messasge: "error in admin donar get",
    });
  }
};

const getAdminHospital = async (req, res) => {
  try {
    const hospital = await usermodels.find({rule: 'hospital'})
    // console.log(hospital);
    return res.status(200).send({
      success : true,
      message : 'accessed all the donars',
      hospital
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      messasge: "error in admin hospital get",
    });
  }
};

const getAdminOrganisation = async (req, res) => {
  try {
    const organisation = await usermodels.find({rule: 'organisation'})
    // console.log(organisation)
    return res.status(200).send({
      success : true,
      message : 'accessed all the donars',
      organisation
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      messasge: "error in admin organisation get",
    });
  }
};

module.exports = {getAdminDonar, getAdminHospital, getAdminOrganisation};
