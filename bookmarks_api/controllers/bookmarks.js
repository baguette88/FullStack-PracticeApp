const express = require("express");
const bookmarks = express.Router();

const Bookmark = require("../models/bookmarks.js");

// index
bookmarks.get("/", (req, res) => {
  Bookmark.find({}, (error, foundBookmarks) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundBookmarks);
  });
});

// create
bookmarks.post("/", (req, res) => {
  Bookmark.create(req.body, (error, createdBookmark) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(createdBookmark);
  });
});

// delete
bookmarks.delete("/:id", (req, res) => {
  Bookmark.findByIdAndRemove(req.params.id, (error, deletedBookmark) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(deletedBookmark);
  });
});

// update
bookmarks.put("/:id", (req, res) => {
  Bookmark.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedBookmark) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).json(updatedBookmark);
    }
  );
});

module.exports = bookmarks;
