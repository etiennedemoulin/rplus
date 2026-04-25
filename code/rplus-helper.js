
inlets = 1;
outlets = 1;

let receiveName;
let dictName;
let className;
let instance;
let engine;
let param;

let objects = [];

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
    // here implement set method ????
  }
}

function setToDict()
{
  const a = arrayfromargs(messagename, arguments);
  a.shift();
  _setToDict(dictName, receiveName, a.join(' '));
}

function setDictName() {
  const a = arrayfromargs(messagename, arguments);
  a.shift();
  dictName = a[0];
}

function _setToDict(dict, key, value) {
  // post("send "+key+" "+value+" at "+dict);post();
  const d = new Dict(dict);
  d.set(key,value);
}

function shadow() {
  // (poly) shadow receiveName with instance number
  const d = new Dict("rplus.poly");
  patcherargs(`${d.get(instance)}-${engine}-${param}`);
  _createReceive();

}

function _createReceive() {

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
  objects.forEach(object => {
    this.patcher.remove(object);
  });
  objects = [];
}