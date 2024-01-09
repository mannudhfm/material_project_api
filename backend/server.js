const express = require('express');
const request = require('request')
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();
dotenv.config()
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));

app.use(express.json());
app.use(cors());
app.options('*', cors());

const apiKey = process.env.API_KEY

let options = {
    json: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'X-API-KEY': apiKey
    }
};

app.get('/materials/summary/:query', async (req, res) => {
    options['url'] = `https://api.materialsproject.org/materials/summary/?${req.params.query}`
    options['method'] = 'GET'

    request(options, (error, response, body) => {
        res.status(response.statusCode).send(body)
        res.status(error)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});