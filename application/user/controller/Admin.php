<?php
namespace app\user\controller;

use think\Controller;
use think\Db;

class Admin extends Controller
{
	//判断用户是否登录
	private function isLogin()
	{
		$ulogin = ulogin();
		if (!$ulogin) {
			$this->redirect('/user/index/index/');
			return;
		}
		if($ulogin['userAuth'] == 2) {
			$this->redirect('/user/teacher/home/');
			return;
		} elseif($ulogin['userAuth'] == 3) {
			$this->redirect('/user/student/home/');
			return;
		}
	}

	// 主页
	public function home()
	{
		$this->isLogin();
		$ulogin = ulogin();
		$userName = $ulogin['userId'];
		$this->assign('userName', $userName);
		return $this->fetch();
	}

	// admin用户注销
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

	// 学生管理
	public function student()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//查询还未添加的学生用户
	public function studentUser()
	{
		$this->isLogin();
		$strQuery = 'select user_id from user left join (select student_id from student) as t1 on user.user_id = t1.student_id where t1.student_id is null and user_auth=?';
		$list = Db::query($strQuery, [3]);
		if ($list) {
			return json_return($list, '学生用户列表查询成功',1);
		} else {
			return json_return(null, '学生用户列表查询失败', 0);
		}
	}

	//学生用户密码重置
	public function studentPasswordReset($id)
	{
		$this->isLogin();
		$user = Db::table('user')->where('user_id', $id)->where('user_auth', 3)->select();
		if (!$user) {
			return json_return(null, '此学生id不存在,密码重置失败', 0);
		}
		$strPass = password_hash('123456', PASSWORD_DEFAULT);
		$pass = Db::table('user')->where('user_id', $id)->update(['user_pass' => $strPass]);
		if ($pass) {
			return json_return(true, '学生密码重置成功', 1);
		} elseif($pass) {
			return json_return(null, '学生密码重置失败,稍后再试', 0);
		}
	}

	// 教师管理
	public function teacher()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//查询还未添加的教师用户
	public function teacherUser()
	{
		$this->isLogin();
		$strQuery = 'select user_id from user left join (select teacher_id from teacher) as t1 on user.user_id = t1.teacher_id where t1.teacher_id is null and user_auth=?';
		$list = Db::query($strQuery, [2]);
		if ($list) {
			return json_return($list, '教师用户列表查询成功',1);
		} else {
			return json_return(null, '教师用户列表查询失败', 0);
		}
	}

	//教师用户密码重置
	public function teacherPasswordReset($id)
	{
		$this->isLogin();
		$user = Db::table('user')->where('user_id', $id)->where('user_auth', 2)->select();
		if (!$user) {
			return json_return(null, '此教师id不存在,密码重置失败', 0);
		}
		$strPass = password_hash('123456', PASSWORD_DEFAULT);
		$pass = Db::table('user')->where('user_id', $id)->update(['user_pass' => $strPass]);
		if ($pass) {
			return json_return(true, '教师密码重置成功', 1);
		} elseif($pass) {
			return json_return(null, '教师密码重置失败,稍后再试', 0);
		}
	}

	//账号管理
	public function admin()
	{
		$this->isLogin();
		return $this->fetch();
	}

	// 课程管理
	public function course()
	{
		$this->isLogin();
		return $this->fetch();
	}

	// 成绩管理
	public function score()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//院系管理
	public function department()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//班级管理
	public function classes()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//用户管理
	public function user()
	{
		$this->isLogin();
		return $this->fetch();
	}
}