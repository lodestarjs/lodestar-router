lodestar-router
==
A standalone router, which will also used within the lodestar MVC.

**This router is currently in heavy development and as such may not be ready for full production usage.**


## Starting out

After including the router in your project, declare a new instance of it. While creating a new instance, you can optionally pass it some config options to control how your router should behave, [see config](#configuration).

```
var router = new Router();
```

## Configuration

## Creating a route

For creating routes, we have provided an easy way and a more manual, harder way. We feel that the easy way will make it easy for a beginner to use this framework however the manual way will in the end be more efficient and faster at creating routes due to basically just inserting the route object into the framework.

### The easy way - createRoute()

The easy way, accepts either an [Object](#An-object) of options or two seperate parameters.

As the lodestar-router operates by a hierarchy, you may be wondering how this shorthand would map to that hierarchy?

Simple! To declare a parent to a current route you wrap that part of the route in square brackets. For example:

**Example**
```
var router = new Router();

router.createRoute('/', function() {
  console.log('I am the index route!');
});

router.createRoute('[/]dashboard', function() {
    console.log('I am a child of that ^ index route!');
});
```

#### Two parameters - createRoute(String, Function)

Using two paremeters is a nice short way of creating a route by far the easiest way to create a route. The downside is that you can't configure the routes that much, but sometime that's not necessarily a bad thing!

The two parameters that you pass this function are the route and the function you wish to execute on that route.

**Example**
```

var router = new Router();

router.createRoute('/', function() {

    console.log("I am on the home route!');

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

router.createRoute('/blog/:postName', function() {
    console.log(this.routeData.postName);
});
```

##### Wildcard - `*`

Using `*`, the wildcard , allows anything past the point to be in the url, which may be useful if the user has headed to a page that you don't expect but want it to behave in a certain way.

This might be different to a 404 page as it might be useful if you have a CMS where a client can create new routes. That way you could have a client controlled area of your website without having to write them a route everytime.

**Example**
```
var router = new Router();

router.createRoute('/client-area/*clientStuff', function() {
    console.log(this.clientStuff); // This will be an array
});
```


### The manual way