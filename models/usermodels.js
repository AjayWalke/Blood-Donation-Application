const mongoose = require('mongoose');
const userschma = new mongoose.Schema({
    rule : {
        type : String,
        require : [true, 'rule is mandatory'],
        enum : ["admin", "donar", "organisation", "hospital"]
    },
    name : {
        type : String,
        require : function () {
            if(this.rule === "donar" || this.rule === "admin") {
                return true;
            }
            return false;
        }
    },
    organisation : {
        type : String, 
        require : function () {
            if(this.rule === "organisation") {
                return true;
            }
            return false;
        }
    },
    hospital : {
        type : String,
        require : function () {
            if(this.rule === "hospital") {
                return true;
            }
            return false;
        }
    },
    email : {
        type : String,
        require : [true, 'email is mandatory'],
        unique : true
    },
    password : {
        type : String, 
        require : [true, 'password is mandatory']
    },
    website : {
        type : String,
    },
    address : {
        type : String,
        require : [true, 'mandatory']
    },
    phone : {
        type : String,
        require : [true, 'mandatory']
    }

}, {timestamps : true});

module.exports = mongoose.model('users', userschma);