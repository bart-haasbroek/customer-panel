/* 
	=======================================================
		selecton 
	=======================================================
*/

// Begin class for selecting text
 selectionMarker = function( element ) {
   
   // Store this class in a variable si it can be used in other functions within this class
   self = this;
   
   this.marker = function(){
	 
	 //Get selection
	 var sel = window.getSelection();
	 var cursorStart = sel.anchorOffset;
	 var cursorEnd = sel.focusOffset;
	 var textSelection = '';
	 
	 // Check if there is a selection or just a click without a selection
	 if( cursorStart === cursorEnd) {
	   var textSelection = false;
	 }else {
	   var textSelection = true;
	 }
	 
	 // When there is no selection, close the menu when its open
	 if( textSelection == false ){
	   tooltipMenu.close();
	 }  
	 
	  // Get name of span element. 'Element' is the given parameter to this class.
	 selectionName = element.name;
	 dataSelection = element.dataSelection; 
	  
	 // Check if there is a selection
	 if (window.getSelection && textSelection) {
	  
	  // Create span element. This is the wrapper of the selected text
	  var span = document.createElement("span");
	  span.setAttribute("class", "selected-text " + selectionName);
	  span.setAttribute("data-selection", dataSelection);
	   
		//$(selectionName).parent()
		
	   // Get selection and wrap it with a span
	   if (sel.rangeCount) {          
		 var range = sel.getRangeAt(0).cloneRange();
		 range.surroundContents(span);
		 sel.removeAllRanges();
		 sel.addRange(range);     

		 // Get data from the span element for positioning the tooltip menu
		 selection = tooltipMenu.getData(span);  
		 // Open the tooltip menu
		 tooltipMenu.open(selection);
		} // End if
	  } // End if
	 
	 // Make this new selection right active. 
	 //As parameter we give the selector of what have to be active
	 self.makeActive( '.' + selectionName );
	 
   } // End marker  

   
   // Deselection of a text selection
   this.deselect = function(){
	 dataSelection = $('.active-selection').attr('data-selection');
	 $('.active-selection').contents().unwrap();
	 $('.question-marker[data-selection='+ dataSelection +']').remove();
	 tooltipMenu.close();
   }
   
   // This is for making the selection active
   this.makeActive = function( selectionName ){
	 // First remove class from all span elements
	 $('.selected-text').removeClass('active-selection');
	 // Then make selected element active
	 $(selectionName).addClass('active-selection');
   }
   
} // End class



/* 
	=======================================================
		chatbox
	=======================================================
*/


chatbox = {

	add : function ( selection, content ){
		if( $('.question-marker[data-selection='+ selection +']').length > 0 ) {
			$('.question-marker[data-selection='+ selection +']').append( '<p>'+ content +'</p>' );
		}else{
			$('.selected-text.active-selection').addClass('marked-selection');
			questionMarker = '<div class="question-marker" data-selection="'+ selection +'">';
			questionMarker += '<p>' + content + '</p>';
			questionMarker += '</div>';
			$(questionMarker).appendTo('.question-container .question-markers');
			$('.js-page-content').addClass('has-chatbox');
		}
	},
	mouse_enter : function( element ){
		data_selection = $(element).attr('data-selection');
		var color = $('.selected-text[data-selection='+ data_selection +']').css('background');
		$('.selected-text[data-selection='+ data_selection +']').css('background-color', color);
		$(element).css('background', color);
	},
	mouse_leave : function( element ){
		data_selection = $(element).attr('data-selection');
 		$(element).css('background', 'none');
 		var color = $('.selected-text[data-selection='+ data_selection +']').css('background');
 		$('.selected-text[data-selection='+ data_selection +']').css('background-color', color);
	}
}


/* 
	=======================================================
		tooltip 
	=======================================================
*/

tooltip_helper = {

	tooltip_menu : function() {
		// Tooltip menu items
		tooltip = '<div class="tooltip">';
		tooltip += '<div class="tooltip-item tooltip-question fa fa-comments"></div>';
		tooltip += '<div class="tooltip-item tooltip-remove fa fa-eraser"></div>';
		tooltip += '<div class="tooltip-item tooltip-color fa fa-paint-brush"></div><input type="text" class="color-picker" />';
		tooltip += '</div>';

		return tooltip;  
	},

	// Function for getting data of a element. This is used for positioning the span element   
	get_data : function( element ) {
		return selection = {
			position: $(element).position(),
			width: $(element).width(),
			height: $(element).height()
		} 
	}
}



 
  // Class for opening menu
 tooltipMenu = {

	// Function for getting data of a element. This is used for positioning the span element   
	getData : function( element ) {
	return selection = {
		position: $(element).position(),
		width: $(element).width(),
		height: $(element).height()
		} 
	}, 
   
   // Opening of tooltipMenu
   open : function(selection){

		// Get al necessary data for positioning of the tooltip
		topPos = selection.position.top;
		leftPos = selection.position.left;
		selectionWidth = selection.width;
		selectionHalf = selectionWidth / 2;
		
		tooltipPosLeft = ( leftPos + selectionHalf );
		tooltipPostop = topPos + 33;
		 
		// If tooltip is already open, close him first
		if( ( $('.tooltip').length > 0 ) ){
		  this.close(); 
		}
		
		// Get tooltip contents build in code above 
		tooltip = tooltip_helper.tooltip_menu();
		  
		// Append tooltipMenu with the right position 
		$(tooltip).css({
			top: tooltipPostop + 'px',
			left: tooltipPosLeft + 'px'
		}).appendTo('.content');
	   
	   // After opening the toolbox, enable colorPicker   
	   $('.color-picker').colorPicker();
	 
   }, // End open
   
   // Close the tooltipMenu
   close : function(){
	 $('.tooltip').remove();
   },

   question_button : function(){
	   	questionBox.open();
		tooltipMenu.close();
   }
   
 } //End class

 


/* 
	=======================================================
		question_box 
	=======================================================
*/

 
 // class for opening questionBox
 questionBox = {
   
   // Open the question box
   open : function(){
	 $('.question-box').css('bottom', 0); 
   },
   
   // Close the questionbox
   close : function(){
	 $('.question-box').css('bottom', '-400px');
   },
   
   // Empty text area 
   emptyField : function(){
	$('.question-box textarea').val( '' ); 
   }
 }



/* 
	=======================================================
		question_form 
	=======================================================
*/



question_form = {
   
   // Open the question box
   open : function(){
	 $('.question-box').css('bottom', 0); 
   },
   
   // Close the questionbox
   close : function(){
	 $('.question-box').css('bottom', '-400px');
   },

   get_field_val : function(){
		field = $('.question-box textarea').val();
		return field;
   },
   
   // Empty text area 
   empty_field : function(){
		$('.question-box textarea').val('');
   }
}






/* 
	=======================================================
		todo
	=======================================================
*/

 // Begin with a smart way to connect two elements.
 // Nog ready yet
 elements = {
	
	connection : function() {
	   console.log('this');
	},
	
	bind : function(){
	   dataSelection = $(this).attr('data-selection');
	   $('.question-marker[data-selection='+ dataSelection +']');
	}
 }