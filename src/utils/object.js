/*
 * The full function for extending an array of objects into a new object,
 * can be optionally deep which will recursively go through properties.
 *
 * @param {Object} dest, the new object to write to
 * @param {Array} objs, the array of objects to extend
 * @param {Boolean} deep, decides if copy should be recursive
 * @return {Object} the new written object
*/
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

/**
 * Low extend of the object i.e. not recursive copy
 *
 * @param  {Object} dest, the object that will have properties copied to it
 * @param  {Object} val, the second object with the properties to copy
 * @return {Object} the new object with properties copied to it
 */
function merge( dest, val ) {
  return fullExtend(dest, [val], false);
}

/**
 * Deep extend the object i.e. recursive copy
 *
 * @param  {Object} dest, the object that will have properties copied to it
 * @param  {Object} val, the second object with the properties to copy
 * @return {Object} the new object with properties copied to it
 */
function copy( dest, val ) {
  return fullExtend(dest, [val], true);
}

/**
 * @param  {Object} val, the parameter to check if it is a object
 * @return {Boolean} whether or not the parameter is an object
 */
function isObject( val ) {
  return val !== null && typeof val === 'object';
}

export { fullExtend, merge, copy, isObject };