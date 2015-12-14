import { assert, expect } from 'chai';
import Router from '../../src/main';
import mapData from '../data/create/mapData';

describe('Create', function() {

  describe('createRoute Error', function() {

    var router = new Router({debug: false});

    it('should throw an error due to there being no routeObject.', function() {

      expect(function(){
        router.createRoute()
      }).to.throw('No route object defined.');

    });

    it('should throw an error due to there being no path.', function() {

      expect(function(){
        router.createRoute({})
      }).to.throw('Please define the route to use.');

    });

    it('should throw an error due to there being no controller when none is given.', function() {

      expect(function(){
        router.createRoute({
          path: '/'
        });
      }).to.throw('Please define the function that should be executed.');

    });

    it('should throw an error due to there being no controller when wrong type given.', function() {

      expect(function(){
        router.createRoute({
          path: '/',
          controller: {}
        });
      }).to.throw('Please define the function that should be executed.');

    });

  });

  describe('Create Success', function() {


    describe('createRoute()', function() {

      var router = new Router({ debug: false });

      it('should successfully create the "/" route.', function() {

        router.createRoute({
          path: '/',
          controller: function() { }
        });

        assert(!!router.getRoutes()['/'], 'Index route not inserted.');

      });

      it('should insert home as a child to "/".', function() {

        router.createRoute({
          path: '[/]home',
          controller: function() { }
        });

        assert(!!router.getRoutes()['/'].childRoutes['home'], 'Home route is not present.');

      });

    });

    describe('map()', function() {

      var router = new Router({debug: false});


      it('should successfully insert the mapData', function() {

        router.map(mapData);

        var routes = router.getRoutes(),
          indexRoute = routes['/'],
          homeRoute = indexRoute.childRoutes['home'],
          idRoute = homeRoute.childRoutes[':id'],
          anyRoute = idRoute.childRoutes['*any'];

        assert((indexRoute && homeRoute && idRoute && anyRoute), 'These routes have not been inserted.');

      });


    });

  });

});