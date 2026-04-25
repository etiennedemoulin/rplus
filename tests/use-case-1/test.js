const d = new Dict('rplus.poly');
let _offset = 0;
let id = 0;
let _instance;
let ready = false;

function instance() {
    const a = arrayfromargs(messagename, arguments);
    a.shift();
    _instance = Number.parseInt(a);
    if (ready) {
        exec();
    }
}

function patcherargs()
{
    const a = arrayfromargs(messagename, arguments);
    a.shift();
    if (a.length === 1) {
        id = a[0];
    } else if (a.length === 0) {
        throw new Error(`> r+.thispoly : patcher id is mandatory`)
    } else if (a.length > 1) {
        throw new Error(`> r+.thispoly : too many arguments`)
    }
}

function offset()
{
    const a = arrayfromargs(messagename, arguments);
    a.shift();
    _offset = Number.parseInt(a);
}

function done()
{
    ready = true;
    exec();
}

function exec() {
    const key = _instance + _offset;
    if (d.get(id)) {
        d.set(id, key);
    } else {
        d.append(id, key);
    }
}