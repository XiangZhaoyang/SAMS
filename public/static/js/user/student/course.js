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



//学生课程查询
$(function(){

	var $cNameNd =  $('#studentCourseCnt #cName'),
		$cNameHintNd = $('#studentCourseCnt #cNameHint'),
		$qCNameBtnNd = $('#studentCourseCnt .qCNameBtn'),
		$qAllBtn = $('#studentCourseCnt .qAllBtn'),
		$qResultHintNd = $('#studentCourseCnt .qResultHint'),
		$hintTextNd = $('#studentCourseCnt .hintText'),
		$tContentNd = $('#studentCourseCnt .tContent');

	//根据学期查询学生课程
	function queryCourseByYear(year) {
		var url = '/user/student/queryCourseByYear/' + year;
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
	function queryCourse() {
		var url = '/user/student/queryCourse';
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
	});

	//根据学年查询课程
	$qCNameBtnNd.on('click', function(event) {
		event.preventDefault();
		var year = $cNameNd.val();
		console.log(year);
		var $req = queryCourseByYear(year)
			.done(function(data) {
				if (data.code == 1 && data.data) {
					showRt(data.data);
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, '不存在此学年的信息');
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
		var $req = queryCourse()
			.done(function(data) {
				if (data.code == 1 && data.data) {
					var data = data.data;
					showRt(data);
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, '不存在此学年的信息');
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
				cTearName = data['teacher_name'];
			str += '<tr class="tableContentItem">' +
				'<td>' + cId + '</td>' +
				'<td>' + cName + '</td>' + 
				'<td>' + cDepartname + '</td>' +
				'<td>' + cStyle + '</td>' + 
				'<td>' + cTearName + '</td>'+ 
				'<td>'+ cCredit + '</td>' + 
				'<td>' + cYear + '</td>'+
				'<td>' + cTerm + '</td></tr>'
		});
		$tContentNd[0].innerHTML = str;
	}
});