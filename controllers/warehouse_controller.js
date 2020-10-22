const warehouse_model = require('../models/warehouse_model');

const home_view = require('../views/home-views');

const get_home =  (req, res, next) => {
    const user = req.user;
    user.populate()
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
               // warehouses: user.warehouses
            };
            let html = home_view.home_view(data)
            res.send(html);
        });
};

// HELPERS

const warehouse_data = (req) => {
    let data = {
        item_number: req.body.item_number,
        item_type: req.body.item_type,
        serial_number: req.body.serial_number,
        status: req.body.status,
        assigned_to: req.body.assigned_to,
        description: req.body.description,
        last_update: req.body.last_update,
        updated_by: req.body.updated_by
    };
    return data;
};

// CREATE
const api_post_warehouse = (req, res, next) => {
    console.log('api_post_warehouse');
    let data = warehouse_data(req);

    let new_warehouse = warehouse_model(data);

    new_warehouse.save().then(() => {
        console.log(new_warehouse);
        res.send(JSON.stringify(new_warehouse));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// READ
const api_get_warehouses = (req, res, next) => {
    console.log('api_get_warehouses');

    warehouse_model.find({})
        .lean()
        .then(warehouses => {
            res.send(JSON.stringify(warehouses));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};

// UPDATE
//PUT /api/warehouse/5ef1b74136c9542118c18fda
const api_put_warehouse = (req, res, next) => {
    console.log('api_put_warehouse');
    let id = req.params.id;
    let data = warehouse_data(req);

    warehouse_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((warehouse) => {
        res.send(warehouse);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};


// DELETE
// DELETE /api/warehouse/5ef1b74136c9542118c18fda
const api_delete_warehouse = (req, res, next) => {
    let id = req.params.id;
    warehouse_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


module.exports.get_home = get_home;

module.exports.api_post_warehouse = api_post_warehouse;
module.exports.api_get_warehouses = api_get_warehouses;
module.exports.api_put_warehouse = api_put_warehouse;
module.exports.api_delete_warehouse = api_delete_warehouse;