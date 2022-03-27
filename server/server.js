require('dotenv/config');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8888;

const getNFTMetadata = require('./getNFTMetadata');

app.use(express.json());

app.use(cors());

// test route
app.get('/', (req, res) => res.json({success:"Hello World"}));

app.use('/getNFTMetadata', getNFTMetadata);

app.listen(port, () => console.log(`App listening on port ${port}`));
