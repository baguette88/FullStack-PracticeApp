const express = require('express');
const holidays = express.Router()

const Holiday = require('../models/holidays.js');

// index
holidays.get('/', (req, res) => {
  Holiday.find({}, (error, foundHolidays) => {
    if (error) {
      res.status(400).json({error: error.message});
    }
    res.status(200).json(foundHolidays);
  });
});

// create
holidays.post('/', (req, res) => {
  Holiday.create(req.body, (error, createdHoliday) => {
    if (error) {
      res.status(400).json({error: error.message});
    }
    res.status(200).json(createdHoliday);
  });
});


// delete
holidays.delete('/:id', (req, res) => {
  Holiday.findByIdAndRemove(req.params.id, (error, deletedHoliday) => {
    if (error) {
      res.status(400).json( {error: error.message})
    }
    res.status(200).json(deletedHoliday)
  });
});

// update
holidays.put('/:id', (req, res) => {
  Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true}, (error, updatedHoliday) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(updatedHoliday)
  });
});

module.exports = holidays