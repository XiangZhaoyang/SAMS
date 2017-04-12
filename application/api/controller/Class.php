<?php
namespace app\api\controller;

use app\api\model\Class as ClassModel;

class Class
{
	//获取班级信息
	public function indexList()
	{
		$list = ClassModel::all();
		if ($list) {
			return json_return($list, '班级信息查询成功', 1);
		} else {
			return json_return(null, '班级信息查询失败', 0);
		}
	}

	// 根据id查询班级信息
	public function read($id)
	{
		$class = ClassModel::get($id);
		if ($class) {
			return json_return($class, '班级信息查询成功', 1);
		} else {
			return json_return($class, '班级信息查询失败', 0);
		}
	}

	// 根据id删除班级信息
	public function delete($id)
	{
		$class = ClassModel::get($id);
		if ($class) {
			$rt = $class->delete();
			if ($rt) {
				return json_return($rt, '班级信息删除成功', 1);
			} else {
				return json_return();
			}
		}
	}
}