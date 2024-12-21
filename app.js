const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const compression = require('compression'); // For response compression
const rateLimit = require('express-rate-limit');

const productRoutes = require('./src/routes/productRoutes');
const salesRoutes = require('./src/routes/salesRoutes');
const supplierRoutes = require('./src/routes/supplierRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const userRoutes = require('./src/routes/userRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const giveloanRoutes = require('./src/routes/giveloanRoutes'); 
const receiveloanRoutes = require('./src/routes/receiveloanRoutes'); 
const commissionRoutes = require('./src/routes/commissionRoutes');
const closingRoutes = require('./src/routes/closingRoutes');
const reportRoutes = require('./src/routes/reportRoutes');
const settingRoutes = require('./src/routes/settingRoutes');

const app = express();
const PORT = process.env.PORT || 4000;


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
});
app.use(limiter);

app.use(session({
    secret: process.env.SESSION_SECRET || 'c9e1f0ae837b4a29268b4d0f1261f7f8e93b2ce6aae94827f8947e4a59c894a6',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000 // 1 hour
    }
}));

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/products', productRoutes);


app.use('/api/sales', salesRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/categories', categoryRoutes);


app.use('/api/users', userRoutes);


app.use('/customers', customerRoutes);

app.use('/giveloans', giveloanRoutes);


app.use('/receiveloans', receiveloanRoutes);

app.use('/api/commissions', commissionRoutes);
app.use('/api/closings', closingRoutes);
app.use('/', inventoryRoutes); 
app.use('/api/reports', reportRoutes);
app.use('/api', settingRoutes);
// const authenticateUser = (req, res, next) => {
//     console.log('Session Data:', req.session);
//     if (req.session.user) {
      
//         next();
//     } else {
       
//         console.log('Redirecting to login page');
//         res.redirect('/login.html');
//     }
// };


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Endpoints: /api/products, /api/sales, /suppliers, /categories, /api/users, /customers, /giveloans, /inventory`);
});
