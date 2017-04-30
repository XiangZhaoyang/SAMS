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


//学生课程查询
$(function(){

	var $cNameNd =  $('#studentInfCnt #cName'),
		$cNameHintNd = $('#studentInfCnt #cNameHint'),
		$qCNameBtnNd = $('#studentInfCnt .qCNameBtn'),
		$qAllBtn = $('#studentInfCnt .qAllBtn'),
		$termBtnNd = $('#studentInfCnt .termBtn'),
		$termHintNd = $('#studentInfCnt #termHint'),
		$termNd = $('#studentInfCnt #term'),
		$qNoPass = $('#studentInfCnt .qNoPass'),
		$qResultHintNd = $('#studentInfCnt .qResultHint'),
		$hintTextNd = $('#studentInfCnt .hintText'),
		$tContentNd = $('#studentInfCnt .tContent');

	//根据学年查询学生课程
	function queryScoreByYear(year) {
		var url = '/user/student/queryScoreByYear/' + year;
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

	//根据学期查询学生成绩
	function queryScoreByTerm(year, term) {
		var url = '/user/student/queryScoreByTerm/' + year + '\/' + term;
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

	//查询学生全部成绩
	function queryScore() {
		var url = '/user/student/queryScore';
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

	//查询未通过的成绩
	function queryScoreNoPass() {
		var url = 'user/student/queryScoreNoPass/';
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


	//选择学年
	$cNameHintNd.on('click', function(event) {
		event.preventDefault();
		$cNameHintNd.addClass('hide');
		$cNameNd.removeClass('hide').addClass('showInline');
		$qCNameBtnNd.removeClass('hide');
		var str = '';
		var yearNow = (new Date()).getFullYear();
		for (var i = 0; i < 8; i++) {
			var year = (yearNow - i) + '-' + (yearNow -i +1);
			str += '<option value="' + year +' ">' + year + '</option>';
		}
		$cNameNd[0].innerHTML = str;
		$termHintNd.removeClass('hide');
	});

	//选择学期
	$termHintNd.on('click', function(event) {
		event.preventDefault();
		$termHintNd.addClass('hide');
		$termNd.removeClass('hide').addClass('showInline');
		$termBtnNd.removeClass('hide');
		var str = '';
		str += '<option value="1">1</option>'+'<option value="2">2</option>';
		$termNd[0].innerHTML = str;
	});

	//根据学年查询课程
	$qCNameBtnNd.on('click', function(event) {
		event.preventDefault();
		var year = $cNameNd.val();
		console.log(year);
		var $req = queryScoreByYear(year)
			.done(function(data) {
				if (data.code == 1 && data.data) {
					showRt(data.data);
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, '不存在此学年成绩信息');
					$tContentNd[0].innerHTML = '';
				}
				console.log(data);
			})
			.fail(function() {
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			});
	});

	//根据学期查询成绩
	$termBtnNd.on('click', function(event) {
		event.preventDefault();
		var year = $cNameNd.val();
		var term = $termNd.val();
		console.log(term);
		var $req = queryScoreByTerm(year, term)
			.done(function(data) {
				if (data.code == 1 && data.data) {
					showRt(data.data);
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, '不存在此学期成绩信息');
					$tContentNd[0].innerHTML = '';
				}
			})
			.fail(function() {
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			});
	});

	//查询全部授课课程
	$qAllBtn.on('click', function(event) {
		event.preventDefault();
		var $req = queryScore()
			.done(function(data) {
				if (data.code == 1 && data.data) {
					var data = data.data;
					showRt(data);
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, '不存在课程成绩信息');
					$tContentNd[0].innerHTML = '';
				}
				console.log(data.data);
			})
			.fail(function() {
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			});
	});

	//查询未通过课程
	$qNoPass.on('click', function(event) {
		event.preventDefault();
		var $req = queryScoreNoPass()
			.done(function(data) {
				if (data.code == 1 && data.data) {
					var data = data.data;
					showRt(data);
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, '不存在未通过的课程成绩信息');
					$tContentNd[0].innerHTML = '';
				}
				console.log(data.data);
			})
			.fail(function() {
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			});
	});

	//显示课程数据
	function showRt(data) {
		var str = '';
		data.forEach(function(item, index) {
			var data = item,
				cId = data['course_id'],
				cName =  data['course_name'],
				cCredit = data['course_credit'],
				cYear = data['course_year'],
				cTerm = data['course_term'],
				cStyle = data['course_style'],
				cDepartname = data['department_name'],
				cGap = data['score_gpa'],
				cScore = data['score_score'],
				cSecond = (data['score_second']) == null? '' : data['score_second'],
				cRebulid = data['course_rebuild'],
				cBeglong = (data['course_belong'] == null) ? '' : data['course_belong'];
				console.log(typeof data['course_belong']);
			str += '<tr class="tableContentItem">' +
				'<td>' + cYear + '</td>' + 
				'<td>' + cTerm + '</td>' + 
				'<td>' + cId + '</td>' +
				'<td>' + cName + '</td>' + 
				'<td>' + cStyle + '</td>' + 
				'<td>' + cBeglong + '</td>' + 
				'<td>' + cCredit + '</td>' + 
				'<td>' + cGap + '</td>' + 
				'<td>' + cScore + '</td>' + 
				'<td>' + cSecond + '</td>' + 
				'<td>' + cDepartname + '</td>' +
				'<td>' + cRebulid + '</td></tr>'
		});
		$tContentNd[0].innerHTML = str;
	}
});
