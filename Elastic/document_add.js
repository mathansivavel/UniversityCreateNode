var client = require('./connection.js');
var dataset = require('./Data.json');

'use strict'

require('array.prototype.flatmap').shim()
client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
  });

async function run () {
  await client.indices.create({
    index: 'university',
    body: {
      mappings: {
        properties: {
            alpha_two_code : { type: 'text' },
            country : { type: 'text' },
            domain: {  type: 'text' },
            name : {  type: 'text' },
            web_page :{  type: 'text'},
            descrip : {  type: 'text' }
        }
      }
    }
  }, { ignore: [400] })

const body = dataset.flatMap(doc => [{ index: { _index: 'university' } }, doc]);

const { body: bulkResponse } = await client.bulk({ refresh: true, body })


if (bulkResponse.errors) {
    console.log("---------------------------------------------------------")
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const { body: count } = await client.count({ index: 'university' })
  console.log(count)
}

run().catch(console.log)