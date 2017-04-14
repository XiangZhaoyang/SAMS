<?php
namespace app\api\controller;

use app\api\model\Course as CourseModel;

class Course
{
	// 查询课程列表信息
	public function indexList()
	{
		$list = CourseModel::all();
		if ($list) {
			return json_return($list, '课程列表信息查询成功', 1);
		} else {
			return json_return(null, '课程列表信息查询失败', 0);
		}
	}

	// 根据id查询课程信息
	public function read($id)
	{
		$course = CourseModel::get($id);
		if ($course) {
			return json_return($course, '课程信息查询成功', 1);
		} else{
			return json_return(null, '课程信息查询失败', 0);
		}
	}

	// 添加课程信息
	public function add()
	{
		$course = CourseModel::get(input('post.course_id'));
		if ($course) {
			return json_return(null, '该课程已存在,添加失败', 0);
		}
		$course = new CourseModel;
		if ($course->allowField(true)->save(input('post.'))) {
			return json_return($course->course_id, '课程信息添加成功', 1);
		} else {
			return json_return(null, '课程信息添加失败', 0);
		}
	}

	// 根据id删除课程信息
	public function delete($id)
	{
		$course = CourseModel::get($id);
		if (!$course) {
			return json_return(null, '不存在该课程，课程删除失败', 0);
		}
		$rt = $course->delete();
		if ($rt) {
			return json_return($rt, '课程信息删除成功', 1);
		} else {
			return json_return(null, '课程信息删除失败', 0);
		}
	}

	// 根据id修改信息课程信息
	public function update($id)
	{
		$course = CourseModel::get($id);
		if (!$course) {
			return json_return(null, '不存在该课程，课程信息修改失败', 0);
		}
		if ($course->allowField(true)->save(input('put.'))) {
			return json_return($course->course_id, '课程信息修改成功', 1);
		} else {
			return json_return(null, '课程信息修改失败', 0);
		}
	}
}