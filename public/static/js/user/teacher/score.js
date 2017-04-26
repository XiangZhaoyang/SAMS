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

	//查询班级未添加的课程
	$qCNameBtnNd.on('click', function(event) {
		event.preventDefault();
		var cid = $cNameNd.val();
		console.log(cid);
		var $req = classesCourse(cid)
			.done(function(data) {
				if (data.code == 1 && data.data) {
					var data = data.data;
					showRt(data);
				} else {
					showHintBox($qResultHintNd);
					showHint($hintTextNd, data.message);
					$tContentNd[0].innerHTML = '';
				}
				// console.log(data);
			})
			.fail(function() {
				showHintBox($qResultHintNd);
				showHint($hintTextNd);
			})
	});

	//显示未添加班级数据
	function showRt(data) {
		qOA = [];
		var str = '';
		data.forEach(function(item, index) {
			var data = item,
				qO = {},
				qData = qO.data = {},
				cId = qData['classes_id'] = data['classes_id'],
				cName = qData['classes_name'] = data['classes_name'],
				cCourseId = qData['classes_course_id'] = data['classes_course_id'],
				cCourseName = qData['classes_course_name'] = data['classes_course_name'];
			qO.change = false;
			str += '<tr class="tableContentItem"><td><span class="classes_id" item=" ' + index + ' ">' + cId +
			'</span></td>' +
			'<td><span class="classes_name" item="' + index + '">' + cName + '</span></td>' + 
			'<td><span class="classes_course_id" item="' + index +'">' + cCourseId + '</span></td>' + 
			'<td><span class="classes_course_name" item="' + index + '">' + cCourseName + '</span></td>' + 
			'<td class="handle"> <a href="javascript:;" class="add" item="' + index + '">生成成绩表</a> </td></tr>';
			qOA[index] = qO;
		});
		$tContentNd[0].innerHTML = str;
	}

	//根据班级id查询信息
	function courseIndexByCid(cid,yaer,term) {
		yaer = yaer || '2014-2015';
		term = term || '1';
		var url = '/courseIndexByCid/' + cid + '\/' + yaer + '\/' + term;
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
	
	//查询教师全部课程列表
	function courseIndex(year, term) {
		yaer = yaer || '2014-2015';
		term = term || '1';
		var url = '/courseIndex/' + year + '\/' + term + '\/';
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
		.done(function(data) {
			console.log(data.data);
		});
		return $req;
	}

});