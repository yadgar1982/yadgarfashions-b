// env setup
import dotenv from "dotenv";
dotenv.config();

// importing cron from cron folder
import "./cron/autoConfirmOrder.cron.js";

// MongoDB connection
import mongoose from "mongoose";
mongoose.connect(process.env.DATABASEURL);

// create listning port
import express  from "express";
const app = express();
app.listen(1982,()=>console.log("Server is running or 1982 !"))

// importing extarnal modules
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import { limiter } from "./middlewares/auth.middleware.js";

// create cors options
const corsOptions = {
  origin : process.env.ORIGIN || "*"
}

// app level middleware
app.use('/api/stripe/webhook',express.raw({type: "application/json"}),stripeWebhook);
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// importing common routes files
import authRouter from "./routes/commonRoutes/auth.routes.js";
import emailRouter from "./routes/commonRoutes/sendEmail.routes.js";
import stripeRouter from "./routes/commonRoutes/stripe.routes.js";
import exchangeRouter from "./routes/commonRoutes/currency.routes.js";
import paypalRouter from "./routes/commonRoutes/paypal.routes.js";
import s3Router from "./routes/commonRoutes/s3Upload.routes.js";

// common routes
app.use('/api/auth', authRouter);
app.use('/api/send-email', emailRouter);
app.use('/api/send-email', emailRouter);
app.use('/api/stripe',express.raw({type: "application/json"}),stripeRouter);
app.use('/api/exchange', exchangeRouter);
app.use("/api/paypal", paypalRouter);
app.use("/api/s3/", s3Router);

// importing admin routes files
import brandingRouter from "./routes/Admin/branding.routes.js";
import supplierRouter from "./routes/Admin/supplier.routes.js";
import dealerRouter from "./routes/Admin/dealer.routes.js";
import categoryRouter from "./routes/Admin/category.routes.js";
import taxRouter from "./routes/Admin/tax.routes.js";
import brandRouter from "./routes/Admin/brand.routes.js";
import currencyRouter from "./routes/Admin/currency.routes.js";
import productRouter from "./routes/Admin/product.routes.js";
import showcaseRouter from "./routes/Admin/showcase.routes.js";
import dlvDurationRouter from "./routes/Admin/dlvDuration.routes.js";
import employeeRouter from "./routes/Admin/employee.routes.js";
import dealerTrHistoryRouter from "./routes/Admin/dealerTrHistory.routes.js";
import addsRouter from "./routes/Admin/adds.routes.js";
import paymentRouter from "./routes/Admin/payment.routes.js";

// admin routes
app.use('/api/branding', brandingRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/supplier', supplierRouter);
app.use('/api/dealer', dealerRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/dealer-tr-history', dealerTrHistoryRouter);
app.use('/api/category', categoryRouter);
app.use('/api/tax', taxRouter);
app.use('/api/brand', brandRouter);
app.use('/api/adds', addsRouter);
app.use('/api/currency', currencyRouter);
app.use('/api/product', productRouter);
app.use('/api/showcase', showcaseRouter);
app.use('/api/dlv-duration', dlvDurationRouter);

// importing user routes files
import userRouter from "./routes/User/user.routes.js";
import cartRouter from "./routes/User/cart.routes.js";
import addressRouter from "./routes/User/address.routes.js";
import menSizeRouter from "./routes/User/menSize.routes.js";
import womenSizeRouter from "./routes/User/womenSize.routes.js";
import coatSizeRouter from "./routes/User/coatSize.routes.js";
import orderRouter from "./routes/User/order.routes.js";
import ratingRouter from "./routes/User/rating.routes.js";
import { stripeWebhook } from "./controllers/commonControllers/payment.controller.js";

// user routes
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/men-size', menSizeRouter);
app.use('/api/women-size', womenSizeRouter);
app.use('/api/coat-size', coatSizeRouter);
app.use('/api/order', orderRouter);
app.use('/api/rating', ratingRouter);