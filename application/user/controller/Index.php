<?php
namespace app\user\controller;

use think\Controller;

class Index extends Controller
{
	// 用户进入的主页
	public function index()
	{
		return $this->fetch();
	}

	// 用户登录
	public function login()
	{
		;
	}
}