(function() {

  enquire.register("screen and (min-width:768px)", {
    match : function() {
      $(function() {
        var header = $('header');
        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          var siteHeader = $('.site-header').height();
          var offset = $('.logo-trigger').offset().top;
          var trigger = (offset - siteHeader);
          // var arrow = $('a.arrow');

          if (scroll >= trigger) { // check the offset top
            header.addClass('scrolled');
            // arrow.css('visibility', 'hidden')
          } else { // check the scrollHeight
            header.removeClass('scrolled');
            // arrow.css('visibility', 'visible')
          }
        });
      });
    },
    unmatch : function() {
      $(window).unbind('scroll');
    }
  });

  var headerHeight = $('header').height();
  $('header a').smoothScroll({offset: 0});
  $('header a.video').smoothScroll({offset: -headerHeight});
  $('a.arrow').smoothScroll({offset: 0});
  $('a.awards').smoothScroll({offset: 0});
  $('a.arrow-up').smoothScroll({offset: -headerHeight});

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

    $('.submenu-item a').on("click", function(){
      setTimeout(hideSubMenu, 200);
    });
   });

    var HeaderVideo = function(settings) {
          if (settings.element.length === 0) {
              return;
          }
          this.init(settings);
      };

      HeaderVideo.prototype.init = function(settings) {
          this.$element = $(settings.element);
          this.settings = settings;
          this.videoDetails = this.getVideoDetails();

          $(this.settings.closeTrigger).hide();
          this.setFluidContainer();
          this.bindUIActions();

          if(this.videoDetails.teaser && Modernizr.video && !Modernizr.touch) {
              this.appendTeaserVideo();
          }
      };

      HeaderVideo.prototype.bindUIActions = function() {
          var that = this;
          $(this.settings.playTrigger).on('click', function(e) {
              e.preventDefault();
              that.appendIframe();
          });
          $(this.settings.closeTrigger).on('click', function(e){
              e.preventDefault();
              that.removeIframe();
          });
      };

      HeaderVideo.prototype.appendIframe = function() {
          // var html = '<iframe id="header-video__video-element" src="'+this.videoDetails.videoURL+'?rel=0&amp;hd=1&autohide=1&showinfo=0&autoplay=1&enablejsapi=1&origin=*" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
          if (this.videoDetails.videoStart)
            var html = '<iframe id="header-video__video-element" src="'+this.videoDetails.videoURL+'?rel=0&amp;hd=1&autohide=1&showinfo=0&autoplay=1&enablejsapi=1&origin=*&start='+this.videoDetails.videoStart+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
          else
            var html = '<iframe id="header-video__video-element" src="'+this.videoDetails.videoURL+'?rel=0&amp;hd=1&autohide=1&showinfo=0&autoplay=1&enablejsapi=1&origin=*" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
          $(this.settings.playTrigger).fadeOut();
          $(this.settings.closeTrigger).fadeIn();
          this.$element.append(html);
      };

      HeaderVideo.prototype.removeIframe = function() {
          $(this.settings.playTrigger).fadeIn();
          $(this.settings.closeTrigger).fadeOut();
          this.$element.find('#header-video__video-element').remove();
      };

      HeaderVideo.prototype.appendTeaserVideo = function() {
          var source = this.videoDetails.teaser;
          var html = '<video autoplay="true" loop="true" muted id="header-video__teaser-video" class="header-video__teaser-video"><source src="'+source+'.webm" type="video/mp4"><source src="'+source+'.mp4" type="video/mp4"></video>';
          this.$element.append(html);
      };

      HeaderVideo.prototype.setFluidContainer = function() {
          var element = this.$element;
          element.data('aspectRatio', this.videoDetails.videoHeight / this.videoDetails.videoWidth);

          $(window).resize(function() {
              var windowWidth = $(window).width();
              var windowHeight = $(window).height();

              element.width(Math.ceil(windowWidth));
              element.height(Math.ceil(windowWidth * element.data('aspectRatio'))); //Set the videos aspect ratio, see https://css-tricks.com/fluid-width-youtube-videos/

              if(windowHeight < element.height()) {
                  element.width(Math.ceil(windowWidth));
                  element.height(Math.ceil(windowHeight));
              }
          }).trigger('resize');
      };

      HeaderVideo.prototype.getVideoDetails = function() {
          var mediaElement = $(this.settings.media);

          return {
              videoURL: mediaElement.attr('data-video-URL'),
              videoStart: mediaElement.attr('data-video-start'),
              teaser: mediaElement.attr('data-teaser'),
              videoHeight: mediaElement.attr('data-video-height'),
              videoWidth: mediaElement.attr('data-video-width')
          };
      };

      $('.header-video').each(function(i, elem) {
          headerVideo = new HeaderVideo({
            element: elem,
            media: '.header-video__media',
            playTrigger: '.header-video__play-trigger',
            closeTrigger: '.header-video__close-trigger'
          });
      });

      var $webContact = $('#contactform');
      $webContact.submit(function(e) {
        e.preventDefault();
        $.ajax({
         url: 'https://formspree.io/info@myndaramericas.com',
         method: 'POST',
         data: $(this).serialize(),
         dataType: 'json',
         beforeSend: function() {
           $webContact.append('<div class="alert alert--loading">Sending...</div>');
         },
         success: function(data) {
           $webContact.find('.alert--loading').hide();
           $webContact.find('button[type=submit]').prop('disabled', true);
           $webContact.append('<div class="alert alert--success">Thank you, we\'ll get back to you right away.</div>');
         },
         error: function(err) {
           $webContact.find('.alert--loading').hide();
           $webContact.append('<div class="alert alert--error">Oops, there was an error. Try again?</div>');
         }
       });
      });


})();