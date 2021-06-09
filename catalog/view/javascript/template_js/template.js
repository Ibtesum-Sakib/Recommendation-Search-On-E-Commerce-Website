 function ressearch(){
if ($(window).width() < 768){
$('#head-search').click(function(){
  setTimeout(function() { $('#search-input').focus() }, 3000);
  $('#search').show(function(){
    document.body.addEventListener('click', boxCloser, false);
  });

  $('#search').addClass('active');
});

$('#cart').appendTo('.cart_icon');
}
else{
  $('#cart').appendTo('.header-cart');
}
}
$(window).ready(function(){ressearch();});
$(window).resize(function(){ressearch();});

function boxCloser(e){
  if(e.target.id != 'search-input'){
     document.body.removeEventListener('click', boxCloser, false);
     $('#search').hide();
     $('#search').removeClass('active');
  }
  else{
        $('#search').show();
        $('#search').addClass('active');
    }
}


function refeaturedp(){
    var size_item = $(".featured .section-product div.product-items").size();
    if ($(window).width() > 650){
      var x=5;
    }
    else{
      var x=4;
    }
    $('.featured .nomore').hide();
    $('.featured .section-product div.product-items:lt('+x+')').fadeIn('slow');
    $('.loadmore').click(function () {
    if(x==size_item){
             $('.featured .nomore').show();
              $('.featured .loadmore').hide();
    }else{
        if ($(window).width() > 650){
         x= (x+5 <= size_item) ? x+5 : size_item;
        }
        else
        {
          x= (x+2 <= size_item) ? x+2 : size_item;
        }
        $('.featured .section-product div.product-items:lt('+x+')').fadeIn('slow');
    }
    });

}
$(window).ready(function(){refeaturedp();});
$(window).resize(function(){refeaturedp();});


/* JS is for left category tree view  */
function categorytreeview(){

    if($('.left-category').hasClass('treeview')==true){
        $(".treeview-list").treeview({
        animated: "slow",
        collapsed: true,
        unique: true
    });
    $('.left-category.treeview-list a.active').parent().removeClass('expandable');
    $('.left-category.treeview-list a.active').parent().addClass('collapsable');
    $('.left-category.treeview-list .collapsable > ul.collapsable').css('display','block');
    }
}

$(document).ready(function(){categorytreeview();});

function menuactiveonhover() {
    if (jQuery(window).width() > 767) {
    $( "#menu .main-navigation li:first-child" ).addClass('active');
    $( ".main-navigation > li" ).hover(
     function() {
      $( this ).parent('#menu ul').find('li.active').removeClass( "active" );
      $( this ).addClass( "active" );
    }
    );
    }
        else {
            $( "#menu .main-navigation li:first-child" ).removeClass('active');
        }
    }
$(document).ready(function(){menuactiveonhover();});
$(document).resize(function(){menuactiveonhover();});


/*----------- menu hover -------------------*/

$(document).ready(function () {
  var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();
    $('.featured.section').appendTo('.category_product .row:first-child');
    $('#tabs a').tabs();
    $('#responsive-menu').appendTo('.header-middle-outer');
    $('.prodbottominfo').appendTo('#product');

});


/* JS for Top button */
$(document).ready(function(){
$("body").append("<a id='scrollup' title='Back To Top' href=''></a>");
$('#content h1').prependTo('ul.breadcrumb');

//$('ul.breadcrumb').prependTo('#content');
(function($) {
    $(document).ready(function(){

        //When distance from top = 250px fade button in/out
        $(window).scroll(function(){
                if ($(window).scrollTop() > 200) {
                    $('#scrollup').fadeIn(300);
                 }
                  else {
                    $('#scrollup').fadeOut(300);
                 }

        });

        //On click scroll to top of page t = 1000ms
        $('#scrollup').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
        });

    });
})(jQuery);
});

function langcurrres(){
if ($(window).width() < 768){
    $('#form-currency').appendTo('.header-middle-outer');
    $('#form-language').appendTo('.header-middle-outer');
    $('.header-link').appendTo('.header-middle-outer');
}
else{
    $('#form-currency').appendTo('.header-top-left');
    $('#form-language').appendTo('.header-top-left');
    $('.header-link').appendTo('.header-link-search');
}
}
$(window).ready(function(){langcurrres();});
$(window).resize(function(){langcurrres();});

/* JS is for responsive menu dropdown */
$(document).ready(function(){
 $(".responsive-bar").click(function(){
        if($('.header-middle-outer').hasClass('closetoggle')) {
        $($('.header-middle-outer')).removeClass('closetoggle').addClass('opentoggle');
        $($('.responsive-bar')).addClass('active');
        $($('body')).addClass('nav-open');

    }
    else{
        $($('.header-middle-outer')).removeClass('opentoggle').addClass('closetoggle');
        $($('.responsive-bar')).removeClass('active');
        $($('body')).removeClass('nav-open');
    }
    });
    $("#responsive-menu ul > li.dropdown > span").click(function(){
        if($('#responsive-menu ul > li.dropdown').hasClass('active')) {
        $($('#responsive-menu ul > li.dropdown')).removeClass('active').addClass('');
        $($('#responsive-menu ul > li.dropdown > ul')).addClass('menuopen');

    }
    else{
        $($('#responsive-menu ul > li.dropdown')).addClass('active');
        $($('#responsive-menu ul > li.dropdown > ul')).removeClass('menuopen');
    }
    });

});

