import dotenv from "dotenv";
dotenv.config();
import cron from "node-cron";
import OrderModel from "../models/User/order.model.js";

//get status message
const getStatusMessage = (statusText) => {
    const now = new Date();

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    return `Product ${statusText} on ${formattedDate}`;
};

//'1-1 * * * *'
cron.schedule('1-1 * * * *', async () => {
    console.log("running....",Date.now());
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); //24 * 60 * 60 * 1000
    try {
        let query = {
            status: "pending",
            createdAt: { $lte: twentyFourHoursAgo },
        };
        let data = {
            $set: {
                'status': "confirmed"
            },
            $push: {
                'statusDetails': { title: "Confirmed", description: getStatusMessage("confirmed") }
            }
        }
        const result = await OrderModel.updateMany(query,data);
        //const result = await dbService.updateManyRecord(query,data,OrderModel);
        console.log(`${result.modifiedCount} Auto-confirmed after 24 hours`)
    } catch (error) {
        console.log("Error auto-confirming orders", error);
    }
})