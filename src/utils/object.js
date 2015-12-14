function fullExtend( dest, objs, deep ) {
  for (let i = 0, ii = objs.length; i < ii; i++) {
    let obj = objs[i];

    if (!isObject(obj)) return;

    let objKeys = Object.keys(obj);

    for (let j = 0, jj = objKeys.length; j < jj; j++) {
      let key = objKeys[j];
      let val = obj[key];

      if (isObject(val) && deep) {
        if (!isObject(dest[key])) dest[key] = Array.isArray(val) ? [] : {};
        fullExtend(dest[key], [val], true);
      } else {
        dest[key] = val;
      }
    }
  }

  return dest;
}

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