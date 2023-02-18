const express = require("express");
const { NoteModel } = require("../Model/note.model");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.send(notes);
  } catch (error) {
    res.send(error);
  }
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.send("Note created");
  } catch (error) {
    res.send(error);
  }
});
noteRouter.patch("/update/:id",async (req, res) => {
    const notesID = req.params.id
  try {
    await NoteModel.findByIdAndUpdate({_id:notesID})
    res.send({"msg": `note with id ${notesID} updated`})
  } catch (error) {
    res.send(error.message)
  }
});

noteRouter.delete("/delete/:id",async (req, res) => {
    const notesID = req.params.id
  try {
    await NoteModel.findByIdAndDelete({_id:notesID})
    res.send({"msg": `note with id ${notesID} deleted`})
  } catch (error) {
    res.send(error.message)
  }
});

module.exports = {
  noteRouter,
};
