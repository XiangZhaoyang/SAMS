<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

// api返回格式函数
function json_return($data = null, $message = '' , $code = 1, $url = '')
{
	$dataR = ['data' => $data, 'message' => $message, 'code' => $code, 'url' => $url];
	return json($dataR);
}

//用户登录检验函数
function ulogin()
{
	$userId = session('userId');
	$userAuth = session('userAuth');
	if (!$userId) {
		return false;
	}
	else {
		return ['userId' => $userId, 'userAuth' => $userAuth];
	}
}