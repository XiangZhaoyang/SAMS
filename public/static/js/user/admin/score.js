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


//成绩表生成模块
$(function(){
	var $cNameNd =  $('#studentModifyInfCnt #cName'),
		$qCNameBtnNd = $('#studentModifyInfCnt .qCNameBtn'),
		$qResultHintNd = $('#studentModifyInfCnt .qResultHint'),
		$hintTextNd = $('#studentModifyInfCnt .hintText'),
		confirmboxNd = $('.confirmbox'),
		cancelboxNd = $('.confirmbox .cancelbox'),
		confirmmNd = $('.confirmbox .confirm'),
		cancelNd = $('.confirmbox .cancel');

	//班级查询
	function cQuery(url) {
		url = url || '/api/classes/index';
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: {param1: 'value1'},
		})
		.done(function() {
			console.log("success");
		});
		return $req;
	}

	//选择班级
	$cNameNd.on('click', function(event) {
		event.preventDefault();
		var str = '';
		var $req = cQuery()
			.done(function(data) {
				if (data.code == 1) {
					var data = data.data;
					data.forEach(function(item) {
						str += '<option value="' + item['classes_id'] + '">' + item['classes_name'] + '</option>'
					});
				}
				$cNameNd[0].innerHTML = str;
			})
			.fail(function(){
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			});
	});

	//根据班级查询未添加的课程
	function classesCourse(url) {
		;
	}

});