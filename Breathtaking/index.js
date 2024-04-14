const express = require('express');
const path = require('path');
const { Router } = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

const PORT = 3001;

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

app.use(express.json());
app.use(express.urlencoded());
app.use('/', router);

app.listen(PORT, () => { console.log(`Listen Port: ${PORT}`)});