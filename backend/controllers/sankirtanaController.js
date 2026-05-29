const SankirtanaRequest = require(
  "../models/SankirtanaRequest"
);

exports.createRequest = async (
  req,
  res
) => {
  try {
    const request =
      await SankirtanaRequest.create(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Thank you. Our Sankirtana team will contact you shortly.",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRequests = async (
  req,
  res
) => {
  try {
    const requests =
      await SankirtanaRequest.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteRequest = async (
  req,
  res
) => {
  try {
    const request =
      await SankirtanaRequest.findByIdAndDelete(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};