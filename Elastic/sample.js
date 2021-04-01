'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'univesitynew',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: 
    {
        "alpha_two_code" : "IND",
        "country" : "India",
        "domain" : "acu.edu",
        "name"   : "Anna University1",
        "web_page" : "http://www.acu.edu/",
        "descrip" : "Good University"
    }
  })

  // await client.index({
  //   index: 'univesitynew',
  //   // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
  //   body: {
  //       "alpha_two_code" : "US",
  //       "country" : "United States",
  //       "domain" : "acu.edu",
  //       "name"   : "Abilene Christian University2",
  //       "web_page" : "http://www.acu.edu/",
  //       "descrip" : "Good University"
  //   }
  // })

  // await client.index({
  //   index: 'univesitynew',
  //   // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
  //   body: {
  //       "alpha_two_code" : "CAN",
  //       "country" : "Canada",
  //       "domain" : "canada.edu",
  //       "name"   : "University of Canada",
  //       "web_page" : "http://www.canadauniv.edu/",
  //       "descrip" : "Good University"
  //   }
  // })

  // await client.index({
  //   index: 'univesitynew',
  //   // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
  //   body : {
  //       "alpha_two_code" : "US",
  //       "country" : "United States",
  //       "domain" : "acu.edu",
  //       "name"   : "Abilene Christian University3",
  //       "web_page" : "http://www.acu.edu/",
  //       "descrip" : "Good University"
  //   }
  // })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'univesitynew' })

  // Let's search!
  const { body } = await client.search({
    index: 'univesitynew',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { name: 'Abilene Christian University3' }
      }
    }
  })
  
 console.log(body.hits.hits)
}

run().catch(console.log)