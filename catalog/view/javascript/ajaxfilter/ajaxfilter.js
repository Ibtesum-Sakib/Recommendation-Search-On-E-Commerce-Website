(function( $ ) {

	$.fn.layeredAjaxNavigation = function( initvar ) {

		/**
		 * Create List Layers By JSON Data.
		 */
		this.price = '';
		this.ischanged = false;

		this.callback = null;
		this.work = function(  callback ){

			var _this = this;
			this.callback = callback;
			this.createSlider();
			$('input:checkbox', this ).click( function() {
				_this.makeRequest( _this );
				_this.createSelection( _this );
				_this.ischanged = true;
			} );

			this.createSelection();
			$('.clear-all').click( function(){
				$('input:checkbox:checked', _this ).removeAttr('checked');
				$(".ajax-slider .clear-price").click();
				_this.createSelection();
			} );
 		},

 		this.createSlider = function(){
 			var _this = this;

 			$(".ajax-slider", this ).each( function ( el ) {
 				$( ".ajax-slider-el", el ).ionRangeSlider({
				    type: "double",
				    min: $(this).data('min'),
				    from:$(this).data('min'),
				    to:$(this).data('max'),
				    max:  $(this).data('max'),
				    grid: true,
				    prefix: $(this).data('prefix'),
				    postfix:$(this).data('postfix'),
				    onFinish:function( data ){
				    	// console.log( data );
				     	_this.price = (data.from_pretty.replace(/\s+/,"") + "," + data.to_pretty.replace(/\s+/,""));
				     	_this.makeRequest( _this );
				     	if( data.to != data.to_pretty || data.from != data.from_pretty ){
				     		$('.clear-price' , _this ).removeClass('hide').addClass('show');
				     	}else {
				     		$(this).removeClass('show').addClass('hide');
				     	}
				    }
				});

				$('.clear-price' , el ).click( function(){
	 				_this.price = "";
	 				$(this).removeClass('show').addClass('hide');
	 				_this.ischanged = true;
	 				_this.makeRequest( _this );
	 				var slider = $( ".ajax-slider-el", el ).data("ionRangeSlider");
	 				slider.reset();
	 			} );

 			} );
 		},

 		this.createSelection = function( _this ){

 			var container = $(".filter-selection", this).find(".list-group-content");
 			container.empty();

 			if( $('input:checkbox:checked', this ).length > 0 ){
 				$(".filter-selection", this).removeClass( "hide" ).addClass( "active" );
 			}else {
 				$(".filter-selection", this).removeClass( "active" ).addClass( "hide" );
 			}

 			$('input:checkbox:checked', this ).each( function( element ){
 				var _this = $(this);
 				var item = $('<div class="list-group-item-choosed"><span>'
 					+$(this).data("filter-name")
 					+'</span><span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span></div>');
 				item.click( function(){
 					_this.click();
 					item.remove();
 				} );
 				container.append( item );

 			} );
 		},

 		this.makeRequest = function( _this ){

 			var params = '';
 			$( ".filter-group", _this ).each( function () {
 				filter = [];
				$('input[name^=\''+$(this).data('group')+'\']:checked', this ).each(function(element) {
					filter.push(this.value);
				});
				if( filter.length > 0 ){
					params += "&" + $(this).data('group')+'=' + filter.join(',');
				}
 			} );

			var url 	 = $(this).data('action') + params;
			var storeUrl = $(this).data('store-action') + params;

			if( this.price != "" ){
				url += "&price="+this.price;
				storeUrl += "&price="+this.price;
			}

			if( params  != "" || this.price != "" || this.ischanged ){
				$.ajax({
					url: url,
					dataType:'json',
					beforeSend:function(){
						$('.products-collection' ).append( $('<div class="ajax-preloading"><div class="preloading-inner"></div></div>') );
					},
					}).done( function( data ) {
						window.history.pushState( null, null, storeUrl );
						_this.replaceContent( data );

				}	);
			}
 		},

 		this.replaceContent = function( data ){
 			$('.products-collection' ).html( data['products'] );

 			if (typeof this.callback === "function") {
 				this.callback( data );
 			}
 			$('.products-collection .ajax-preloading' ).remove();
 		}

		//THIS IS VERY IMPORTANT TO KEEP AT THE END
		return this;
	};

 	$(document).ready( function(){
 		if( $('.ajaxfilter') ) {


	 		$('.ajaxfilter').layeredAjaxNavigation( ''  ).work( function(){
	 			$('.products-collection #grid-view').click();

	 			var col = localStorage.getItem('grid-number');
	 			if( col ) {
	 				$('[data-grid='+col+"]").trigger('click');
	 			}
	 			$('.products-collection').find('select').select2();
	 		} );

			
		}
 	} );
})( jQuery );
/***/