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


//导航处理
$(function(){
	var $navNd = $('#nav'),
		$studentInfNd = $('#nav .studentInf'),
		$studentAcManageNd = $('#nav .studentAccountManage'),
		$studentInfCntNd = $('#content #studentInfCnt'),
		$studentAcManageCntNd = $('#content #studentAccountManageCnt');

	$navNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;
		switch (that) {
			case $studentInfNd[0]: {
				$studentInfNd.addClass('select');
				$studentAcManageNd.removeClass('select');
				$studentInfCntNd.removeClass('hide').addClass('show');
				$studentAcManageCntNd.removeClass('show').addClass('hide');
			}
			break;
			case $studentAcManageNd[0]: {
				$studentAcManageNd.addClass('select');
				$studentInfNd.removeClass('select');
				$studentInfCntNd.removeClass('show').addClass('hide');
				$studentAcManageCntNd.removeClass('hide').addClass('show');
			}
			break;
		}
	});
});


//学生个人信息模块
$(function(){
	var $studentInfNd = $('#nav .studentInf'),
		$qResultHintNd = $('#studentInfCnt .qResultHint'),
		$hintTextNd = $('#studentInfCnt .hintText'),
		$tContentNd = $('#studentInfCnt .tContent'),
		$confirmboxNd = $('.confirmbox'),
		$confirmboxHintNd = $('.confirmbox .confirmboxHint'),
		$cancelboxNd = $('.confirmbox .cancelbox'),
		$confirmNd = $('.confirmbox .confirm'),
		$cancelNd = $('.confirmbox .confirmboxItem');

	//内容对象数组
	var qOA = [];

	$studentInfNd.on('click', function(event) {
		event.preventDefault();
		var $req = infQuery()
				.done(function(data) {
					showHint($hintTextNd, data.message);
					if (data.code == 1) {
						if (data.data) {
							var dataR = []
							dataR.push(data.data);
							showRt(dataR);
						}
					}
				})
				.fail(function(err){
					showHint($hintTextNd, '网络连接失败，请稍后再试');
				})
				.always(function(data) {
					showHintBox($qResultHintNd);
				});
	});

	//修改学生信息（点击事件代理）
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
				showHintBox($qResultHintNd);
				console.log($qResultHintNd[0]);
				showHint($hintTextNd,'内容并没改变,信息修改失败');
				return;
			}

			$confirmboxNd.removeClass('hide');
			$confirmboxHintNd[0].innerText = '确定要修改吗';

			//绑定确认框的确认按钮事件
			$confirmNd.on('click', function(event) {
				event.preventDefault();
				$confirmboxNd.addClass('hide');
				var sid = qOA[index].data['student_id'],
					data = qOA[index].data;
				var $req = modifySI(sid,data,index)
					.done(function(data){
						showHint($hintTextNd,data.message);
						if (data.code == 1) {
							qOA[index].change = false;;
						}
					})
					.fail(function(err) {
						showHint($hintTextNd, '网络连接失败，请稍后再试');
					})
					.always(function(){
						showHintBox($qResultHintNd);
					});
			});
		}

		that.classList.add('select');
	});

	//光标离开时的样式
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

	//学生基本信息查询
	function infQuery(url) {
		url = url || '/user/student/infQuery';
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function(data) {
			console.log("success");
		});
		return $req;
	}

	//学生基本信息显示
	function showRt(qRData){
		var rstr = '';
		qOA = [];
		qRData.forEach(function(item,index){
			var data = item,
				qO = {},
				qData = qO.data = {},
				sId = qData['student_id'] = data['student_id'],
				sName = qData['student_name'] = data['student_name'],
				sSex = (data['student_sex'] == 1) ? '男' : '女',
				sBir = qData['student_brith'] =data['student_brith'],
				sAdress = qData['student_address'] = data['student_address'],
				sPhone = qData['student_phoneNum'] = data['student_phoneNum'],
				sEmail = qData['student_email'] =data['student_email'],
				sIdCard = qData['student_idcard'] = data['student_idcard'],
				sClasses = qData['student_classes_id'] = data['student_classes_id'],
				sClassesName = data['student_classes_name'],
				sInf = qData['student_information'] = data['student_information'];
			qData['student_sex'] = data['student_sex'];
			qO.change = false;
			console.log(qRData);
			rstr += '<tr class="tableContentItem"><td><span class="student_id">' + sId +
				'</span></td><td><span class="student_name" item="' + index + 
				'" name="">'+ sName +
				'</span></td><td><span class="student_sex" item="' + index + 
				'">' + sSex + '</span></td>'+
				'<td><input class="student_brith" item="' + index + 
				'" type="text" name="" value="'+ sBir +
				'"></td><td><input class="student_address" item="' + index +
				'" type="text" name="" value="'+ sAdress + 
				'"></td><td><input class="student_phoneNum" item="' + index +
				'" type="text" name="" value="' + sPhone + 
				'"></td><td><input class="student_email" item="' + index + 
				'" type="text" name="" value="' + sEmail + 
				'"></td><td><input class="student_idcard" item="' + index + 
				'" type="text" name="" value="' + sIdCard + 
				'"></td><td> <span class="student_classes_name" item="' + index + 
				'">' + sClassesName + '</span>' +
				'</td>' + '<td><input class="student_information" item="' + index + 
				'" type="text" name="" value="' + sInf +  '"></td>' +
				'<td class="handle"><a href="javascript:;" class="modify" item="' + index +
				'">修改</a></td></tr>';
			$tContentNd[0].innerHTML = rstr;
			qOA[index] = qO;
		});
	}

	//学生基本信息修改
	function modifySI(sid, data, index) {
		var url = '/api/student/update/' + sid;
		var $req =$.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data: data,
		})
		.done(function(data) {
			console.log('success');
		});
		return $req;
	}
});



//学生密码修改模块
$(function() {
	var $sPassNd = $('#studentAccountManageCnt .sPass'),
		$sNewPass1Nd = $('#studentAccountManageCnt .sNewPass1'),
		$sNewPass2Nd = $('#studentAccountManageCnt .sNewPass2'),
		$mBtnNd = $('#studentAccountManageCnt .mBtn'),
		$qResultHintNd = $('#studentAccountManageCnt .qResultHint'),
		$hintTextNd = $('#studentAccountManageCnt .hintText');

	$mBtnNd.on('click', function(event) {
		event.preventDefault();
		showHintBox($qResultHintNd);
		if ($sPassNd.val().length == 0) {
			showHint($hintTextNd, '请输入密码');
			return;
		} else if ($sPassNd.val().length < 6) {
			showHint($hintTextNd, '请输入至少不少于6位的密码');
			return;
		}
		if ($sNewPass1Nd.val().length == 0) {
			showHint($hintTextNd, '请输入新密码');
			return;
		} else if ($sNewPass1Nd.val().length < 6) {
			showHint($hintTextNd, '新密码的长度不能低于6位');
			return;
		}
		if ($sNewPass2Nd.val().length == 0) {
			showHint($hintTextNd, '确认密码不能为空');
			return;
		} else if ($sNewPass1Nd.val() != $sNewPass2Nd.val()) {
			showHint($hintTextNd, '修改密码两次不一致');
			return;
		}
		if ($sNewPass1Nd.val() == $sPassNd.val()) {
			showHint($hintTextNd, '新密码和旧密码相同');
			return;
		}
		var $req = reSetPass($sPassNd.val(), $sNewPass1Nd.val())
			.done(function(data) {
				showHint($hintTextNd, data.message);
				if (data.code == 1) {
					location.reload();
				}
			})
			.fail(function(err) {
				showHint($hintTextNd, '网络连接失败，请稍后再试');
			});
	});

	//学生密码修改
	function reSetPass(oldpass, newpass) {
		var url = '/user/student/reSetPass/' + oldpass + '\/' + newpass;
		var $req = $.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data: '',
		})
		.done(function() {
			console.log("success");
		});
		return $req;
	}
});

