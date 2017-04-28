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



//课程查询模块
$(function(){
	var $cNameNd =  $('#studentInfCnt #cName'),
		$cNameHintNd = $('#studentInfCnt #cNameHint'),
		$qCNameBtnNd = $('#studentInfCnt .qCNameBtn'),
		$qResultHintNd = $('#studentInfCnt .qResultHint'),
		$addCourseNd = $('#studentInfCnt .addCourse'),
		$hintTextNd = $('#studentInfCnt .hintText'),
		$tContentNd = $('#studentInfCnt .tContent');

	//选择班级
	$cNameHintNd.on('click', function(event) {
		event.preventDefault();
		$cNameHintNd.addClass('hide');
		$cNameNd.removeClass('hide').addClass('showInline');
		var str = '';
		var $req = courseIndex()
			.done(function(data) {
				if (data.code == 1) {
					var data = data.data;
					data.forEach(function(item) {
						str += '<option value="' + item['classes_id'] + '">' + item['classes_name'] + '</option>'
					});
					$qCNameBtnNd.removeClass('hide').addClass('showInline');
				}
				$cNameNd[0].innerHTML = str;
			})
			.fail(function(){
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			});
	});

	//根据班级查询课程
	$qCNameBtnNd.on('click', function(event) {
		event.preventDefault();
		var cid = $cNameNd.val();
		console.log(cid);
		//
		var $req = courseIndexByCid(cid)
			.done(function(data) {
				if (data.code == 1 && data.data) {
					console.log('success');
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, data.message);
					$tContentNd[0].innerHTML = '';
				}
				console.log(data.data);
			})
			.fail(function() {
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			});

		$req.done(function(data) {
			var courseId = data.data[0]['course_id'];
			var dataClasses = data.data[0];
			var $req2 = indexScoreByCid(courseId)
				.done(function(data) {
					if (data.code == 1 && data.data) {
						showRt(data.data, dataClasses);
						$addCourseNd.removeClass('hide');
					} else {
						showHintBox($qResultHintNd);
						showHint($hintTextNd, '此班的信息已添加');
						$tContentNd[0].innerHTML = '';
					}
				})
				.fail(function() {
					showHintBox($qResultHintNd);
					showHint($hintTextNd);
				});
		});
	});

	//表格事件代理
	$tContentNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;

		// 判断是否是成绩输入框
		if (that.nodeName == 'INPUT') {
			that.classList.add('select');
		}
	});

	$tContentNd.on('focusout',function(event) {
		event.preventDefault();
		var that = event.target;
		that.classList.remove('select');
	});

	//监听单元格的内容改变
	$tContentNd.on('change', function(event) {
		event.preventDefault();
		var that = event.target;
		//如果内容改变
		var index = that.getAttribute('item');
		var reg = /^(\d{1,2}(\.\d)?)$|^(\d{1,2})$|^(100)$/;
		if (!reg.test(that.value)) {
			scoreObj[index].valueTF = false;
			scoreObj[index].valhas = true;
			showHintBox($qResultHintNd);
			showHint($hintTextNd, '输入的成绩有误，请输入0-100的分数值');
			return;
		}
		scoreObj[index].valueTF = true;
		scoreObj[index].valhas = true;
		scoreObj[index]['data'][that.classList[0]] = that.value;
	});


	//添加学生成绩
	$addCourseNd.on('click', function(event) {
		event.preventDefault();
		var data = {};

		for (var i = 0, len = scoreObj.length; i < len; i++) {
			if (!scoreObj[i].valhas) {
				showHintBox($qResultHintNd);
				var errMassage =  snameArr[i] + '同学的成绩并没有输入，请输入';
				showHint($hintTextNd, errMassage);
				return;
			}
			if (!scoreObj[i].valueTF) {
				showHintBox($qResultHintNd);
				var errMassage = snameArr[i] + '同学的成绩输入有误，请重新输入';
				showHint($hintTextNd, errMassage);
				return;
			}
			data[i] = scoreObj[i].data;
		}
		var $req = addSore(data, data[0]['score_course_id'])
			.done(function(data) {
				console.log(data.data);
				console.log(data.message);
			})
			.fail(function(data){
				console.log(data.responseText);
			});

	});

	//学生成绩列表对象
	var scoreObj = [];

	//学生姓名列表
	var snameArr = [];


	//显示课程数据
	function showRt(data,dataClasses) {
		var str = '',
			cId = dataClasses['course_id'],
			cName =  dataClasses['course_name'],
			cCourseId   = dataClasses['classes_id'],
			cCourseName  = dataClasses['classes_name'];
			scoreObj = [];
			snameArr = [];
		data.forEach(function(item, index) {
			var data = item,
				sobj = {},
				sdata = sobj.data = {},
				scoreId = sdata['score_id'] = data['score_id'],
				cid = sdata['score_course_id'] = data['score_course_id'],
				sid = sdata['score_student_id'] = data['score_student_id'],
				sname = data['student_name'],
				sscore = sdata['score_score'] = data['score_score'];
			str += '<tr class="tableContentItem"><td class="course_id" item=" ' + index + ' ">' + cid  +'</td>' +
			'<td class="course_name" item="' + index + '">' + cName + '</td>' +  
			'<td class="classes_course_name" item="' + index + '">' + cCourseName + '</td>'+
			'<td class="score_student_id" item>' + sid+ '</td>'+
			'<td class="student_name">'+ sname +'</td>'+
			'<td><input type="text" class="score_score" item="'+ index+'" value="' + sscore+'"/></td></tr>';
			scoreObj[index] = sobj;
			scoreObj[index].valueTF = false;
			scoreObj[index].valhas = false;
			snameArr[index] = sname;
		});
		console.log(scoreObj);
		$tContentNd[0].innerHTML = str;
	}

	//根据班级id查询信息
	function courseIndexByCid(cid,year,term) {
		year = year || '2014-2015';
		term = term || '1';
		var url = '/user/teacher/courseIndexByCid/' + cid + '\/' + year + '\/' + term;
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function() {
			console.log(url);
		});
		return $req;
	}

	//查询教师全部课程列表
	function courseIndex(year, term) {
		year = year || '2014-2015';
		term = term || '1';
		var url = '/user/teacher/courseIndex/' + year + '\/' + term + '\/';
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function() {
			console.log("success");
		});
		return $req;
	}

	//根据课程查询学生成绩列表
	function indexScoreByCid(courseId) {
		var url = '/api/score/indexScoreByCid/' + courseId;
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function() {
			console.log(url);
		});
		return $req;
	}

	//添加学生成绩
	function addSore(data,courseId,url) {
		url = url || '/api/score/addSoreByClasses/' + courseId;
		var $req = $.ajax({
			url:  url,
			type: 'PUT',
			dataType: 'json',
			data: data,
		})
		.done(function() {
			console.log("success");
		});
		console.log(url);
		return $req;
	}

});




//成绩查询修改模块
$(function($) {
	var $studentAccountManageCntNd = $('#studentAccountManageCnt'),
		$qIdNd = $('#studentAccountManageCnt .qId'),
		$qClassesNd = $('#studentAccountManageCnt .qClasses'),
		$qIdHintNd = $('#studentAccountManageCnt .qIdHint'),
		$sIdNd = $('#studentAccountManageCnt #sId'),
		$qCNameHintNd = $('#studentAccountManageCnt .qCNameHint'),
		$cNameNd = $('#studentAccountManageCnt #cName'),
		$qResult = $('#studentAccountManageCnt .qResult'),
		$qIdBtnNd = $('#studentAccountManageCnt .qIdBtn'),
		$qCNameBtnNd = $('#studentAccountManageCnt .qCNameBtn'),
		$qResultHint = $('#studentAccountManageCnt .qResultHint'),
		$hintText = $('#studentAccountManageCnt .hintText'),
		$tContentNd = $('#studentAccountManageCnt .tContent'),
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

			//取消确认框的确认按钮事件
			$confirmNd.off('click');

			//绑定确认框的确认按钮事件
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