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


//教师信息查询修改模块
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

	//教师信息操作对象
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
			url: '/api/department/index/',
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			if (data.code == 1) {
				var strOp = '';
				if (data.data) {
					data.data.forEach(function(item){
						if (item['department_id']) {
							strOp += '<option value="' + item['department_id'] + '">' + item['department_name']+ '</option>';
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

	// 根据id查询教师信息
	$qIdBtnNd.on('click', function(event) {
		event.preventDefault();
		var sId = $('#sId').val(),
			url = '/api/teacher/' + sId,
			rstr = '',
			data,
			dataArr = [];
		if (!sId) {
			showHintBox($qResultHint);
			showHint($hintText,'请输入要查询教师的id');
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

	//修改删除教师信息(点击事件代理)
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

			//取消确认框的确认按钮事件
			$confirmNd.off('click');

			//绑定确认框的确认按钮事件
			$confirmNd.on('click', function(event) {
				event.preventDefault();
				$confirmboxNd.addClass('hide');
				var sid = qOA[index].data['teacher_id'],
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

			//取消确认框的确认按钮事件
			$confirmNd.off('click');

			//绑定确认框的确认按钮事件
			$confirmNd.on('click', function(event) {
				event.preventDefault();
				$confirmboxNd.addClass('hide');
				var sid = qOA[index].data['teacher_id'];
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

	//确认框取消
	$cancelboxNd.on('click', function(event) {
		event.preventDefault();
		$confirmboxNd.addClass('hide');
	});

	//确认框取消
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
			url = '/api/teacher/indexByDid/' + qCId,
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

	//删除教师信息
	function deleteSI(sid) {
		var def = $.Deferred();
		var url = '/api/teacher/delete/'+sid;
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
		var url = '/api/teacher/update/'+sid;
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
		var rstr = '';
		qOA = [];
		qRData.forEach(function(item,index){
			var data = item,
				qO = {}
				qData = qO.data = {},
				sId = qData['teacher_id'] = data['teacher_id'],
				sName = qData['teacher_name'] = data['teacher_name'],
				sSex = (data['teacher_sex'] == 1) ? '男' : '女',
				sBir = qData['teacher_brith'] =data['teacher_brith'],
				sAdress = qData['teacher_address'] = data['teacher_address'],
				sPhone = qData['theacher_phoneNum'] = data['theacher_phoneNum'],
				sEmail = qData['teacher_email'] =data['teacher_email'],
				sIdCard = qData['teacher_idcard'] = data['teacher_idcard'],
				sClasses = qData['teacher_department_id'] = data['teacher_department_id'];
			qData['teacher_sex'] = data['teacher_sex'];
			qO.change = false;
			rstr += '<tr class="tableContentItem"><td><span class="teacher_id">' + sId +
				'</span></td><td><input class="teacher_name" item="' + index + 
				'" type="text" name="" value="'+ sName +
				'"></td><td><input class="teacher_sex" item="' + index + 
				'" type="text" name="" value="' + sSex +
				'"></td><td><input class="teacher_brith" item="' + index + 
				'" type="text" name="" value="'+ sBir +
				'"></td><td><input class="teacher_address" item="' + index +
				'" type="text" name="" value="'+ sAdress + 
				'"></td><td><input class="theacher_phoneNum" item="' + index +
				'" type="text" name="" value="' + sPhone + 
				'"></td><td><input class="teacher_email" item="' + index + 
				'" type="text" name="" value="' + sEmail + 
				'"></td><td><input class="teacher_idcard" item="' + index + 
				'" type="text" name="" value="' + sIdCard + 
				'"></td><td><input class="teacher_department_id" item="' + index +
				'" type="text" name="" value="' + sClasses + 
				'"></td><td class="handle"><a href="javascript:;" class="modify" item="' + index +
				'">修改</a>'+'<a href="javascript:;" class="delete" item="' + index +
				'">删除</a></td></tr>';
			$tContentNd[0].innerHTML = rstr;
			qOA[index] = qO;
		});
	}
});


//教师信息添加模块
$(function(){
	var $studentAddCntNd = $('#content #studentAddCnt'),
		$qResultNd = $('#studentAddCnt .qResult'),
		$qBtn = $('#studentAddCnt .qBtn'),
		$tContentNd = $('#studentAddCnt .tContent'),
		$qResultHint = $('#studentAddCnt .qResultHint'),
		$hintText = $('#studentAddCnt .qResultHint .hintText'),
		$confirmboxNd = $('.confirmbox'),
		$confirmboxHintNd = $('.confirmbox .confirmboxHint'),
		$cancelboxNd = $('.confirmbox .cancelbox'),
		$confirmNd = $('.confirmbox .confirm'),
		$cancelNd = $('.confirmbox .confirmboxItem');

	//内容对象数组
	var qOA = [];

	// 班级列表对象
	var classesO = {};

	//学生列表对象
	var studentList;

	//未添加的学生用户列表查询
	function userStudent(url) {
		// var def = $.Deferred();
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			if (data.code == 1) {
				if (data.data) {
					studentList = data.data;
				}
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		return $req;
	}

	// 院系列表信息查询
	function classesList(url) {
		url = url || '/api/department/index/';
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			if (data.code == 1) {
				if (data.data) {
					classesO = data;
				}
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		return $req;
	}

	//确定添加教师信息
	$qBtn.on('click', function(event) {
		event.preventDefault();
		var url = '/user/admin/teacherUser';
		var $req = userStudent(url);
		$req.done(function(data){
			if (data.code == 1) {
				if (data.data) {
					var data =data.data;
					showRt(data);
				}
			}
		})
		.done(function(data){
			classesList();
		});
	});

	//各个点击事件代理
	$tContentNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;

		//判断是否是院系选择框
		if (that.classList.contains('teacher_department_id')) {
			var strOp = '';
			if (classesO) {
				var data = classesO.data;
				data.forEach(function(item){
					strOp += '<option value="' + item['department_id'] + '">' + item['department_name']+ '</option>';
				});
			}
			if (!strOp) {
				strOp = '不存在院系信息';
			}
			that.innerHTML = strOp;
		}

		//判断是否是添加按钮
		if (that.classList.contains('add')) {
			$confirmboxNd.removeClass('hide');
			$confirmboxHintNd[0].innerText = '确定要添加吗';
			$confirmboxHintNd[0].style.color = '#E4854E';

			//取消确认框确认按钮的点击事件
			$confirmNd.off('click');

			//得到行索引
			var index = that.getAttribute('item');

			//绑定确认框确认按钮的添加教师事件
			$confirmNd.on('click', function(event) {
				event.preventDefault();
				$confirmboxNd.addClass('hide');
				showHintBox($qResultHint);
				var data = qOA[index].data;
				console.log(data);
				if (!data['teacher_name']) {
					showHint($hintText, '必须输入教师名字');
					return;
				}
				if (!data['teacher_department_id']) {
					showHint($hintText, '必须选择院系');
					return;
				}
				var $req = addInf(data)
				.done(function(data){
					showHint($hintText, data.message);
					if (data.code == 1) {
						$qBtn.trigger('click');
					}
				})
				.fail(function(data) {
					console.log("error");
				})
				.always(function() {
					console.log(data);
				});
			});
		}

		that.classList.add('select');
	});

	//监听单元格的内容改变
	$tContentNd.on('change', function(event) {
		event.preventDefault();
		var that = event.target;
		//如果内容改变
		var index = that.getAttribute('item');
		qOA[index].change = true;
		qOA[index]['data'][that.classList[0]] = that.value;
		console.log(qOA[index]['data'][that.classList[0]]);
	});

	//离开时的样式
	$tContentNd.on('focusout',function(event) {
		event.preventDefault();
		var that = event.target;
		that.classList.remove('select');
	});

	//教师用户数据生成
	function showRt(data) {
		var rstr = '';
		qOA = [];
		data.forEach(function(item, index){
			var data = item,
				qO = {}
				qData = qO.data = {},
				sId = qData['teacher_id'] = data['user_id'],
				sName = qData['teacher_name'] = '',
				sBir = qData['teacher_brith'] = '',
				sAdress = qData['teacher_address'] = '',
				sPhone = qData['teacher_phoneNum'] = '',
				sEmail = qData['teacher_email'] = '',
				sIdCard = qData['teacher_idcard'] = '',
				sClasses = qData['teacher_department_id'] = '';
			qData['teacher_sex'] = '2';
			qO.change = false;
			rstr += '<tr class="tableContentItem"><td><span class="teacher_id">' + sId +
				'</span></td><td><input class="teacher_name" item="' + index + 
				'" type="text" name="" value="'+ sName +
				'"></td><td><select class="teacher_sex hintSel" item="' + index + 
				'"><option value="2">女</option><option value="1">男</option></select></td>'+
				'<td><input class="teacher_brith" item="' + index + 
				'" type="text" name="" value="'+ sBir +
				'"></td><td><input class="teacher_address" item="' + index +
				'" type="text" name="" value="'+ sAdress + 
				'"></td><td><input class="teacher_phoneNum" item="' + index +
				'" type="text" name="" value="' + sPhone + 
				'"></td><td><input class="teacher_email" item="' + index + 
				'" type="text" name="" value="' + sEmail + 
				'"></td><td><input class="teacher_idcard" item="' + index + 
				'" type="text" name="" value="' + sIdCard + 
				'"></td><td> <select class="teacher_department_id hintSel" item="' + index + 
				'"><option>选择院系</option></select>'+
				'</td><td class="handle"><a href="javascript:;" class="add" item="' + index +
				'">添加</a></td></tr>';
			$tContentNd[0].innerHTML = rstr;
			qOA[index] = qO;
		});
	}

	// 添加教师信息
	function addInf(data,url){
		url = url || '/api/teacher/add/';
		$req = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		})
		.done(function(data) {
			console.log("success");
		})
		return $req;
	}
});


//教师密码重置模块
$(function(){
	var $eBtnNd = $('#studentResetPassCnt .eBtn'),
		$sIdNd = $('#studentResetPassCnt .sId'),
		$qResultHint = $('#studentResetPassCnt .qResultHint'),
		$hintText = $('#studentResetPassCnt .qResultHint .hintText'),
		$confirmboxNd = $('.confirmbox'),
		$confirmboxHintNd = $('.confirmbox .confirmboxHint'),
		$cancelboxNd = $('.confirmbox .cancelbox'),
		$confirmNd = $('.confirmbox .confirm'),
		$cancelNd = $('.confirmbox .confirmboxItem');

	//确认重置密码
	$eBtnNd.on('click', function(event) {
		event.preventDefault();
		var sidReg = /^\d{12}$/;
		//判断是否输入
		if ($sIdNd.val().length == 0) {
			showHintBox($qResultHint);
			showHint($hintText,'请输入要查询教师的id');
			return;
		} else if (!sidReg.test($sIdNd.val())) {
			showHintBox($qResultHint);
			showHint($hintText, '请输入正确的教师id');
			return;
		}
		var $req = teacherPassReset($sIdNd.val())
			.done(function(data){
				showHint($hintText, data.message);
			})
			.fail(function(err){
				showHint($hintText, '网络连接失败，请稍后再试');
			})
			.always(function(){
				showHintBox($qResultHint);
			});
	});

	//教师密码重置
	function teacherPassReset(id,url) {
		url = url || ('/user/admin/teacherPassReset/' + id);
		var $req = $.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data:'',
		})
		.done(function(data) {
			console.log("success");
		});
		console.log(url);
		return $req;
	}
});