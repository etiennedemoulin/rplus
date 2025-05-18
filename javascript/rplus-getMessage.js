const Max = require('max-api');

// Use the 'outlet' function to send messages out of node.script's outlet
Max.addHandler("get", async (msg) => {
  let output = ``;
  const dict = await Max.getDict(msg);
  for (const [key, value] of Object.entries(dict)) {
    output += `${key} ${value};`
  }
  Max.outlet(output);
});

