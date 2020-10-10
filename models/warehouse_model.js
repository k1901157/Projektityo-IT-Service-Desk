const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    item_number: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    item_type: {
        type: String,
        options: ['Laptop XX' ,'Laptop XY', 'Desktop XX', 'Monitor XX 23', 'Monitor XY 27', 'Scanners XX', 'Printers XX', 'IP Phone XX' ],
        required: true
    },
    serial_number: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    status: {
        type: String,
        options: ['in Stock' ,'Deployed', 'Retired' ],
        required: true
    },

    assigned_to: {
        type: String,
        options: ['IT-Team-Monitors' ,'IT-Team-Laptops', 'IT-Team-Desktops', 'IT-Team-Scanners and Printers', 'IT-Team-IP Phone' ],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    last_update: {
        type: String,
        required: true
    },
    updated_by: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("warehouse", schema);