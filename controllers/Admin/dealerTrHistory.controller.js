import { getPaginationService,getSelectedFields } from '../../services/pagination.service.js';
import DealerTrHistoryModel from '../../models/Admin/dealerTrHistory.model.js';
import mongoose from 'mongoose';

// Create DealerTrHostory
export const createDealerTrHostory = async (req, res) => {
  try {
    const data = req.body;

    const dealerTrHistory = await new DealerTrHistoryModel(data).save();
    res.status(201).json({ message: "Dealer created successfully", dealerTrHistory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get DealerTrHistory
export const getDealerTrHostory = async (req, res) => {
  try {
    const { dealerId } = req.params;

    const history = await DealerTrHistoryModel.find({ dealerId: dealerId }).lean();

    // calculate totals
    let totalCr = 0;
    let totalDr = 0;

    history.forEach(tx => {
      if (tx.type === "cr") {
        totalCr += tx.amount;
      } else if (tx.type === "dr") {
        totalDr += tx.amount;
      }
    });

    const balance = totalCr - totalDr;

    res.status(200).json({
      history,
      totalCr,
      totalDr,
      balance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};