<?php
namespace app\api\controller;

use app\api\model\Classes as ClassesModel;

class Classes
{
	//获取班级信息
	public function indexList()
	{
		$list = ClassesModel::all();
		if ($list) {
			return json_return($list, '班级信息查询成功', 1);
		} else {
			return json_return(null, '班级信息查询失败', 0);
		}
	}

	// 根据id查询班级信息
	public function read($id)
	{
		$classes = ClassesModel::get($id);
		if ($class) {
			return json_return($classes, '班级信息查询成功', 1);
		} else {
			return json_return($classes, '班级信息查询失败', 0);
		}
	}

	// 根据id删除班级信息
	public function delete($id)
	{
		$class = ClassesModel::get($id);
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
	}

	// 添加班级信息
	public function add()
	{
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
	}

	// 根据id修改
	public function update($id)
	{
		$classes = ClassesModel::get($id);
		if (!$classes) {
			return json_return(null, '不存这个班级,修改班级信息失败', 0);
		}
		if ($classes->allowField(true)->save('put.')) {
			return json_return($classes->classes_id, '班级信息修改成功', 1);
		} else {
			return json_return(null, '班级信息修改失败', 0);
		}
	}
}