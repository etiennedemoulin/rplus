inlets = 1;
outlets = 1;

let receiveName;
let dictName;
let className;
let instance;
let engine;
let param;

let objects = [];

let rplus = new Global("rplus");
if (!rplus.offset) {
  rplus.offset = 0;
}

// @todo refine condition and stocked instance, engine & param

function thispoly(inlet) {
  // (poly) shadow receiveName with instance number

  if (inlet !== 0 && engine && param) {
    patcherargs(`${inlet + rplus.offset}-${engine}-${param}`);
    done();
  } else {
    post("can't shadow parameter " + receiveName + " because it doesn't match formatting");
  }
}

function patcherargs(inlet) {

  if (!inlet) {
    return;
  }

  receiveName = inlet;

  const receiveArray = receiveName.split('-');

  // need to refine condition to match instance-engine-with-composed-name-param-with-composed-name
  if (receiveArray.length === 3 && +receiveArray[0] === +receiveArray[0]) {
    // receive match syntax
    instance = Number.parseInt(receiveArray[0]);
    engine = receiveArray[1];
    param = receiveArray[2];
    className = `${receiveArray[1]}-${receiveArray[2]}`;
    dictName = `${receiveArray[0]}-${receiveArray[1]}`;
  } else {
    // switch to default case (normal receive message)
    dictName = receiveName;
    className = receiveName;
  }

}

function done() {
  // post(`receive name : ${receiveName}\n dict name: ${dictName}\n class name: ${className}`);
  if (receiveName && dictName && className) {
    _createReceive();
  } else {
    // here implement method
  }
}

function setDictName() {
  // set a custom dict name instead of <instance>-<engine>
  const a = arrayfromargs(messagename, arguments);
  a.shift();
  dictName = a[0];
}

function setToDict()
{
// exposed function
  const a = arrayfromargs(messagename, arguments);
  a.shift();
  _setToDict(dictName, receiveName, a.join(' '));
}

function _setToDict(dict, key, value) {
  // populate the <instance>-<engine> dictionary
  // post("send "+key+" "+value+" at "+dict);post();
  const d = new Dict(dict);
  d.set(key,value);

  if (instance && engine && param) {
    const e = new Dict(`${engine}-${param}`);
    e.set(key, value);
  }

}

function shadow() {
  // (poly) shadow receiveName with instance number
  // call thispoly function with instance number
  outlet(0,"thispoly","bang");
}

function _createReceive() {
  // create send and receive

  _delete();

  const sendObject = this.patcher.newdefault(268, 82, "send", receiveName);
  objects.push(sendObject);

  const receiveObject = this.patcher.newdefault(10, 20, "receive", receiveName);
  objects.push(receiveObject);

  const receiveGlobalObject = this.patcher.newdefault(200, 20, "receive", className);
  objects.push(receiveGlobalObject);

  const destination = this.patcher.getnamed("destination");
  const source = this.patcher.getnamed("source");

  this.patcher.connect(receiveObject, 0, destination, 0);
  this.patcher.connect(receiveGlobalObject, 0, destination, 0);
  this.patcher.connect(source, 0, sendObject, 0);
}

function _delete() {
  // delete scripted send and receive
  objects.forEach(object => {
    this.patcher.remove(object);
  });
  objects = [];
}

function offset(value) {
  // set an offset for shadow method (global)
  rplus.offset = Number.parseInt(value) - 1;
  post("> (rplus) offset changed for " + value + ", please re-instanciate your poly in order to apply change");
  post();
} 