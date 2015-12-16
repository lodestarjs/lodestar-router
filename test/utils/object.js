import { merge, copy, fullExtend, isObject} from '../../src/utils/object';



describe('isObject', () => {

  it('should find the type object for {}.', () => {

    assert.isTrue(isObject({}), 'The variable is not of type Object.');

  });

  it('should find the type object for [].', () => {

    assert.isTrue(isObject([]), 'The variable is not of type Object.');

  });

});

describe('Extend', () => {

  let deepObject;

  beforeEach( () => {

    deepObject =  { one: 1, two: 2, child: { three: 3, four: 4, children: [5, 6, 7, 8] } };

  });

  describe('Without extend', () => {

    it('should be the same value', () => {

      let copiedObject = deepObject;

      copiedObject.one = 5;

      assert.deepEqual(copiedObject, deepObject, 'They are not the same.');

    });

  });

  describe('lowCopy', () => {

    it('should have different top values.', () => {

      let lowCopy = merge({}, deepObject);

      lowCopy.one = 5;

      assert.notDeepEqual(lowCopy, deepObject, 'The two objects are deep equal.');

    });

    it('should have the same lower values.', () => {

      let lowCopy = merge({}, deepObject);

      lowCopy.child.four = 5;

      assert.deepEqual(lowCopy, deepObject, 'The two objects are not deep equal.');

    });

  });

  describe('deepCopy', () => {

    it('should have different top values.', () => {

      let deepCopy = copy({}, deepObject);

      deepCopy.one = 5;

      assert.notDeepEqual(deepCopy, deepObject, 'The two objects are deep equal.');

    });

    it('should have the different lower values.', () => {

      let deepCopy = copy({}, deepObject);

      deepCopy.child.four = 5;

      assert.notDeepEqual(deepCopy, deepObject, 'The two objects are deep equal.');

    });

  });

});