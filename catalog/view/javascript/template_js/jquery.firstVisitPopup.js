/*
 * First Visit Popup jQuery Plugin version 1.2
 * Chris Cook - chris@chris-cook.co.uk
 */

(function ($) {

	'use strict';

	$.fn.firstVisitPopup = function (settings) {

		var $body = $('body');
		var $dialog = $(this);
		var $blackout;
		var setCookie = function (name, value) {
			var date = new Date(),
				expires = 'expires=';
			date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 1);
			expires += date.toGMTString();
			document.cookie = name + '=' + value + '; ' + expires + '; path=/';
		}
		var getCookie = function (name) {
			var allCookies = document.cookie.split(';'),
				cookieCounter = 0,
				currentCookie = '';
			for (cookieCounter = 0; cookieCounter < allCookies.length; cookieCounter++) {
				currentCookie = allCookies[cookieCounter];
				while (currentCookie.charAt(0) === ' ') {
					currentCookie = currentCookie.substring(1, currentCookie.length);
				}
				if (currentCookie.indexOf(name + '=') === 0) {
					return currentCookie.substring(name.length + 1, currentCookie.length);
				}
			}
			return false;
		}
		var showMessage = function () {
			$blackout.show();
			$dialog.show();
			 $(".common-home #subscribe-me").modal('show'); 
		}
		var hideMessage = function () {
			$blackout.hide();
			$dialog.hide();
			$(".common-home #subscribe-me").modal('hide'); 
			setCookie('fvpp' + settings.cookieName, 'true');
		}

		$( ".newsletter-popup" ).append('<a id="xout">X</a>');
		$blackout = $('#fvpp-blackout');

		if (getCookie('fvpp' + settings.cookieName)) {
			hideMessage();
		} else {
			showMessage();
		}
		
		

		$('#checkme:checkbox').change(function() {
			// this will contain a reference to the checkbox   
			if (this.checked) {
				$body.on('click', '#email-popup-submit', hideMessage);
			} else {
				//$body.on('click', '#email-popup-submit', hideMessage);
			}
		});



		$(settings.showAgainSelector).on('click', showMessage);
		$body.on('click', '#fvpp-blackout, #xout', hideMessage);

	};
	



})(jQuery);
