<?php
namespace app\user\controller;

use think\Controller;
use think\Db;

class Student extends Controller
{
	//判断用户是否登录
	private function isLogin()
	{
		$ulogin = ulogin();
		if (!$ulogin) {
			$this->redirect('/user/index/index/');
			return;
		}
		if ($ulogin['userAuth'] == 2) {
			$this->redirect('/user/teacher/home/');
			return;
		} elseif ($ulogin['userAuth'] == 1) {
			$this->redirect('/user/admin/home/');
			return;
		}
	}
	// student主页
	public function home()
	{
		$this->isLogin();
		$ulogin = ulogin();
		$userId = $ulogin['userId'];
		$user = Db::table('student')->where('student_id', $userId)->select();
		$userName = $user[0]['student_name'];
		$this->assign('userName', $userName);
		return $this->fetch();
	}

	// student注销
	public function logout()
	{
		$ulogin = ulogin();
		if ($ulogin) {
			session('userId', null);
			session('userAuth', null);
			return json_return(true, '用户注销成功', 1, 'user/index/index');
		} else {
			return json_return(null, '用户未登录，注销失败', 0);
		}
	}

	//student信息管理
	public function information()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//student课程管理
	public function course()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//student成绩管理
	public function score()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//student账号管理
	public function student()
	{
		$this->isLogin();
		return $this->fetch();
	}
}