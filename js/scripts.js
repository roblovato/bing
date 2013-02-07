jQuery.extend( jQuery.easing, {
	easeInOut: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});

content_panel_width = 960;

function checkWidth() {
	ul_width_proper = get_ticker_box_width() + 160; //get current width of boxes ul and add 160px for airport box
	$("#boxes ul").width(ul_width_proper); //set new width of boxes ul
}

function checkVisible() {
	visible_boxes = get_number_visible_boxes();
	if(visible_boxes > 5){
		$(tickRight);			
	}
}

//Show airport
function airportShow() {
	$(checkWidth);
	$('#boxes #12').show('slow');
	$(checkVisible);
}

function titleChange() {
	$('#greeting h1').fadeOut('fast', function() {
    	$(this).text("Thanks for subscribing. Help us get to know you better.").fadeIn('fast');
	});
}

function subLastTitle() {
	$('#greeting h1').fadeOut('fast', function() {
    	$(this).text("Now check your email to finish subscribing").fadeIn('fast');
	});
}

function sendLoad() {
	$('.load_container #p2_next').fadeOut(300,function(){
		$('.load_container').html('<div class="saving">Saving...</div>');
	});
}

function switchSave() {
	$('.load_container .saving').fadeOut(300,function(){
		$('.load_container').html('<input type="submit" id="p2_next" class="next_alt" value="Subscribe">');
	});
}

function get_ticker_box_width(){
	ul_width = $("#boxes ul").css("width");
	ul_width_len = ul_width.length;
	ul_width_proper = parseInt(ul_width.substr(0,(ul_width_len - 2)));
	return ul_width_proper;
}

function get_ticker_calc(){
	ul_pos = $("#boxes ul").css("left");
	ul_pos_len = ul_pos.length;
	ul_pos_proper = parseInt(ul_pos.substr(1,(ul_pos_len - 2)));
	return ul_pos_proper;
}

function get_number_visible_boxes(){
	visible_boxes = $('#boxes ul li').filter(":visible").length;
	return visible_boxes;
}

function get_ticker_box_position(){
	ul_left_pos = $('#boxes ul').position().left;
	return ul_left_pos;
}

function show_ticker_control(){
	box_left_pos = get_ticker_box_position();
	box_width = get_ticker_box_width();
	box_calc = get_ticker_calc();
	if(box_left_pos <= -160 && box_width > 800){
		$('#t_prev').fadeIn(300);
	}else if (box_left_pos > -160){
		$('#t_prev').fadeOut(100);
	};
	if (box_left_pos == 0 && box_width > 800 || box_width - box_calc > 800){
		$('#t_next').fadeIn(300);
	}else if (box_width - box_calc == 800){
		$('#t_next').fadeOut(100);
	}
}

function get_panel_position(){
	panel_left_pos = $('#sections_inner').position().left;
	return panel_left_pos;
}

function show_back(){
	panel_pos = get_panel_position();
	if(panel_pos == -960 || panel_pos == -3840) {
		$('#back').fadeIn();
	}else {
		$('#back').fadeOut(100);
	}
	if(panel_pos == -4800) {
		$(subLastTitle);
	}
}

function tickRight(){
	$('#boxes ul').animate({'left':'-=160px'}, 300, function(){
		$(show_ticker_control);
	});
}

function tickLeft(){
	$('#boxes ul').animate({'left':'+=160px'}, 300, function(){
		$(show_ticker_control);
	});
}

function positionLightboxImage() {
	var top = ($(window).height() - $('#lightbox').height()) / 2;
	var left = ($(window).width() - $('#lightbox').width()) / 2;
	$('#lightbox').css({'top': 50, 'left': left}).fadeIn(function(){
		var win_height = $('#lightbox').height() + 100;
		$('#overlay').css({'top' : 0, 'height' : win_height});
	});
}

function removeLightbox() {
	$('#overlay, #lightbox').fadeOut('slow', function() {
    	$(this).remove();
    });
}

function move_to_second_panel(){
	$(move_panel(1));
}

$(document).ready(function() {
	
	$('#test').click(function(){
		$(move_panel(1));
	});
	
	$('#testback').click(function(){
		$(move_panel(-1));
	});
	
	$('a.lightbox').click(function(e) {
		$('<div id="overlay"></div>')
	    	.css('top', $(document).scrollTop())
	    	.css('opacity', '0')
	    	.animate({'opacity': '0.5'}, 'slow')
	    	.appendTo('body');
	    $('<div id="lightbox"><a id="lb_close">Close</a></div>')
	    	.hide()
	    	.appendTo('body');
	    $('<img />').attr('src', $(this).attr('href')).load(function() {
	        	positionLightboxImage();
	      	}).appendTo('#lightbox');
	    $('#lb_close, #overlay').click(function(){
			$(removeLightbox);
		});
	    return false;;
	});
	
	//Give each ticker box an id
	$('#boxes ul li').each(function(index) {
    	$(this).attr('id', index);
	});
	
	$('#boxes img').each(function(index) {
    	$(this).attr('id', 'img_'+index);
	});
	
	$('#back a').bind("click",function(){
		if (!$("#sections_inner").is(":animated")) {
			panel_pos = get_panel_position();
			if (panel_pos == -2880 && $('#bing_2').is(':not(:checked)')) {
				$(move_panel(-2));
			}
			else {
				$(move_panel(-1));
			}
		}
	});
	
	$('.next_control').click(function(){
		skip_id = this.id;
		if(skip_id == "shopping_skip"){
			if($("#newsletters_form #bing_3").is(':checked')){
				$(move_panel(1));
			}else{
				$(move_panel(3));
			}
		}else{
			$(move_panel(1));
		}
	});
	
	$('#t_next').click(function(){
		$(tickRight);
	});
	
	$('#t_prev').click(function(){
		$(tickLeft);
	});
	
	
	//Show boxes and scroll
	$(".check").change(function(){
		//count the number of checkboxes that are ticked
		var num_checked = $('.check').filter(":checked").length;
		var id_string = this.id;
		var id_num = id_string.substr(5);
		
		ul_width_proper = get_ticker_box_width(); //get current width of boxes ul
		ul_pos = get_ticker_box_position();
		
		if ($(this).is(':checked')) {
			ul_width_proper = ul_width_proper + 160;
			$("#boxes ul").width(ul_width_proper);
			$('#boxes #'+id_num).show('slow');
			
			visible_boxes = $('#boxes ul li').filter(":visible").length;
			if(visible_boxes > 5){
				$(tickRight);								
			}					
		}else{
			ul_width_proper = ul_width_proper - 160;
			$("#boxes ul").width(ul_width_proper);
			$('#boxes #'+id_num).hide('slow');
			visible_boxes = $('#boxes ul li').filter(":visible").length;
			if(visible_boxes <= 5){
				$("#boxes ul").css("left","0px;");
			}else if(ul_pos < 0){
				$(tickLeft);
			}		
		}
		
		var num_checked = $('.check').filter(":checked").length;
		if(num_checked >= 1){
			$('#sub_p1_next').removeClass('disabled').animate({opacity: 1});
		}else if(num_checked <= 1){
			$('#sub_p1_next').addClass('disabled').animate({opacity: .3});
		}
	});
	
	$('#sub_p1_next').click(function(){
		var num_checked = $('.check').filter(":checked").length;
		if(num_checked >= 1){
			$(move_panel(1));	
		}
		
	});
	
	//Stop tab function
	$('input#airport').attr('tabindex', '-1');
	
	//Add email and zip
	$('#email').blur(function(){
		var email = $("#email").val();
		$("#email_display").html(email);
		if ($('#boxes #4').is(':not(:visible)')) {
			$(checkWidth);			
			$('#boxes #4').show('slow');
			$(checkVisible);
		}
	});
	
	$('#zip').focusout(function(){
		var zip = $("#zip").val();
		if ($("#zip").val() != ('')) {
			$("#zip_display").html(zip);
			if ($('#boxes #5').is(':not(:visible)')) {
				$(checkWidth);			
				$('#boxes #5').show('slow');
				$(checkVisible);
			}
		}
	});
	
	//Stylize the checkboxes & radios
	$('input[type="checkbox"]').button();
	$('input[type="radio"]').button();
	
	var ua = $.browser;
	if ( ua.msie && ua.version.slice(0,1) == "7" ) {
		$('input[type="checkbox"]').button('destroy');
		$('input[type="radio"]').button('destroy');
	}
	
	//Validate email
	$("#newsletters_form").validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			zip: {
				minlength: 5,
				digits: true
			}
		},
		messages: {
			zip: {
				digits: ("Please enter only numbers"),
				minlength: jQuery.format("Please enter {0} numbers")
			}
		}
	});

	//post data to processing server
	//email and zipcode are validated outside of this process
	//this is a jsonp request, json response is handled by function 'json_handler'
	$("form#newsletters_form").submit(function(form){
		if($("#newsletters_form").valid()){
			$(sendLoad);
			form.preventDefault();
			setTimeout('move_panel(1)', 1000);				
		}else{
			return false;
		}
	});
	
	//post travel data to processing server
	$("form#travel_form2").submit(function(form){
		form.preventDefault();
		setTimeout('move_panel(1)', 1000);			
	});
	
	//post shopping data to processing server
	$("form#shopping_form").submit(function(form){
		form.preventDefault();
		setTimeout('move_panel(1)', 1000);
	});				
	
	//autocomplete binding
	$("#airport").autocomplete(
		{ 
			source: airport_codes,
			minLength: 3,
			select: function(event, ui) { 
				$("#airport_display").html(ui.item.label);
				airportShow();
			} 
		}
	);	

}); //end doc ready

function show_back_button(){
	$("#back").show();
}

