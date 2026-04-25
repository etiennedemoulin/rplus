const console = [];

console.log = function(...args) {
  post(...args);
}

inlets = 1;
outlets = 1;


function anything() {
  const params = [];
  var a = arrayfromargs(messagename, arguments);
  post("received message " + a.length + "\n");

  for (let i = 0; i < a.length; i++) {
    console.log("pouet")
    if (i % 2 === 0) {
      params.push([a[i], a[i+1]]);
    }
  }

  const title = this.patcher.newdefault(368, 82, "send", receiveName);


  post(params);

}



function _createReceive() {
  const sendObject = this.patcher.newdefault(368, 82, "send", receiveName);
  const receiveObject = this.patcher.newdefault(10, 20, "receive", receiveName);
  const receiveGlobalObject = this.patcher.newdefault(200, 20, "receive", className);
  const destination = this.patcher.getnamed("destination");
  const source = this.patcher.getnamed("source");
  this.patcher.connect(receiveObject, 0, destination, 0);
  this.patcher.connect(receiveGlobalObject, 0, destination, 0);
  this.patcher.connect(source, 0, sendObject, 0);
}