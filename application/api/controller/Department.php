<?php
namespace app\api\controller;

use app\api\model\Department as DepartmentModel;
use app\api\controller\Base;

class Department extends Base
{
	//调用父类构造函数
	function __construct()
	{
		parent::__construct();
	}

	//增加系
	public function add()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，系信息添加失败');
		}
		if ($this->userAuth == 1) {
			$department_id = DepartmentModel::get(input('post.department_id'));
			if ($department_id) {
				return json_return(null, '系已存在，添加失败', 0);
			}
			$department = new DepartmentModel;
			if ($department->allowField(true)->save(input('post.'))) {
				return json_return($department->department_id, '系信息添加成功', 1);
			} else {
				return json_return(null, '系信息添加失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，系信息添加失败', 0);
		}
	}

	// 获取系列表信息
	public function indexList()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，系列表信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$list = DepartmentModel::all();
			if ($list) {
				return json_return($list, '系信息查询成功', 1);
			} else {
				return json_return(null, '系信息查询失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，系列表信息查询失败', 0);
		}
	}

	// 由id查询系信息
	public function read($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，系信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$department = DepartmentModel::get($id);
			if ($department) {
				return json_return($department, '系信息查询成功', 1);
			} else {
				return json_return($department, '系信息查询失败', 0);
			}
		} elseif ($this->userAuth == 2) {
			$teacher = db('teacher')->where('teacher_id', $this->userId)->select();
			$department_id = $teacher[0]['teacher_department_id'];
			if ($id != $department_id) {
				return json_return(null, '用户权限不够，系信息查询失败', 0);
			}
			$department = DepartmentModel::get($id);
			if ($department) {
				return json_return($department, '系信息查询成功', 1);
			} else {
				return json_return($department, '系信息查询失败', 0);
			}
		} elseif ($this->userAuth) {
			$student = db('student')->where('studnet_id', $this->userId)->select();
			$classes_id = $student[0]['student_classes_id'];
			$classes = db('classes')->where('classes_id', $classes_id)->select();
			$department_id = $classes[0]['classes_department_id'];
			if ($id != $department_id) {
				return json_return(null, '用户权限不够，系列表信息查询失败', 0);
			}
			$department = DepartmentModel::get($id);
			if ($department) {
				return json_return($department, '系信息查询成功', 1);
			} else {
				return json_return($department, '系信息查询失败', 0);
			}
		}
	}

	// 根据id删除系信息
	public function delete($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，系信息删除失败', 0);
		}
		if ($this->userAuth == 1) {
			$department = DepartmentModel::get($id);
			if ($department) {
				$rt = $department->delete();
				if ($rt) {
					return json_return($department->department_id, '系信息删除成功', 1);
				} else {
					return json_return($department->department_id, '系信息删除失败', 0);
				}
			} else {
				return json_return(null, '不存这个系,系信息删除', 0);
			}
		} else {
			return json_return(null, '用户权限不够，系信息删除失败', 0);
		}
	}

	// 根据id更新系信息
	public function update($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，系信息更新失败', 0);
		}
		if ($this->userAuth == 1) {
			$department = DepartmentModel::get($id);
			if (!$department) {
				return json_return(null, '不存在这个系，系信息修改失败', 0);
			}
			if ($department->allowField(true)->save(input('put.'))) {
				return json_return($department->department_id, '系信息修改成功', 1);
			} else {
				return json_return(null, '系信息修改失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，系信息修改失败', 0);
		}
	}
}