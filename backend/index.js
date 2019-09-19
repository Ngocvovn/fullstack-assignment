const express = require('express');
const app = express();
const port = 3000;

app.use('/v1', require('./routes'));

app.listen(port, () => {
    console.log('backend running at port ' + port);
});


module.exports = app;