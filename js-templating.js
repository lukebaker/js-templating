window.Templating = {};
Templating.start = function(routes) {

  function compileTemplates() {
    $('script[type="text/html"]').each(function(a, b) {
      var script = $(this),
      text   = $.trim(script.html());

      dust.compileFn(text, script.attr('id'));
    });
  }

  $(function() {
    var App = Backbone.Router.extend({
  
      initialize: function(options) {
        var that = this;
        _.each(options.routeViews, function(view, route) {
          var data = {};
          // if view is specified as object, key is view name
          // and value is data we'll send to the template
          if (_.isObject(view)) {
            key  = _.first(_.keys(view));
            _.extend(data, view[key]);
            view = key;
          }
  
          that.route(route, view, function() {
            _.extend(data, {
              params : {
                route: route,
                view: view,
                args: _.values(arguments)
              }
            });
  
            dust.render(view, data, function(err, output) {
              if (err) {
                alert(err);
              }
              else {
                $('body').html(output);
              }
            });
          });
        });
      }
  
    });

    compileTemplates();
    var app = new App({routeViews: routes});
  
    // disable pushState so relative image urls can work locally
    Backbone.history.start({pushState:false});
  
    $(document).on('click', 'a', function(ev) {
      // if this is a link with protocol, don't do anything
      if (!$(ev.currentTarget).attr('href').match(/^[^:]+:\/\//)) {
        ev.preventDefault();
        app.navigate($(ev.currentTarget).attr('href'), {trigger: true});
      }
    });
  
  });
};
