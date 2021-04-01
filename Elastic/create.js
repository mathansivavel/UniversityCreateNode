
var client = require('./connection.js');


client.indices.create({
    index: 'univesitynew',
}, function(err, resp, status) {
    if (err) {
        console.log(err);
    } else {
        console.log("create", resp);
    }
});


