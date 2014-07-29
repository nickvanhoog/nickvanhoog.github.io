$(document).ready(function() {
	var colors = ['#eefbff']

	$('.cover_img').hover(function() 
{		$(this).css('border', '5px solid #c8d6e4');
	});

	$('.cover_img').mouseout(function() {
		$(this).css('border', '5px solid #eefbff');
	});	
})