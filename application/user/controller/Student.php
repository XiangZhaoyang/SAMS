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

	//学生基本信息查询
	public function infQuery()
	{
		$ulogin = ulogin();
		if (!$ulogin) {
			return json_return(null, '用户未登录，信息操作失败', 0);
		}
		if ($ulogin['userAuth'] != 3) {
			return json_return(null, '用户权限不够，信息操作失败', 0);
		}
		$id = session('userId');
		$qstr = 'select student.*,classes.classes_name as student_classes_name from student,classes where student.student_classes_id = classes.classes_id and student.student_id =?';
		$sInf = Db::query($qstr, [$id]);
		if ($sInf) {
			return json_return($sInf[0], '学生基本信息查询成功', 1);
		} else {
			return json_return(null, '学生基本信息查询失败，请稍后再试', 0);
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
}