function fullExtend( dest, objs, deep ) {
  for (var i = 0, ii = objs.length; i < ii; i++) {
    var obj = objs[i];

    if (!isObject(obj)) return;

    var objKeys = Object.keys(obj);

    for (var j = 0, jj = objKeys.length; j < jj; j++) {
      var key = objKeys[j];
      var val = obj[key];

      if (isObject(val) && deep) {
        if (!isObject(dest[key])) dest[key] = Array.isArray(val) ? [] : {};
        fullExtend(dest[key], [val], true);
      } else {
        dest[key] = val;
      }
    }
  }

  return dest;
};

function merge( dest, val ) {
  return fullExtend(dest, [val], false);
}

function copy( dest, val ) {
  return fullExtend(dest, [val], true);
}

function isObject( val ) {
  return val !== null && typeof val === 'object';
}

export { fullExtend, merge, copy, isObject }