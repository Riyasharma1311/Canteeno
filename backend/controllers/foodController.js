import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
// Add food items
const addFood = async (req, res) => {
  try {
    // Check if file is provided
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    // Extract file details
    const image_filename = req.file.filename.replace(/\\/g, "/");

    // Create a new food item
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    // Save to the database
    await food.save();
    res.status(201).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//get food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    // if (foods.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "No food items found" });
    // }
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//removing food
const removeFood = async (req, res) => {
  try {
    // // Validate if the ID is properly formatted
    const food = await foodModel.findById(req.body.id);

    if (!mongoose.Types.ObjectId.isValid(food)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid food ID" });
    }

    // Check if the food item exists
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    console.log(food);
    // Build the image file path
    const imagePath = path.join("uploads", food.image);

    // Delete the image file if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
          return res
            .status(500)
            .json({ success: false, message: "Error deleting food image" });
        }
      });
    }

    // Remove the food item from the database
    await foodModel.findByIdAndDelete(req.body.id);

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Food item removed successfully" });
  } catch (error) {
    console.error("Error removing food item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export { addFood, listFood, removeFood };
