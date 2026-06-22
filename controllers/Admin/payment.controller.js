
import PaymentModel from '../../models/Admin/payment.model.js';
import { getPaginationService,getSelectedFields } from '../../services/pagination.service.js';
// Create Payment
export const createPayment = async (req, res) => {

  try {
    const data = req.body;
  
    const payment = await new PaymentModel(data).save();
    res.status(201).json({ message: "Payment added successfully", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment
export const  updatePayment= async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatePayment = await PaymentModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatePayment)
        res.status(404).json({message : "There is no such amount in the database !"});
    const addsObj = updatePayment.toObject();
    res.status(200).json({ message: "Payment updated successfully", adds : addsObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Payment" });
  }
};

// Delete payments
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id)
    const adds = await PaymentModel.findByIdAndDelete(id);
    if (!adds) {
      return res.status(404).json({ message: "Amount not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error); // log actual error
    res.status(500).json({ message: "Failed to delete Payments", error: error.message });
  }
};

// Get All payments
export const getPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find().sort({ createdAt: -1 });
    console.log("payments",payments)
    res.json({ payments });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Payments" });
  }
};

//get payment by payeeId

export const getPaymentsById=async(req,res)=>{
  try{
    const {id}=req.params;
    const paymentData=await PaymentModel.find({receiverId:id});
    res.status(200).json(paymentData) 
   }catch(err){
    res.status(500).json({message:"Failed to get data"});
  }
}

// Get Paginated payment
export const getPaginatedPayment = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationService(
      page,
      limit,
      PaymentModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Payments', error });
  }
};
