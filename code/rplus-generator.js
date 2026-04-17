const Max = require('max-api');

let model;
let garbage;

let garbage_name = "ui_garbage";

Max.addHandlers({
  [Max.MESSAGE_TYPES.ALL]: (a, ...b) => {
    if (Array.isArray(b) && a === false) { gen (b) }
  },
  clear: () => clear(),
  model: (a) => { model = a },
});

async function maxDictToArray(maxDictName) {
  const dict = await Max.getDict(maxDictName);
  if (Array.isArray(dict[maxDictName])) {
    return dict[maxDictName];
  } else {
    console.log('dict is empty or non valid, return empty array!');
    return [];
  }
}

async function arrayToMaxDict(maxDictName, array) {
  const dict = {};
  dict[maxDictName] = array;
  await Max.setDict(maxDictName, dict);
}

async function bang() {

}

async function gen(array) {

  const newArray = [];
  array.forEach((e, i) => {
    if (i % 2 === 0) {
      newArray.push([array[i], array[i+1]]);
    };
  });

  // retrieve garbage
  garbage = await maxDictToArray(garbage_name);

  let resetbox = ["@text"];

  generateBox(`title_${model}`, 'message', ['@text', model, '@fontsize', 18], {x:20, y:280}, 1, {x:10, y:3.5});
  generateBox('topdictview', 'r+.dict.view', [], {x:20, y:320});
  generateBox('resetbang', 'button', [], {x:480, y:310}, 1, {x:210, y:8});
  generateLink(`title_${model}`, 0, 'topdictview', 0);
  generateBox(`dict_${model}`, 'dict', [model], {x:150, y: 280});
  generateBox(`rreset_${model}`, 'r', [`${model}-reset`], {x:480, y:280});
  generateLink(`rreset_${model}`, 0, 'resetbang', 0);

  generateBox('resetcomment', 'comment', ['@text', 'reset'], {x:510, y:310}, 1, {x:240, y:10});

  newArray.forEach((element,i) => {
    const param = element[0];
    const defaultValue = element[1];
    generateBox(`numbox_${param}`, 'number', ["@format", 6], {x:10, y:360+(i*40)}, 1, {x:10 + ((i%3)*80), y:60 + (Math.floor(i/3)*50)});
    generateBox(`rplus_${param}`, 'r+', [param], {x:70, y:360+(i*40)});
    
    generateLink(`numbox_${param}`, 0, `rplus_${param}`, 0);
    generateLink(`rplus_${param}`, 0, `numbox_${param}`, 0);

    const thiscomment = param.split('-');
    thiscomment.shift();

    generateBox(`comment_${param}`, 'comment', ["@text", thiscomment.join('-')], {x: 250, y:360+(i*40)}, 1, {x:10 + ((i%3)*80), y:38 + (Math.floor(i/3)*50)});
    resetbox.push(`;${param}`);
    resetbox.push(defaultValue);
  });

  generateBox('resetmessage', 'message', resetbox, {x:480, y:410});
  generateLink('resetbang', 0, 'resetmessage', 0);
  // send garbage to max
  await arrayToMaxDict(garbage_name, garbage)
}


async function clear() {
  // console.log('clear');
  // retrieve garbage
  garbage = await maxDictToArray(garbage_name);
  garbage.forEach(e => {
    deleteBox(e);
  });
  garbage = [];
  // send garbage
  await arrayToMaxDict(garbage_name, garbage);
}


// Handlers
function generateBox(varName, boxName, args, position, presentation, presentationPosition = {x:0, y:0}, comment) {
  const textArgs = `${boxName} ${args.join(' ')}`;
  Max.outlet("script", "newobject", "newobj", "@text", textArgs, "@varname", varName, "@patching_position", position.x, position.y, "@presentation_position", presentationPosition.x, presentationPosition.y, "@presentation", presentation, "@comment", comment);
  garbage.push(varName);
}

function deleteBox(varName) {
  Max.outlet("script", "delete", varName);
}

function generateLink(varNameOut, out_num, varNameIn, in_num) {
  Max.outlet("script", "connect", varNameOut, out_num, varNameIn, in_num);
}

Max.outletBang();