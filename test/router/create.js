import Router from '../../src/main';
import mapData from '../data/create/mapData';

describe('Create Error', () => {

  let router;

  beforeEach(() => {
    router = new Router({ DEBUG: false });
  });

  it('should be defined', () => {

    let router = new Router({ DEBUG: false });

    expect(() => {
      router.createRoute()
    }).to.throw('No route object defined.');

  });

  it('should throw an error due to there being no path.', () =>  {

    expect(() => {
      router.createRoute({})
    }).to.throw('Please define the route to use.');

  });

  it('should throw an error due to there being no controller when none is given.', () =>  {

    expect(() => {
      router.createRoute({
        path: '/'
      });
    }).to.throw('Please define the function that should be executed.');

  });

  it('should throw an error due to there being no controller when wrong type given.', () =>  {

    expect(() => {
      router.createRoute({
        path: '/',
        controller: {}
      });
    }).to.throw('Please define the function that should be executed.');

  });

});

describe('Create Success', () => {

  let router;

  beforeEach(() => {
    router = new Router({ DEBUG: false });
  });

  it('should successfully create the "/" route.', () =>  {

    router.createRoute({
      path: '/',
      controller: () =>  { }
    });

    assert(!!router.getRoutes()['/'], 'Index route not inserted.');

  });

  it('should insert home as a child to "/".', () =>  {

    router.createRoute({
      path: '/',
      controller: () =>  { }
    });

    router.createRoute({
      path: '[/]home',
      controller: () =>  { }
    });


    assert(!!router.getRoutes()['/'].childRoutes['home'], 'Home route is not present.');

  });

});

describe('map()', () =>  {

  let router = new Router({ DEBUG: false });

  it('should successfully insert the mapData', () =>  {

    router.map(mapData);

    let routes = router.getRoutes(),
      indexRoute = routes['/'],
      homeRoute = indexRoute.childRoutes['home'],
      idRoute = homeRoute.childRoutes[':id'],
      anyRoute = idRoute.childRoutes['*any'];

    assert((indexRoute && homeRoute && idRoute && anyRoute), 'These routes have not been inserted.');

  });

});