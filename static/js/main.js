requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: './static/js',
  //except, if the module ID starts with "app",
  //load it from the js/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since
  //the paths config could be for a directory.
  paths: {
      jquery: 'jquery-1.11.1.min'
  }
});

require(['app'], function(app){
  app.init();
})