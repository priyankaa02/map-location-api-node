module.exports = (app) => {
    const notes = require('../controllers/location.controller.js');

    // Create a new Note
    app.post('/locations', notes.create);

    // Retrieve all Notes
    app.get('/locations', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/locations/:locationId', notes.findOne);

    // Update a Note with noteId
    app.put('/locations/:locationId', notes.update);

    // Delete a Note with noteId
    app.delete('/locations/:locationId', notes.delete);
}
