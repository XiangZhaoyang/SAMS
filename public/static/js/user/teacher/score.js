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
		$studentAcManageCntNd = $('#content #studentAccountManageCnt'),
		$sduentSecondSocreNd = $('#nav .sduentSecondSocre'),
		$sduentSecondSocreCntNd = $('#content #sduentSecondSocreCnt'),
		$studentModifySecondSocreNd = $('#nav .studentModifySecondSocre'),
		$studentModifySecondSocreCntNd = $('#content #studentModifySecondSocreCnt');

	$navNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;
		switch (that) {
			case $studentInfNd[0]: {
				$studentInfNd.addClass('select');
				$studentAcManageNd.removeClass('select');
				$studentInfCntNd.removeClass('hide').addClass('show');
				$studentAcManageCntNd.removeClass('show').addClass('hide');
				$sduentSecondSocreCntNd.removeClass('show').addClass('hide');
				$studentModifySecondSocreCntNd.removeClass('show').addClass('hide');
			}
			break;
			case $studentAcManageNd[0]: {
				$studentAcManageNd.addClass('select');
				$studentInfNd.removeClass('select');
				$studentInfCntNd.removeClass('show').addClass('hide');
				$studentAcManageCntNd.removeClass('hide').addClass('show');
				$sduentSecondSocreCntNd.removeClass('show').addClass('hide');
				$studentModifySecondSocreCntNd.removeClass('show').addClass('hide');
			}
			break;
			case $sduentSecondSocreNd[0]: {
				$studentAcManageNd.addClass('select');
				$studentInfNd.removeClass('select');
				$studentInfCntNd.removeClass('show').addClass('hide');
				$studentAcManageCntNd.removeClass('show').addClass('hide');
				$sduentSecondSocreCntNd.removeClass('hide').addClass('show');
				$studentModifySecondSocreCntNd.removeClass('show').addClass('hide');
			}
			break;
			case $studentModifySecondSocreNd[0]: {
				$studentAcManageNd.addClass('select');
				$studentInfNd.removeClass('select');
				$studentInfCntNd.removeClass('show').addClass('hide');
				$studentAcManageCntNd.removeClass('show').addClass('hide');
				$sduentSecondSocreCntNd.removeClass('show').addClass('hide');
				$studentModifySecondSocreCntNd.removeClass('hide').addClass('show');
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
				showHintBox($qResultHintNd);
				showHint($hintTextNd, data.message);
				$tContentNd[0].innerHTML = '';
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

	//根据课程查询学生成绩列表（未添加成绩）
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




//成绩修改模块
$(function($) {
	var $cNameNd =  $('#studentAccountManageCnt #cName'),
		$cNameHintNd = $('#studentAccountManageCnt #cNameHint'),
		$qCNameBtnNd = $('#studentAccountManageCnt .qCNameBtn'),
		$qResultHintNd = $('#studentAccountManageCnt .qResultHint'),
		$addCourseNd = $('#studentAccountManageCnt .addCourse'),
		$hintTextNd = $('#studentAccountManageCnt .hintText'),
		$tContentNd = $('#studentAccountManageCnt .tContent');
		$qResultHint = $('#studentAccountManageCnt .qResultHint'),
		$hintText = $('#studentAccountManageCnt .hintText'),
		$tContentNd = $('#studentAccountManageCnt .tContent'),
		$confirmboxNd = $('.confirmbox'),
		$confirmboxHintNd = $('.confirmbox .confirmboxHint'),
		$cancelboxNd = $('.confirmbox .cancelbox'),
		$confirmNd = $('.confirmbox .confirm'),
		$cancelNd = $('.confirmbox .confirmboxItem');

	//学生成绩列表对象
	var scoreObj = [];

	//学生姓名列表
	var snameArr = [];

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
		var $req = courseIndexByCid(cid)
			.done(function(data) {
				if (data.code == 1 && data.data) {
					console.log('success');
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, data.message);
					$tContentNd[0].innerHTML = '';
				}
			})
			.fail(function() {
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			});

		$req.done(function(data) {
			var courseId = data.data[0]['course_id'];
			var dataClasses = data.data[0];
			var $req2 = indexScoreByCidAdd(courseId)
				.done(function(data) {
					if (data.code == 1 && data.data) {
						showRt(data.data, dataClasses);
						$addCourseNd.removeClass('hide');
					} else {
						showHintBox($qResultHintNd);
						showHint($hintTextNd, '此班的成绩还未添加');
						$tContentNd[0].innerHTML = '';
					}
				})
				.fail(function() {
					showHintBox($qResultHintNd);
					showHint($hintTextNd);
				});
		});
	});

	//修改学生成绩信息(点击事件代理)
	$tContentNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;

		//判断是否是修改按钮
		if (that.classList.contains('modify')) {
			//得到行索引
			var index = that.getAttribute('item')
			//判断内容是否改变
			if(!scoreObj[index].change) {
				showHintBox($qResultHint);
				showHint($hintText,'内容并没改变,成绩修改失败');
				return;
			}

			if (!scoreObj[index].valhas) {
				showHintBox($qResultHint);
				showHint($hintText, '成绩不能为空,成绩修改失败');
				return;
			}

			if (!scoreObj[index].valueTF) {
				showHintBox($qResultHintNd);
				showHint($hintTextNd, '输入的成绩有误，请输入0-100的分数值');
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
				var sid = scoreObj[index].data['score_student_id'],
					courseid = scoreObj[index].data['score_course_id'],
					data = scoreObj[index].data;
				var $req = modify(sid, courseid, data)
					.done(function(data){
						showHintBox($qResultHint);
						showHint($hintText, data.message);
						console.log(data.data);
						if (data.code == 1) {
							$qCNameBtnNd.trigger('click');
						}
					})
					.fail(function(data) {
						showHintBox($qResultHint);
						showHint($hintText, data.message);
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
		scoreObj[index].change = true;
		scoreObj[index]['data'][that.classList[0]] = that.value;
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
	});


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
			'<td><input type="text" class="score_score" item="'+ index +'" value="' + sscore+'"/></td>'+
			'<td class="handle"><a href="javascipt:;" class="modify" item="' + index + '">修改</a></td></tr>';
			scoreObj[index] = sobj;
			scoreObj[index].valueTF = false;
			scoreObj[index].valhas = false;
			scoreObj[index].change = false;
			snameArr[index] = sname;
		});
		$tContentNd[0].innerHTML = str;
	}

	//根据课程查询学生成绩列表(已添加成绩)
	function indexScoreByCidAdd(courseId) {
		var url = '/api/score/indexScoreByCidAdd/' + courseId;
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

	//根据学生查询成绩（已添加）
	function readScore(sid, cid) {
		var url = '/api/score/' + cid + '\/' + cId;
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

	//修改学生成绩
	function modify(sid, courseid,data) {
		var url = '/api/score/update/' + sid +'\/' + courseid;
		var $req = $.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data: data,
		})
		.done(function() {
			console.log("success");
		});
		return $req;
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
});



//补考成绩添加模块
$(function(){
	var $cNameNd =  $('#sduentSecondSocreCnt #cName'),
		$cNameHintNd = $('#sduentSecondSocreCnt #cNameHint'),
		$qCNameBtnNd = $('#sduentSecondSocreCnt .qCNameBtn'),
		$qResultHintNd = $('#sduentSecondSocreCnt .qResultHint'),
		$addCourseNd = $('#sduentSecondSocreCnt .addCourse'),
		$hintTextNd = $('#sduentSecondSocreCnt .hintText'),
		$tContentNd = $('#sduentSecondSocreCnt .tContent');

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
			var $req2 = indexSecondScoreByCid(courseId)
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
		var reg = /^[1-5]\d(\.\d)?$|(60)$|^[0-9]$/;
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
		var $req = addSecondSore(data, data[0]['score_course_id'])
			.done(function(data) {
				showHintBox($qResultHintNd);
				showHint($hintTextNd, data.message);
				$tContentNd[0].innerHTML = '';
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
				sscore = sdata['score_second'] = data['score_second'];
				sscore = (sscore == null)? '' : sscore;
			str += '<tr class="tableContentItem"><td class="course_id" item=" ' + index + ' ">' + cid  +'</td>' +
			'<td class="course_name" item="' + index + '">' + cName + '</td>' +  
			'<td class="classes_course_name" item="' + index + '">' + cCourseName + '</td>'+
			'<td class="score_student_id" item>' + sid+ '</td>'+
			'<td class="student_name">'+ sname +'</td>'+
			'<td><input type="text" class="score_second" item="'+ index+'" value="' + sscore+'"/></td></tr>';
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

	//根据课程查询学生成绩列表（未通过的成绩）
	function indexSecondScoreByCid(courseId) {
		var url = '/api/score/indexSecondScoreByCid/' + courseId;
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

	//添加学生补考成绩
	function addSecondSore(data,courseId,url) {
		url = url || '/api/score/addSecondSoreByClasses/' + courseId;
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



//补考成绩修改模块
$(function($) {
	var $cNameNd =  $('#studentModifySecondSocreCnt #cName'),
		$cNameHintNd = $('#studentModifySecondSocreCnt #cNameHint'),
		$qCNameBtnNd = $('#studentModifySecondSocreCnt .qCNameBtn'),
		$qResultHintNd = $('#studentModifySecondSocreCnt .qResultHint'),
		$addCourseNd = $('#studentModifySecondSocreCnt .addCourse'),
		$hintTextNd = $('#studentModifySecondSocreCnt .hintText'),
		$tContentNd = $('#studentModifySecondSocreCnt .tContent');
		$qResultHint = $('#studentModifySecondSocreCnt .qResultHint'),
		$hintText = $('#studentModifySecondSocreCnt .hintText'),
		$tContentNd = $('#studentModifySecondSocreCnt .tContent'),
		$confirmboxNd = $('.confirmbox'),
		$confirmboxHintNd = $('.confirmbox .confirmboxHint'),
		$cancelboxNd = $('.confirmbox .cancelbox'),
		$confirmNd = $('.confirmbox .confirm'),
		$cancelNd = $('.confirmbox .confirmboxItem');

	//学生成绩列表对象
	var scoreObj = [];

	//学生姓名列表
	var snameArr = [];

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
		var $req = courseIndexByCid(cid)
			.done(function(data) {
				if (data.code == 1 && data.data) {
					console.log('success');
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, data.message);
					$tContentNd[0].innerHTML = '';
				}
			})
			.fail(function() {
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			});

		$req.done(function(data) {
			var courseId = data.data[0]['course_id'];
			var dataClasses = data.data[0];
			var $req2 = indexSecondScoreByCidAdd(courseId)
				.done(function(data) {
					if (data.code == 1 && data.data) {
						showRt(data.data, dataClasses);
						$addCourseNd.removeClass('hide');
					} else {
						showHintBox($qResultHintNd);
						showHint($hintTextNd, '此班的成绩还未添加');
						$tContentNd[0].innerHTML = '';
					}
				})
				.fail(function() {
					showHintBox($qResultHintNd);
					showHint($hintTextNd);
				});
		});
	});

	//修改学生成绩信息(点击事件代理)
	$tContentNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;

		//判断是否是修改按钮
		if (that.classList.contains('modify')) {
			//得到行索引
			var index = that.getAttribute('item')
			//判断内容是否改变
			if(!scoreObj[index].change) {
				showHintBox($qResultHint);
				showHint($hintText,'内容并没改变,成绩修改失败');
				return;
			}

			if (!scoreObj[index].valhas) {
				showHintBox($qResultHint);
				showHint($hintText, '成绩不能为空,成绩修改失败');
				return;
			}

			if (!scoreObj[index].valueTF) {
				showHintBox($qResultHintNd);
				showHint($hintTextNd, '输入的成绩有误，请输入0-100的分数值');
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
				var sid = scoreObj[index].data['score_student_id'],
					courseid = scoreObj[index].data['score_course_id'],
					data = scoreObj[index].data;
				var $req = modify(sid, courseid, data)
					.done(function(data){
						showHintBox($qResultHint);
						showHint($hintText, data.message);
						console.log(data.data);
						if (data.code == 1) {
							$qCNameBtnNd.trigger('click');
						}
					})
					.fail(function(data) {
						showHintBox($qResultHint);
						showHint($hintText, data.message);
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
		scoreObj[index].change = true;
		scoreObj[index]['data'][that.classList[0]] = that.value;
		var reg = /^[1-5]\d(\.\d)?$|(60)$|^[0-9]$/;
		if (!reg.test(that.value)) {
			scoreObj[index].valueTF = false;
			scoreObj[index].valhas = true;
			showHintBox($qResultHintNd);
			showHint($hintTextNd, '输入的成绩有误，请输入0-60的分数值');
			return;
		}
		scoreObj[index].valueTF = true;
		scoreObj[index].valhas = true;
	});


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
				sscore = sdata['score_second'] = data['score_second'];
			str += '<tr class="tableContentItem"><td class="course_id" item=" ' + index + ' ">' + cid  +'</td>' +
			'<td class="course_name" item="' + index + '">' + cName + '</td>' +  
			'<td class="classes_course_name" item="' + index + '">' + cCourseName + '</td>'+
			'<td class="score_student_id" item>' + sid+ '</td>'+
			'<td class="student_name">'+ sname +'</td>'+
			'<td><input type="text" class="score_second" item="'+ index +'" value="' + sscore+'"/></td>'+
			'<td class="handle"><a href="javascipt:;" class="modify" item="' + index + '">修改</a></td></tr>';
			scoreObj[index] = sobj;
			scoreObj[index].valueTF = false;
			scoreObj[index].valhas = false;
			scoreObj[index].change = false;
			snameArr[index] = sname;
		});
		$tContentNd[0].innerHTML = str;
	}

	//根据课程查询学生成绩列表(已添加已补考成绩)
	function indexSecondScoreByCidAdd(courseId) {
		var url = '/api/score/indexSecondScoreByCidAdd/' + courseId;
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


	//修改学生成绩（补考成绩）
	function modify(sid, courseid,data) {
		var url = '/api/score/updateSecond/' + sid +'\/' + courseid;
		var $req = $.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data: data,
		})
		.done(function() {
			console.log("success");
		});
		console.log(data);
		return $req;
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
});