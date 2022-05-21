//Mobile sniffing script
// var isMobile = {
//   Android: function() {
//       return navigator.userAgent.match(/Android/i);
//   },
//   BlackBerry: function() {
//       return navigator.userAgent.match(/BlackBerry/i);
//   },
//   iOS: function() {
//       return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//   },
//   Opera: function() {
//       return navigator.userAgent.match(/Opera Mini/i);
//   },
//   Windows: function() {
//       return navigator.userAgent.match(/IEMobile/i);
//   },
//   any: function() {
//       return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//   }
// };

// iOS add custom class to body to allow custom styles
// if( isMobile.iOS() ) {
//   alert('iOS');
//   document.body.classList.add("mobile--ios");
// };

//HOT FIX FOR IE
if (
  !(
    navigator.userLanguage !== "undefined" &&
    navigator.systemLanguage !== "undefined" &&
    navigator.userAgent.match(/trident/i)
  )
) {
  if (navigator.vendor.startsWith("Apple")) {
    document.body.classList.add("mobile--ios");
    // alert('iOS');
  }
}

//Sidebar Method
$(document).ready(function() {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $("#dismiss, .overlay").on("click", function() {
    $("#sidebar").removeClass("active");
    $(".overlay").removeClass("active");
    $("#content").removeClass("noScroll");

    setTimeout(function() {
      var isHovered = $("#navbar").is(":hover");
      var element = document.getElementById("navbar");
      if (!isHovered) {
        element.classList.remove("subnav--open");
      }
    }, 600);
  });
  $("#sidebarCollapse, #sidebarCollapseMobile").on("click", function() {
    $("#sidebar").addClass("active");
    $(".overlay").addClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
    $("#content").addClass("noScroll");
    var element = document.getElementById("navbar");
    element.classList.add("subnav--open");
  });

  //Video Modal
  var $videoSrc;
  var $videoFormat;
  var $videoEnd;
  $(".video-btn").click(function() {
    $videoSrc = $(this).data("src");
    // console.log($videoSrc);
    // Get the video format
    $videoFormat = $(this).data("format");
    $videoEnd = $(this).data("end");
  });

  // when the modal is opened autoplay it
  $("#videoModal").on("shown.bs.modal", function(e) {
    // set the video src to autoplay and not to show related video.
    if ($videoEnd) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;loop=1&amp;modestbranding=1&amp;muted=false;showinfo=0"
      );
    } else {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;muted=false;showinfo=0"
      );
    }

    // Add a 'video is square' hook
    if ($videoFormat) {
      $("#videoModal").addClass("square-video");
      $(".embed-responsive").addClass("embed-responsive-1by1");
    } else {
      $(".embed-responsive").addClass("embed-responsive-16by9");
    }
  });

  
  // stop playing the youtube video when I close the modal
  $("#videoModal").on("hide.bs.modal", function(e) {
    // a poor man's stop video
    $("#video").attr("src", $videoSrc);

    // remove a 'video is square' hook
    $("#videoModal").removeClass("square-video");
    $(".embed-responsive").removeClass("embed-responsive-1by1");
    $(".embed-responsive").removeClass("embed-responsive-16by9");
  });

  // Auto Play Video Modal Based on URL Parameters

  // break down passed params
  $.urlParam = function(name) {
    var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );
    if (results == null) {
      // console.log("Params return null for: ", name);
      return null;
    } else {
      // console.log("Params return = ", name , "-", results[1] || 0);
      return results[1] || 0;
    }
  };

  //set variables
  var param = $.urlParam("video");
  // convert param to lowercase
  if (param !== null) {
    param = param.toLowerCase();
    // console.log("param to lowercase");
    // $.videoRun();    // Need to figure out how to wrap this in a function
  }

  // //set variables
  // var param = $.urlParam('video');
  // // convert param to lowercase
  // if (param !== null){
  //   param = param.toLowerCase();
  //   console.log("param to lowercase");
  // }
  var dataIds = [];
  // console.log("create dataIds");

  // loop through all the videos on the page
  $('.video-btn[data-target="#videoModal"]').each(function() {
    dataIds.push($(this).data("id"));
    // console.log("search for video modals");
  });

  // compare the param to the dataIds to see if there is a match
  var exist = jQuery.inArray(param, dataIds);

  // If there is a video parameter and it matches a dataId on the page run the script
  if (param !== null && exist >= 0) {
    //-1 means no match in array
    // build videoSrc based on Param passed
    var $videoSrc = $('.video-btn[data-id="' + param + '"]').data("src");
    // console.log("create videoSrc");
    // Show modal
    $("#videoModal").modal("show");

    // Can we also have the swiper switch to the slide (on detail view)
    if ($(".swiper-container").hasClass("detail-view__slides")) {
      // variable for the gallery
      slider = galleryTop.slides;
      // console.log("Doing stuff to the slider");
      // Add play-video class
      $(slider)
        .find("[data-id='" + param + "']")
        .parent()
        .addClass("play-video");
      // counter variable (probably a better way to do this)
      slideNumber = -1;
      // cycle through the slides until you get to the slide with the .play-video class
      $(slider).each(function() {
        slideNumber++;
        if ($(this).hasClass("play-video")) {
          return false;
        }
      });

      // have it slide to the slide with the class .play-video
      galleryTop.slideTo(slideNumber);
      // console.log("Sliding slider");
    }

    // Should write a function that handles the above for any slider
    // Causing the slider to slide to the slide that has the video link.
  }
  // END+++++++++++++++ // Auto Play Video Modal Based on URL Parameters

  // Anchor script  --- Not needed for now

  // var paramAnchor = $.urlParam('anchor');
  //   if (paramAnchor !== null){
  //     console.log("working");
  //   }
}); // END document ready function

//Top Navigation add scroll style
$(window).scroll(function() {
  var _scroll = $(this).scrollTop() > 50;
  $("nav").toggleClass("scrolled", _scroll);
  // Add a helper class to the top_banner_second
  $("#top_banner_second").toggleClass("navbar-scrolled", _scroll);
  // Also close any open megamenus
  if (_scroll) {
    $(".navbar__subnav.show")
      .prev("a.navbar__subnav--trigger")
      .click();
  }
});

//Swiper: large-hero slider
var largeHeroSwiper = new Swiper(".large-hero", {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 500,
  breakpoints: {
    //change parameter on mobile from 500 to 768 for landscape phone
    768: { noSwiping: false }
  },
  //if only 1 slide logic
  autoplay: $("#hero_slider .swiper-slide").length > 1 ? true : false,
  loop: $("#hero_slider .swiper-slide").length > 1 ? true : false,


  pagination: {
    el: ".large-hero--pagination",
    clickable: true
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false
  }
  // loop: true,
});
// remove pagination if only 1 slide
if ($("#hero_slider .swiper-slide").length == 1) {
  $(".swiper-pagination .swiper-pagination-bullet").addClass("d-none");
}

//Swiper: review slider
var largeHeroSwiper = new Swiper(".review", {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 500,
  breakpoints: {
    //change parameter on mobile from 500 to 768 for landscape phone
    768: { noSwiping: false }
  },
  //if only 1 slide logic
  autoplay: $("#review_slider .swiper-slide").length > 1 ? true : false,
  loop: $("#review_slider .swiper-slide").length > 1 ? true : false,

  pagination: {
    el: ".review--pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  
  autoplay: {
    delay: 6000,
    disableOnInteraction: false
  }
  // loop: true,
});
// remove pagination if only 1 slide
if ($("#review_slider .swiper-slide").length == 1) {
  $(".swiper-pagination .swiper-pagination-bullet").addClass("d-none");
}

//Swiper: text-slider slider
var largeHeroSwiper = new Swiper(".text-slider", {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 500,
  breakpoints: {
    //change parameter on mobile from 500 to 768 for landscape phone
    768: { noSwiping: false }
  },
  //if only 1 slide logic
  // autoplay: $('#text_slider.swiper-slide').length > 1 ? true : false,
  // loop: $('#text_slider.swiper-slide').length > 1 ? true : false,

  pagination: {
    el: ".text-slider--pagination",
    clickable: true
  }
  // autoplay: {
  //   delay: 6000,
  //   disableOnInteraction: false,
  // },
  // loop: true,
});

//Swiper: featured section slider
var featuredSectionSwiper = new Swiper(".feature-product", {
  spaceBetween: 30,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
    dynamicBullets:
      $("#feature_slider .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $("#feature_slider .swiper-slide").length > 5 ? 3 : 1
  },
  breakpoints: {
    //change parameter on mobile from 500 to 768 for landscape phone
    768: {
      noSwiping: false,
      speed: 500
    }
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false
  },

  //if only 3 slide logic
  autoplay: $(".feature-product .swiper-slide").length > 3 ? true : false,
  loop: $(".feature-product .swiper-slide").length > 1 ? true : false
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".feature-product .swiper-slide").length <= 2) {
  $(".feature-product .feature_slider--pagination").addClass("invisible");
  $(".feature-product .feature_slider--navigation").addClass("invisible");
}

//Featured Section Slider event listener - next/prev slide clicks to themselves
$(document).on("click", ".feature_slider__slide.swiper-slide-prev", function() {
  window.featuredSectionSwiper.slidePrev();
  // console.log('Prev Click');

  // var vid = $(this).children('video');
  // var allVid = $('.feature_slider__slide').children('video');

  // allVid.removeAttr('autoplay');
  // allVid.removeAttr('loop');
  // allVid.removeAttr('playinline');
  // allVid.get(0).pause();

  // vid.attr('autoplay','autoplay');
  // vid.attr('loop','');
  // vid.attr('playinline','');
  // vid.get(0).play();
});
$(document).on("click", ".feature_slider__slide.swiper-slide-next", function() {
  window.featuredSectionSwiper.slideNext();
  // console.log('Next click');

  // var vid = $(this).children('video');
  // var allVid = $('.feature_slider__slide').children('video');

  // allVid.removeAttr('autoplay');
  // allVid.removeAttr('loop');
  // allVid.removeAttr('playinline');
  // allVid.get(0).pause();

  // vid.attr('autoplay','autoplay');
  // vid.attr('loop','');
  // vid.attr('playinline','');
  // vid.get(0).play();
});

//Swiper: best sellers section slider
var bestSellersSwiper = new Swiper(".best_sellers_slider", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 0,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".best_sellers_slider--pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    768: {
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1
    }
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false
  },
  

  //if only 3 slide logic
  autoplay: $("#best_sellers_slider .swiper-slide").length < 4 ? false : true,
  autoplay: $(".best_sellers_slider").hasClass("no-auto") ? false : true,
  loop: $("#best_sellers_slider .swiper-slide").length > 3 ? true : false
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($("#best_sellers_slider .swiper-slide").length <= 3) {
  $("#best_sellers_slider .best_sellers_slider--pagination").addClass(
    "invisible"
  );
  $("#best_sellers_slider .best_sellers_slider--navigation").addClass(
    "invisible"
  );
}

//Add .navbar--open to navbar when mobile is clicked
$(".mobile-drop").on("click", function() {
  var element = document.getElementById("navbar");
  element.classList.toggle("navbar--open");
  //also toggle this if it is not mobile?
});

//Add/Remove .subnav--open to navbar when subnav--trigger is clicked
$(".subnav").on("shown.bs.collapse", function() {
  var element = document.getElementById("navbar");
  element.classList.add("subnav--open");
});
$(".subnav").on("hidden.bs.collapse", function() {
  var element = document.getElementById("navbar");
  element.classList.remove("subnav--open");
  // Need to also add the conditional that if the click element is the cart, DO NOT run this
});

//Megamenu Mobile scroll to top of category
$(".subnav").on("shown.bs.collapse", function() {
  var path = $(this).attr("id");
  var anchor = $("#" + path);
  // This subtracts 50 for the button height, probably a better way
  var position = anchor.position().top + $(".navbar").scrollTop() - 50;
  $(".navbar").animate({ scrollTop: position });
});

//Nav bar active class
$(".navbar__subnav--trigger").click(function() {
  if ($(this).hasClass("navbar__top-tier-item--active")) {
    $(this).removeClass("navbar__top-tier-item--active");
  } else {
    $(".navbar__subnav--trigger").removeClass("navbar__top-tier-item--active");
    $(this).addClass("navbar__top-tier-item--active");
  }
});

//Closes the megamenu if clicked anywhere
$(document).click(function(event) {
  var clickover = $(event.target);
  //.no-drop allows you to click on items in the megamenu and NOT close
  if (!clickover.hasClass("no-drop")) {
    $(".navbar__subnav.show")
      .prev("a.navbar__subnav--trigger")
      .click();
  }
});

//Closes the megamenu if moused out, delay set to ignore the 2px gap between nav/subnav
$("#navbar").mouseleave(function() {
  setTimeout(function() {
    var isHovered = $("#navbar").is(":hover");
    if (!isHovered) {
      $(".navbar__subnav.show")
        .prev("a.navbar__subnav--trigger")
        .click();
    }
  }, 300);
});

//List View swipers
var swiper = new Swiper(".list-view__slider", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 0,
  preloadImages: false,
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 1
  },
  pagination: {
    el: ".list-view__pagination",
    clickable: true,
    renderBullet: function(index, className) {
      var color = this.$el[0].children[0].children[index].dataset.color;
      return (
        '<span class="list-view__bullet ' +
        className +
        " " +
        color +
        '" style="background-color:#' +
        color +
        "; border-color:#" +
        color +
        '"></span>'
      );
    }
  },
  breakpoints: {
    768: {
      noSwiping: false,
      spaceBetween: 15
    }
  }
});

//List View filter active class
$(".filter__buttons a").click(function() {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(".filter__button").removeClass("active");
    $(this).addClass("active");
  }
});


// Original Gallery View and Thumbs
//Detail View Gallery swiper
var galleryThumbs = new Swiper(".detail-view__thumbs", {
  spaceBetween: 0,
  slidesPerView: 6,
  threshold: 20,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  direction: "vertical"
});

var galleryTop = new Swiper(".detail-view__slides", {
  spaceBetween: 2,
  slidesPerView: 1,
  threshold: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  watchOverflow: true,
  pagination: {
    el: ".detail-view--pagination",
    clickable: true
  },
  thumbs: {
    swiper: galleryThumbs
  },

  roundLengths: true,
  on: {
    slideChange: function slideChange() {
      var activeIndex = this.activeIndex + 1;
      var activeSlide = document.querySelector(
        ".detail-view__thumbs .swiper-slide:nth-child(".concat(activeIndex, ")")
      );
      var nextSlide = document.querySelector(
        ".detail-view__thumbs .swiper-slide:nth-child(".concat(
          activeIndex + 1,
          ")"
        )
      );
      var prevSlide = document.querySelector(
        ".detail-view__thumbs .swiper-slide:nth-child(".concat(
          activeIndex - 1,
          ")"
        )
      );

      if (nextSlide && !nextSlide.classList.contains("swiper-slide-visible")) {
        this.thumbs.swiper.slideNext();
      } else if (
        prevSlide &&
        !prevSlide.classList.contains("swiper-slide-visible")
      ) {
        this.thumbs.swiper.slidePrev();
      }
    }
  }
});


var galleryTop = new Swiper(".detail-view__slides", {
 
  spaceBetween: 2,
  slidesPerView: 1,
  threshold: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  watchOverflow: true,
  pagination: {
    el: ".detail-view--pagination",
    clickable: true
  },


  roundLengths: true,
  on: {
    slideChange: function slideChange() {
      var activeIndex = this.activeIndex + 1;
      var activeSlide = document.querySelector(
        ".detail-view__thumbs .swiper-slide:nth-child(".concat(activeIndex, ")")
      );
      var nextSlide = document.querySelector(
        ".detail-view__thumbs .swiper-slide:nth-child(".concat(
          activeIndex + 1,
          ")"
        )
      );
      var prevSlide = document.querySelector(
        ".detail-view__thumbs .swiper-slide:nth-child(".concat(
          activeIndex - 1,
          ")"
        )
      );

      if (nextSlide && !nextSlide.classList.contains("swiper-slide-visible")) {
        this.thumbs.swiper.slideNext();
      } else if (
        prevSlide &&
        !prevSlide.classList.contains("swiper-slide-visible")
      ) {
        this.thumbs.swiper.slidePrev();
      }
    }
  }
});


//Swiper: Similar Products
var bestSellersSwiper = new Swiper(".similar-products__slider", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 20,
  // loop: true,
  speed: 800,
  pagination: {
    el: ".similar-products__slider--pagination",
    clickable: true
  },
  breakpoints: {
    768: {
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1
    }
  }
});

//Detail View More Details Switch
$("#more_details").on("click", function() {
  var el = $(this).children("span");
  if (el.text() == el.data("text-swap")) {
    el.text(el.data("text-original"));
    el.toggleClass("less");
  } else {
    el.data("text-original", el.text());
    el.text(el.data("text-swap"));
    el.toggleClass("less");
  }
});

//Detail Selector switch
$(".dropdown__item").click(function(e) {
  e.preventDefault();
  var size = this.dataset.size;
  document.getElementById("select_size").textContent = size;
  this.dropdown("hide");
  return false;
});

//Detail Review Snapshop open toggle
$(".extra-links__snapshot-trigger").on("click", function() {
  $(this).toggleClass("open");
});

//Toggle for accordion .active
$(".collapse").on("show.bs.collapse", function() {
  $(this)
    .prev()
    .addClass("active");
});
$(".collapse").on("hide.bs.collapse", function() {
  $(this)
    .prev()
    .removeClass("active");
});

//Init Tooltip
// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })





// NewLanding Review Slider
var menu = ['Slide 1', 'Slide 2', 'Slide 3']
// var reviewSlider = new Swiper('.review-slider', {
//   pagination: {
//     el: '.review-pagination',
//     clickable: true,
//     renderBullet: function (index, className) {
//           return '<span class="' + className + '">' + (menu[index]) + '</span>';
//         },
//   },
// });

var reviewSlider = new Swiper('.review-slider', {
  pagination: {
    el: '.review-pagination',
    clickable: true,
    // renderBullet: function (index, className) {
    //       return '<span class="' + className + '">' + (menu[index]) + '</span>';
    //     },
  },
  initialSlide: 1,
});
// I know, this is rough
$('#slide1').click(swiper,function(){
  reviewSlider.slideTo(0);
  $('#slide1').addClass('active');
  $('#slide2').removeClass('active');
  $('#slide3').removeClass('active');
})
$('#slide2').click(swiper,function(){
  reviewSlider.slideTo(1);
  $('#slide2').addClass('active');
  $('#slide1').removeClass('active');
  $('#slide3').removeClass('active');
})
$('#slide3').click(swiper,function(){
  reviewSlider.slideTo(2);
  $('#slide3').addClass('active');
  $('#slide2').removeClass('active');
  $('#slide1').removeClass('active');
})


// Sweetpea Slider
var sweetpeaSlider = new Swiper('.sweetpea-slider', {
  pagination: {
    el: '.sweetpea-pagination',
    clickable: true,
    // renderBullet: function (index, className) {
    //       return '<span class="' + className + '">' + (menu[index]) + '</span>';
    //     },
  },
});


