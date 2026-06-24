import { instance } from "../server.js";
import crypto from "crypto";
import Payment from "../models/Payment.js";

export const checkout = async (req, res) => {
    try {
        const { amount, name, email, message } = req.body;
        const notes = {};
        if (name?.trim()) notes.name = name.trim();
        if (email?.trim()) notes.email = email.trim();
        if (message?.trim()) notes.message = message.trim();
        if (req.body.frontendUrl) notes.frontendUrl = req.body.frontendUrl;

        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            notes
        }
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.error("Razorpay Error:", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.error?.description || error.message || "Failed to create Razorpay order. Check your API keys.",
        });
    }
}

export const paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Fetch order to retrieve the notes and amount
            const order = await instance.orders.fetch(razorpay_order_id);

            const paymentData = {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                amount: order.amount / 100,
            };

            if (order.notes) {
                if (order.notes.name) paymentData.name = order.notes.name;
                if (order.notes.email) paymentData.email = order.notes.email;
                if (order.notes.message) paymentData.message = order.notes.message;
            }

            await Payment.create(paymentData);

            const frontendUrl = req.query.frontendUrl || order.notes.frontendUrl || process.env.FRONTEND_URL || "http://localhost:5173";
            res.redirect(303, `${frontendUrl}/paymentsuccess?reference=${razorpay_payment_id}&amount=${order.amount / 100}`);
        } else {
            res.status(400).json({
                success: false,
            });
        }
    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).send("Payment Verification Failed: " + error.message);
    }
}