import mongoose from "mongoose";
import CartModel from "../models/User/cart.model.js";

// calculate total discount and d charge and tax etc
export const calculateCartTotals = (cartItems) => {
  return cartItems.reduce((totals, item) => {
    totals.totalDelivery += Number(item.deliveryCost);
    totals.totalPrice += Number(item.productFinalPrice) * Number(item.productQty);
    totals.totalSaleTax = Number(item.saleTax);
    totals.totalOtherTax = Number(item.otherTax);
    return totals;
  }, { totalDelivery: 0, totalPrice: 0,totalSaleTax:0,totalOtherTax:0 });
}

// Calculate final amount for payment gateway
export const paymentGatewayPrice = async (req,res) =>{
    const { cartIds } = req.body;
    const objectIds = cartIds.map(id => new mongoose.Types.ObjectId(id));
    const data = await CartModel.find({
    _id : {$in:objectIds}
    });
    const {totalDelivery,totalPrice,totalSaleTax,totalOtherTax} = calculateCartTotals(data);
    let otherTax = ((totalPrice * totalOtherTax) / 100).toFixed(2);
    let sTax = ((totalPrice * totalSaleTax) / 100).toFixed(2);
    let totalTax=Number(otherTax)+Number(sTax);
    let price = Math.round(Number(totalTax)+Number(totalPrice)+Number(totalDelivery));
    return price;
}