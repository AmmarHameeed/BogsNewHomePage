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
window.onresize = doALoadOfStuff;

function doALoadOfStuff() {
  //do a load of stuff
  var calculatedHeright = $(".rollover__section--mens-arcata__slide").first().height();
  $(".rollover__section--mens-arcata__slide:nth-child(2)").css("height", calculatedHeright)
}
// $(window).on("resize", function(){

// })
//Sidebar Method
$(document).ready(function () {

  var calculatedHeright = $(".rollover__section--mens-arcata__slide").first().height();
  $(".rollover__section--mens-arcata__slide:nth-child(2)").css("height", calculatedHeright)

  $("#sidebar").mCustomScrollbar({
    theme: "minimal",
  });

  $("#dismiss, .overlay").on("click", function () {
    $("#sidebar").removeClass("active");
    $(".overlay").removeClass("active");
    $("#content").removeClass("noScroll");

    setTimeout(function () {
      var isHovered = $("#navbar").is(":hover");
      var element = document.getElementById("navbar");
      if (!isHovered) {
        element.classList.remove("subnav--open");
      }
    }, 600);
  });
  $("#sidebarCollapse, #sidebarCollapseMobile").on("click", function () {
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
  $(".video-btn").click(function () {
    $videoSrc = $(this).data("src");
    // console.log($videoSrc);
    // Get the video format
    $videoFormat = $(this).data("format");
    $videoEnd = $(this).data("end");
  });

  // when the modal is opened autoplay it
  $("#videoModal").on("shown.bs.modal", function (e) {
    // set the video src to autoplay and not to show related video.
    if ($videoEnd) {
      $("#video").attr(
        "src",
        $videoSrc +
        "?rel=0&autoplay=1&loop=1&modestbranding=1&muted=1&showinfo=0"
      );
    } else {
      $("#video").attr(
        "src",
        $videoSrc +
        "?rel=0&autoplay=1&modestbranding=1&muted=1&showinfo=0"
      );
    }

    // Add a 'video is square' hook
    if ($videoFormat) {
      if ($videoFormat == "square-video") {
        $("#videoModal").addClass("square-video");
        $(".embed-responsive").addClass("embed-responsive-1by1");
      } else {
        $("#videoModal").addClass("square-video");
        $(".embed-responsive").addClass("embed-responsive-detail");
      }
    } else {
      $(".embed-responsive").addClass("embed-responsive-16by9");
    }
  });

  // stop playing the youtube video when I close the modal
  $("#videoModal").on("hide.bs.modal", function (e) {
    // a poor man's stop video
    $("#video").attr("src", $videoSrc);

    // remove a 'video is square' hook
    $("#videoModal").removeClass("square-video");
    $("#videoModal").removeClass("detail-video");
    $(".embed-responsive").removeClass("embed-responsive-1by1");
    $(".embed-responsive").removeClass("embed-responsive-16by9");
  });

  // Auto Play Video Modal Based on URL Parameters

  // break down passed params
  $.urlParam = function (name) {
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
  $('.video-btn[data-target="#videoModal"]').each(function () {
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
      $(slider).each(function () {
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
$(window).scroll(function () {
  var _scroll = $(this).scrollTop() > 50;
  $("nav").toggleClass("scrolled", _scroll);

  // Add a helper class to the top_banner_second
  $("#top_banner_second").toggleClass("navbar-scrolled", _scroll);
  // Also close any open megamenus
  if (_scroll) {
    $(".navbar__subnav.show").prev("a.navbar__subnav--trigger").click();
  }
});

//Swiper: large-hero slider
var largeHeroSwiper = new Swiper(".large-hero", {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 500,
  breakpoints: {
    //change parameter on mobile from 500 to 768 for landscape phone
    768: { noSwiping: false },
  },
  //if only 1 slide logic
  autoplay: $("#hero_slider .swiper-slide").length > 1 ? true : false,
  loop: $("#hero_slider .swiper-slide").length > 1 ? true : false,

  pagination: {
    el: ".large-hero--pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
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
    768: { noSwiping: false },
  },
  //if only 1 slide logic
  autoplay: $("#review_slider .swiper-slide").length > 1 ? true : false,
  loop: $("#review_slider .swiper-slide").length > 1 ? true : false,

  pagination: {
    el: ".review--pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
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
    768: { noSwiping: false },
  },
  //if only 1 slide logic
  // autoplay: $('#text_slider.swiper-slide').length > 1 ? true : false,
  // loop: $('#text_slider.swiper-slide').length > 1 ? true : false,

  pagination: {
    el: ".text-slider--pagination",
    clickable: true,
  },
  // autoplay: {
  //   delay: 6000,
  //   disableOnInteraction: false,
  // },
  // loop: true,
});

//Swiper: featured section slider  :: FULL WIDTH
var featuredSectionSwiper = new Swiper(".feature-product", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
    dynamicBullets:
      $("#feature_slider .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $("#feature_slider .swiper-slide").length > 5 ? 3 : 1,
  },
  breakpoints: {
    //change parameter on mobile from 500 to 768 for landscape phone
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $(".feature-product .swiper-slide").length > 3 ? true : false,
  loop: $(".feature-product .swiper-slide").length > 1 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".feature-product .swiper-slide").length <= 2) {
  $(".feature-product .feature_slider--pagination").addClass("invisible");
  $(".feature-product .feature_slider--navigation").addClass("invisible");
}

//Featured Section Slider event listener - next/prev slide clicks to themselves
$(document).on(
  "click",
  ".feature-product .feature_slider__slide.swiper-slide-prev",
  function () {
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
  }
);
$(document).on(
  "click",
  ".feature-product .feature_slider__slide.swiper-slide-next",
  function () {
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
  }
);

//Swiper: best sellers section slider
var bestSellersSwiper = new Swiper(".best_sellers_slider", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 0,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".best_sellers_slider--pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#best_sellers_slider .swiper-slide").length > 3 ? true : false,
  loop: $("#best_sellers_slider .swiper-slide").length > 3 ? true : false,
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
$(".mobile-drop").on("click", function () {
  var element = document.getElementById("navbar");
  element.classList.toggle("navbar--open");
  //also toggle this if it is not mobile?
});

//Add/Remove .subnav--open to navbar when subnav--trigger is clicked
$(".subnav").on("shown.bs.collapse", function () {
  var element = document.getElementById("navbar");
  element.classList.add("subnav--open");
});
$(".subnav").on("hidden.bs.collapse", function () {
  var element = document.getElementById("navbar");
  element.classList.remove("subnav--open");
  // Need to also add the conditional that if the click element is the cart, DO NOT run this
});

//Megamenu Mobile scroll to top of category
$(".subnav").on("shown.bs.collapse", function () {
  var path = $(this).attr("id");
  var anchor = $("#" + path);
  // This subtracts 50 for the button height, probably a better way
  var position = anchor.position().top + $(".navbar").scrollTop() - 50;
  $(".navbar").animate({ scrollTop: position });
});

//Nav bar active class
$(".navbar__subnav--trigger").click(function () {
  if ($(this).hasClass("navbar__top-tier-item--active")) {
    $(this).removeClass("navbar__top-tier-item--active");
  } else {
    $(".navbar__subnav--trigger").removeClass("navbar__top-tier-item--active");
    $(this).addClass("navbar__top-tier-item--active");
  }
});

// //Closes the megamenu if clicked anywhere
// $(document).click(function(event) {
//   var clickover = $(event.target);
//   //.no-drop allows you to click on items in the megamenu and NOT close
//   if (!clickover.hasClass("no-drop")) {
//     $(".navbar__subnav.show")
//       .prev("a.navbar__subnav--trigger")
//       .click();
//   }
// });

//Closes the megamenu if moused out, delay set to ignore the 2px gap between nav/subnav
$("#navbar").mouseleave(function () {
  setTimeout(function () {
    var isHovered = $("#navbar").is(":hover");
    if (!isHovered) {
      $(".navbar__subnav.show").prev("a.navbar__subnav--trigger").click();
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
    loadPrevNextAmount: 1,
  },
  pagination: {
    el: ".list-view__pagination",
    clickable: true,
    renderBullet: function (index, className) {
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
    },
  },
  breakpoints: {
    768: {
      noSwiping: false,
      spaceBetween: 15,
    },
  },
});

//List View filter active class
$(".filter__buttons a").click(function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(".filter__button").removeClass("active");
    $(this).addClass("active");
  }
});

// NEW DETAIL GALLERY
// breakpoint where swiper will be destroyed
// and switches to a dual-column layout
var breakpoint = window.matchMedia("(min-width:61.9375em)"); //var originally const
// keep track of swiper instances to destroy later
var galleryTop; //var originally let
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
var breakpointChecker = function () {
  //var originally const
  // if larger viewport and multi-row layout needed
  if (breakpoint.matches === true) {
    // clean up old instances and inline styles when available
    if (galleryTop !== undefined) galleryTop.destroy(true, true);
    // or/and do nothing

    //// NEW SIDE SCROLL
    if ($(".detail-view__desktop-wrapper")[0]) {
      var stickySidebar = new StickySidebar(".detail-view__desktop-wrapper", {
        topSpacing: 0,
        bottomSpacing: 0,
        containerSelector: ".detail-view__wrapper",
        innerWrapperSelector: ".detail-view__make-me-sticky",
      });
    }

    return;
    // else if a small viewport and single column layout needed
  } else if (breakpoint.matches === false) {
    // fire small viewport version of swiper
    return enableSwiper();
  }
};
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
var enableSwiper = function () {
  //var originally const
  galleryTop = new Swiper(".detail-view__slides", {
    loop: true,
    // autoHeight: true,
    slidesPerView: 1,
    centeredSlides: true,
    a11y: true,
    keyboardControl: true,
    grabCursor: true,
    // pagination
    roundLengths: true,
    pagination: {
      el: ".detail-view--pagination",
      clickable: true,
    },
  });
};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// keep an eye on viewport size changes
breakpoint.addListener(breakpointChecker);
// kickstart
breakpointChecker();

//Swiper: Similar Products
var bestSellersSwiper = new Swiper(".similar-products__slider", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 20,
  // loop: true,
  speed: 800,
  pagination: {
    el: ".similar-products__slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
});

//Detail View More Details Switch
$("#more_details").on("click", function () {
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
$(".dropdown__item").click(function (e) {
  e.preventDefault();
  var size = this.dataset.size;
  document.getElementById("select_size").textContent = size;
  this.dropdown("hide");
  return false;
});

//Detail Review Snapshop open toggle
$(".extra-links__snapshot-trigger").on("click", function () {
  $(this).toggleClass("open");
});

//Toggle for accordion .active
$(".collapse").on("show.bs.collapse", function () {
  $(this).prev().addClass("active");
});
$(".collapse").on("hide.bs.collapse", function () {
  $(this).prev().removeClass("active");
});

//Init Tooltip
// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })

//List View Rollover
// $(".list-view__image").mouseenter(function() {
//   console.log("IN");
//   // $(this).prev().css({"color": "red", "border": "2px solid red"});
//   $(this).parent().parent().parent().find('.list-view__slider-overlay').addClass("ELEPHANT");
// });
// $(".list-view__slider-overlay").mouseleave(function() {
//   console.log("OUT");
//   $(this).removeClass("ELEPHANT");
// });

//Detail Selector switch
$(".detail-view__zoom-wrapper").click(function () {
  console.log("clickeddd")
  $(this).prev('[data-zoom="zoom"]').trigger("click");
});

// advanced-zoom - 1.2.1 (https://github.com/heavybeard/advanced-zoom)
// Modifued by RH
+(function () {
  "use strict";
  var scrollHandlerFn, clickHandlerFn, keyHandlerFn, touchStartFn, touchMoveFn;
  function realOffset(element) {
    var rect = element.getBoundingClientRect();
    var scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0,
      scrollLeft =
        window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    };
  }
  function setTransformStyle(element, styleValue) {
    element.style.webkitTransform = styleValue;
    element.style.msTransform = styleValue;
    element.style.transform = styleValue;
  }
  function addEventTransitionEnd(element, callback) {
    if (!("transition" in document.body.style)) return callback;
    element.addEventListener("transitionend", callback);
    element.addEventListener("webkitTransitionEnd", callback);
  }
  function AdvancedZoomService() {
    this._activeAdvancedZoom =
      this._initialScrollPosition =
      this._initialTouchPosition =
      this._touchMoveListener =
      null;
    this._window = window;
    this._document = document;
    this._body = document.body;
  }
  AdvancedZoomService.prototype.listen = function () {
    document.body.addEventListener(
      "click",
      function (event) {
        if (event.target.getAttribute("data-zoom") === "zoom")
          this._advancedZoom(event);
      }.bind(this)
    );
  };
  AdvancedZoomService.prototype._advancedZoom = function (e) {
    var target = e.target;
    if (
      !target ||
      (target.tagName !== "IMG" &&
        target.tagName !== "VIDEO" &&
        target.tagName !== "PICTURE")
    )
      return;
    if (this._body.classList.contains("zoom-overlay-open")) return;
    if (e.metaKey || e.ctrlKey)
      return window.open(
        e.target.getAttribute("data-zoom-original") ||
        e.target.currentSrc ||
        e.target.src,
        "_blank"
      );
    if (target.width >= window.innerWidth - AdvancedZoom.OFFSET) return;
    this._activeAdvancedZoomClose(true);
    this._activeAdvancedZoom = new AdvancedZoom(target);
    this._activeAdvancedZoom.advancedZoomMedia(target.tagName);
    scrollHandlerFn = this._scrollHandler.bind(this);
    clickHandlerFn = this._clickHandler.bind(this);
    keyHandlerFn = this._keyHandler.bind(this);
    touchStartFn = this._touchStart.bind(this);
    this._window.addEventListener("scroll", scrollHandlerFn);
    this._document.addEventListener("click", clickHandlerFn);
    this._document.addEventListener("keyup", keyHandlerFn);
    this._document.addEventListener("touchstart", touchStartFn);
    this._document.addEventListener("touchend", clickHandlerFn);
    e.stopPropagation();
  };
  AdvancedZoomService.prototype._activeAdvancedZoomClose = function (
    forceDispose
  ) {
    if (!this._activeAdvancedZoom) return;
    if (forceDispose) this._activeAdvancedZoom.dispose();
    else this._activeAdvancedZoom.close();
    this._window.removeEventListener("scroll", scrollHandlerFn);
    this._document.removeEventListener("click", clickHandlerFn);
    this._document.removeEventListener("keyup", keyHandlerFn);
    this._document.removeEventListener("touchstart", touchStartFn);
    this._activeAdvancedZoom = null;
  };
  AdvancedZoomService.prototype._scrollHandler = function (e) {
    var deltaY;
    if (this._initialScrollPosition === null)
      this._initialScrollPosition = window.pageYOffset;
    deltaY = this._initialScrollPosition - window.pageYOffset;
    if (Math.abs(deltaY) >= 40) this._activeAdvancedZoomClose();
  };
  AdvancedZoomService.prototype._keyHandler = function (e) {
    if (e.keyCode == 27) this._activeAdvancedZoomClose();
  };
  AdvancedZoomService.prototype._clickHandler = function (e) {
    e.stopPropagation();
    e.preventDefault();
    this._activeAdvancedZoomClose();
  };
  AdvancedZoomService.prototype._touchStart = function (e) {
    this._initialTouchPosition = e.touches[0].pageY;
    touchMoveFn = this._touchMove.bind(this);
    e.target.addEventListener("touchmove", touchMoveFn);
  };
  AdvancedZoomService.prototype._touchMove = function (e) {
    if (Math.abs(e.touches[0].pageY - this._initialTouchPosition) > 10) {
      this._activeAdvancedZoomClose();
      e.target.removeEventListener("touchmove", touchMoveFn);
    }
  };
  function AdvancedZoom(media) {
    this._fullHeight =
      this._fullWidth =
      this._overlay =
      this._targetMediaWrap =
      null;
    this._targetMedia = media;
    this._body = document.body;
  }
  AdvancedZoom.OFFSET = 80;
  AdvancedZoom._MAX_WIDTH = 2560;
  AdvancedZoom._MAX_HEIGHT = 4096;
  AdvancedZoom.prototype.advancedZoomMedia = function (tagName) {
    var target = this._targetMedia;
    var src =
      target.getAttribute("data-zoom-original") ||
      target.currentSrc ||
      target.src;
    target.classList.add("zoom-media-loading");
    if (tagName === "IMG" || tagName === "PICTURE") {
      var img = document.createElement("img");
      img.onload = function () {
        this._fullHeight = Number(img.height);
        this._fullWidth = Number(img.width);
        this._advancedZoomOriginal();
        target.classList.remove("zoom-media-loading");
        target.removeAttribute("data-zoom-original");
      }.bind(this);
      img.src = src;
    } else if (tagName === "VIDEO") {
      var video = document.createElement("video");
      var source = document.createElement("source");
      var _this = this;
      video.appendChild(source);
      video.addEventListener(
        "canplay",
        function () {
          _this._fullHeight = Number(video.videoHeight);
          _this._fullWidth = Number(video.videoWidth);
          _this._advancedZoomOriginal();
          _this._targetMedia.play();
          _this._targetMedia.classList.remove("zoom-media-loading");
        },
        false
      );
      source.src = src;
    }
    target.src = src;
  };
  AdvancedZoom.prototype._advancedZoomOriginal = function () {
    this._targetMediaWrap = document.createElement("div");
    this._targetMediaWrap.className = "zoom-media-wrap";
    this._targetMedia.parentNode.insertBefore(
      this._targetMediaWrap,
      this._targetMedia
    );
    this._targetMediaWrap.appendChild(this._targetMedia);
    this._targetMedia.classList.add("zoom-media");
    this._targetMedia.setAttribute("data-zoom", "zoom-out");
    this._overlay = document.createElement("div");
    this._overlay.className = "zoom-overlay";
    document.body.appendChild(this._overlay);

    //RH ADDED
    //Create 2nd zoom-overlay
    var gallery = document.getElementById("gallery");
    this._overlay2 = document.createElement("div");
    this._overlay2.className = "zoom-overlay";
    gallery.appendChild(this._overlay2);

    this._calculateAdvancedZoom();
    this._triggerAnimation();
  };
  AdvancedZoom.prototype._calculateAdvancedZoom = function () {
    this._targetMedia.offsetWidth;
    var originalFullMediaWidth = this._fullWidth;
    var originalFullMediaHeight = this._fullHeight;
    var scrollTop = window.pageYOffset;
    var maxScaleFactor =
      originalFullMediaWidth /
      (this._targetMedia.width || this._targetMedia.videoWidth);
    var viewportHeight = window.innerHeight - AdvancedZoom.OFFSET;
    var viewportWidth = window.innerWidth - AdvancedZoom.OFFSET;
    var mediaAspectRatio = originalFullMediaWidth / originalFullMediaHeight;
    var viewportAspectRatio = viewportWidth / viewportHeight;
    if (
      originalFullMediaWidth < viewportWidth &&
      originalFullMediaHeight < viewportHeight
    )
      this._mediaScaleFactor = maxScaleFactor;
    else if (mediaAspectRatio < viewportAspectRatio)
      this._mediaScaleFactor =
        (viewportHeight / originalFullMediaHeight) * maxScaleFactor;
    else
      this._mediaScaleFactor =
        (viewportWidth / originalFullMediaWidth) * maxScaleFactor;
  };
  AdvancedZoom.prototype._triggerAnimation = function () {
    this._targetMedia.offsetWidth;
    var mediaOffset = realOffset(this._targetMedia),
      scrollTop = window.pageYOffset;
    var viewportY = scrollTop + window.innerHeight / 2,
      viewportX = window.innerWidth / 2,
      mediaCenterY =
        mediaOffset.top +
        (this._targetMedia.height || this._targetMedia.offsetHeight) / 2,
      mediaCenterX =
        mediaOffset.left +
        (this._targetMedia.width || this._targetMedia.offsetWidth) / 2;
    this._translateY = Math.round(viewportY - mediaCenterY);
    this._translateX = Math.round(viewportX - mediaCenterX);
    var mediaTransform = "scale(" + this._mediaScaleFactor + ")",
      mediaWrapTransform =
        "translate(" +
        this._translateX +
        "px, " +
        this._translateY +
        "px) translateZ(0)";
    setTransformStyle(this._targetMedia, mediaTransform);
    setTransformStyle(this._targetMediaWrap, mediaWrapTransform);
    this._body.classList.add("zoom-overlay-open");

    // RH ADDED
    // this._targetMedia.closest('.detail-view__slides').addClass('visibleSlides');
    // this._targetMedia.closest('.detail-view__slide').addClass('ONTOP');
    this._targetMedia.parentElement.parentElement.classList.add("ONTOP");
    this._targetMedia.parentElement.parentElement.parentElement.parentElement.classList.add(
      "visibleSlides"
    );
    var magnify = document.getElementsByClassName("detail-view__zoom-wrapper");
    magnify[0].classList.add("hidden");
  };
  AdvancedZoom.prototype.close = function () {
    this._body.classList.remove("zoom-overlay-open");
    this._body.classList.add("zoom-overlay-transitioning");
    setTransformStyle(this._targetMedia, "");
    setTransformStyle(this._targetMediaWrap, "");
    addEventTransitionEnd(this._targetMedia, this.dispose.bind(this));

    //RH ADDED
    setTimeout(function () {
      //delay to prevent jumping behind other images
      var slide = document.getElementsByClassName("ONTOP");
      var slides = document.getElementsByClassName("visibleSlides");
      var magnify = document.getElementsByClassName(
        "detail-view__zoom-wrapper"
      );
      slide[0].classList.remove("ONTOP");
      slides[0].classList.remove("visibleSlides");
      magnify[0].classList.remove("hidden");
    }, 200);
  };
  AdvancedZoom.prototype.dispose = function () {
    if (this._targetMediaWrap && this._targetMediaWrap.parentNode) {
      this._targetMedia.classList.remove("zoom-media");
      this._targetMedia.setAttribute("data-zoom", "zoom");
      this._targetMediaWrap.parentNode.replaceChild(
        this._targetMedia,
        this._targetMediaWrap
      );
      this._overlay.parentNode.removeChild(this._overlay);
      this._overlay2.parentNode.removeChild(this._overlay2);
      this._body.classList.remove("zoom-overlay-transitioning");
      if (
        this._targetMedia.tagName === "VIDEO" &&
        this._targetMedia.getAttribute("data-zoom-play") === "always"
      )
        this._targetMedia.play();
    }
  };
  new AdvancedZoomService().listen();
})();

// NewLanding Review Slider
var menu = ["Slide 1", "Slide 2", "Slide 3"];
// var reviewSlider = new Swiper('.review-slider', {
//   pagination: {
//     el: '.review-pagination',
//     clickable: true,
//     renderBullet: function (index, className) {
//           return '<span class="' + className + '">' + (menu[index]) + '</span>';
//         },
//   },
// });

var reviewSlider = new Swiper(".review-slider", {
  pagination: {
    //autoHeight: true, //enable auto height
    el: ".review-pagination",
    clickable: true,


    // renderBullet: function (index, className) {
    //       return '<span class="' + className + '">' + (menu[index]) + '</span>';
    //     },
  },
  breakpoints: {
    //change parameter on mobile from 500 to 768 for landscape phone
    768: { noSwiping: false, loop: true },
  },
  // hashNavigation: {
  //     watchState: true,
  // },
  initialSlide: 0,
});

// I know, this is rough
$("#slide1").click(swiper, function () {
  reviewSlider.slideTo(0);
  $("#slide1").addClass("active");
  $("#slide5").removeClass("active");
  $("#slide4").removeClass("active");
  $("#slide2").removeClass("active");
  $("#slide3").removeClass("active");
});
$("#slide2").click(swiper, function () {
  reviewSlider.slideTo(1);
  $("#slide2").addClass("active");
  $("#slide5").removeClass("active");
  $("#slide4").removeClass("active");
  $("#slide1").removeClass("active");
  $("#slide3").removeClass("active");
});
$("#slide3").click(swiper, function () {
  reviewSlider.slideTo(2);
  $("#slide3").addClass("active");
  $("#slide5").removeClass("active");
  $("#slide4").removeClass("active");
  $("#slide2").removeClass("active");
  $("#slide1").removeClass("active");
});
$("#slide4").click(swiper, function () {
  reviewSlider.slideTo(3);
  $("#slide4").addClass("active");
  $("#slide5").removeClass("active");
  $("#slide3").removeClass("active");
  $("#slide2").removeClass("active");
  $("#slide1").removeClass("active");
});
$("#slide5").click(swiper, function () {
  reviewSlider.slideTo(4);
  $("#slide5").addClass("active");
  $("#slide4").removeClass("active");
  $("#slide3").removeClass("active");
  $("#slide2").removeClass("active");
  $("#slide1").removeClass("active");
});

// Sweetpea Slider
var sweetpeaSlider = new Swiper(".sweetpea-slider", {
  pagination: {
    el: ".sweetpea-pagination",
    clickable: true,
    // renderBullet: function (index, className) {
    //       return '<span class="' + className + '">' + (menu[index]) + '</span>';
    //     },
  },
});

//Swiper: Refined Toughness section slider (Updated homepage)
var refinedToughnessSwiper = new Swiper(
  ".rollover__section--refined-toughness",
  {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 15,
    speed: 600,
    watchSlidesVisibility: true,
    pagination: {
      el: ".rollover__section--refined-toughness--pagination",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev"
    // },
    breakpoints: {
      768: {
        noSwiping: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },

    //if only 3 slide logic
    autoplay:
      $("#rollover__section--refined-toughness .swiper-slide").length > 3
        ? true
        : false,
    loop:
      $("#rollover__section--refined-toughness .swiper-slide").length > 3
        ? true
        : false,
  }
);

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($("#rollover__section--refined-toughness .swiper-slide").length <= 3) {
  $(
    "#rollover__section--refined-toughness .rollover__section--refined-toughness--pagination"
  ).addClass("invisible");
  $(
    "#rollover__section--refined-toughness .rollover__section--refined-toughness--navigation"
  ).addClass("invisible");
}

//Swiper: Men's Arcata section slider (Updated homepage)
var mensArcataSwiper = new Swiper(".rollover__section--mens-arcata", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 15,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".rollover__section--mens-arcata--pagination",
    clickable: true,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay:
    $("#rollover__section--mens-arcata .swiper-slide").length > 2
      ? true
      : false,
  loop:
    $("#rollover__section--mens-arcata .swiper-slide").length > 2
      ? true
      : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($("#rollover__section--mens-arcata .swiper-slide").length <= 2) {
  $(
    "#rollover__section--mens-arcata .rollover__section--mens-arcata--pagination"
  ).addClass("invisible");
  $(
    "#rollover__section--mens-arcata .rollover__section--mens-arcata--navigation"
  ).addClass("invisible");
}
//Swiper: Practical Cuteness section slider (Updated homepage)
var DualSlideSwiper = new Swiper(".dual__swiper-container", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 15,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".dual__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".dual__swiper-container .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".dual__swiper-container .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#practical__cuteness .swiper-slide").length > 2 ? true : false,
  loop: $("#practical__cuteness .swiper-slide").length > 2 ? true : false,
});

//Swiper: Standalone Mobile Swiper ---- if only 3 slide logic CONTINUED ----
if ($("#practical__cuteness .swiper-slide").length <= 2) {
  $("#practical__cuteness .dual__swiper--pagination").addClass("invisible");
  $("#practical__cuteness .dual__swiper--navigation").addClass("invisible");
}
//Swiper: Practical Cuteness section slider (Updated homepage)
var DualSlideSwiper = new Swiper(".mobile__swiper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".mobile__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".mobile__swiper .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".mobile__swiper .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    // delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#belief__section-mobile .swiper-slide").length > 4 ? true : false,
  loop: $("#belief__section-mobile .swiper-slide").length > 4 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($("#belief__section-mobile .swiper-slide").length <= 2) {
  $("#belief__section-mobile .mobile__swiper--pagination").addClass("invisible");
  $("#belief__section-mobile .mobile__swiper--navigation").addClass("invisible");
}


var twoInOneSwiper = new Swiper(".twoInOneSwiper", {
  slidesPerView: 2,
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  spaceBetween: 20,
  loop: true,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var featuredSliderUnique = new Swiper(".feature-product__aug", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__aug .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUnique.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__aug .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUnique.slideNext();
  }
);
var featuredSliderUniqueJune = new Swiper(".feature-product__june", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__june .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueJune.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__june .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueJune.slideNext();
  }
);

//Swiper: Practical Cuteness section slider (Updated homepage)
var DualSlideSwiper = new Swiper(".reuse__swiper-container", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 20,
  noSwiping: true,
  pagination: {
    el: ".reuse__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".reuse__swiper-container .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".reuse__swiper-container .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#reuse__working-section .swiper-slide").length > 4 ? true : false,
  loop: $("#reuse__working-section .swiper-slide").length > 4 ? true : false,
});

//Swiper: Standalone Mobile Swiper ---- if only 3 slide logic CONTINUED ----
if ($("#reuse__working-section .swiper-slide").length <= 4) {
  $("#reuse__working-section .reuse__swiper--pagination").addClass("invisible");
  $("#reuse__working-section .reuse__swiper--navigation").addClass("invisible");
}
// Care Landing Page Swipers
var DualSlideSwiper = new Swiper(".landingCare__swiper-container", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".landingCare__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".landingCare__swiper-container .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".landingCare__swiper-container .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    992: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    // delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#belief__section-mobile .swiper-slide").length > 4 ? true : false,
  loop: $("#belief__section-mobile .swiper-slide").length > 4 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".swiper-slide").length <= 2) {
  $(".landingCare__swiper--pagination").addClass("invisible");
  $(".landingCare__swiper--navigation").addClass("invisible");
}


var featuredSliderUniqueSep = new Swiper(".feature-product__sep", {
  spaceBetween: 20,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__sep .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueSep.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__sep .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueSep.slideNext();
  }
);


//  Design A boot Landing Page Swiper

var DesignBootSlideSwiper = new Swiper(".design__boot__swiper-container", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 20,
  noSwiping: true,
  pagination: {
    el: ".design__boot__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".design__boot__swiper-container .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".design__boot__swiper-container .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#design__custom_boot-section .swiper-slide").length > 4 ? true : false,
  loop: $("#design__custom_boot-section .swiper-slide").length > 4 ? true : false,
});

//Swiper: Standalone Mobile Swiper ---- if only 3 slide logic CONTINUED ----
if ($("#design__custom_boot-section .swiper-slide").length <= 4) {
  $("#design__custom_boot-section .reuse__swiper--pagination").addClass("invisible");
  $("#design__custom_boot-section .reuse__swiper--navigation").addClass("invisible");
}


// October Update Swiper
var featuredSliderUniqueSep = new Swiper(".feature-product__oct", {
  spaceBetween: 20,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__oct .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueSep.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__oct .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueSep.slideNext();
  }
);
// November Update Swiper
var featuredSliderUniqueNov = new Swiper(".feature-product__nov", {
  spaceBetween: 20,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__nov .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueNov.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__nov .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueNov.slideNext();
  }
);

//Swiper: Practical Cuteness section slider (Updated homepage)
var DualSlideSwiperNovember = new Swiper(".dual__swiper-container--nov", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 20,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".dual__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".dual__swiper-container .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".dual__swiper-container .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#newest__collection .swiper-slide").length > 2 ? true : false,
  loop: $("#newest__collection .swiper-slide").length > 2 ? true : false,
});

//Swiper: Standalone Mobile Swiper ---- if only 3 slide logic CONTINUED ----
if ($("#newest__collection .swiper-slide").length <= 2) {
  $("#newest__collection .dual__swiper--pagination").addClass("invisible");
  $("#newest__collection .dual__swiper--navigation").addClass("invisible");
}

// December Updates

var featuredSliderUniqueDec = new Swiper(".feature-product__dec", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__dec .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueDec.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__dec .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueDec.slideNext();
  }
);

// Care Landing Page Swipers
var DualSlideSwiper = new Swiper(".landingCare__swiper-container--dec", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 15,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".landingCare__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".landingCare__swiper-container--dec .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".landingCare__swiper-container--dec .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    // delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $(".featured__categories .landingCare__swiper-container--dec .swiper-slide").length > 4 ? true : false,
  loop: $(".featured__categories .landingCare__swiper-container--dec .swiper-slide").length > 4 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".swiper-slide").length <= 2) {
  $(".landingCare__swiper--pagination").addClass("invisible");
  $(".landingCare__swiper--navigation").addClass("invisible");
}

//Featured Product Slider - January'23
var featuredSliderUniqueJan = new Swiper(".feature-product__jan", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__jan .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueJan.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__jan .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueJan.slideNext();
  }
);

//Featured Product Slider - January'23
var featuredSliderUniqueJanAlternative = new Swiper(".feature-product__jan-alt", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__jan-alt .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueJanAlternative.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__jan-alt .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueJanAlternative.slideNext();
  }
);

//Featured Product Slider - Februaru'23
var featuredSliderUniqueFeb = new Swiper(".feature-product__feb", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__feb .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueFeb.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__feb .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueFeb.slideNext();
  }
);

//Featured Product Slider - February'23
var featuredSliderUniqueFebAlternative01 = new Swiper("#feature-product__feb--alt01", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination01",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__feb--alt01 .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueFebAlternative01.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__feb--alt01 .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueFebAlternative01.slideNext();
  }
);

//Featured Product Slider - February'23
var featuredSliderUniqueFebAlternative02 = new Swiper("#feature-product__feb--alt02", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination02",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__feb--alt02 .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderUniqueFebAlternative02.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__feb--alt02 .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderUniqueFebAlternative02.slideNext();
  }
);

// February Page Swipers
var DualSlideSwiperFebruary = new Swiper(".landingCare__swiper-container--feb", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".landingCare__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".landingCare__swiper-container--feb .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".landingCare__swiper-container--feb .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    992: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    // delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#support_section-mobile .swiper-slide").length > 4 ? true : false,
  loop: $("#support_section-mobile .swiper-slide").length > 4 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".swiper-slide").length <= 2) {
  $(".landingCare__swiper--pagination").addClass("invisible");
  $(".landingCare__swiper--navigation").addClass("invisible");
}


// February Page Swipers
var DualSlideSwiperFebruaryWorkPage = new Swiper(".landingCare__swiper-container--feb-Work", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".landingCare__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".landingCare__swiper-container--feb-Work .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".landingCare__swiper-container--feb-Work .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    992: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    // delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#secondary__header-mobile .swiper-slide").length > 4 ? true : false,
  loop: $("#secondary__header-mobile .swiper-slide").length > 4 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".swiper-slide").length <= 2) {
  $(".landingCare__swiper--pagination").addClass("invisible");
  $(".landingCare__swiper--navigation").addClass("invisible");
}

//Landing 4-H Slider - March'23
var featuredSliderLanding4H01 = new Swiper("#feature-product__4h-01", {
  spaceBetween: 20,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination01",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__4h-01 .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderLanding4H01.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__4h-01 .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderLanding4H01.slideNext();
  }
);

//Landing 4-H Slider - March'23
var featuredSliderLanding4H02 = new Swiper("#feature-product__4h-02", {
  spaceBetween: 20,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination02",
    clickable: true,
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__4h-02 .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderLanding4H02.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__4h-02 .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderLanding4H02.slideNext();
  }
);

// Landing Sustainability  Swiper
var featuredSliderSustainability = new Swiper(".feature-product__sustainablity", {
  spaceBetween: 20,
  loop: true,
  centeredSlides: true,
  // loopedSlides: 5, 
  slidesPerView: 3,
  clickable: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      noSwiping: false,
      speed: 500,
      slidesPerView: 1,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__sustainablity .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderSustainability.slidePrev();
  }
);

$(document).on(
  "click",
  ".feature-product__sustainablity .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderSustainability.slideNext();
    console.log("clicked next slide")
  }
);
// $(".feature-product__sustainablity .feature_slider__slide.swiper-slide-active + .swiper-slide-next + .swiper-slide").each(function (index) {
//   // $(this).next().on("click", function(){
//     console.log("clicked next next slide")
//     window.featuredSliderSustainability.slideNext();

//   })

// }
// );

var textualSwiper = new Swiper("#textual__section", {
  slidesPerView: 2,
  slidesPerGroup: 1,
  noSwiping: true,
  clickable: false,
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      noSwiping: false,
      speed: 500,
    },
  },
});

// Feature Slider April'23

// var featuredSliderApr = new Swiper(".feature-product__Apr", {
//   spaceBetween: 20,
//   slidesPerView: 1,
//   slidesPerGroup: 1,
//   loop: true,
//   // centeredSlides: true,
//   speed: 800,
//   pagination: {
//     el: ".feature_slider--pagination",
//     clickable: true,
//   },
//   breakpoints: {
//     768: {
//       noSwiping: false,
//       speed: 500,
//     },
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

// $(document).on(
//   "click",
//   ".feature-product__Apr .feature_slider__slide.swiper-slide-prev",
//   function () {
//     window.featuredSliderApr.slidePrev();
//   }
// );
// $(document).on(
//   "click",
//   ".feature-product__Apr .feature_slider__slide.swiper-slide-next",
//   function () {
//     window.featuredSliderApr.slideNext();
//   }
// );


// Featured Categories Swipers April'23
var featuredCategoriesSwiper = new Swiper(".featuredCategories__swiper-container--apr", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 0,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".landingCare__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".featuredCategories__swiper-container--apr .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".featuredCategories__swiper-container--apr .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    // delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $(".featured__categories .featuredCategories__swiper-container--apr .swiper-slide").length > 4 ? true : false,
  loop: $(".featured__categories .featuredCategories__swiper-container--apr .swiper-slide").length > 4 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".swiper-slide").length <= 2) {
  $(".landingCare__swiper--pagination").addClass("invisible");
  $(".landingCare__swiper--navigation").addClass("invisible");
}


// Meet the Artist Section Slider
var featuredSliderApr = new Swiper(".landingCare__swiper-container--apr", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 0,
  speed: 600,
  loop: true,
  autoplay: false,
  watchSlidesVisibility: true,
  pagination: {
    el: ".landingCare__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".landingCare__swiper-container--apr .swiper-slide").length > 2 ? true : false,
    dynamicMainBullets: $(".landingCare__swiper-container--apr .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },

  //if only 3 slide logic
  // autoplay: $(".featured__categories .landingCare__swiper-container--apr .swiper-slide").length > 2 ? true : false,
  // loop: $(".featured__categories .landingCare__swiper-container--apr .swiper-slide").length > 2 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".swiper-slide").length <= 1) {
  $(".landingCare__swiper--pagination").addClass("invisible");
  $(".landingCare__swiper--navigation").addClass("invisible");
}

// PDP Sliders

var swiperCS = Swiper;
var init = false;

function swiperMode() {
  let mobile = window.matchMedia('(min-width: 0px) and (max-width: 991px)');
  let desktop = window.matchMedia('(min-width: 992px)');

  if(mobile.matches) {
    if (!init) {
        init = true;
        swiperCS = new Swiper('.color__selection__swiper', {
          loop: true,
          autoplay: false,
            breakpoints: {
                991: {
                  loop: true,
                  noSwiping: false,
                  slidesPerView: 6,
                  slidesPerGroup: 1,
                  spaceBetween: 10,
                  watchSlidesVisibility: true,
                },
                540:{
                  loop: true,
                  noSwiping: false,
                  slidesPerView: 4,
                  slidesPerGroup: 1,
                  spaceBetween: 10,
                  watchSlidesVisibility: true,
                }
            },
            pagination: {
                  el: ".swiper-pagination",
                },
        });
    }

}

// Disable (for desktop)
else if(desktop.matches) {
  // swiperCS.destroy();
    init = false;
}

}

/* On Load
**************************************************************/
window.addEventListener('load', function() {
  swiperMode();
});

/* On Resize
**************************************************************/
window.addEventListener('resize', function() {
  swiperMode();
});

var featuredSectionSwiperPDP = new Swiper(".feature-product-pdp", {
  spaceBetween: 15,
  slidesPerView: "3",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
    dynamicBullets:
      $("#feature_slider .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $("#feature_slider .swiper-slide").length > 5 ? 3 : 1,
  },
  breakpoints: {
    //change parameter on mobile from 500 to 768 for landscape phone
    992: {
      slidesPerView: "auto",
      noSwiping: false,
      speed: 500,
    },
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $(".feature-product-pdp .swiper-slide").length > 3 ? true : false,
  loop: $(".feature-product-pdp .swiper-slide").length > 1 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".feature-product-pdp .swiper-slide").length <= 2) {
  $(".feature-product-pdp .feature_slider--pagination").addClass("invisible");
  $(".feature-product-pdp .feature_slider--navigation").addClass("invisible");
}

//Featured Section Slider event listener - next/prev slide clicks to themselves
$(document).on(
  "click",
  ".feature-product-pdp .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSectionSwiperPDP.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product-pdp .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSectionSwiperPDP.slideNext();
  }
);

//PDP Layout Similar product Slider- June'23
var featuredSliderLanding4H01 = new Swiper("#feature-product__similar-product", {
  spaceBetween: 20,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination01",
    clickable: true,
  },
  breakpoints: {
    992: {
      slidesPerView: "auto",
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__4h-01 .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderLanding4H01.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__4h-01 .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderLanding4H01.slideNext();
  }
);


// February Page Swipers
var DualSlideSwiperFebruary = new Swiper(".landingCare__swiper-container--Oct23", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".landingCare__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".landingCare__swiper-container--Oct23 .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".landingCare__swiper-container--Oct23 .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    992: {
      loop: true,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    // delay: 6000,
    disableOnInteraction: false,
  },

  //if only 3 slide logic
  autoplay: $("#support_section-mobile .swiper-slide").length > 4 ? true : false,
  loop: $("#support_section-mobile .swiper-slide").length > 4 ? true : false,
});

//Swiper: best sellers section slider ---- if only 3 slide logic CONTINUED ----
if ($(".swiper-slide").length <= 2) {
  $(".landingCare__swiper--pagination").addClass("invisible");
  $(".landingCare__swiper--navigation").addClass("invisible");
}

// Five Marys Farm Landing Page Text Slide

//Swiper: Practical Cuteness section slider (Updated homepage)
var DualSlideSwiperNovember = new Swiper(".m5__text__slider", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 20,
  speed: 600,
  watchSlidesVisibility: true,
  pagination: {
    el: ".dual__swiper--pagination",
    clickable: true,
    dynamicBullets:
      $(".dual__swiper-container .swiper-slide").length > 5 ? true : false,
    dynamicMainBullets: $(".dual__swiper-container .swiper-slide").length > 5 ? 3 : 1,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  breakpoints: {
    768: {
      loop: false,
      noSwiping: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
});

// December'23 Update Swiper
var featuredSliderDec23 = new Swiper(".feature-product__dec23", {
  spaceBetween: 20,
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".feature_slider--pagination",
    clickable: true,
  },
  breakpoints: {
    992: {
      noSwiping: false,
      speed: 500,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(document).on(
  "click",
  ".feature-product__dec23 .feature_slider__slide.swiper-slide-prev",
  function () {
    window.featuredSliderDec23.slidePrev();
  }
);
$(document).on(
  "click",
  ".feature-product__dec23 .feature_slider__slide.swiper-slide-next",
  function () {
    window.featuredSliderDec23.slideNext();
  }
);