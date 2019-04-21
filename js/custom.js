
(function($) {

    "use strict";

    var wind = $(window);


    /* scroll animate
    -------------------------------------------------------*/
    var links = $('a[href*="#"]:not([href="#"])');
    links.on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
        var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - 75,
                }, 1000);
                return false;
            }
        }
    });
    

    /* Nav bar
    -------------------------------------------------------*/
    var app = function () {
        var body = undefined;
        var menu = undefined;
        var menuItems = undefined;
        var init = function init() {
            body = document.querySelector('body');
            menu = document.querySelector('.menu-icon');
            menuItems = document.querySelectorAll('.nav__list-item');

            applyListeners();
        };

        var applyListeners = function applyListeners() {
            menu.addEventListener('click', function () {
                return toggleClass(body, 'nav-active');
            });
        };

        $('.nav__list-item a').on("click", function(){
        $('body').removeClass('nav-active');
        });

        var toggleClass = function toggleClass(element, stringClass) {
            if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
        };

        init();
    }();


    $('.menu-icon').on('mouseleave', function(e){
        TweenMax.to(this, 0.3, {scale: 1});
        TweenMax.to('.icon-circle, .icon-m', 0.3,{scale:1, x: 0, y: 0});              
    });
    
    $('.menu-icon').on('mouseenter', function(e){
            TweenMax.to(this, 0.3, {transformOrigin: '0 0', scale: 1});
            TweenMax.to('.icon-circle', 0.3,{scale: 1.2});
    });
    
    $('.menu-icon').on('mousemove', function(e){   
        callParallax(e);
    });
   
    function callParallax(e){
        parallaxIt(e, '.icon-circle', 60);
        parallaxIt(e, '.icon-m', 40);
    }


    function parallaxIt(e, target, movement){
        var $this = $('.menu-icon');
        var boundingRect = $this[0].getBoundingClientRect();
        var relX = e.pageX - boundingRect.left;
        var relY = e.pageY - boundingRect.top;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        TweenMax.to(target, 0.3, {
        x: (relX - boundingRect.width/2) / boundingRect.width * movement,
        y: (relY - boundingRect.height/2 - scrollTop) / boundingRect.width * movement,
        ease: Power2.easeOut
        });
    }


    /* drawsvg icon
    -------------------------------------------------------*/
    var anim = true ;
    wind.on('scroll', function () {
        var bodyScroll = wind.scrollTop();
        var _target = $('#services').offset().top - 75
        if(bodyScroll>= _target){
            if(anim){
                $(".svg-icon").each(function () {
                    var $svg = $('.svg-icon').drawsvg({
                        duration: 4000,
                    });
                    $svg.drawsvg('animate');

                });
                anim = false;
            }
        }
    });


    /* sections background image from data background
    -------------------------------------------------------*/
    var cover = $(".cover-bg, section");
    cover.each(function() {
        var attr = $(this).attr('data-image-src');

        if (typeof attr !== typeof undefined && attr !== false) {
        $(this).css('background-image', 'url('+attr+')');
        }

    });


    /* progress bar
    -------------------------------------------------------*/
    wind.on('scroll', function () {
        $(".bar span").each(function () {
            var bottom_of_object =
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-width');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                width : myVal
                });
            }
        });
    });


    /* typejs
    -------------------------------------------------------*/
    $('.header .box-text h1 span').typed({
        strings:["a Designer","a freelancer","a Basketballer","a Web developer","an App Developer","a Guitarist", "a Dev-Operator"],
        loop: true,
        startDelay: 500,
        backDelay: 1000
    });

    
    /* owl carousel
    -------------------------------------------------------*/
    $('.about .owl-carousel').owlCarousel({
        loop:true,
        items:1,
        margin:30,
        dots: false,
        nav: true,
        navText:['<span> <i class="jam jam-arrow-left"></i> </span>',
            '<span> <i class="jam jam-arrow-right"></i> </span>'],
    });
  
    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });



    function loader() {
        $(window).on('load', function() {
            /* Preloader
            -------------------------------------------------------*/
            $(".loader").fadeOut(500);


            /* isotope
            -------------------------------------------------------*/
            var $gallery = $('.gallery').isotope({});
            $('.gallery').isotope({

                // options
                itemSelector: '.item-img',
                transitionDuration: '0.5s',

            });


            $(".gallery .single-image").fancybox({
                'transitionIn'  : 'elastic',
                'transitionOut' : 'elastic',
                'speedIn'   : 600,
                'speedOut'    : 200,
                'overlayShow' : false
            });


            /* filter items on button click
            -------------------------------------------------------*/
            $('.filtering').on( 'click', 'button', function() {

                var filterValue = $(this).attr('data-filter');

                $gallery.isotope({ filter: filterValue });

                });

            $('.filtering').on( 'click', 'button', function() {

                $(this).addClass('active').siblings().removeClass('active');

            });

            $(".filtering button").on('click', function() {
                $('html, body').animate({
                    scrollTop: $(".gallery").offset().top - 60
                }, 600);
            });

            var stickySidebar = new StickySidebar('#sidebar', {
                topSpacing: 60,
                bottomSpacing: 60,
                containerSelector: '.container',
                innerWrapperSelector: '.sidebar__inner'
            });
        });
    }loader();
    
})(jQuery);
