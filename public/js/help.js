$('.category a').on('click', function() {
	$('.category a').removeClass('active');
	$(this).addClass('active');
	
	$('.content .block').hide();
	$('.content' + this.id).show();
});