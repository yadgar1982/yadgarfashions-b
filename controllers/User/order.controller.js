import OrderModel from "../../models/User/order.model.js";
import {getPaginationByQueryService } from "../../services/pagination.service.js";
//import { sendEmailOnOrder } from "../../services/sendEmail.service.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await new OrderModel(data).save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Many Order
export const createManyOrders = async (data) => {
  try {
    const lastOrder = await OrderModel.findOne()
    .sort({ orderId: -1 })
    .limit(1);
    let sn = lastOrder ? Number(lastOrder.orderId) + 1 : 101;
    for (let doc of data) {
        doc.orderId = sn++;
    }
    await OrderModel.insertMany(data);
  } catch (error) {
    console.log(error);
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        let refund = 0;
        const { id } = req.params;
        const {newStatus,step,refundAmount} = { ...req.body };
        if(refundAmount) refund = refundAmount;
        const updatedOrder = await OrderModel.updateOne(
            {_id:id}, 
            {
                $set : {
                    'status': newStatus,
                    'refundAmount': refund
                },
                $push: {
                    'statusDetails': step
                }
            }
        );
        if (!updatedOrder)
            res.status(404).json({ message: "There is no Order in database !" });
        res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update Order" });
    }
};

// Update Order
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const data = { ...req.body };
        const order = await OrderModel.findByIdAndUpdate(id,data, { new: true });
        if (!order)
            res.status(404).json({ message: "There is no order in database !" });
        const orderObj = order.toObject();
        res.status(200).json({ message: "order updated successfully", order : orderObj});
    } catch (error) {
        res.status(500).json({ message: "Failed to update order" });
    }
};

// Get All Order
export const getAllOrder = async (req, res) => {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// Get User Related Order
export const getUserOrder = async (req, res) => {
    try {
        const {userId} = req.query;
      
        const query = {
            status : { $nin : ["delivered","cancelled"]},
            userId
        }
        const orders = await OrderModel.find(query).sort({ createdAt: -1 });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// Get Supplier Related Order
export const getOrderBySupplier = async (req, res) => {
    try {
        const {supplierId} = req.query;
      
        const query = {

            supplierId
        }
        const orders = await OrderModel.find(query).sort({ createdAt: -1 });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// Get Order By Status
export const getOrderByStatus = async (req, res) => {
    try {
        const query = {};
        const {userId,status} = req.query;
        if(status) query.status = status;
        if(userId) query.userId = userId;
        const orders = await OrderModel.find(query).sort({ createdAt: -1 });
         res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// Get Paginated Orders
export const getPaginatedOrders = async (req, res) => {
  try {
    let query = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = parseInt(req.query.status);
    if(status) query.status = status;
    const result = await getPaginationByQueryService(
      query,
      page,
      limit,
      OrderModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Orders', error });
  }
};

export const getOrderStatusCounts = async (req, res) => {
  try {
    const result = await OrderModel.aggregate([
      {
        $group: {
          _id: { $toLower: "$status" },
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert array to object
    const statusCounts = {};
    result.forEach(item => {
      statusCounts[item._id] = item.count;
    });

    res.status(200).json(statusCounts);
  } catch (error) {
    console.error("Error counting statuses:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};
