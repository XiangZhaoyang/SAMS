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


//选择模块
$(function(){
	var $studentModifyInfNd = $('#nav .studentModifyInf'),
		$studentAdd = $('#nav .studentAdd'),
		$studentResetPass = $('#nav .studentResetPass'),
		$nav = $('#nav'),
		$studentModifyInfCntNd = $('#content #studentModifyInfCnt'),
		$studentAddCntNd = $('#content #studentAddCnt'),
		$studentResetPassCnt = $('#content #studentResetPassCnt');

	$nav.on('click', function(event) {
		event.preventDefault();
		var that = event.target;
		switch (that) {
			case $studentModifyInfNd[0]: {
				$studentModifyInfNd.addClass('select');
				$studentAdd.removeClass('select');
				$studentResetPass.removeClass('select');
				$studentAddCntNd.removeClass('show').addClass('hide');
				$studentResetPassCnt.removeClass('show').addClass('hide');
				$studentModifyInfCntNd.removeClass('hide').addClass('show');
			}
			break;
			case $studentAdd[0]: {
				$studentModifyInfNd.removeClass('select');
				$studentAdd.addClass('select');
				$studentResetPass.removeClass('select');
				$studentModifyInfCntNd.removeClass('show').addClass('hide');
				$studentResetPassCnt.removeClass('show').addClass('hide');
				$studentAddCntNd.removeClass('hide').addClass('show');
			}
			break;
			case $studentResetPass[0]: {
				$studentModifyInfNd.removeClass('select');
				$studentAdd.removeClass('select');
				$studentResetPass.addClass('select');
				$studentAddCntNd.removeClass('show').addClass('hide');
				$studentModifyInfCntNd.removeClass('show').addClass('hide');
				$studentResetPassCnt.removeClass('hide').addClass('show');
			}
			break;
		}
	});
});


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
		$tContentNd = $('#studentModifyInfCnt .tContent'),
		$confirmboxNd = $('.confirmbox'),
		$confirmboxHintNd = $('.confirmbox .confirmboxHint'),
		$cancelboxNd = $('.confirmbox .cancelbox'),
		$confirmNd = $('.confirmbox .confirm'),
		$cancelNd = $('.confirmbox .confirmboxItem');

	//内容对象数组
	var qOA = [];

	//学生信息操作对象
	var rHO = {
		modify: false,
		delete: false
	};

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

	// 根据id查询学生信息
	$qIdBtnNd.on('click', function(event) {
		event.preventDefault();
		var sId = $('#sId').val(),
			url = '/api/student/' + sId,
			rstr = '',
			data,
			dataArr = [];
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
					dataArr[dataArr.length] = data = data.data;
					showRt(dataArr);
				}
			} else {
				$tContentNd.innerHTML = '';
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

	//修改删除学生信息
	$tContentNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;
		//判断是否是修改按钮
		if (that.classList.contains('modify')) {
			//得到行索引
			var index = that.getAttribute('item')
			//判断内容是否改变
			if(!qOA[index].change) {
				showHintBox($qResultHint);
				showHint($hintText,'内容并没改变,信息修改失败');
				return;
			}

			$confirmboxNd.removeClass('hide');
			$confirmboxHintNd[0].innerText = '确定要修改吗';

			$confirmNd.off('click');

			$confirmNd.on('click', function(event) {
				event.preventDefault();
				$confirmboxNd.addClass('hide');
				var sid = qOA[index].data['student_id'],
					data = qOA[index].data;
				modifySI(sid,data,index);
			});
		}

		// 判断是否是删除按钮
		if (that.classList.contains('delete')) {
			$confirmboxNd.removeClass('hide');
			$confirmboxHintNd[0].innerText = '确定要删除吗';
			$confirmboxHintNd[0].style.color = 'red';

			$confirmNd.off('click');

			//得到行索引
			var index = that.getAttribute('item');

			$confirmNd.on('click', function(event) {
				event.preventDefault();
				$confirmboxNd.addClass('hide');
				var sid = qOA[index].data['student_id'];
				var def = deleteSI(sid);
				def.done(function(){
					if (rHO.delete) {
						if (qOA.length >= 1) {
							$qCNameBtnNd.trigger('click');
						}
					}
				});
			});
		}

		that.classList.add('select');
	});

	$tContentNd.on('focusout',function(event) {
		event.preventDefault();
		var that = event.target;
		that.classList.remove('select');
	});

	$cancelboxNd.on('click', function(event) {
		event.preventDefault();
		$confirmboxNd.addClass('hide');
	});

	$cancelNd.on('click', function(event) {
		event.preventDefault();
		$confirmboxNd.addClass('hide');
	});

	//监听单元格的内容改变
	$tContentNd.on('change', function(event) {
		event.preventDefault();
		var that = event.target;
		//如果内容改变
		var index = that.getAttribute('item');
		qOA[index].change = true;
		qOA[index]['data'][that.classList[0]] = that.value;
	});

	// 根据班级查询学生信息
	$qCNameBtnNd.on('click', function(event) {
		event.preventDefault();
		var qCId = $('select#cName').val(),
			url = '/api/student/indexByCid/' + qCId,
			rstr = '';
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			if (data.code == 1) {
				if (data.data) {
					var data = data.data;
					showRt(data);
				}
			} else {
				$tContentNd[0].innerHTML = '';
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

	//删除学生信息
	function deleteSI(sid) {
		var def = $.Deferred();
		var url = '/api/student/delete/'+sid;
		var $req = $.ajax({
			url: url,
			type: 'DELETE',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			showHint($hintText,data.message);
			if (data.code == 1) {
				rHO.delete = true;
				def.resolve();
			}
		})
		.fail(function(error) {
			showHint($hintText);
		})
		.always(function() {
			showHintBox($qResultHint);
		});
		return def;
	}

	// 修改学生信息
	function modifySI(sid,data,index) {
		var def = $.Deferred();
		var url = '/api/student/update/'+sid;
		var $req = $.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data: data,
		})
		.done(function(data) {
			showHint($hintText,data.message);
			if (data.code == 1) {
				qOA[index].change= false;
				rHO.modify = true;
				def.resolve();
			}
		})
		.fail(function(error) {
			showHint($hintText);
		})
		.always(function() {
			showHintBox($qResultHint);
		});
		return def;
	}

	//返回结果数据生成
	function showRt(qRData){
		var rstr = '',
		qOA = [];
		qRData.forEach(function(item,index){
			var data = item,
				qO = {}
				qData = qO.data = {},
				sId = qData['student_id'] = data['student_id'],
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
				'</span></td><td><input class="student_name" item="' + index + 
				'" type="text" name="" value="'+ sName +
				'"></td><td><input class="student_sex" item="' + index + 
				'" type="text" name="" value="' + sSex +
				'"></td><td><input class="student_brith" item="' + index + 
				'" type="text" name="" value="'+ sBir +
				'"></td><td><input class="student_address" item="' + index +
				'" type="text" name="" value="'+ sAdress + 
				'"></td><td><input class="student_phoneNum" item="' + index +
				'" type="text" name="" value="' + sPhone + 
				'"></td><td><input class="student_email" item="' + index + 
				'" type="text" name="" value="' + sEmail + 
				'"></td><td><input class="student_idcard" item="' + index + 
				'" type="text" name="" value="' + sIdCard + 
				'"></td><td><input class="student_classes_id" item="' + index +
				'" type="text" name="" value="' + sClasses + 
				'"></td><td class="handle"><a href="javascript:;" class="modify" item="' + index +
				'">修改</a>'+'<a href="javascript:;" class="delete" item="' + index +
				'">删除</a></td></tr>';
			$tContentNd[0].innerHTML = rstr;
			qOA[index] = qO;
		});
	}
});


//学生密码重置模块
$(function(){
	var $studentAddCntNd = $('#content #studentAddCnt'),
		$qResultNd = $('#studentAddCnt .qResult'),
		$qBtn = $('#studentAddCnt .qBtn'),
		$tContentNd = $('#studentAddCnt .tContent');

	//内容对象数组
	var qOA = [];

	$qBtn.on('click', function(event) {
		event.preventDefault();
		var url = '/user/admin/studentUser';
		$req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data:'',
		})
		.done(function(data) {
			if (data.code == 1) {
				if (data.data) {
					var data = data.data;
					showRt(data);
				}
			}
		})
		.fail(function(err) {
			console.log(err);
		})
		.always(function() {
			console.log("complete");
		});
	});

	//学生用户数据生成
	function showRt(data) {
		var rstr = '';
		qOA = [];
		data.forEach(function(item, index){
			var data = item,
				qO = {}
				qData = qO.data = {},
				sId = qData['student_id'] = data['user_id'],
				sName = qData['student_name'] = '',
				sSex = '',
				sBir = qData['student_brith'] = '',
				sAdress = qData['student_address'] = '',
				sPhone = qData['student_phoneNum'] = '',
				sEmail = qData['student_email'] = '',
				sIdCard = qData['student_idcard'] = '',
				sClasses = qData['student_classes_id'] = '';
			qData['student_sex'] = '';
			qO.change = false;
			rstr += '<tr class="tableContentItem"><td><span class="student_id">' + sId +
				'</span></td><td><input class="student_name" item="' + index + 
				'" type="text" name="" value="'+ sName +
				'"></td><td><input class="student_sex" item="' + index + 
				'" type="text" name="" value="' + sSex +
				'"></td><td><input class="student_brith" item="' + index + 
				'" type="text" name="" value="'+ sBir +
				'"></td><td><input class="student_address" item="' + index +
				'" type="text" name="" value="'+ sAdress + 
				'"></td><td><input class="student_phoneNum" item="' + index +
				'" type="text" name="" value="' + sPhone + 
				'"></td><td><input class="student_email" item="' + index + 
				'" type="text" name="" value="' + sEmail + 
				'"></td><td><input class="student_idcard" item="' + index + 
				'" type="text" name="" value="' + sIdCard + 
				'"></td><td><input class="student_classes_id" item="' + index +
				'" type="text" name="" value="' + sClasses + 
				'"></td><td class="handle"><a href="javascript:;" class="add" item="' + index +
				'">添加</a>'+'</td></tr>';
			$tContentNd[0].innerHTML = rstr;
			qOA[index] = qO;
		});
	}
});