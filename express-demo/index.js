const config = require('config');
const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./routes/middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(logger);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
if (app.get('env') ==='development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled....');
}
//config
console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'));

app.use(function(req, res, next){
    console.log("authenticating");
    next();
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}...`));

