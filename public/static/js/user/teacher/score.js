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
						showHint($hintTextNd, data.message);
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
		var reg = /^\d{0,2}(\.\d)?\d?/ig;
		if (!reg.test(that.value)) {
			alert('输入的格式不对');
		}
		alert(that.value);
		that.classList.remove('select');
	});

	//监听单元格的内容改变
	$tContentNd.on('change', function(event) {
		event.preventDefault();
		var that = event.target;
		//如果内容改变
		var index = that.getAttribute('item');
		scoreObj[index]['data'][that.classList[0]] = that.value;
	});

	//学生成绩列表对象
	var scoreObj = [];


	//显示课程数据
	function showRt(data,dataClasses) {
		var str = '',
			cId = dataClasses['course_id'],
			cName =  dataClasses['course_name'],
			cCourseId   = dataClasses['classes_id'],
			cCourseName  = dataClasses['classes_name'];
		data.forEach(function(item, index) {
			var data = item,
				sobj = {},
				sdata = sobj.data = {},
				cid = sdata['score_course_id'] = data['score_course_id'],
				sid = sdata['score_student_id'] = data['score_student_id'],
				sname = data['student_name'],
				sscore = sdata['score_score'] = data['score_score'];
			str += '<tr class="tableContentItem"><td class="course_id" item=" ' + index + ' ">' + cCourseId  +'</td>' +
			'<td class="course_name" item="' + index + '">' + cName + '</td>' +  
			'<td class="classes_course_name" item="' + index + '">' + cCourseName + '</td>'+
			'<td class="score_student_id" item>' + sid+ '</td>'+
			'<td class="student_name">'+ sname +'</td>'+
			'<td><input type="text" class="score_score" item="'+ index+'"/></td></tr>';
			scoreObj[index] = sobj;
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

});