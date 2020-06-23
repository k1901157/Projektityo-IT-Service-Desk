const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = express();

const body_parser = require('body-parser');

const session = require('express-session');


//Controllers
const auth_controller = require('./controllers/auth_controller');
const incident_controller = require('./controllers/incident_controller');

// npm init
// npm install express
// npm install mongoose
// npm install nodemon --save-dev
// npm run start-dev

//Style
app.use('/style', express.static('style'));

//Auth
app.use(body_parser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'IT/1234qwerty',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

let users = [];

app.use((req, res, next) => {
    console.log(`path: ${req.path}`);
    next();
});

const is_logged_handler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

//Auth
app.use(auth_controller.handle_user);
app.get('/login', auth_controller.get_login);
app.post('/login', auth_controller.post_login);
app.post('/register', auth_controller.post_register);
app.post('/logout', auth_controller.post_logout);

//tickets
app.get('/', is_logged_handler, incident_controller.get_home);
app.get('/home', is_logged_handler, incident_controller.get_home);




app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended: true
})); // material/id

app.use((req, res, next) => {
    console.log(req.method, ' ', req.path);
    next();
}); // GET /api/materials

//  GET /index.html
// -->  /public/index.html
app.use("/", express.static("public_incident"));
//incidents"
app.use("/incidents", express.static("public_incident"));


// RESTful API
// CRUD OPERATIONS

//CREATE
app.post("/api/incident", incident_controller.api_post_incident);

//api.domain.com/incidents
// READ
app.get("/api/incidents", incident_controller.api_get_incidents);

// UPDATE
//app.patch korvaa vain tietyt kentät
//app.put korvaa koko tiedon
app.put("/api/incident/:id", incident_controller.api_put_incident);

// DELETE
app.delete("/api/incident/:id", incident_controller.api_delete_incident);


//df5OnEZush49tpT2
const database_uri = "mongodb+srv://server:df5OnEZush49tpT2@cluster0-9q7ur.mongodb.net/IT-SDdb?retryWrites=true&w=majority";

mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected');
    app.listen(port);
}).catch(err => {
    console.log(err);
});