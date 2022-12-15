
inlets = 1;
outlets = 1;


function anything()
{
  var a = arrayfromargs(messagename, arguments);
  var key = a[0];
  var value = a[1];
  var keyAsAnArray = key.split('-');
  if (keyAsAnArray.length > 2) {
    var dictName = keyAsAnArray[0]+'-'+keyAsAnArray[1];
    setToDict(dictName, key, value);
  };
}

function setToDict(dict, key, value) {
  // post("send "+key+" "+value+" at "+dict);post();
  var d = new Dict(dict);
  d.set(key,value);
}
