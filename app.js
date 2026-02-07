const express = require('express');
const tasksRouter = require('./routes/tasks');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount task routes
app.use('/tasks', tasksRouter);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;