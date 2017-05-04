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

  $(function() {
    var trigger = $('.trigger');
    var submenu = $('.submenu');

    trigger.click(function(event) {
      event.preventDefault();
    });



    function showSubMenu() {
      submenu.removeClass('hide');
      submenu.addClass('show');
    }

    function hideSubMenu() {
      submenu.removeClass('show');
      submenu.addClass('hide');
    }

    trigger.hover(
      function() {
        showSubMenu();
      }, function() {
        hideSubMenu();
      }
    );

    // $('.submenu-item a').on("click", function(){
    //   setTimeout(hideSubMenu, 300);
    // });
   });

})();