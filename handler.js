const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');

const upload = require('./multer');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/image', upload.single('upload'), async function (req, res) {
    if (!req.file) {
        return res.status(500).send({ uploaded: false, error: 'error' });
    }
    console.log(req.file);
    return res.status(200).send({ uploaded: true, url: req.file.location });
});

app.get('/test', function (req, res) {
    res.status(200).send('hello');
});

module.exports.handler = serverless(app, {
    binary: ['image/png', 'image/jpeg', 'image/jpg'],
});
