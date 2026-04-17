
inlets = 1;
outlets = 1;

let receiveName;
let dictName;
let className;


function patcherargs() {
  const a = arrayfromargs(messagename, arguments);
  a.shift();
  receiveName = a[0];

  const receiveArray = receiveName.split('-');

  // need to refine condition to match instance-engine-with-composed-name-param-with-composed-name
  if (receiveArray.length === 3 && +receiveArray[0] === +receiveArray[0]) {
    // receive match syntax
    const instance = receiveArray[0];
    const engine = receiveArray[1];
    const param = receiveArray[2];
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
    // here implement set method
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