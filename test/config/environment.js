import { hasConsole, hasCollapsedConsole, hasHistory, hasEventListener } from '../../src/config/environment';


describe('Environment variables', () =>  {

  it('should have a console', () =>  {

    assert(hasConsole === true, 'It does not have a console.');

  });

  it('should have a hasCollapsedConsole', () =>  {

    assert(hasCollapsedConsole === true, 'It does not have a collapsed console option.');

  });

  it('should have the history API', () => {

    assert(hasHistory === true, 'It does not have the history API.');

  });

  it('should have the eventListeners', () => {

    assert(hasEventListener === true, 'It does not have event listeners.');

  });

});