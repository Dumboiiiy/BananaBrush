import FormData from "form-data";
import axios from "axios";
import userModel from "../models/userModel.js";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.status(200).json({
        success: false,
        message: "Insufficient credits",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      },
    );

    const base64Image = Buffer.from(data).toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(userId, {
      creditBalance: user.creditBalance - 1,
    });

    res.status(200).json({
      message: "Image generated successfully",
      resultImage: resultImage,
      success: true,
      credits: user.creditBalance - 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error generating image" });
  }
};
