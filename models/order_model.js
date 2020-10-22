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
    order_type: {
        type: String,
        options: ['Laptop' ,'Desktop', 'Monitor', 'Printers or Scanners', 'IP Phone', 'Not Listed' ],
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
        options: ['1' ,'2', '3', '5' ],
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        options: ['Open' ,'Waiting for Approval', 'Delivered' ],
        required: true
    },
    opening_date: {
        type: String,
        required: true
    },
    delivery_date: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("order", schema);