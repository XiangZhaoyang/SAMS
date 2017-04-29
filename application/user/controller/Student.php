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
			return json_return($sInf[0], '基本信息查询成功', 1);
		} else {
			return json_return(null, '基本信息查询失败，请稍后再试', 0);
		}
	}

	//student信息管理
	public function information()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//学生密码修改
	public function reSetPass($pass, $newpass) {
		$ulogin = ulogin();
		if (!$ulogin) {
			return json_return(null, '用户未登录，信息操作失败', 0);
		}
		if ($ulogin['userAuth'] != 3) {
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

	//student课程管理
	public function course()
	{
		$this->isLogin();
		return $this->fetch();
	}

	//根据学年查询学生成绩
	public function queryCourseByYear($year)
	{
		$ulogin = ulogin();
		if (!$ulogin) {
			return json_return(null, '用户未登录， 信息操作失败', 0);
		}
		if ($ulogin['userAuth'] != 3) {
			return json_return(null, '用户权限不够，信息操作失败', 0);
		}
		$sid = $ulogin['userId'];
		$classes = Db::table('student')->where('student_id', $sid)->select();
		$classesId = $classes[0]['student_classes_id'];
		$str = 'select course.course_id, course.course_name, course.course_credit, course.course_year,course.course_term,course.course_style,department.department_name, teacher.teacher_name from course, teacher, department where course.course_teacher_id = teacher.teacher_id and course.course_department_id = department.department_id and course.course_classes_id =? and course.course_year=?';
		$list = Db::query($str, [$classesId, $year]);
		if ($list) {
			return json_return($list, '学生成绩列表查询成功', 1);
		} else {
			return json_return(null, '学生成绩列表查询失败', 0);
		}
	}

	//查询学生全部成绩
	public function queryCourse()
	{
		$ulogin = ulogin();
		if (!$ulogin) {
			return json_return(null, '用户未登录， 信息操作失败', 0);
		}
		if ($ulogin['userAuth'] != 3) {
			return json_return(null, '用户权限不够，信息操作失败', 0);
		}
		$sid = $ulogin['userId'];
		$classes = Db::table('student')->where('student_id', $sid)->select();
		$classesId = $classes[0]['student_classes_id'];
		$str = 'select course.course_id, course.course_name, course.course_credit, course.course_year,course.course_term,course.course_style,department.department_name, teacher.teacher_name from course, teacher, department where course.course_teacher_id = teacher.teacher_id and course.course_department_id = department.department_id and course.course_classes_id =?';
		$list = Db::query($str, [$classesId]);
		if ($list) {
			return json_return($list, '学生成绩列表查询成功', 1);
		} else {
			return json_return(null, '学生成绩列表查询失败', 0);
		}
	}

	//student成绩管理
	public function score()
	{
		$this->isLogin();
		return $this->fetch();
	}
}