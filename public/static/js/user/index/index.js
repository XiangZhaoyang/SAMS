function checkUserName(strUserName) {
	var strReg = /^[1-3]\d{11}$/ig;
	return strReg.test(strUserName);
}

function CheckUserPassword(strUserPassword) {
	var strReg = /^.{6,30}$/ig;
	return strReg.test(strUserPassword);
}

function check(strCheck, strReg) {
	return strReg.test(strCheck);
}

function show(node) {
	node.style.display = 'block';
}

function hiddle(node) {
	node.style.display = 'none';
}

function checkCode(code) {
	var strReg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){4}$/ig;
	return strReg.test(code);
}

window.onload = function() {
	var loginFormNode = document.getElementsByClassName('loginForm')[0],
		userNameNode = document.getElementById('loginUser'),
		userPasswordNode = document.getElementById('loginPass'),
		submitButtonNode = loginFormNode.getElementsByClassName('button')[0],
		loginHintNode = loginFormNode.getElementsByClassName('loginHint')[0],
		userHintNode = loginFormNode.getElementsByClassName('userHint')[0],
		userPasswordHintNode = loginFormNode.getElementsByClassName('userPasswordHint')[0],
		codeNode = loginForm.getElementsByClassName('code')[0],
		captchaImgNode = loginForm.getElementsByClassName('captchaImg')[0],
		captchaRefreshNode = loginForm.getElementsByClassName('captchaRefresh')[0];
		
	var userName, userPassword,code;
		
	userHintNode.onclick = function() {
		hiddle(userHintNode);
		userNameNode.focus();
	};
	
	function userNameCheck() {
		userName = userNameNode.value;
		if (userName.length === 0) {
			show(loginHintNode);
			loginHintNode.innerHTML = '请输入用户名.';
			return false;
		}
		if (!checkUserName(userName)) {
			show(loginHintNode);
			loginHintNode.innerHTML = '请按正确的格式输入用户名.';
		} else {
			hiddle(loginHintNode);
		}
	}
	userNameNode.onblur = userNameCheck;
	
	userPasswordHintNode.onclick = function() {
		userNameCheck();
		hiddle(userPasswordHintNode);
		userPasswordNode.focus();
	};
	
	userPasswordNode.onblur = function() {
		var strAllnumReg = /^[0-9]{10,20}$/g;
		userPassword = userPasswordNode.value;
		if (userPassword.length === 0) {
			show(loginHintNode);
			loginHintNode.innerText = '请输入密码.';
			return false;
		}
		if(userPassword.length < 6) {
			show(loginHintNode);
			loginHintNode.innerText = '密码输入过短，需要6位.';
			return false;
		} else if (userPassword.length > 30) {
			show(loginHintNode);
			loginHintNode.innerText = '密码输入过长，需要小于等于30位.';
			return false;
		}
		
		if(strAllnumReg.test(userPassword)) {
			show(loginHintNode);
			loginHintNode.innerText = '不能输入纯数字.';
			return false;
		}
		if (!CheckUserPassword(userPassword)) {
			show(loginHintNode);
			loginHintNode.innerText = '请按正确的格式输入密码.';
		} else {
			hiddle(loginHintNode);
		}
	};
	
	codeNode.onclick = function() {
		if (codeNode.value == '请输入验证码') {
			codeNode.value = '';
		}
	};

	codeNode.onblur = function() {
		code = codeNode.value;
		if (code.length === 0) {
			show(loginHintNode);
			loginHintNode.innerText = '请输入验证码';
			return false;
		} else if (code.length === 4) {
			if (checkCode(codeNode.value)) {
				hiddle(loginHintNode);
			} else {
				show(loginHintNode);
				loginHintNode.innerText = '请正确输入验证码';
				return false;
			}
		} else {
			show(loginHintNode);
			loginHintNode.innerText = '请正确输入验证码字符长度';
			return false;
		}
	};
	
	submitButtonNode.onclick = function() { 
		if(!checkUserName(userName)) {
			show(loginHintNode);
			loginHintNode.innerText = '用户名没有正确输入';
			return false;
		}
		if(!CheckUserPassword(userPassword)) {
			show(loginHintNode);
			loginHintNode.innerText = '用户密码没有正确输入';
			return false;
		}
		if (!checkCode(code)) {
			show(loginHintNode);
			loginHintNode.innerText = '验证码没有正确输入';
			return false;
		}
		var $req = jQuery.ajax({
				url: '/user/index/login/',
				type: 'POST',
				dataType: 'json',
				data: {'userId': userName, 'userPass': userPassword, 'code': code},
				// complete: function(xhr, textStatus) {
			 //    	//called when complete
			 //  	},
			  	success: function(data, textStatus, xhr) {
					if (data.code == 1) {
						window.location.href = data.url;
					} else if (data.code == 0) {
						show(loginHintNode);
						loginHintNode.innerText = data.message;
					}
			  	},
			  	error: function(xhr, textStatus, errorThrown) {
			    	show(loginHintNode);
					loginHintNode.innerText = '请求失败，请稍后再试。';
			  	}
		});
	}

	loginFormNode.onsubmit = function(e) {
		e.preventDefault();
	};

	captchaRefreshNode.onclick = function() {
		captchaImgNode.src = '/captcha?'  + randomNumStr(10);
	};

	function randomNumStr(n) {
		str = '';
		for (var i = 1; i <= n; i++) {
			str += Math.floor(Math.random() * 10);
		}
		return str;
	}
};