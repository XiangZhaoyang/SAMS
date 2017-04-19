<?php
namespace app\user\controller;

use think\Controller;
use think\captcha\Captcha;

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
		$captcha = new Captcha();
		// if (!$captcha->check(input('post.code'))) {
		// 	return json_return(null,'验证码错误，请重新登录', 0);
		// }
		$userid = input('post.userId');
		$userPass = input('post.userPass');
		$pass = db('user')->where('user_id', $userid)->select();
		if (!$pass) {
			return json_return(null, '不存在此用户，请输入正确的用户', 0);
		}
		$passTrue = password_verify($userPass, $pass[0]['user_pass']);
		if (!$passTrue) {
			return json_return(null, '密码错误,请输入正确的密码', 0);
		}
		$userAuth = $pass[0]['user_auth'];
		session('userId', $userid);
		session('userAuth', $userAuth);
		if ($userAuth === 3) {
			return json_return(['type' => 'student'], '用户登录成功', 1, '/user/student/home');
		} elseif ($userAuth === 2) {
			return json_return(['type' => 'teacher'], '用户登录成功', 1, '/user/teacher/home');
		} elseif ($userAuth === 1) {
			return json_return(['type' => 'admin'], '用户登录成功', 1, '/user/admin/home');
		}
	}
}