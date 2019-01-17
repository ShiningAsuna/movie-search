define(['jquery', 'util'], function($, util){
  var search = {
    init: function(){
      this.$target = $('main>section').eq(2);
      this.bind();
    },
    bind: function(){
      var _this = this;
      _this.$target.find('a.submit').on('click', function(e){
        e.preventDefault();
        _this.keyword = _this.$target.find('input[name="keyword"]').val();
        _this.start();
      })
    },
    getData: function(callback){
      var _this = this;
      _this.$target.find('.loading').show();
      $.ajax({
        url: 'https://api.douban.com/v2/movie/search',
        type: 'GET',
        dataType: 'jsonp',
        data: {
          q: _this.keyword
        }
      }).done(function(result){
        console.log(result);
        if(callback){                  // callback&&callback(result);
          callback(result);
        } 
      }).fail(function(result){
        console.log('error');
        //do something
      }).always(function(){
        _this.$target.find('.loading').hide();
      });
    },
    start: function(){
      this.getData(this.render);
    },
    render: function(data){
      var _this = search;
      _this.$target.find('.search-result').empty();
      data.subjects.forEach(function(node){
        util.buildNodes(node, _this.$target.find('.search-result'));
      });
    }
  };
  
  return search;
})