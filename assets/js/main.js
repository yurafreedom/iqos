if(/Android/.test(navigator.appVersion)) {
	window.addEventListener("resize", function() {
		if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
			document.activeElement.scrollIntoView();
		}
	});
} 


var block = $('<div>').css({'height':'50px','width':'50px'}),
    indicator = $('<div>').css({'height':'200px'}),
    scrollbarWidth = 0;

$('body').append(block.append(indicator));
var w1 = $('div', block).innerWidth();    
block.css('overflow-y', 'scroll');
var w2 = $('div', block).innerWidth();
$(block).remove();
scrollbarWidth = (w1 - w2);


var bodyScrollOptions = {
    reserveScrollBarGap: true
};

function openModal(hrefModal) {
    
    if ($(hrefModal).length > 0){
        $(hrefModal).fadeIn(300);
    
        bodyScrollLock.clearAllBodyScrollLocks();
        bodyScrollLock.disableBodyScroll(hrefModal, bodyScrollOptions);
    }
}

function closeModals() {
	if (scrollbarWidth > 0) {
		$('.popup-block:not(:hidden)').fadeOut(200, function() {
            bodyScrollLock.clearAllBodyScrollLocks();
        });
	} else {
		$('.popup-block:not(:hidden)').fadeOut(200);
		
		bodyScrollLock.clearAllBodyScrollLocks();
	}
}


$(document.body).on('click','[data-toggle="modal"]',function(e) {
	e.preventDefault();
	
	var hrefModal = $(this).attr('data-target');
	
	openModal(hrefModal);
});

$(document.body).on('click','.popup-block__overlay',function(e) {
	var closeButton = $(this).children('[data-toggle="dismiss"]');
	
	if (e.target != this) {
//		return false;
	} else {
		closeModals();
	}
});


$(document.body).on('click','[data-toggle="dismiss"]',function(e) {
	e.preventDefault();
	
	closeModals();
});


$('[data-toggle="scroll-to-top"]').click(function(e) {
	e.preventDefault();

	$('html,body').animate({
		scrollTop: 0
	}, 600);
});

$('[data-toggle="anchor"]').click(function(e) {
	e.preventDefault();

	var dataTarget = $(this).attr('data-target'),
		targetPos = $(dataTarget).offset().top - 150;

	$('html,body').animate({
		scrollTop: targetPos
	}, 400);
});

$('[data-toggle="tab"]').click(function(e) {
	e.preventDefault();

	var dataTarget = $(this).attr('data-target');

	if ($(this).parent().is('li')) {
		$(this).addClass('active').parent().addClass('active').siblings().removeClass('active').children().removeClass('active');
	} else {
		$(this).addClass('active').siblings().removeClass('active');
	}

	$(dataTarget).addClass('active').siblings().removeClass('active');
});

$(window).on('scroll load orientationchange', function() {
	var scrolledHeight = 100;

	if ($(this).scrollTop() > scrolledHeight && !($('body').hasClass("scrolled")) ) {
		$('body').addClass("scrolled");
	} else if($(this).scrollTop() <= scrolledHeight && $('body').hasClass("scrolled")) {
		$('body').removeClass("scrolled");
	}
});

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $(this).addClass('active');
  $("#header-menu").addClass("active");
});

$("#menu-toggle-active").click(function(e) {
  e.preventDefault();
  $("#header-menu").removeClass("active");
});

$('#fullpage_iqos_block').fullpage({
	css3: true,
	autoScrolling: true,
	scrollBar: false,
	easingcss3: 'ease-in-out',
	normalScrollElements: '#header_menu, .page-footer__help-button',
	fitToSection: false,
	navigation: true,
	scrollOverflowOptions: { click: false },
	anchors: ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'services', 'projects', 'about', 'footer'],
	navigationPosition: 'left',
	afterRender: function() {
		var currentIndex = $('#fullpage_iqos_block .fp-section.active').index();

		playAnimation(currentIndex);
	},
	afterLoad: function(anchorLink, index) {
		playAnimation(index);

		if ($(window).width() >= 768) {

			if (index > 4 && !$('body').hasClass('last-slide')) {
				$.fn.fullpage.setAutoScrolling(false);
				$('body').addClass('last-slide');
			}
			
			if (index > 4 && index <= 8) {
				$('body').removeClass('help-hide');
			} else {
				$('body').addClass('help-hide');
			}
			
			if (index <= 5 && $('body').hasClass('last-slide')) {
				$('body').removeClass('last-slide');

				$.fn.fullpage.setAutoScrolling(true);
			}
			
		}
	}

});

if ($(window).width() < 768) {
	$.fn.fullpage.setAutoScrolling(false);
	$('body').addClass('last-slide');
}

function playAnimation() {
	var currentSection = $('#fullpage_iqos_block .section.active');
	
	var slice_row = currentSection.find(".animation-slice");
			
	$(currentSection).find('.first-block__slide-item').addClass('active');
	
	var allChars = $('#fullpage_iqos_block .section:not(.active)').find('.char');
	
	$(slice_row).each(function(){
		$(this).find('.char').each(function(i) {
			var charItem = $(this);
		
			setTimeout(function() {
				charItem.addClass('active');
			}, 50*i);
		});
	});
	
	$('#fullpage_iqos_block .section:not(.active)').find('.first-block__slide-item').removeClass('active');
	
	$(allChars).each(function() {
		$(this).removeClass('active');
	});
}

$('#header_logo').on('click', function(e) {
	e.preventDefault();
	
	setTimeout(function() {
		$.fn.fullpage.moveTo(1); 
	}, 350);
});

$('[data-toggle="menu-scroll"]').on('click', function(e) {
	e.preventDefault();
	
	var thisCurrentIndex = $('#fullpage_iqos_block .section.active').index() + 1;

	var thisTarget = $(this).data('target');
	
	var thisTargetIndex = $(thisTarget).parents('.section').index() + 1;
	
	$('#header_menu').removeClass('active');
	$('#header_menu_overlay').fadeOut(200);
	
	
	if (thisTargetIndex > thisCurrentIndex) {
		$.fn.fullpage.moveTo(thisTargetIndex);
	} else {
		$.fn.fullpage.moveTo(thisTargetIndex - 1);
		$.fn.fullpage.moveTo(thisTargetIndex);
	}
	
});

if('#fp-nav ul li a').hasClass('active', function() {
	$('#fp-nav ul li').addClass('active');
});

// $('#fp-nav ul li a.active').on('click', function() {
// 	$('#fp-nav ul li').addClass('active');
// });
