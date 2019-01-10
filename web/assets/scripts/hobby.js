(function ($) {
  var $sliders = $('.slider');

  $sliders.each(function () {
    var $slider = $(this);
    initSlider($slider);
  });

  function initSlider($slider) {
    var $slides = $slider.find('.slide');
    var $thumbnails = $slider.find('.thumbnail');
    var interval = $slider.data('interval');
    var $navLeft = $('<a href="#">Left</a>').data('direction', 'left').addClass('nav-arrow nav-left');
    var $navRight = $('<a href="#">Right</a>').data('direction', 'right').addClass('nav-arrow nav-right');
    var $dots = $slider.find('.dot');

    $slider.append($navLeft, $navRight);

    console.log($navLeft, $navRight);

    $slides.eq(0).addClass('active');
    $thumbnails.eq(0).addClass('active');
    $dots.eq(0).addClass('active');

    var sliderInterval = setInterval(function () {
      var $activeSlide = $slides.filter('.active');
      var $nextSlide = $activeSlide.next();

      if ($nextSlide.length === 0) {
        $nextSlide = $slides.eq(0);
      }

      switchSlide($slider, $nextSlide.data('slide'));
    }, interval * 1000);

    $thumbnails.on('click', function (event) {
      event.preventDefault();

      switchSlide($slider, $(this).data('slide'));
    });

    $navLeft.on('click', function (event) {
      event.preventDefault();

      prevSlide($slider);
    });

    $navRight.on('click', function (event) {
      event.preventDefault();

      nextSlide($slider);
    });

    $dots.on('click', function (event) {
      event.preventDefault();

      switchSlide($slider, $(this).data('slide'));
    });

    console.log('Slider initiated', $slider);
  }

  function nextSlide($slider) {
    var $slides = $slider.find('.slide');
    var $targetSlide = $slider.find('.active').next();

    if ($targetSlide.length === 0) {
      $targetSlide = $slides.eq(0);
    }

    switchSlide($slider, $targetSlide.data('slide'));
  }
  
  function prevSlide($slider) {
    var $slides = $slider.find('.slide');
    var $targetSlide = $slider.find('.active').prev();

    if ($targetSlide.length === 0) {
      $targetSlide = $slides.last();
    }

    switchSlide($slider, $targetSlide.data('slide'));
  }

  function switchSlide($slider, slide) {
    var $targetSlide = $slider.find('.slide[data-slide=' + slide + ']');
    var $targetThumbnail = $slider.find('.thumbnail[data-slide=' + slide + ']');
    var $targetDot = $slider.find('.dot[data-slide=' + slide + ']');

    $slider.find('.slide').removeClass('active');
    $targetSlide.addClass('active');

    $slider.find('.thumbnail').removeClass('active');
    $targetThumbnail.addClass('active');

    $slider.find('.dot').removeClass('active');
    $targetDot.addClass('active');
  }

})(window.jQuery);
