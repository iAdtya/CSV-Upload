import file from "../models/Files.js";

const home = async (req, res) => {
  try {
    const files = await file.find({}).sort("-createdAt");
    return res.render("home", {
      title: "Home",
      file: files,
    });
  } catch (error) {
    console.log(error, `error in home controller`);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default home;
