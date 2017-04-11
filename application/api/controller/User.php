<?php
namespace app\api\controller;

use app\api\model\User as UserModel;
use app\api\model\Student as StudentModel;
use app\api\model\Teacher as TeacherModel;

class User
{
	// 获取用户信息
	public function index()
	{
		$list = UserModel::all();
		return json_return($list);
	}

	// 根据id获取用户信息
	public function read($id)
	{
		$user = UserModel::get($id);
		return json_return($user);
	}

	// 根据id删除用户
	public function delete($id)
	{
		$user = UserModel::get($id);

		if ($user->user_auth === 2) {
			$teacher = TeacherModel::get($id);
			$trt = $teacher->delete();
			if ($trt) {
				$rt = $user->delete();
				if ($rt) {
					return json_return($rt, '教师用户删除成功', 1);
				}
				return json_return($rt, '教师用户删除失败', 0);
			} else {
				return json_return($trt, '教师用户删除失败', 0);
			}
		}

		if ($user->user_auth === 3) {
			$student = StudentModel::get($id);
			$srt = $student->delete();
			if ($srt) {
				$rt = $user->delete();
				if ($rt) {
					return json_return($rt, '学生用户删除成功', 1);
				} else {
					return json_return($rt, '学生用户删除失败', 0);
				}
			} else {
				return json_return($srt, '学生用户删除失败', 0);
			}
		}

		if ($user->user_auth === 1) {
			return json_return($rt, '不能删除管理员用户', 0);
		}
	}

	// 根据id修改密码
	public function updete($id)
	{
		$user = UserModel::get($id);
		$user->user_pass = input('put.pass');
		$rt = $user->save();
		if ($rt) {
			return json_return($rt, '密码修改成功', 1);
		} else {
			return json_return($rt, '密码修改失败', 0);
		}
	}

	// 添加用户
	public function add()
	{
		$user = new UserModel;
		if ($user->allowField(ture)->save(input('post.'))) {
			return json_return($user->id, '用户添加成功', 1);
		} else {
			return json_return(null, '用户添加失败', 0);
		}
	}
}