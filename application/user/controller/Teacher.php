<?php
namespace app\user\contrller;

class Teacher
{
	// teacher主页
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

	// 添加成绩
	public function addGrade()
	{
		;
	}

	// 修改成绩
	public function modifyGrade()
	{
		;
	}

	// 查看信息
	public function viewInformation()
	{
		;
	}

	// 修改信息
	public function modifyInformation()
	{
		;
	}

	// 修改密码
	public function modifyPass()
	{
		;
	}
}