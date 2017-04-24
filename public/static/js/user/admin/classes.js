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


//院系查询修改模块
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

	//信息操作对象
	var rHO = {
		modify: false,
		delete: false
	};

	$qIdNd.on('click', function(event) {
		event.preventDefault();
		$qCNameHintNd.removeClass('showInline').addClass('hide');
		$qIdHintNd.removeClass('hide').addClass('showInline');
	});

	//修改删除学生信息(点击事件代理)
	$tContentNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;

		//判断是否是修改按钮
		if (that.classList.contains('modify')) {
			//得到行索引
			var index = that.getAttribute('item')
			//判断内容是否改变
			console.log(qOA[index]);
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
				var sid = qOA[index].data['department_id'],
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
				var sid = qOA[index].data['department_id'];
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
		console.log(qOA);
		qOA[index].change = true;
		qOA[index]['data'][that.classList[0]] = that.value;
	});

	// 查询院系信息
	$qCNameBtnNd.on('click', function(event) {
		event.preventDefault();
			url = '/api/department/index/',
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

	//删除院系信息
	function deleteSI(sid) {
		var def = $.Deferred();
		var url = '/api/department/delete/'+sid;
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

	// 修改院系信息
	function modifySI(sid,data,index) {
		var def = $.Deferred();
		var url = '/api/department/update/'+sid;
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
				qO = {},
				qData = qO.data = {},
				sId = qData['department_id'] = data['department_id'],
				sName = qData['department_name'] = data['department_name'],
				sBir = qData['department_information'] =data['department_information'];
			qO.change = false;
			rstr += '<tr class="tableContentItem"><td><span class="department_id">' + sId +
				'</span></td><td><input class="department_name" item="' + index + 
				'" type="text" name="" value="'+ sName +
				'"></td><td><input class="department_information" item="' + index + 
				'" type="text" name="" value="'+ sBir +
				'"></td><td class="handle"><a href="javascript:;" class="modify" item="' + index +
				'">修改</a>'+'<a href="javascript:;" class="delete" item="' + index +
				'">删除</a></td></tr>';
			$tContentNd[0].innerHTML = rstr;
			qOA[index] = qO;
		});
	}
});



//院系信息添加模块
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

	//确定添加院系信息
	$qBtn.on('click', function(event) {
		event.preventDefault();
		var url = '/api/department/add';
		var data = [0, 1, 2, 3, 4];
		showRt(data);
	});

	//各个点击事件代理
	$tContentNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;

		//判断是否是添加按钮
		if (that.classList.contains('add')) {
			$confirmboxNd.removeClass('hide');
			$confirmboxHintNd[0].innerText = '确定要添加吗';
			$confirmboxHintNd[0].style.color = '#E4854E';

			//取消确认框确认按钮的点击事件
			$confirmNd.off('click');

			//得到行索引
			var index = that.getAttribute('item');

			//绑定确认框确认按钮的添加学生事件
			$confirmNd.on('click', function(event) {
				event.preventDefault();
				$confirmboxNd.addClass('hide');
				showHintBox($qResultHint);
				var data = qOA[index].data;
				console.log(data);
				if (!data['department_id']) {
					showHint($hintText, '必须输入院系id');
					return;
				}
				if (!data['department_name']) {
					showHint($hintText, '必须输入院系名字');
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

	//院系数据生成
	function showRt(data) {
		var rstr = '';
		qOA = [];
		data.forEach(function(item, index){
			var data = item,
				qO = {}
				qData = qO.data = {},
				sId = qData['department_id'] = '',
				sName = qData['department_name'] = '',
				sBir = qData['department_information'] = '';
			qO.change = false;
			rstr += '<tr class="tableContentItem"><td><input class="department_id" item="' + index + '" type="text" value="'+ sId +
				'"></td><td> <input type="text" name="" class="department_name" value="'+ sName + '" item = "' + index + '"></td>'+
				'<td><input class="department_information" item="' + index + 
				'" type="text" name="" value="'+ sBir +'"></td><td class="handle"><a href="javascript:;" class="add" item="' + index +
				'">添加</a></td></tr>';
			$tContentNd[0].innerHTML = rstr;
			qOA[index] = qO;
		});
	}

	// 添加学生信息
	function addInf(data,url){
		url = url || '/api/student/add/';
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