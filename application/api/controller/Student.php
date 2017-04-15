<?php
namespace app\api\controller;

use app\api\model\Student as StudentModel;

class Student
{
	// 获取学生列表信息
	public function indexList()
	{
		$list = StudentModel::all();
		if ($list) {
			return json_return($list, '学生列表信息查询成功', 1);
		} else {
			return json_return(null, '学生列表信息查询失败', 0);
		}
	}

	// 根据id获取学生信息
	public function read($id)
	{
		$student = StudentModel::get($id);
		if ($student) {
			return json_return($student, '学生信息查询成功', 1);
		} else {
			return json_return(null, '学生信息查询失败', 0);
		}
	}

	// 添加学生信息
	public function add()
	{
		$student = StudentModel::get(input('post.student_id'));
		if ($student) {
			return json_return(null, '此学生已存在,学生信息添加失败', 0);
		}
		$student = new StudentModel;
		if ($student->allowField(true)->save(input('post.'))) {
			return json_return($student, '学生信息添加成功', 1);
		} else {
			return json_return(null, '学生信息添加失败', 0);
		}
	}

	// 根据id修改学生信息
	public function update($id)
	{
		$student = StudentModel::get($id);
		if (!$student) {
			return json_return(null, '不存在此学生，学生信息修改失败', 0);
		}
		if ($student->allowField(true)->save(input('put.'))) {
			return json_return($student->student_id, '学生信息修改成功', 1);
		} else {
			return json_return(null, '学生信息添加失败', 0);
		}
	}

	//根据id删除学生用户
	public function delete($id)
	{
		$student = StudentModel::get($id);
		if (!$student) {
			return json_return(null, '不存在此学生，学生信息删除失败');
		}
		$rt = $student->delete();
		if ($rt) {
			return json_return($rt, '学生信息删除成功', 0);
		} else {
			return json_return(null, '学生信息删除失败', 1);
		}
	}
}