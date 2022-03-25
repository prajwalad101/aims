// utility functions
import AppError from "../../lib/appError";
import clientPromise from "../../lib/mongodb";

// middleware
import catchAsync from "../../middlewares/catchAsync";
import globalErrorHandler from "../../middlewares/errorMd";

async function handler(req, res) {
  const { method } = req;
  const { email } = req.body;

  if (method === "POST") {
    const client = await clientPromise;
    const usersCollection = client.db().collection("users");

    const updatedDoc = await usersCollection.update(
      { email: email },
      {
        $set: req.body,
      }
    );

    return res.status(200).json({
      status: "success",
      message: updatedDoc,
    });
  } else {
    // create custom error
    const err = new AppError(`No router for ${req.url} found`, 404);
    return globalErrorHandler(err, req, res);
  }
}

export default catchAsync(handler);