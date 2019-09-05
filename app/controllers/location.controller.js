const Location = require('../models/location.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
  if(!req.body.location) {
        return res.status(400).send({
            message: "location can not be empty"
        });
    }

    // Create a Note
    const location = new Location({
        location: req.body.location || "Untitled Location",
        lat: req.body.lat,
        lng: req.body.lng
    });

    Location.find({location : req.body.location}).exec(function(err, docs) {
    if (docs.length){
      return res.status(500).send({
          message: "Location already exists"
      });
    } else {
      location.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the location."
          });
      });
    }
  });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Location.find()
    .then(locations => {
        res.send(locations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Location.findById(req.params.locationId)
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "location not found with id " + req.params.locationId
            });
        }
        res.send(location);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "location not found with id " + req.params.locationId
            });
        }
        return res.status(500).send({
            message: "Error retrieving location with id " + req.params.locationId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  if(!req.body.location) {
        return res.status(400).send({
            message: "location can not be empty"
        });
    }

    // Find note and update it with the request body
    Location.findByIdAndUpdate(req.params.locationId, {
        location: req.body.location || "Untitled location",
        lat: req.body.lat,
        lng: req.body.lng
    }, {new: true})
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "location not found with id " + req.params.locationId
            });
        }
        res.send(location);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "location not found with id " + req.params.locationId
            });
        }
        return res.status(500).send({
            message: "Error updating location with id " + req.params.locationId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Location.findByIdAndRemove(req.params.locationId)
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "location not found with id " + req.params.locationId
            });
        }
        res.send({message: "location deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "location not found with id " + req.params.locationId
            });
        }
        return res.status(500).send({
            message: "Could not delete location with id " + req.params.locationId
        });
    });
};
