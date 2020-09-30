const order_model = require('../models/order_model');

const home_view = require('../views/home-views');

const get_home =  (req, res, next) => {
    const user = req.user;
    user.populate()
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
               // orders: user.orders
            };
            let html = home_view.home_view(data)
            res.send(html);
        });
};

// HELPERS

const order_data = (req) => {
    let data = {
        ticket_number: req.body.ticket_number,
        order_type: req.body.order_type,
        customer_name: req.body.customer_name,
        customer_email: req.body.customer_email,
        customer_phone: req.body.customer_phone,
        assigned_to: req.body.assigned_to,
        priority: req.body.priority,
        description: req.body.description,
        status: req.body.status,
        opening_date: req.body.opening_date,
        delivery_date: req.body.delivery_date
    };
    return data;
};

// CREATE
const api_post_order = (req, res, next) => {
    console.log('api_post_order');
    let data = order_data(req);

    let new_order = order_model(data);

    new_order.save().then(() => {
        console.log(new_order);
        res.send(JSON.stringify(new_order));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// READ
const api_get_orders = (req, res, next) => {
    console.log('api_get_orders');

    order_model.find({})
        .lean()
        .then(orders => {
            res.send(JSON.stringify(orders));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};

// UPDATE
//PUT /api/incident/5ef1b74136c9542118c18fda
const api_put_order = (req, res, next) => {
    console.log('api_put_order');
    let id = req.params.id;
    let data = order_data(req);

    order_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((order) => {
        res.send(order);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};


// DELETE
// DELETE /api/incident/5ef1b74136c9542118c18fda
const api_delete_order = (req, res, next) => {
    let id = req.params.id;
    order_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


module.exports.get_home = get_home;

module.exports.api_post_order = api_post_order;
module.exports.api_get_orders = api_get_orders;
module.exports.api_put_order = api_put_order;
module.exports.api_delete_order = api_delete_order;