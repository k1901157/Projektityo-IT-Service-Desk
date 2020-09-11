const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ticket_number: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    type: {
        type: String,
        options: ['Software' ,'Hardware', 'Network', 'Printers & Scanners', 'Not Listed' ],
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    customer_phone: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model("incident", schema);