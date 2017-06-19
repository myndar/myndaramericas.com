(function() {

  var windowWidth = $(window).width();

  enquire.register("screen and (max-width:734px)", {
    match : function() {
      $(function() {
        $('.grid-column.image').each(function(index,element){
          var textHeight = $(this).find('.info-wrapper').outerHeight();
          // console.log('textHeight = ' + textHeight);
          $(this).css('height', textHeight)
        });
      });
    }
  }).register("screen and (min-width:768px)", {
    match : function() {
      $(function() {
        $(window).scroll(function() {
          var header = $('header');
          var headerHeight = header.height();
          var scroll = $(window).scrollTop();
          var offset = $('.logo-trigger').offset().top;
          var trigger = (offset - headerHeight);
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
  }).register("screen and (min-width:768px)", {

  });

  // document ready
  $(function() {
    setVideoMargin();
    setScrollOffset();
    // dropdown menu position
    var setDropDownPosition = function() {
      var headerHeight = $('header').outerHeight();
      var subMenu = $('.submenu');
      subMenu.css('top', headerHeight)
    };
    setDropDownPosition();
    // dropdown
    var trigger = $('.trigger');
    var submenu = $('.submenu');
    trigger.click(function(event) {
      event.stopPropagation(); // do not bubble, just toggle
      submenu.toggle();
    });
    $(document).click(function(){
      submenu.hide(); // any click that bubbles all the way up hides the dropdown
    });

    // window resize
    window.onresize = function(){
      // actual resize? http://tinyurl.com/qaoajzu
      if ($(window).width() != windowWidth) {
        setTimeout(setVideoMargin, 400);
        setTimeout(setScrollOffset, 400);
        // dropdown menu position
        var headerHeight = $('header').height();
        var subMenu = $('.submenu');
        subMenu.css('top', headerHeight)
      }
    }
    $(window).on("orientationchange",function(){
      setTimeout(setVideoMargin, 400);
      setTimeout(setScrollOffset, 400);
      // dropdown menu position
      var setDropDownPosition = function() {
        var headerHeight = $('header').height();
        var subMenu = $('.submenu');
        subMenu.css('top', headerHeight)
      };
      setTimeout(setDropDownPosition, 400);
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

      var setVideoMargin = function() {
        // set video top margin
        var header = $('header');
        var headerHeight = header.height();
        var video = $('.header-video');
        video.css('margin-top', headerHeight);
        // console.log(headerHeight);
      }

      var setScrollOffset = function() {
        // smoothscroll
        var headerHeight = $('header').height();
        var topPadding = $('#about').css('padding-top');
        // var topPaddingNum = parseInt(topPadding);
        // console.log('topPadding:' + topPadding + ', headerHeight:' + headerHeight);
        $('header a').smoothScroll({offset: -headerHeight});
        $('header a.video').smoothScroll({offset: -headerHeight});
        $('a.arrow').smoothScroll({offset: 0});
        $('a.awards').smoothScroll({offset: 0});
        $('a.arrow-up').smoothScroll({offset: -headerHeight});
      }


})();