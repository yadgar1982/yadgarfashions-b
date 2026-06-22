export const getPaginationService = async (page = 1,limit = 10, Model) => {
  const skip = (page - 1) * limit;
  const data = await Model
  .find()
  .sort({ createdAt: -1 }) // Sort by createdAt descending
  .skip(skip)
  .limit(limit)
  .select('-password');
  const total = await Model.countDocuments();
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getPaginationByQueryService = async (query,page,limit,Model,sort = {createdAt : -1}) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Model.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Model.countDocuments(query)
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getPaginationProductWithRatings = async (query, page, limit, Model, sort = { createdAt: -1 }) => {
  const skip = (page - 1) * limit;

  const data = await Model.aggregate([
    { $match: query },
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },

    // Join with ratings collection
    {
      $lookup: {
        from: 'ratings', // <-- Make sure this matches your actual collection name
        localField: '_id',
        foreignField: 'productId',
        as: 'ratings'
      }
    },

    // Add average rating field
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $gt: [{ $size: "$ratings" }, 0] },
            { $avg: "$ratings.rating" },
            0
          ]
        }
      }
    },

    // Optionally project only necessary fields
    {
      $project: {
        ratings: 0 // hide full ratings array if not needed
      }
    }
  ]);

  // Total count (for pagination)
  const total = await Model.countDocuments(query);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
};


export const getSelectedFields = async (fields,Model) => {
  try {
    const data = await Model.find().select(fields.split(',').join(' '));
    return data;
  } catch (error) {
    res.status(500).json({ message:  error.message});
  }
};

export const getSelectedFieldsByQuery = async (fields,query,Model) => {
  try {
    const data = await Model.find(query).select(fields.split(',').join(' '));
    return data;
  } catch (error) {
    res.status(500).json({ message:  error.message});
  }
};

