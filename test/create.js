import { assert, expect } from 'chai';
import Router from '../src/main';

describe('Create', function() {

  describe('createRoute Error', function() {

    var router = new Router();

    it('should throw an error due to there being no route.', function() {

      expect(function(){
        router.createRoute()
      }).to.throw('Please define the route to use.');

    });

    it('should throw an error due to there being no controller when none is given.', function() {

      expect(function(){
        router.createRoute('/');
      }).to.throw('Please define the function that should be executed.');

    });

    it('should throw an error due to there being no controller when wrong type given.', function() {

      expect(function(){
        router.createRoute('/', {});
      }).to.throw('Please define the function that should be executed.');

    });

  });

  describe('Create Success', function() {

    describe('createRoute()', function() {

      var router = new Router();

    });

    describe('map()', function() {

      var router = new Router();

    });

  });

});