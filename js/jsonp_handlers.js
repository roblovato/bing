function json_handler(data){
	var status = data.request.status;
	if(status == "success"){
		setTimeout(switchSave,1000);
		$(titleChange);
		if($("#bing_2").is(':checked')) {
			move_panel(1);
			return false;
		}else if($("#bing_3").is(':checked')){				
			move_panel(2); //move user to first panel for Travel
			return false;
		}else if($("#bing_2").not(':checked') && $("#bing_3").not(':checked')){
			move_panel(4);
			return false;
		} 
	}else{
		if(status == "user exists"){
			alert("This email address has already been registered.");
			$(switchSave);
			$(show_back);
		}else{
			alert("Your information could not be saved at this time.");
			$(switchSave);
			$(show_back);	
		}		
	}
}

function shopping_handler(data){
	var status = data.request.status;
	if(status == "success"){
		if($("#bing_3").is(':checked')){	
			move_panel(1); //move to first panel for Travel
		}else{
			move_panel(3); //move to last panel	
		}		
		return false;
	}else{
		alert("Your information could not be saved.");
	}
}

function travel_handler(data){
	var status = data.request.status;
	var message = data.message
	if(status == "success"){
		move_panel(1); //move user to last panel
		return false;
	}else{
		alert("Your information could not be saved.");
	}
}

/**
 * move_panel
 * argument: num_panels_to_move, the number of panels to be animated
 * num_panels_to_move is multiplied against global variable content_panel_width
 * to get the total number of pixels to move
 */
function move_panel(num_panels_to_move){
	total_to_move = num_panels_to_move * content_panel_width;
	$('#sections_inner').animate({'left':'-=' + total_to_move}, 800, 'easeInOut', function(){$(show_back);});
}
