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


//成绩表生成模块
$(function(){
	var $cNameNd =  $('#studentModifyInfCnt #cName'),
		$cNameHintNd = $('#studentModifyInfCnt #cNameHint'),
		$qCNameBtnNd = $('#studentModifyInfCnt .qCNameBtn'),
		$qResultHintNd = $('#studentModifyInfCnt .qResultHint'),
		$hintTextNd = $('#studentModifyInfCnt .hintText'),
		$tContentNd = $('#studentModifyInfCnt .tContent'),
		$confirmboxNd = $('.confirmbox'),
		$confirmboxHintNd = $('.confirmbox .confirmboxHint'),
		$cancelboxNd = $('.confirmbox .cancelbox'),
		$confirmNd = $('.confirmbox .confirm'),
		$cancelNd = $('.confirmbox .cancel');

	//内容对象数组
	var qOA = [];

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
			console.log("success");
		});
		return $req;
	}

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

	//根据班级查询未添加的课程
	function classesCourse(cid) {
		var url = '/user/admin/classesCourse/' + cid;
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

	//根据班级id和课程id添加成绩表
	function addScoreByCid(courseid, cclassesid) {
		var url = '/api/score/addByCid/' + courseid + '\/' + cclassesid;
		var $req = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: '',
		})
		.done(function() {
			console.log("success");
		});
		return $req;
	}

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

	//各个点击事件代理
	$tContentNd.on('click', function(event) {
		event.preventDefault();
		var that = event.target;

		//判断是否是添加按钮
		if (that.classList.contains('add')) {
			$confirmboxNd.removeClass('hide');
			$confirmboxHintNd[0].innerText = '确定要添加这个班级的成绩表吗';
			$confirmboxHintNd[0].style.color = '#E4854E';

			//取消确认框确认按钮的点击事件
			$confirmNd.off('click');

			//得到行索引
			var index = that.getAttribute('item');

			//绑定确认框添加生成成绩表事件
			$confirmNd.on('click', function(event) {
				event.preventDefault();
				$confirmboxNd.addClass('hide');
				showHintBox($hintTextNd);
				var data = qOA[index].data;
				console.log(data);
				var $req = addScoreByCid(data['classes_course_id'], data['classes_id'])
				.done(function(data){
					if (data.code == 1) {
						showHint($hintTextNd, data.message);
						$qCNameBtnNd.trigger('click');
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

});