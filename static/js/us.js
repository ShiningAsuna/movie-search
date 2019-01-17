define(['jquery', 'util'], function($, util){
  var us = {
    init: function(){
      this.isLoading = false;
      this.$target = $('main>section').eq(1);
      this.start();
    },
    start: function(){
      this.getData(this.render);
    },
    getData: function(callback){
      var _this = this;
      if(_this.isLoading){
        return;
      }
      _this.isLoading = true;
      _this.$target.find('.loading').show();
      $.ajax({
        url: 'https://api.douban.com/v2/movie/us_box',
        type: 'GET',
        dataType: 'jsonp',
      }).done(function(result){
        if(callback){                  // callback&&callback(result);
          callback(result);
        } 
      }).fail(function(result){
        console.log('error');
        //do something
      }).always(function(){
        _this.isLoading = false;
        _this.$target.find('.loading').hide();
      });
    },
    render: function(data){
      var _this = us;
      data.subjects.forEach(function(node){
        node = node.subject;
        util.buildNodes(node, _this.$target.find('.wrapper'));
      });
    }
  };
  
  return us;
})