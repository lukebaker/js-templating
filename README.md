## Easy site prototyping with JavaScript

This is a collection of several JS libraries with a small bit of glue to allow simple site prototyping using JS. It allows you to split up the HTML into various pieces (header, footer, etc.) and compose pages with those pieces. There's also a router that allows you to specify a template to use when the URL matches the route. The templates support mustache.

## Requirements

* jQuery
* ICanHaz
* underscore.js
* backbone.js


```html
 <script src="libs/jquery-1.7.2.min.js"></script>
 <script src="libs/ICanHaz.min.js" ></script>
 <script src="libs/underscore-min.js" ></script>
 <script src="libs/backbone-min.js" ></script>
```

## Usage

```html
 <script src="js-templating.js"></script>
 <script>
  var routes = {
   "": "home",
   "hello/world": "hello"
  }
  Templating.start(routes);   
 </script>

 <script id="home" type="text/html">
  <h3>Blammo!</h3>
  <a href="hello/world">Hello</a>
 </script>

 <script id="hello" type="text/html">
  <h3>Hello, World!</h3>
  <a href="/">Back</a>
 </script>
```

This effectively creates two pages: a default home page and a hello world page with links between the two.

### Routes

The routes object maps a URL pattern to a template that should be rendered.  The templates are identified by their id attribute. The URL pattern can be a pattern supported by [Router object of Backbone.js.](http://documentcloud.github.com/backbone/#Router-routes)

If the underlying mustache templates need data passed to them, the routes object can include that data. Instead of simply passing the string of template's id, pass an object with the key being the string of the template's id and the value being the data that the mustache template requires. For example:

```js
 var routes = {
  "hello/world" : {
   "hello" : {
    "text" : "Hello, World!"
   }
  }
 };
```

### Partials

To break up the HTML into logical chunks, simply use the partial functionality available in mustache.  For example:

```html
 <script id="home" type="text/html">
  {{>header}
  <h3>Blammo!</h3>
 </script>
 
 <script id="header" type="text/html">
  <h1>Header</h1>
 </script>
```