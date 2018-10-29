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

var util = {
  isToBottom: function($scroller){
    return $scroller.scrollTop() + $scroller.height() >= $scroller[0].scrollHeight - 5;
  },
  buildNodes: function(node, $container){
    var template = `<div class="single-movie clearfix">
    <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2315672647.jpg" alt="" class="movie-pic">  
    <div class="movie-info">
    <h3 class="movie-name">教父</h3>
    <div><span class="score">9.2分</span> / <span class="collect">46223</span>收藏</div>
    <div><span class="year">1972</span> / <span class="tags">剧情 / 犯罪</span></div>
    <div>导演：<span class="directors">弗朗西斯·福特·科波拉</span></div>
    <div>主演：<span class="casts">马龙·白兰、阿尔·帕西诺</span></div>
    </div>
    </div>`;
    var $node = $(template);
    $node.find('.movie-pic').attr('src', node.images.medium);
    $node.find('.movie-name').text(node.title);
    $node.find('.score').text(node.rating.average + '分');
    $node.find('.collect').text(node.collect_count);
    $node.find('.year').text(node.year);
    $node.find('.tags').text(node.genres.join(' / '));
    $node.find('.directors').text(function () {
      var directors = [];
      node.directors.forEach(function (director) {
        directors.push(director.name);
      });
      return directors.join('、');
    });
    $node.find('.casts').text(function () {
      var casts = [];
      node.casts.forEach(function (cast) {
        casts.push(cast.name);
      });
      return casts.join('、');
    });
    $container.append($node);
  }
};

app.init();


// 是否没有数据了
