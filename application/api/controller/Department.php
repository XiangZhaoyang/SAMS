<?php
namespace app\api\controller;

use app\api\model\Department as DepartmentModel;

class Department
{
	//增加系
	public function add()
	{
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
	}

	// 获取系信息
	public function indexList()
	{
		$list = DepartmentModel::all();
		if ($list) {
			return json_return($list, '系信息查询成功', 1);
		} else {
			return json_return(null, '系信息查询失败', 0);
		}
	}

	// 由id查询系信息
	public function read($id)
	{
		$department = DepartmentModel::get($id);
		if ($department) {
			return json_return($department, '系信息查询成功', 1);
		} else {
			return json_return($department, '系信息查询失败', 0);
		}
	}

	// 根据id删除系信息
	public function delete($id)
	{
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
	}

	// 根据id更新系信息
	public function update($id)
	{
		$department = DepartmentModel::get($id);
		if (!$department) {
			return json_return(null, '不存在这个系，系信息修改失败', 0);
		}
		if ($department->allowField(true)->save(input('put.'))) {
			return json_return($department->department_id, '系信息修改成功', 1);
		} else {
			return json_return(null, '系信息修改失败', 0);
		}
	}
}