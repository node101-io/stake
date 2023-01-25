$(function () {

    // NOTE : we will add all public scripts here after testing
    const isMobile = Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1;

    AOS.init();
    if (document.getElementsByClassName('headerSwiper').length > 0) {
        new Swiper(".headerSwiper", {
            slidesPerView: 3,
            autoHeight: true,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            loopFillGroupWithBlank: true,
            navigation: {
                enabled: true,
                nextEl: ".slider .arrows .left-arrow",
                prevEl: ".slider .arrows .right-arrow",
            },
        });
    }

    if (document.getElementsByClassName('main-container').length > 0) {
        let mainContainer = document.querySelector('.main-container');
        $('.center-halo img').css('top', mainContainer.offsetHeight / 2)
    }

    if (document.body.id === 'testnet-guid') {
        EnlighterJS.enlight(document.getElementById('codeblock1'), {
            language: 'javascript',
            theme: 'bootstrap4',
            lineoffset: 1,
            highlight: '',
            rawcodeDbclick: false
        });
        document.querySelectorAll('.codeblock2').forEach(function (item) {
            EnlighterJS.enlight(item, {
                language: 'bash',
                theme: 'bootstrap4',
                lineoffset: 1,
                linenumbers: false,
                highlight: '',
                rawcodeDbclick: false
            });
        });
    }

    if (document.body.id === 'library') {
        const progressBar = document.querySelector(".lib-slider-progress");
        const librarySwiper = new Swiper(".librarySwiper", {
            loop: true,
            speed: 800,
            slidesPerView: 1,
            effect: 'fade',
            autoHeight: false,
            spaceBetween: 30,
            navigation: {
                enabled: true,
                nextEl: ".main-slider .arrows .lib-right-arrow",
                prevEl: ".main-slider .arrows .lib-left-arrow",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            }
        });

        progressBar.addEventListener("animationend", myEndFunction);

        function myEndFunction() {
            librarySwiper.slideNext();
            progressBar.style.animation = "none";
            void progressBar.offsetWidth;
            progressBar.style.animation = null;
        }

        librarySwiper.on("slideChange", function () {
            progressBar.style.animation = "none";
            void progressBar.offsetWidth;
            progressBar.style.animation = null;
        });

        document.querySelectorAll(".swiper .detail").forEach((item) => {
            item.addEventListener("mouseenter", function () {
                progressBar.style.animationPlayState = "paused";
            });
        });

        document.querySelectorAll(".swiper .detail").forEach((item) => {
            item.addEventListener("mouseleave", function () {
                progressBar.style.animationPlayState = "running";
            });
        });
    }

    if (document.body.id === 'article') {
        $(window).scroll(function () {
            if (!isMobile) {
                var threshold = 0;
                if ($(window).scrollTop() >= threshold)
                    $('#sidebar').addClass('fixed');
                else
                    $('#sidebar').removeClass('fixed');
                var check = $("#content").height() - $("#sidebar").height() + 160;
                if ($(window).scrollTop() >= check)
                    $('#sidebar').addClass('bottom');
                else
                    $('#sidebar').removeClass('bottom');
            }
            document.querySelector(".progress").style.width = (($(window).scrollTop() * 100) / $("#post-container").height()) + '%';
        });
    }
    if (document.body.id === 'document') {
        $(window).scroll(function () {
            if (!isMobile) {
                var threshold = 0;
                if ($(window).scrollTop() >= threshold)
                    $('#sidebar').addClass('fixed');
                else
                    $('#sidebar').removeClass('fixed');
                var check = $("#content").height() - $("#sidebar").height() + 160;
                if ($(window).scrollTop() >= check)
                    $('#sidebar').addClass('bottom');
                else
                    $('#sidebar').removeClass('bottom');
            }
            document.querySelector(".progress").style.width = (($(window).scrollTop() * 100) / ($("#content").height() - 600)) + '%';
        });
    }

    $(document).ready(function ($) {

        if (document.body.id === 'home') {
            // https://github.com/alvarotrigo/pagePiling.js/
            $('#pagepiling').pagepiling({
                menu: '.navbar',
                onLeave: function (index, nextIndex, direction) {
                    console.log('on leave : #section' + index)
                    var lastView = $('#section' + index).find('.inner');
                    var nextView = $('#section' + nextIndex).find('.inner');

                    if (direction === 'down') {
                        nextView.fadeIn(1000)
                    } else {
                        lastView.css('display', 'none')
                        nextView.fadeIn(500)
                    }

                    let bigi = $('.shape-fixed.bigi-oval')
                    let liti = $('.shape-fixed.liti-oval')
                    switch (nextIndex) {
                        case 1:
                            if (isMobile) {
                                bigi.css({
                                    height: '100vh',
                                    width: 'auto',
                                    transform: 'translate(-25%, 5%) scale(1)',
                                })
                                liti.css({
                                    transform: 'rotate(80deg)',
                                    top: '35vh',
                                    left: '20vw'
                                })
                            } else {
                                bigi.css({
                                    scale: '1.2',
                                    'transform': 'translate(0, -20%)',
                                })
                                liti.css({
                                    transform: 'rotate(80deg)',
                                    scale: '1',
                                    top: '25vh',
                                    left: '30vw'
                                })
                            }
                            break;
                        case 2:
                            bigi.parent('div').addClass("position-fixed")
                            if (isMobile) {
                                bigi.css({
                                    transform: 'translate(15% , -5%) scale(1) rotate(80deg)',
                                    filter: 'none',
                                })
                                liti.css({
                                    transform: 'rotate(-80deg)',
                                    scale: '1',
                                    top: '75vh',
                                    left: '-20vh'
                                })
                            } else {
                                bigi.css({
                                    scale: '1',
                                    transform: 'translate(15%, -35%) rotate(80deg)',
                                    filter: 'none'
                                })
                                liti.css({
                                    transform: 'rotate(-80deg)',
                                    scale: '1',
                                    top: '75vh',
                                    left: '-25vh'
                                })
                            }
                            break;
                        case 3:
                            if (isMobile) {
                                bigi.css({
                                    position: 'absolute',
                                    transform: 'translate(-23%,-45vh) scale(1) rotate(180deg)',
                                })
                                liti.css({
                                    transform: 'rotate(-60deg)',
                                    scale: '0.8',
                                    top: '85vh',
                                    left: '-10vh'
                                })
                            } else {
                                bigi.css({
                                    position: 'absolute',
                                    scale: '0.8',
                                    transform: 'translate(0,-70%)'
                                })
                                liti.css({
                                    transform: 'rotate(80deg)',
                                    top: '50vh',
                                    left: '100px',
                                    scale: '0.4',
                                })
                            }
                            setTimeout(function () {
                                if (isMobile) {
                                    bigi.css({filter: 'blur(10px)'})
                                } else {
                                    bigi.css({filter: 'blur(15px)'})
                                }
                            }, 500);
                            bigi.parent('div').removeClass("position-fixed")
                            break;
                    }

                    if (nextIndex === 3) {
                        $('.mouse-scroll').fadeOut()
                    } else {
                        $('.mouse-scroll').fadeIn()
                    }
                }
            });

            $(".mouse-scroll").click(function (e) {
                $.fn.pagepiling.moveSectionDown();
            });

            $('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        }

        const helperArea = $('.helper-area')
        $('.helper-area i').on('click', function () {
            if (helperArea.hasClass('show')) {
                helperArea.removeClass('show')
            } else {
                helperArea.addClass('show')
            }
        })
    });

    window.onload = function (){
        $('.preloader').fadeOut();
    }

    const openNavBtn = $('#nav-open')
    const closeNavBtn = $('#nav-close')
    const navMobile = $('.navbar-mobile')

    openNavBtn.on('click', function () {
        navMobile.fadeIn().css('display' , 'flex')
        $('body').css('overflow', 'hidden')
        let mobileNav = document.querySelector('.navbar-mobile');
        let mobileNavHead = document.querySelector('.navbar-mobile .navbar-head');
        $('.navbar-mobile .navbar-bottom').css('height', mobileNav.offsetHeight -  mobileNavHead.offsetHeight )
    });

    const elems = document.querySelectorAll(".navbar-mobile .nav.navbar-nav button");

    closeNavBtn.on('click', function () {
        navMobile.fadeOut()
        $('body').css('overflow', '')
        Array.from(elems).forEach(function (el) {
            const dataId = el.getAttribute("data-id")
            if (dataId === 'mobile-nav-parent'){
                document.getElementById(dataId).style.display = 'flex'
            }else {
                document.getElementById(dataId).style.display = 'none'
            }
        })
    });

    const headerSocial = document.getElementById("header-social")
    Array.from(elems).forEach(function (el) {
        el.addEventListener('click', function (e) {
            const dataId = el.getAttribute("data-id")

            if (dataId !== 'mobile-nav-parent'){
                headerSocial.style.display = 'none'
            }else{
                headerSocial.style.display = 'flex'
            }
            el.parentNode.parentElement.style.display = 'none'
            document.getElementById(dataId).style.display = 'flex'
        })
    });
})