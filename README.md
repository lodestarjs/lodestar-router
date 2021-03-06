lodestar-router
==
_A standalone router, which will also used within the lodestar MVC._

**This router is currently in development and as such may not be ready for full production usage.**

[![Build Status](https://travis-ci.org/lodestarjs/lodestar-router.svg)](https://travis-ci.org/lodestarjs/lodestar-router)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Starting out

After including the router in your project, declare a new instance of it. While creating a new instance, you can optionally pass it some config options to control how your router should behave, [see config](#configuration).

```
var router = new Router();
```

## Configuration

The available options to configure are the following with their defaults:

```
{
  DEBUG: true,
  useHistory: false,
  loggingLevel: 'LOW'
}
```

#### DEBUG - Global

This option will log all of the issues that the lodestar-router encounters. By default this will only log a minimal amount of issues i.e. the important ones. By saying that this option is global we mean that setting the DEBUG option will manually configure all instance of the Router.

#### useHistory

If this is set to true, then if the History API is available then the hash will be removed from the url and use pushState to put the current state into the URL.

If you are not using history, in your HTML, you will have to link to pages by having the hash present in the href.

**Example**
```
<a href="#/blog">To the blog!</a>
```

#### loggingLevel

By default this is set to LOW, so it will only tell you about the issues that we feel you should know. However, if this is set to HIGH then everything in the Router will be logged.


## Creating a route

For creating routes, we have provided an easy way and a more manual, harder way. We feel that the easy way will make it easy for a beginner to use this framework however the manual way will in the end be more efficient and faster at creating routes due to basically just inserting the route object into the framework.

### The easy way - createRoute()

The easy way, accepts an [Object](#An-object) of options.

As the lodestar-router operates by a hierarchy, you may be wondering how this shorthand would map to that hierarchy?

Simple! To declare a parent to a current route you wrap that part of the route in square brackets. For example:

**Example**
```
var router = new Router();

router.createRoute({
  path: '/',
  controller: function() {
    console.log('I am the index route!');
  }
});

router.createRoute({
  path: '[/]dashboard',
  controller: function() {
    console.log('I am a child of that ^ index route!');
  }
});

```

#### An object - createRoute(Object)

Using an object is still easier than the manual way, but it also lets you add extra parameters to the route objects, as long as they don't conflic with the routers properties, which may be useful if you want to add extra functionality to a route.

**Example**
```
var router = new Router();

router.createRoute({
  route: '/',
  controller: function() { }
});
```

#### Dynamic parameters - `* or :`

As a final note to creating routes, it is important to note that you can insert 'dynamic' segments into your route declarations. This means that you can have a dynamic URL that could change e.g. blog post names. This dynamic segment will then be passed to the router for you to access.

The dynamic options that  you have available are a normal dynamic segment of `:` and a wildcard option of `*`.

##### Dynamic segment - `:`

Using `:`, the dynamic segment, allows one segment of the url to be switched out for anything else, this could be useful in a blog where you want to have the same controller for each post name. Instead of having to manually write a controller for each post, you can just use this option instaed.

**Example**
```
var router = new Router();

router.createRoute({
  path: '/blog/:postName',
  controller: function() {
    console.log(this.routeData.postName);
  }
});
```

##### Wildcard - `*`

Using `*`, the wildcard , allows anything past the point to be in the url, which may be useful if the user has headed to a page that you don't expect but want it to behave in a certain way.

This might be different to a 404 page as it might be useful if you have a CMS where a client can create new routes. That way you could have a client controlled area of your website without having to write them a route everytime.

**Example**
```
var router = new Router();

router.createRoute({
  path: '/client-area/*clientStuff',
  controller: function() {
    console.log(this.clientStuff); // This will be an array
  }
});
```


### The manual way

Now, when I say manual, I mean manual. This is basically a way of inserting the final route object, as the lodestar-router builds it, into the Router.

The benefits of creating the router this way is that it should give a big performance boost as unlike the `createRoute()` way, the Router won't do any extra check on what you're inserting as it expects it to be right.

So I advise that you only do it this way if you know what you're doing.

```
router.map({
  '/' : {

     controller: function() { console.log('index'); },
     childRoutes: {

        'home': {

           controller: function() { console.log('home'); },

           childRoutes: {

              ':id': { controller: function() { console.log(':id'); }}

           }

        }

     }

  }
});
```

### Route not found

After you have declared your route, you may also want to have a function that executes when you stumble across a page that is not found, like a 404.

To create a 404 function, all you need to do is use the notFound() function provided by the router.

**Example**
```
var router = new Router();

router.notFound(function(){
  console.log('Uh-oh looks like this route doesn\'t exist :/');
});
```

## Contributing

If you want to contribute to the project we have a few requests for you to follow.

- Use JSDoc to document any functions created
- Use Commitizen for commits
- Write tests for anything that you implement
- Make sure that ESLint passes by using `npm run lint`

## Build Project

For this project we are using Gobble as the build tool.

To build the dist of the project you can run `npm run build` which runs the `gobble build dist` task.

To develop with the Router you can run `npm run start` which runs the `gobble` task.

## Tests

For this project we are using Mocha and Chai to write the tests. These tests are then being ran with karma and PhantomJS so that the tests can work with the ES6 code and in the browser.
