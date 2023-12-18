// external imports.
const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser')
const cors = require('cors');

// internal imports.
const DataBaseConfiguration = require("./config/database");
const userRoute = require("./routes/userRoute");
const StockRouter = require("./routes/StockRouter");
const OrderToSupplierRouter = require("./routes/OrderToSupplierRouter");
const SalesRouter = require("./routes/SalesRouter");
const FuelStationRouter = require("./routes/FuelStationRouter");
const SupplierRouter = require("./routes/SupplierRouter");

// config calling.
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// app.use(
//     cors({
//         // origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
//         origin: ["http://localhost:3000", "http://localhost:5000"],
//         credentials: true,
//     })
// );


// database Connection.
DataBaseConfiguration()

// response parses.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// listing home route.
app.get('/', (req, res) => {
    res.send("Welcome to Home Page of Backend");
})


// routes....

app.use('/', userRoute);
app.use('/', SalesRouter);
app.use('/', FuelStationRouter);
app.use('/', OrderToSupplierRouter);
app.use('/', StockRouter);
app.use('/', SupplierRouter);


// 404 page error handling.
const notFoundPage = (req, res, next) => {
    next(res.status(500).json("Page not Found!"))
}

app.use(notFoundPage);
// Default | Server | Programmer Common error handling....
// app.use(errorsMiddleware);


// app listing
const server = app.listen(process.env.PORT || 8001, () => {
    console.log(`App listing on ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})


// Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})