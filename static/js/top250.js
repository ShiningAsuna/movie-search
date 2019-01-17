define(['jquery', 'util'], function($, util){
  var top250 = {
    init: function(){
      this.isLoading = false;
      this.sumNum = 0;
      this.$target = $('main>section').eq(0);
      this.bind();
      this.start();
    },
    bind: function(){
      var _this = this;
      var clock;
      this.$target.on('scroll', function(){
        $this = $(this);
        if(clock){
          clearTimeout(clock);
        }
        if(_this.sumNum >=250){
          return;
        }
        clock = setTimeout(function(){
          if(util.isToBottom($this)){
            _this.start();
          }
        },500);
      });
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
        url: 'https://api.douban.com/v2/movie/top250',
        type: 'GET',
        dataType: 'jsonp',
        data: {
          start: _this.sumNum,
          count: 20
        }
      }).done(function(result){
        if(callback){             //   equal to callback&&callback(result);
          callback(result);
        } 
        _this.sumNum += 20;
      }).fail(function(result){
        console.log('error');
        //do something
      }).always(function(){
        _this.isLoading = false;
        _this.$target.find('.loading').hide();
      });
    },
    render: function(data){
      var _this = top250;
      data.subjects.forEach(function(node){
        util.buildNodes(node, _this.$target.find('.wrapper'));
      });
    },
  };
  
  return top250;
})