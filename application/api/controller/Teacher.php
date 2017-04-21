<?php
namespace app\api\controller;

use app\api\model\Teacher as TeacherModel;
use app\api\controller\Base;

class Teacher extends Base
{
	// 查询教师列表信息
	public function indexList()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，教师列表信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$list = TeacherModel::all();
			if ($list) {
				return json_return($list, '教师列表信息查询成功', 1);
			} else {
				return json_return(null, '教师列表信息查询失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，教师列表信息查询失败', 0);
		}
	}

	//根据院系id查询教师列表信息
	public function indexByDepartmentId($did)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，教师列表信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$list = TeacherModel::all(['teacher_department_id' => $did]);
			if ($list) {
				return json_return($list, '教师列表信息查询成功', 1);
			} else {
				return json_return(null, '教师列表信息查询失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，教师列表信息查询失败', 0);
		}
	}

	// 根据id查询教师信息
	public function read($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，教师信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$teacher = TeacherModel::get($id);
			if ($teacher) {
				return json_return($teacher, '教师信息查询成功', 1);
			} else {
				return json_return(null, '教师信息查询失败', 0);
			}
		} elseif ($this->userAuth == 2) {
			if ($id != $this->userId) {
				return json_return(null, '用户权限不够，教师信息查询失败', 0);
			}
			$teacher = TeacherModel::get($id);
			if ($teacher) {
				return json_return($teacher, '教师信息查询成功', 1);
			} else {
				return json_return(null, '教师信息查询失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，教师信息查询失败', 0);
		}
	}

	// 添加教师信息
	public function add()
	{
		if (!$this->userId) {
			return json_return(null, '用户权限不够，教师信息添加失败', 0);
		}
		if ($this->userAuth == 1) {
			$teacher = TeacherModel::get(input('post.teacher_id'));
			if ($teacher) {
				return json_return(null, '已存在此教师，教师信息添加失败', 0);
			}
			$teacher = new TeacherModel;
			if ($teacher->allowField(true)->save(input('post.'))) {
				return json_return($teacher->teacher_id, '教师信息添加成功', 1);
			} else {
				return json_return(null, '教师信息添加失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，教师信息添加失败', 0);
		}
	}

	// 根据id修改教师信息
	public function update($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户权限未登录，教师信息修改失败', 0);
		}
		if ($this->userAuth == 1) {
			$teacher = TeacherModel::get($id);
			if (!$teacher) {
				return json_return(null, '不存此教师，教师信息修改失败', 0);
			}
			if ($teacher->allowField(true)->save(input('put.'))) {
				return json_return($teacher->teacher_id, '教师信息修改成功', 1);
			} else {
				return json_return(null, '教师信息修改失败', 0);
			}
		} elseif ($this->userAuth == 2) {
			if ($id != $this->userId) {
				return json_return(null, '用户权限不够，教师信息修改失败', 0);
			}
			$teacher = TeacherModel::get($id);
			if (!$teacher) {
				return json_return(null, '不存此教师，教师信息修改失败', 0);
			}
			if ($teacher->allowField(true)->save(input('put.'))) {
				return json_return($teacher->teacher_id, '教师信息修改成功', 1);
			} else {
				return json_return(null, '教师信息修改失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，教师信息修改失败', 0);
		}
	}

	//根据id修改教师信息
	public function delete($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，教师信息删除失败', 0);
		}
		if ($this->userAuth == 1) {
			$teacher = TeacherModel::get($id);
			if (!$teacher) {
				return json_return(null, '不存在此教师，教师信息删除失败', 0);
			}
			$rt = $teacher->delete();
			if ($rt) {
				return json_return($rt, '教师信息删除成功', 1);
			} else {
				return json_return(null, '教师信息删除失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，教师信息删除失败', 0);
		}
	}
}