const Max = require('max-api');

// Use the 'outlet' function to send messages out of node.script's outlet
Max.addHandler("get", async (msg) => {
  let output = ``;
  const dict = await Max.getDict(msg);
  for (const [key, value] of Object.entries(dict)) {
    output += `${key} ${value};\n`
  }
  Max.outlet(output);
});

Max.addHandler("copy", async (msg) => {
  let output = ``;
  const dict = await Max.getDict(msg);
  for (const [key, value] of Object.entries(dict)) {
    output += `${key} ${value};\n`
  }

  pbcopy(output);

});

function pbcopy(data) {
    var proc = require('child_process').spawn('pbcopy'); 
    proc.stdin.write(data); proc.stdin.end();
}
