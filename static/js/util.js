define(['jquery'], function($) {
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

  return util;
});

