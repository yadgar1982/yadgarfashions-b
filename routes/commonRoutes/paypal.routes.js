import express from "express";
import paypal from "@paypal/checkout-server-sdk" ;
const paypalRouter = express.Router();
import { client } from "../../config/paypal.config.js";
import { paymentGatewayPrice } from "../../services/calculation.service.js";
import { isAdminEmployeeOrUser, verifyToken } from "../../middlewares/auth.middleware.js";

// Create Order
paypalRouter.post("/create-order", verifyToken,isAdminEmployeeOrUser, async (req, res) => {
  const price = await paymentGatewayPrice(req,res);
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: price,
        },
      },
    ],
  });

  try {
    const order = await client().execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating PayPal order");
  }
});

// Capture Order
paypalRouter.post("/capture-order", verifyToken,isAdminEmployeeOrUser, async (req, res) => {
  const orderID = req.body.orderID;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client().execute(request);
    res.json(capture.result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error capturing PayPal order");
  }
});

export default paypalRouter;
