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


//课程查询模块
$(function(){
	var $cNameNd =  $('#studentModifyInfCnt #cName'),
		$cNameHintNd = $('#studentModifyInfCnt #cNameHint'),
		$qCNameBtnNd = $('#studentModifyInfCnt .qCNameBtn'),
		$qAllBtn = $('#studentModifyInfCnt .qAllBtn'),
		$qResultHintNd = $('#studentModifyInfCnt .qResultHint'),
		$hintTextNd = $('#studentModifyInfCnt .hintText'),
		$tContentNd = $('#studentModifyInfCnt .tContent');

	//选择班级
	$cNameHintNd.on('click', function(event) {
		event.preventDefault();
		$cNameHintNd.addClass('hide');
		$cNameNd.removeClass('hide').addClass('showInline');
		var str = '';
		var $req = cQuery()
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
		var $req = courseIndexByCid(cid)
			.done(function(data) {
				if (data.code == 1 && data.data) {
					var data = data.data;
					showRt(data);
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
	});

	//查询全部授课课程
	$qAllBtn.on('click', function(event) {
		event.preventDefault();
		var $req = courseIndex()
			.done(function(data) {
				if (data.code == 1 && data.data) {
					var data = data.data;
					showRt(data);
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
	});

	//显示课程数据
	function showRt(data) {
		var str = '';
		data.forEach(function(item, index) {
			var data = item,
				cId = data['course_id'],
				cName =  data['course_name'],
				cCourseId   = data['classes_id'],
				cCourseName  = data['classes_name'];
			str += '<tr class="tableContentItem"><td class="course_id" item=" ' + index + ' ">' + cCourseId  +'</td>' +
			'<td class="course_name" item="' + index + '">' + cCourseName + '</td>' + 
			'<td class="classes_course_id" item="' + index +'">' + cId + '</td>' + 
			'<td class="classes_course_name" item="' + index + '">' + cName + '</td></tr>';
		});
		$tContentNd[0].innerHTML = str;
	}

	//根据班级id查询信息
	function courseIndexByCid(cid,year,term) {
		year = year || '2013-2014';
		term = term || '2';
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
		year = year || '2013-2014';
		term = term || '2';
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

	//班级查询
	function cQuery(url) {
		url = url || '/api/classes/index';
		var $req = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: '',
		})
		.done(function() {
			console.log('success');
		});
		return $req;
	}

});