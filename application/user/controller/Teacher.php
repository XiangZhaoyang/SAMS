<?php
namespace app\user\controller;

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
		$ulogin = ulogin();
		$userId = $ulogin['userId'];
		$user = Db::table('teacher')->where('teacher_id', $userId)->select();
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

	//教师基本信息查询
	public function infQuery()
	{
		$ulogin = ulogin();
		if (!$ulogin) {
			return json_return(null, '用户未登录，信息操作失败', 0);
		}
		if ($ulogin['userAuth'] != 2) {
			return json_return(null, '用户权限不够，信息操作失败', 0);
		}
		$id = session('userId');
		$qstr = 'select teacher.*,department.department_name as teacher_department_name from teacher,department where teacher.teacher_department_id = department.department_id and teacher.teacher_id =?';
		$sInf = Db::query($qstr, [$id]);
		if ($sInf) {
			return json_return($sInf[0], '基本信息查询成功', 1);
		} else {
			return json_return(null, '基本信息查询失败，请稍后再试', 0);
		}
	}

	//教师密码修改
	public function reSetPass($pass, $newpass) {
		$ulogin = ulogin();
		if (!$ulogin) {
			return json_return(null, '用户未登录，信息操作失败', 0);
		}
		if ($ulogin['userAuth'] != 2) {
			return json_return(null, '用户权限不够，信息操作失败', 0);
		}
		$sid = $ulogin['userId'];
		$user = Db::table('user')->where('user_id', $sid)->select();
		$passTrue = password_verify($pass, $user[0]['user_pass']);
		if (!$passTrue) {
			return json_return(false, '密码错误，密码修改失败', 0);
		}
		$strPass = password_hash($newpass, PASSWORD_DEFAULT);
		$pass = Db::table('user')->where('user_id', $sid)->update(['user_pass' => $strPass]);
		if ($pass) {
			return json_return(true, '密码修改成功', 1);
		} else{
			return json_return(false, '密码修改失败，请稍后再试', 0);
		}
	}

	//teacher课程管理
	public function course()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//根据班级查询课程列表
	public function courseIndexByClassesId($cid, $year, $term)
	{
		$this->isLogin();
		$ulogin = ulogin();
		$uid = $ulogin['userId'];
		$str = 'select course.course_id,course.course_name, classes.classes_name as classes_name, classes.classes_id as classes_id from course, classes where classes.classes_id = course.course_classes_id and course.course_classes_id =? and course.course_year = ? and course.course_term =? and course_teacher_id =?';
		$list = Db::query($str, [$cid, $year, $term, $uid]);
		if ($list) {
			return json_return($list, '信息查询成功', 1);
		} else {
			return json_return($list, '信息查询失败', 0);
		}
	}

	//查询全部课程列表
	public function courseIndex($year, $term)
	{
		$ulogin = ulogin();
		$uid = $ulogin['userId'];
		$str = 'select course.course_id,course.course_name, classes.classes_name as classes_name,classes.classes_id as classes_id from course, classes where classes.classes_id = course.course_classes_id and course.course_year =? and course.course_term =? and course.course_teacher_id =?';
		$list = Db::query($str, [$year, $term, $uid]);
		if ($list) {
			return json_return($list, '信息查询成功', 1);
		} else {
			return json_return($list, '信息查询失败', 0);
		}
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