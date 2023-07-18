(function ($) {
  "use strict";
  $(window).on("load", function () {
    $(".loader").fadeOut(1000);
    var wow = new WOW({ offset: 150, mobile: false });
    wow.init();
  });
  $(".animsition").animsition({
    inClass: "fade-in",
    outClass: "fade-out",
    inDuration: 1000,
    outDuration: 700,
    linkElement: "a.project-box",
    loading: true,
    loadingParentElement: "body",
    loadingClass: "spinner",
    loadingInner:
      '<div class="double-bounce1"></div><div class="double-bounce2"></div>',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ["animation-duration", "-webkit-animation-duration"],
    overlay: false,
    overlayClass: "animsition-overlay-slide",
    overlayParentElement: "body",
    transition: function (url) {
      window.location.href = url;
    },
  });
  $(".popup-youtube").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-with-zoom",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });
  $(".navbar-toggle").on("click", function () {
    $("body").removeClass("menu-is-closed").addClass("menu-is-opened");
  });
  $(".close-menu, .click-capture, .menu-list li a").on("click", function () {
    $("body").removeClass("menu-is-opened").addClass("menu-is-closed");
    $(".menu-list ul").slideUp(300);
  });
  $(".menu-list li a").on("click", function () {
    $(".menu-list li").removeClass("active");
    $(this).closest("li").addClass("active");
  });
  if ($(".owl-carousel").length > 0) {
    $(".review-carousel").owlCarousel({
      responsive: { 0: { items: 1 }, 720: { items: 1 }, 1280: { items: 1 } },
      responsiveRefreshRate: 0,
      nav: false,
      navText: [],
      animateIn: "fadeIn",
      dots: true,
    });
  }
  if ($(".pagepiling").length > 0) {
    $(".pagepiling").pagepiling({
      scrollingSpeed: 280,
      loopBottom: true,
      anchors: ["page1", "page2", "page3", "page4", "page5", "page6", "page7"],
      afterLoad: function (anchorLink, index) {
        if ($(".pp-section.active").scrollTop() > 0) {
          $(".navbar").removeClass("navbar-white");
        } else {
          $(".navbar").addClass("navbar-white");
        }
      },
    });
  }
  $("#pp-nav")
    .remove()
    .appendTo(".animsition")
    .addClass("white right-boxed d-none d-sm-block");
  $(".pp-nav-up").on("click", function () {
    $.fn.pagepiling.moveSectionUp();
  });
  $(".pp-nav-down").on("click", function () {
    $.fn.pagepiling.moveSectionDown();
  });
  $(".project-box").on("mouseover", function () {
    var index = $(".project-box").index(this);
    $(".bg-changer .section-bg")
      .removeClass("active")
      .eq(index)
      .addClass("active");
  });
  if ($(".js-form").length) {
    $(".js-form").each(function () {
      $(this).validate({
        errorClass: "error",
        submitHandler: function (form) {
          $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(form).serialize(),
            success: function () {
              $(".form-group-message").show();
              $("#error").hide();
              $("#success").show();
            },
            error: function () {
              $(".form-group-message").show();
              $("#success").hide();
              $("#error").show();
            },
          });
        },
      });
    });
  }
  $(".filtr-container").imagesLoaded(function () {
    var filterizr = $(".filtr-container").filterizr();
  });

  // portfolio filter
  $(".portfolio-filter-menu li").on("click", function () {
    $(".portfolio-filter-menu li").removeClass("active");
    $(this).addClass("active");
  });
})(jQuery);
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
// porfolio filterizr
const sectionEls = document.querySelectorAll('.section');
const navEls = document.querySelectorAll('.navlink');
console.log(sectionEls);
sectionEls.forEach(sectionEl => {
        console.log(sectionEl.id);
    
});

console.log(navEls);
let currentSection = 'page1';
console.log(currentSection);
window.addEventListener('scroll',()=>{
    sectionEls.forEach(sectionEl => {
        if(window.scrollY >= sectionEl.offsetTop-100){
            currentSection = sectionEl.id;
            console.log(currentSection);
        }
    });

    navEls.forEach(navEl => {
        if(navEl.href.includes(currentSection)){
            document.querySelector('.navactive').classList.remove('navactive');
            navEl.classList.add('navactive');
        }
    });

});