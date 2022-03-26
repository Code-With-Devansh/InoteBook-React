const express = require("express");
const fetchUser = require("../middleWare/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();
// to fetch all the notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    let notes = await Notes.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
});
// Add a new note using post login required
router.post(
  "/addnote",
  [
    body("title", "title is must for a note").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.status(200).json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);
// route 3: update an existing note
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    let { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Find the node to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("access denied");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.status(200).json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

// route 4: deleting an existing note using delete obviously login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  // Find the node to be deleted and delete it
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("access denied");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: "the note has been deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
