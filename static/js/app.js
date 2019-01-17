define([
  'jquery',
  'top250',
  'us',
  'search'
], function($, top250, us, search) {
  var app = {
    init: function(){
      this.$bar = $('footer .bar-btn');
      this.$section = $('main>section');
      this.bind();
      top250.init();
      us.init();
      search.init();
    },
    bind: function(){
      var _this = this;
      this.$bar.on('click', function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        _this.$section.siblings().hide();
        _this.$section.eq(index).fadeIn();
      });
    }
  };

  return app;
});

