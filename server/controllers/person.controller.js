//
const Person = require("../models/person");
const fs = require("fs");

//create data
exports.create = async (req, res) => {
  try {
    const { data } = req.body;
    const newData = {
      name: data,
      pic: req.file.filename,
    };
    // res.json(await new Person({ name }).save);
    let person = new Person(newData);
    console.log(person);
    await person.save();
    res.status(200).json(person);
  } catch (err) {
    console.log(err);
    res.status(400).json("create person fail");
  }
};

// get all data
exports.list = async (req, res) => {
  try {
    let allPerson = await Person.find({}).sort({ date: -1 }).exec();
    res.json(allPerson);
  } catch (err) {
    res.status(400).json("create person fail");
  }
};

// read data :id
exports.read = async (req, res) => {
  // res.send("hello read person");
  const persons = await Person.findOne({ _id: req.params.id }).exec();
  res.json(persons);
};

//upate data
exports.update = async (req, res) => {
  try {
    const { data, fileOld } = req.body;
    var newData = {
      name: data,
      pic: fileOld,
    };
    if (typeof req.file !== "undefined") {
      newData.pic = req.file.filename;
      await fs.unlink(`./public/uploads/${fileOld}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("remove success");
        }
      });
    }
    const updated = await Person.findOneAndUpdate(
      { _id: req.params.id },
      newData,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).json("Update person fail");
  }
};

// deletedata
exports.remove = async (req, res) => {
  try {
    const deleted = await Person.findOneAndDelete({ _id: req.params.id });
    await fs.unlink(`./public/uploads/${deleted.pic}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("remove success");
      }
    });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).json("create person fail");
  }
};
