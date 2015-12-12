import { formatRoute, getParent  } from '../../src/utils/format';
import { assert, expect } from 'chai';


describe('format', function() {

  describe('formatRoute()', function() {

    var testUrls = [{
      test: '/index',
      expected: '/index'
    }, {
      test: '#/index',
      expected: '/index'
    }, {
      test: '#!/index',
      expected: '/index'
    }];

    testUrls.forEach(function(test) {

      it('should correctly format the route ' + test.test + ' as ' + test.expected, function() {

        assert(formatRoute(test.test) === test.expected, test.test + ' does not equal ' + test.expected);

      });

    });

  });

});