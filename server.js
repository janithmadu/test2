const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');
const cookiesParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

// Router files
const users = require('./routes/users');
const auth = require('./routes/auth');
const business = require('./routes/business');
//const branch = require('./routes/branchs');
//const departments = require('./routes/departments');
//const partners = require('./routes/partners');
//const productAndServiceCategory = require('./routes/productAndServiceCategory');
//const productAndService = require('./routes/productAndService');
//const uom = require('./routes/uom');
//const role = require('./routes/role');

const app = express();

/*
app.use(logger);
*/
app.use(morgan('dev'));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookiesParser());

/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth-token");
   res.header("Access-Control-Allow-Methods","DELETE, PUT");
  next();
});
*/
//cors
app.use(cors());

//Mount routers
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/business', business);
//app.use('/api/v1/branch', branch);
//app.use('/api/v1/departments', departments);

//partners
//app.use('/api/v1/partner', partners);

//role
//app.use('/api/v1/role', role);

//items
//app.use('/api/v1/item', productAndService);
//app.use('/api/v1/items/category', productAndServiceCategory);

//uom
//app.use('/api/v1/uom', uom);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in on port ${PORT}`));

//Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
});
