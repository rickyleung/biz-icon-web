//选择类别
$('.category').on('click', 'a', function(e) {
    var me = $(this);
    
    if (me.hasClass('active')) {
        return;
    }
    
	$('.category a').removeClass('active');
	me.addClass('active');
	
	getSvgByCategory({
	    path: encodeURIComponent(me.html())
	});
});

//全选
$('#select-all').bizButton({
	theme: 'orange'
}).on('click', function() {
	$('.svg span').addClass('selected');
	$('#download').bizButton('enable');
	getDownloadParams();
});

//单选
$('.svgs').on('click', 'span', function() {
	$(this).toggleClass('selected');
	if ($('.svg .selected').length === 0) {
		$('#download').bizButton('disable');
	} else {
		$('#download').bizButton('enable');
		getDownloadParams();
	}
});

//下载
$('#download').bizButton({
	theme: 'dark',
	disabled: true
});

function getDownloadParams() {
    var fileName = $.map($('.svg .selected'), function(elem, index) {
        return $(elem).data('filename');
    }).join(',');
    var path = encodeURIComponent($('.category .active').html());
    $('#download').parent().attr('href', '/download?path=' + path + '&fileName=' + fileName);
}

function getCategory() {
    $.ajax({
        url: 'getCategory',
        type: 'POST',
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            if (data.success && data.data.length !== 0) {
                $('.category ul').html(Mustache.render($('#tpl-category').html(), {
                    category: data.data
                }));
                $('.category a:first').click();
            }
        }
    });
}

function getSvgByCategory(args) {
    $.ajax({
        url: 'getSvgByCategory',
        type: 'POST',
        data: args,
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            if (data.success) {
                if (data.data.length !== 0) {
                    $.each(data.data, function(index, val) {
                        val.name = val.name.replace(/\.svg$/, '');
                    });
                    $('.svgs').html(Mustache.render($('#tpl-svg').html(), {
                        path: args.path,
                        svg: data.data
                    }));
                    $('.toolbar').show();
                    $('#download').bizButton('disable');
                    $('.no-data').hide();
                } else {
                    $('.svgs').empty();
                    $('.toolbar').hide();
                    $('.no-data').show();
                }
            }
        }
    });
}

getCategory();

