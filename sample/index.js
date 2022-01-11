const { 
  Client
 } = require('@wazirx/node-client').v1;

let client = new Client();

async function run() {
  let data = await client.ping().catch((err) => {
    console.log(err)
  });
  console.log(data);
}

run();
