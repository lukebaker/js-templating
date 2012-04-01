window.Templating = {};
Templating.start = function(routes) {
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
  
            $('body').html(ich[view](data));
          });
        });
      }
  
    });

    var app = new App({routeViews: routes});
  
    // disable pushState so relative image urls can work locally
    Backbone.history.start({pushState:false});
  
    $(document).on('click', 'a', function(ev) {
      // if this is a link with protocol, don't do anything
      if (!$(ev.target).attr('href').match(/^[^:]+:\/\//)) {
        ev.preventDefault();
        app.navigate($(ev.target).attr('href'), {trigger: true});
      }
    });
  
  });
};
