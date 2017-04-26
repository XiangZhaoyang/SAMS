<?php
namespace app\api\controller;

use app\api\model\Classes as ClassesModel;
use app\api\controller\Base;
use think\Db;

class Classes extends Base
{
	//调用父类构造函数
	function __construct()
	{
		parent::__construct();
	}

	//获取班级列表信息
	public function indexList()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，班级列表信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$list = ClassesModel::all();
			if ($list) {
				return json_return($list, '班级列表信息查询成功', 1);
			} else {
				return json_return(null, '班级列表信息查询失败', 0);
			}
		} elseif ($this->userAuth == 2) {
			$strQuery = 'select classes.*,count(distinct classes.classes_id) from classes, course where classes.classes_id = course.course_classes_id and course.course_teacher_id=? ';
			$classes = Db::query($strQuery, [$this->userId]);
			if ($classes) {
				return json_return($classes, '班级信息查询成功', 1);
			} else {
				return json_return($classes, '班级信息查询失败', 0);
			}
		}
		 else {
			return json_return(null, '用户权限不够，班级列表信息查询失败', 0);
		}
	}

	// 根据id查询班级信息
	public function read($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，班级信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$classes = ClassesModel::get($id);
			if ($classes) {
				return json_return($classes, '班级信息查询成功', 1);
			} else {
				return json_return($classes, '班级信息查询失败', 0);
			}
		} elseif ($this->userAuth == 2) {
			$strQuery = 'select classes.* from classes, course where classes.classes_id = course.course_classes_id and course.course_teacher_id=? and classes.classes_id=? ';
			$classes = Db::query($strQuery, [$this->userId], $id);
			if ($classes) {
				return json_return($classes, '班级信息查询成功', 1);
			} else {
				return json_return($classes, '班级信息查询失败', 0);
			}
		} elseif ($this->userAuth == 3) {
			$strQuery = 'select classes.* from classes, student where classes.classes_id = student.student_classes_id and student.student_id=? and classes.classe_id=? ';
			$classes = Db::query($strQuery, [$this->userId, $id]);
			if ($classes) {
				return json_return($classes, '班级信息查询成功', 1);
			} else {
				return json_return($classes, '班级信息查询失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，班级信息查询失败', 0);
		}
	}

	// 根据id删除班级信息
	public function delete($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，删除班级信息失败', 0);
		}
		if ($this->userAuth == 1) {
			$classes = ClassesModel::get($id);
			if ($classes) {
				$rt = $classes->delete();
				if ($rt) {
					return json_return($rt, '班级信息删除成功', 1);
				} else {
					return json_return($classes->classes_id, '班级信息删除失败', 0);
				}
			} else {
				return json_return(null, '班级不存在，班级信息删除失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，班级信息删除失败', 0);
		}
	}

	// 添加班级信息
	public function add()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，添加班级信息失败', 0);
		}
		if ($this->userAuth == 1) {
			$classes = ClassesModel::get(input('post.classes_id'));
			if ($classes) {
				return json_return(null, '班级已存在,班级信息添加失败', 0);
			}
			$classes = new ClassesModel;
			if ($classes->allowField(true)->save(input('post.'))) {
				return json_return($classes->classes_id, '班级信息添加成功', 1);
			} else {
				return json_return(null, '班级信息添加失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，班级信息添加失败', 0);
		}
	}

	// 根据id修改
	public function update($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，更新班级信息失败', 0);
		}
		if ($this->userAuth == 1) {
			$classes = ClassesModel::get($id);
			if (!$classes) {
				return json_return(null, '不存这个班级,修改班级信息失败', 0);
			}
			if ($classes->allowField(true)->save(input('put.'))) {
				return json_return($classes->classes_id, '班级信息修改成功', 1);
			} else {
				return json_return(null, '班级信息修改失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，班级信息修改失败', 0);
		}
	}
}