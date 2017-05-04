(function() {

  $('header a').smoothScroll({offset: -100});
  $('a.arrow').smoothScroll({offset: -100});

  $(function() {
    var header = $('header');
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      var siteHeader = $('.site-header').height();
      var offset = $('.logo-trigger').offset().top;
      var trigger = (offset - siteHeader);
      var arrow = $('a.arrow');

      if (scroll >= trigger) { // check the offset top
        header.addClass('scrolled');
        arrow.css('visibility', 'hidden')
      } else { // check the scrollHeight
        header.removeClass('scrolled');
        arrow.css('visibility', 'visible')
      }
    });
  });

})();