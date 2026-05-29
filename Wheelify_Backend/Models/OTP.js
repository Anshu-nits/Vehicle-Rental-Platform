import mongoose from "mongoose";
import mailSender from "../Config/mailSender.js";
import emailTemplate from "../Mail Templates/mailVerification.js";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // 5 minutes
    },
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            emailTemplate(otp)
        );

        console.log("Verification email sent");
        return mailResponse;
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        throw error;
    }
}

OTPSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            await sendVerificationEmail(this.email, this.otp);
        }

        next();
    } catch (error) {
        next(error);
    }
});

const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;