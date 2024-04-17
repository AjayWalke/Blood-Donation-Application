const mongoose = require('mongoose');
const inventoryschema = new mongoose.Schema ({  
    inventoryType : {
        type : String,
        required : [true, 'mandatory'],
        enum : ['in', 'out'],
    },
    bloodGroup : {
        type : String,
        required : [true, 'mandatory'],
        enum : ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
    },
    quantity : {
        type : Number,
        required : [true, 'mandatory']
    },
    email : {
        type : String, 
        required : [true, 'mandatory']
    },
    organisation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : [true, 'mandatory']
    },
    hospital : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : function () {
            return this.inventoryType === 'out';
        }
    },
    donar : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : function () {
            return this.inventoryType == 'in';
        }
    }
}, {timestamps : true});
module.exports = mongoose.model('Inventory', inventoryschema);
