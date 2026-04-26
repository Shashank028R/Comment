import User from "../../models/User.js";

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, profilePicture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, profilePicture },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error: " + error.message,
    });
  }
};

export default updateProfile;