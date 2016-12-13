$(document).ready(function(){


	/* 
	=======================================================
		selecton controller
	=======================================================
	*/


	// Begin counter of selections
	selectionCount = 0;  
	$('p').mouseup(function() {
		// Increase selection counter. This is used for creating a unique name of each selection
		selectionCount++;

		// When questionbox is open and you make an new selection, the questionbox will be closed
		questionBox.close();

		// Set properties for the span element.
		selectionElement = {
			name: 'selection-' + selectionCount,
			dataSelection: 'data-selection' + selectionCount 
		}

		// Make new instance for each selection and fire the marker class
		select = new selectionMarker( selectionElement );
		select.marker();

	});


	// When you click on already existing text
	$('.content').on('click', '.selected-text', function(){

		// First get the data again
		data = tooltipMenu.getData(this);

		// With this data, open the tooltipMenu again
		tooltipMenu.open(data);

		// Make this element active 
		select.makeActive(this);
	});



	/* 
	=======================================================
		Toolbox controller
	=======================================================
	*/


	// When you click on question tooltip button
	$('.content').on('click', '.tooltip-question', function(){
		tooltipMenu.question_button();
	});

	// When you click on remove tooltip button
	$('.content').on('click', '.tooltip-remove', function(){
		select.deselect();
	});

	// Trigger to open the color palette
		$('.content').on('click', '.tooltip-color', function(){
		$( '.colorPicker-picker' ).trigger( "click" );
	});


	// controller collor picker
	//Set clicked color to the active selection
		$('body').on('click', '.colorPicker-swatch', function(){    
		color = $(this).css('background-color');
		$('.active-selection').css('background', color);
	});


	/* 
	=======================================================
		question_form controller
	=======================================================
	*/	


	// When you click on send button in question box
	$('body').on('click', '.send-btn', function(){
		data_selection = $('.active-selection').attr('data-selection');
		question_text = question_form.get_field_val();

		
		chatbox.add(data_selection, question_text);


		// In all cases, empty the text area field and close the questionbox
		question_form.empty_field();
		questionBox.close();
	});


	// When you click on close button in question box
	$('body').on('click', '.close', function(){
		questionBox.close();
		question_form.question_form();
	});	




	/* 
	=======================================================
		chatbox controller
	=======================================================
	*/	

	// When you click on question-marker
	$('.question-container').on('click', '.question-marker', function(){
		$('.reaction-form').addClass('active');
		dataSelection = $(this).attr('data-selection');  
		$('.reaction-form').attr('data-reaction', dataSelection ); 
	});


	// When you hovered over comment box, highlight the right selection
	$(".question-container").on( 'mouseenter', '.question-marker', function () {
		chatbox.mouse_enter(this);

	}).on( 'mouseleave', '.question-marker', function () {
		chatbox.mouse_leave(this);
	});



	// When you click on reaction form submit button
	$('.question-container').on('click', '.submit', function(){
		textarea = $('.reaction-form textarea');
		reaction_text = textarea.val();
		date_selection = $(this).closest('.reaction-form').attr('data-reaction');
		$('.question-marker[data-selection="'+ date_selection +'"]').append( '<p>'+ reaction_text +'</p>' );
		reaction_text = textarea.val('');
		$('.reaction-form').removeClass('active'); 
	});




   
	// When you hovered over the selected text, highlight the right comment box
	$(".content").on( 'mouseenter', '.selected-text', function () {
		dataSelection = $(this).attr('data-selection');
		var color = $(this).css('background-color');
		$('.question-marker[data-selection='+ dataSelection +']').css('background-color', color);
		$(this).css('background', color);

	}).on( 'mouseleave', '.selected-text', function () {
		var color = $(this).css('background-color');
		$(this).css('background', color);
		$('.question-marker').css('background-color', 'transparent');
	});





	
	// When you click on edit button in question-marker. Not ready yet
	$('.question-container').on('click', '.edit-button', function(){
		$('.question-box').addClass('edit-content'); 
		contenText = $(this).text();
		$('.question-box textarea').val( contenText ); 
		questionBox.open();
	});

});




