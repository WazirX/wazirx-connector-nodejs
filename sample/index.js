const { 
  Client
 } = require('@wazirx/node-client').v1;

let clinet = new Client();

async function run() {
  let data = await clinet.ping().catch((err) => {
    console.log(err)
  });
  console.log(data);
}

run();
