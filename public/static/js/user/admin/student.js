$(function($) {
	var $studentModifyInfCntNd = $('#studentModifyInfCnt'),
		$qIdNd = $('.qId'),
		$qClassesNd = $('.qClasses'),
		$qIdHintNd = $('.qIdHint'),
		$sIdNd = $('#sId'),
		$qCNameHintNd = $('.qCNameHint'),
		$cNameNd = $('#cName'),
		$qResult = $('.qResult'),
		$qIdBtnNd = $('.qIdBtn'),
		$qCNameBtnNd = $('.qCNameBtn');

	$qIdNd.on('click', function(event) {
		event.preventDefault();
		$qIdHintNd.removeClass('hide').addClass('showInline');
	});

	$qClassesNd.on('click', function(event) {
		event.preventDefault();
		$qCNameHintNd.removeClass('hide').addClass('showInline');
		$req = $.ajax({
			url: '/api/classes/index/',
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			if (data.code == 1) {
				var strOp = '';
				if (data.data) {
					data.data.forEach(function(item){
						if (item['classes_id']) {
							strOp += '<option value="' + item['classes_id'] + '">' + item['classes_name']+ '</option>';
						}
					});
				}
				$cNameNd[0].innerHTML = strOp;
				console.log(data.data);
			}
		})
		.done(function(){
			;
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
});