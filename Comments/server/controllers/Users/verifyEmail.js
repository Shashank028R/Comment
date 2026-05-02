import OTP from "../../models/OTP.js";
import User from "../../models/User.js";

const verifyEmail = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const validOtp = await OTP.findOne({ email, otp });

    if (!validOtp) {
      return res.status(400).json({ message: "OTP is not valid!" });
    }

    const user = await User.updateOne({ email }, { is_verified: true });

    await OTP.deleteOne({ _id: validOtp._id });

    res.json({
      message: "Otp Verified Successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default verifyEmail;
