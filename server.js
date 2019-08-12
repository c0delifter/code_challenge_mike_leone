const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use('/api', routes);
const db = require('./config/config').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Successfully connected to Mongo DB'))
    .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));