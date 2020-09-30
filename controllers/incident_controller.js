const incident_model = require('../models/incident_model');

const home_view = require('../views/home-views');

const get_home =  (req, res, next) => {
    const user = req.user;
    user.populate()
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
               // incidents: user.incidents
            };
            let html = home_view.home_view(data)
            res.send(html);
        });
};

// HELPERS

const incident_data = (req) => {
    let data = {
        ticket_number: req.body.ticket_number,
        type: req.body.type,
        customer_name: req.body.customer_name,
        customer_email: req.body.customer_email,
        customer_phone: req.body.customer_phone,
        assigned_to: req.body.assigned_to,
        priority: req.body.priority,
        description: req.body.description,
        status: req.body.status,
        opening_date: req.body.opening_date,
        closing_date: req.body.closing_date
    };
    return data;
};

// CREATE
const api_post_incident = (req, res, next) => {
    console.log('api_post_incident');
    let data = incident_data(req);

    let new_incident = incident_model(data);

    new_incident.save().then(() => {
        console.log(new_incident);
        res.send(JSON.stringify(new_incident));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// READ
const api_get_incidents = (req, res, next) => {
    console.log('api_get_incidents');

    incident_model.find({})
        .lean()
        .then(incidents => {
            res.send(JSON.stringify(incidents));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};

// UPDATE
//PUT /api/incident/5ef1b74136c9542118c18fda
const api_put_incident = (req, res, next) => {
    console.log('api_put_incident');
    let id = req.params.id;
    let data = incident_data(req);

    incident_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((incident) => {
        res.send(incident);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};


// DELETE
// DELETE /api/incident/5ef1b74136c9542118c18fda
const api_delete_incident = (req, res, next) => {
    let id = req.params.id;
    incident_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


module.exports.get_home = get_home;

module.exports.api_post_incident = api_post_incident;
module.exports.api_get_incidents = api_get_incidents;
module.exports.api_put_incident = api_put_incident;
module.exports.api_delete_incident = api_delete_incident;