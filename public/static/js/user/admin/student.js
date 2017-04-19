//显示隐藏提示框
function showHintBox($node) {
	$node.removeClass('hide').addClass('show');
	setTimeout(function(){
		$node.removeClass('show').addClass('hide');
	}, 1000);
}

//ajax请求返回的提示信息
function showHint($node,message) {
	var message = message || '网络连接失败，请稍后再试';
	$node[0].innerText = message;
}

//学生信息查询修改模块
$(function($) {
	var $studentModifyInfCntNd = $('#studentModifyInfCnt'),
		$qIdNd = $('#studentModifyInfCnt .qId'),
		$qClassesNd = $('#studentModifyInfCnt .qClasses'),
		$qIdHintNd = $('#studentModifyInfCnt .qIdHint'),
		$sIdNd = $('#studentModifyInfCnt #sId'),
		$qCNameHintNd = $('#studentModifyInfCnt .qCNameHint'),
		$cNameNd = $('#studentModifyInfCnt #cName'),
		$qResult = $('#studentModifyInfCnt .qResult'),
		$qIdBtnNd = $('#studentModifyInfCnt .qIdBtn'),
		$qCNameBtnNd = $('#studentModifyInfCnt .qCNameBtn'),
		$qResultHint = $('#studentModifyInfCnt .qResultHint'),
		$hintText = $('#studentModifyInfCnt .hintText')

	$qIdNd.on('click', function(event) {
		event.preventDefault();
		$qCNameHintNd.removeClass('showInline').addClass('hide');
		$qIdHintNd.removeClass('hide').addClass('showInline');
	});

	$qClassesNd.on('click', function(event) {
		event.preventDefault();
		$qIdHintNd.removeClass('showInline').addClass('hide');
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
			}
		})
		.fail(function(err){
			showHintBox($qResultHint);
			showHint($hintText,err);
		});
	});

	$qIdBtnNd.on('click', function(event) {
		event.preventDefault();
		var sId = $('#sId').val(),
			url = '/api/student/' + sId;
		$req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			if (data.code == 1) {
				console.log(data.data);
			}
		})
		.done(function(data) {
			showHint($hintText,data.message);
		})
		.fail(function(){
			showHint($hintText);
		})
		.always(function(){
			showHintBox($qResultHint);
		});
	});

	$qCNameBtnNd.on('click', function(event) {
		event.preventDefault();
		var qCId = $('select#cName').val(),
			url = '/api/student/indexByCid/' + qCId;
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			if (data.code == 1) {
				console.log(data.data);
			}
			console.log("success");
		})
		.done(function(data) {
			showHint($hintText,data.message);
		})
		.fail(function(){
			showHint($hintText);
		})
		.always(function(){
			showHintBox($qResultHint);
		});
	});
});