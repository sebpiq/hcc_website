 $(document).ready(function() {

$('.mobileNav').click( function(){

	if($('.nav ul').hasClass('open') ){$('.nav ul').removeClass('open');  }
	else{ $('.nav ul').addClass('open');} 
})

});