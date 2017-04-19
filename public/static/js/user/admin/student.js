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
		$hintText = $('#studentModifyInfCnt .hintText'),
		$tContentNd = $('#studentModifyInfCnt .tContent');

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

	//内容对象
	var qO = {};
	$qIdBtnNd.on('click', function(event) {
		event.preventDefault();
		var sId = $('#sId').val(),
			url = '/api/student/' + sId,
			rstr = '',
			data;
		if (!sId) {
			showHintBox($qResultHint);
			showHint($hintText,'请输入要查询学生的id');
			return;
		}
		$req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			if (data.code == 1) {
				if (data.data) {
					data = data.data;
					var qData = qO.data = {};
					var sId = qData['student_id'] = data['student_id'],
						sName = qData['student_name'] = data['student_name'],
						sSex = (data['student_sex'] == 1) ? '男' : '女',
						sBir = qData['student_brith'] =data['student_brith'],
						sAdress = qData['student_address'] = data['student_address'],
						sPhone = qData['student_phoneNum'] = data['student_phoneNum'],
						sEmail = qData['student_email'] =data['student_email'],
						sIdCard = qData['student_idcard'] = data['student_idcard'],
						sClasses = qData['student_classes_id'] = data['student_classes_id'];
					qData['student_sex'] = data['student_sex'];
					qO.change = false;
					rstr += '<tr class="tableContentItem"><td><span class="student_id">' + sId +
					'</span></td><td><input class="student_name" type="text" name="" value="'+ sName +
					'"></td><td><input class="student_sex" type="text" name="" value="' + sSex +
					'"></td><td><input class="student_brith" type="text" name="" value="'+ sBir +
					'"></td><td><input class="student_address" type="text" name="" value="'+ sAdress + 
					'"></td><td><input class="student_phoneNum" type="text" name="" value="' + sPhone + 
					'"></td><td><input class="student_email" type="text" name="" value="' + sEmail + 
					'"></td><td><input class="student_idcard" type="text" name="" value="' + sIdCard + 
					'"></td><td><input class="student_classes_id" type="text" name="" value="' + sClasses + 
					'"></td><td class="handle"><a href="javascript:;" class="modify">修改</a>'+
					'<a href="javascript:;" class="delete">删除</a></td></tr>';
					$tContentNd[0].innerHTML = rstr;
				}
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

	$tContentNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;
		//判断是否是删除按钮
		if (that.classList.contains('modify')) {
			//判断内容是否改变
			if(!qO.change) {
				showHintBox($qResultHint);
				showHint($hintText,'内容并没改变,信息修改失败');
				return;
			}

		}
		that.classList.add('select');
	});

	$tContentNd.on('change', function(event) {
		event.preventDefault();
		var that = event.target;
		//如果内容改变
		qO.change = true;
		qO.data[event.target.classList[0]] = event.target.value;
		console.log(qO.data);
		console.log('change');
	});

	$tContentNd.on('focusout',function(event) {
		event.preventDefault();
		var that = event.target;
		that.classList.remove('select');
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