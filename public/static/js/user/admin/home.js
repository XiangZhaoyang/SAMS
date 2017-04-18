$(function() {
	var $navNode = $('#nav'),
		$navItemNodes = $('a.navItem'),
		$logoutNode = $('.logout'),
		$contentPageNode = $('iframe.contentPage'),
		$logoutboxNode = $('.logoutbox'),
		$logoutHintBoxNode = $('.logoutHintBox'),
		$logoutHintBoxHintNode = $('.logoutHintBoxHint');

	var href = {
		studentManage: '/user/admin/student/',
		teacherManage: '/user/admin/teacher/',
		courseManage: '/user/admin/course/',
		departmentManage: '/user/admin/department/',
		classesManage: '/user/admin/classes/',
		scoreManage: '/user/admin/score/',
		userManage: '/user/admin/user/',
		accountManage: '/user/admin/admin'
	};

	$navNode.on('click', function(event) {
		if (event.target == $navNode[0]) {
			return;
		}
		var that = event.target;
		if (that === $logoutNode[0]) {
			return;
		}
		$navItemNodes.each(function(index, el) {
			el.classList.remove('select');
		});
		that.classList.add('select');
		$contentPageNode[0].src = href[that.classList[0]];
	});

	//弹出注销框
	$logoutNode.on('click', function(event) {
		$navItemNodes.each(function(index, el) {
			el.classList.remove('select');
		});
		$logoutNode.addClass('select')
		$logoutboxNode.removeClass('hide').addClass('show');
	});

	//取消注销框
	$('.cancelbox').on('click', function(event) {
		event.preventDefault();
		$logoutboxNode.removeClass('show').addClass('hide');
	});

	//取消注销框
	$('.cancel').on('click', function(event) {
		event.preventDefault();
		$logoutboxNode.removeClass('show').addClass('hide');
	});

	//确定注销
	$('.confirm').on('click', function(event) {
		event.preventDefault();
		$logoutboxNode.removeClass('show').addClass('hide');
		var $quest = $.ajax({
			url: '/user/admin/logout/',
			type: 'POST',
			dataType: 'json',
			data: {},
		})
		.done(function(data) {
			if (data) {
				$logoutHintBoxHintNode[0].innerText = data.message;
			}
		})
		.done(function(data){
			if (data.code == 1) {
				setTimeout(function(){
					window.location.href = data.url;
				}, 1000);
			} else if (data.code == 0) {
				setTimeout(function(){
					$logoutHintBoxNode.removeClass('show').addClass('hide');
				}, 1000);
			}
		})
		.fail(function() {
			$logoutHintBoxHintNode[0].innerText = '网络连接失败，请稍后再试';
		})
		.always(function() {
			$logoutHintBoxNode.removeClass('hide').addClass('show');
		});
	});
});