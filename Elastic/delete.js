var client = require('./connection.js');

client.indices.delete({index: 'university'},function(err,resp,status) {  
  console.log("delete",resp);
});