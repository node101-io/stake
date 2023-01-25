$(function () {
    $.scrollify({
        section: ".home-slide",
        scrollSpeed: 800,
        before: function (i, slides) {
            let ref = slides[i].attr("data-section-name");
            let ms = document.querySelector(".mouse-scroll")
            ms.style.display = ref === "first-slide" || ref === "second-slide" ? "block" : "none"
            console.log(ref)

                   if (ref === 'first-slide') {
                       $('.shape-fixed.bigi-oval').removeClass('step-2');
                       $('.shape-fixed.liti-oval').removeClass('step-2');

                   } else if (ref === "second-slide") {
                       $('.shape-fixed.bigi-oval').addClass('step-2').removeClass('step-3').removeClass('absolute');
                       $('.shape-fixed.liti-oval').addClass('step-2').removeClass('step-3').removeClass('absolute');

                   } else {
                       $('.shape-fixed.bigi-oval').addClass('step-3');
                       // $('.shape-fixed.liti-oval').removeClass('step-2');
                       // $('.shape-fixed.bigi-oval').addClass('step-1');
                       // $('.shape-fixed.liti-oval').removeClass('step-2');
                       // $('.shape-fixed.bigi-oval').addClass('step-3');
                       // $('.shape-fixed.liti-oval').addClass('step-2');
                   }
        },
        after: function (i, slides) {
       /*     let ref = slides[i].attr("data-section-name");
            if (ref !== "first-slide" && ref !== "second-slide") {
                   setTimeout(function () {
                       $('.shape-fixed.bigi-oval').addClass('absolute')
                   }, 1000);

            }*/
            initialPosition()
        },
        afterResize: initialPosition,
        afterRender: initialPosition
    });

    $(".mouse-scroll").click(function (e) {
        e.preventDefault();
        $.scrollify.next();
    });

    function initialPosition() {
        // var current = $.scrollify.current();
        // console.log(current)


        // if(current.hasClass("content")===true) {
        //
        // }
        /*    if(current.hasClass("ios7")===false) {
                var height = parseInt($(".ios7").height());
                var f = parseInt($(".features .gallery1").height()) - 50;

                var top = 0 - (height*0.4) - (height-f);
                $(".ios7 .gallery0").css("top",top);
            } else {
                $(".features").find(".gallery0,.gallery1,.gallery2").addClass("moved");
            }*/

    }

    /*    $(document).ready(function() {
            $(document).scroll(function() {
                var compensation = $(window).height() * 3;
                var content = ($('.panel.content').offset().top);
                var scrollPos = $(document).scrollTop();
                // console.log("scroll Pos: " +scrollPos)
                // console.log("content top: " +content)
                if (scrollPos >= content) {
                    $.scrollify.disable();
                }
                else {
                    $.scrollify.enable();
                    $.scrollify.update();
                }
            })
        })*/

    $('navbar-hamb').on('click',function (){
        alert('hi')
    });


    // fix scrollbar in the fancybox
    $( document ).on('beforeShow.fb', () => {
        $('body').css('overflow', 'hidden');

        setTimeout(() => {
            $('body').addClass('fancybox-open');
        }, 10);
    });

    $( document ).on('beforeClose.fb', () => {
        $('body').removeClass('fancybox-open');
    });

    $( document ).on('afterClose.fb', () => {
        $('body').css('overflow', '');
    });


    $( document ).on('keyup', (e) => {
        if (27 === e.keyCode) {
            $.fancybox.close();
        }
    });


});
