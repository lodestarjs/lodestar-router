import { formatRoute, getParent  } from '../../src/utils/format';

describe('format', () => {

  describe('formatRoute()', () => {

    var testUrls = [{
      test: '',
      expected: '/'
    }, {
      test: '/index',
      expected: '/index'
    }, {
      test: '#/index',
      expected: '/index'
    }, {
      test: '#!/index',
      expected: '/index'
    }];

    testUrls.forEach( (test) => {

      it('should correctly format the route ' + test.test + ' as ' + test.expected, () => {

        assert(formatRoute.call({ config: { basePath: ''} }, test.test) === test.expected, test.test + ' does not equal ' + test.expected);

      });

    });

  });

});