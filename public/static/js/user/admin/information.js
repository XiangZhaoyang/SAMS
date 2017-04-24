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


//管理员密码修改模块
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

	//管理员密码修改
	function reSetPass(oldpass, newpass) {
		var url = '/user/admin/modifyPass/' + oldpass + '\/' + newpass;
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