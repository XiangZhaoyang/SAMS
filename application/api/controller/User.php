<?php
namespace app\api\controller;

use app\api\model\User as UserModel;
use app\api\model\Student as StudentModel;
use app\api\model\Teacher as TeacherModel;
use app\api\controller\Base;

class User extends Base
{
	// 获取用户信息
	public function indexList()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，用户列表信息失败', 0);
		}
		if ($this->userAuth == 1) {
			$list = UserModel::all();
			if ($list) {
				return json_return($list, '用户信息查询成功', 1);
			} else {
				return json_return(null, '用户信息查询失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，用户列表信息查询失败', 0);
		}
	}

	// 根据id获取用户信息
	public function read($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，用户信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$user = UserModel::get($id);
			if ($user) {
				return json_return($user, '用户查询成功', 1);
			} else {
				return json_return($user, '用户查询失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，用户信息查询失败', 0);
		}
	}

	// 根据id删除用户
	public function delete($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，用户信息删除失败', 0);
		}
		if ($this->userAuth == 1) {
			$user = UserModel::get($id);
			if ($user->user_auth == 2) {
				$teacher = TeacherModel::get($id);
				if (!$teacher) {
					$rt = $user->delete();
					if ($rt) {
						return json_return($rt, '教师用户删除成功', 1);
					}
					return json_return(null, '教师用户删除失败', 0);
				}
				$trt = $teacher->delete();
				if ($trt) {
					$rt = $user->delete();
					if ($rt) {
						return json_return($rt, '教师用户删除成功', 1);
					}
					return json_return(null, '教师用户删除失败', 0);
				} else {
					return json_return(null, '教师用户删除失败', 0);
				}
			} elseif ($user->user_auth == 3) {
				$student = StudentModel::get($id);
				if (!$student) {
					$rt = $user->delete();
					if ($rt) {
						return json_return($rt, '学生用户删除成功', 1);
					} else {
						return json_return(null, '学生用户删除失败', 0);
					}
				}
				$srt = $student->delete();
				if ($srt) {
					$rt = $user->delete();
					if ($rt) {
						return json_return($rt, '学生用户删除成功', 1);
					} else {
						return json_return(null, '学生用户删除失败', 0);
					}
				} else {
					return json_return(null, '学生用户删除失败', 0);
				}
			} elseif ($user->user_auth == 1) {
				return json_return(null, '不能删除管理员用户', 0);
			}
		} else {
			return json_return(null, '用户权限不够，用户信息删除失败', 0);
		}
	}

	// 根据id修改密码
	public function update($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，用户密码修改成功', 0);
		}
		if ($this->userAuth == 1) {
			$user = UserModel::get($id);
			if (!$user) {
				return json_return(null, '不存在此用户', 0);
			}
			$user->user_pass = input('put.pass');
			$rt = $user->save();
			if ($rt) {
				return json_return($rt, '密码修改成功', 1);
			} else {
				return json_return(null, '密码修改失败', 0);
			}
		} elseif ($this->userAuth == 2 || $this->userAuth == 3) {
			if ($id != $this->userId) {
				return json_return(null, '用户权限不够，用户密码修改失败', 0);
			}
			$user = UserModel::get($id);
			if (!$user) {
				return json_return(null, '不存在此用户', 0);
			}
			$user->user_pass = input('put.pass');
			$rt = $user->save();
			if ($rt) {
				return json_return($rt, '密码修改成功', 1);
			} else {
				return json_return(null, '密码修改失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，用户密码修改除失败', 0);
		}
	}

	// 添加用户
	public function add()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，用户信息添加失败', 0);
		}
		if ($this->userAuth == 1) {
			$user = UserModel::get(input('post.user_id'));
			if ($user) {
				return json_return(null, '用户已存在，添加失败', 0);
			}
			$user = new UserModel;
			if ($user->allowField(true)->save(input('post.'))) {
				return json_return($user->user_id, '用户添加成功', 1);
			} else {
				return json_return(null, '用户添加失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，用户信息添加失败', 0);
		}
	}
}