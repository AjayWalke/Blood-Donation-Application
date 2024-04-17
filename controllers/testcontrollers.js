const testcontrollers = (req, res) => {
    res.status(200).send({
        message: "testing the route\n Welcome User",
        success: true,
    });
};

module.exports = {testcontrollers};