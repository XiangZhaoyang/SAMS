<?php
namespace app\user\contrller;

use think\Controller;
use think\Db;

class Teacher extends Controller
{
	//判断用户是否登录
	private function isLogin()
	{
		$ulogin = ulogin();
		if (!$ulogin) {
			$this->redirect('/user/index/index/');
			return;
		}
		if($ulogin['userAuth'] == 1) {
			$this->redirect('/user/admin/home/');
			return;
		} elseif($ulogin['userAuth'] == 3) {
			$this->redirect('/user/student/home/');
			return;
		}
	}

	// teacher主页
	public function home()
	{
		$this->isLogin();
		$userId = $ulogin['userId'];
		$user = Db::table('student')->where('teacher_id', $userId)->select();
		$userName = $user[0]['teacher_name'];
		$this->assign('userName', $userName);
		return $this->fetch();
	}

	// 注销
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

	//teacher信息管理
	public function information()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//teacher课程管理
	public function course()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//teacher成绩管理
	public function score()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//teacher账号管理
	public function teacher()
	{
		$this->isLogin();
		return $this->fetch();
	}
}