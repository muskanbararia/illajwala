$(document).ready(function(){
	
	// skip height change below certain limit.
	// while viewport height is below 465, keep it 465.
	// while viewport height is more than that, change it to maximum.
	
	var slideMinHeight = 465;
	var viewPortDimensions;
	var slides = $('.a-slide');
	
	/**
	 * Onload Functions
	 */ 
	resizeSlides();
	
	window.onresize = function(){
		resizeSlides();
	};
	
	/**
	 * DOM DEPENDENT FUNCTION DEFINITIONS
	 */
	function resizeSlides() {
		viewPortDimensions = getViewPortDimensions();
		
		if ( viewPortDimensions.height < slideMinHeight ) {
			// set slideMinHeight
			slides.css({ height: slideMinHeight + 'px' });
			return;
		}
		
		slides.css({ height: viewPortDimensions.height + 'px' });
		return;
	}
	
	
	$(document).on('click', '.b-scrollToElementById', function () {
		var scrollToId = $( "#" + $(this).attr('data-scrollToId') + "" );
		
		$('html, body').animate({
	        scrollTop: scrollToId.offset().top
	    }, 700);
	});
	
	function getViewPortDimensions(){
		return {
			height: $(window).height(),
			width: $(window).width()
		};
	}

	function toNextSlideTop(){
		// slide to top of next slide.
	}

	function resizeElement(ele, options) {
		ele.css({
				height : options.height,
				width : options.width
			});
	}

	function scrollToElementById (id) {
		
	}

});