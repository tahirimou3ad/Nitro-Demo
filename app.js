const express = require('express');
const app = express();
const path = require('path');
const router = require('./controllers/router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is now listening on port ${PORT} ...`);
});