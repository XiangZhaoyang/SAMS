<?php
namespace app\user\controller;

use think\Controller;

class Admin extends Controller
{
	// 主页
	public function home()
	{
		$ulogin = ulogin();
		if (!$ulogin) {
			redirect('/user/index/index');
		}
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

	// 添加学生用户
	public function addStudent()
	{
		;
	}

	// 添加教师用户
	public function addTeacher()
	{
		;
	}

	// 添加管理员
	public function addAdmin()
	{
		;
	}


	// 添加学生用户信息
	public function addStudentInformation()
	{
		;
	}

	// 添加教师信息
	public function addTeacherInformation()
	{
		;
	}

	// 添加管理员信息
	public function addAdminInformation()
	{
		;
	}

	// 课程添加
	public function addCourse()
	{
		;
	}

	// 选课
	public function takeCourse()
	{
		;
	}

	// 重置密码
	public function resetPass()
	{
		;
	}

	// 修改成绩
	public function modifyGrade()
	{
		;
	}

	// 修改密码
	public function modifyPass()
	{
		;
	}

	// 查看信息
	public function information()
	{
		;
	}

}