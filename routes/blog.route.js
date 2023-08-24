const express = require("express");
const { blogModel } = require("../models/blog.model");
const { auth } = require("../Middleware/auth");

const blogRoute = express.Router();

blogRoute.get("/", auth, async (req, res) => {
  const { category, order } = req.query;
  try {
    let blogs;
    if (category && order)
      blogs = await blogModel
        .find({ category })
        .sort({ date: order === "asc" ? 1 : -1 });
    else if (category) blogs = await blogModel.find({ category });
    else if (order)
      blogs = await blogModel.find().sort({ date: order === "asc" ? 1 : -1 });
    else blogs = await blogModel.find();

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

blogRoute.post("/add", auth, async (req, res) => {
  try {
    const blog = blogModel(req.body);
    await blog.save();
    res.status(200).send({ msg: "Posted" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

blogRoute.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findOneAndUpdate({ _id: id }, req.body);
    if (blog) res.status(200).send({ msg: "updated" });
    else res.status(404).send({ msg: "blog not found" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

blogRoute.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findOneAndDelete({ _id: id });
    if (blog) res.status(200).send({ msg: "deleted" });
    else res.status(404).send({ msg: "blog not found" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

module.exports = { blogRoute };
