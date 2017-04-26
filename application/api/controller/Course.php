<?php
namespace app\api\controller;

use app\api\model\Course as CourseModel;
use app\api\controller\Base;

class Course extends Base
{
	//调用父类构造函数
	function __construct()
	{
		parent::__construct();
	}

	// 查询课程列表信息
	public function indexList()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，课程列表信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$list = CourseModel::all();
			if ($list) {
				return json_return($list, '课程列表信息查询成功', 1);
			} else {
				return json_return(null, '课程列表信息查询失败', 0);
			}
		} elseif ($this->userAuth == 2) {
			$list = CourseModel::all(['course_teacher_id' => $this->userId]);
			if ($list) {
				return json_return($list, '课程列表信息查询成功', 1);
			} else {
				return json_return(null, '课程列表信息查询失败', 0);
			}
		} elseif ($this->userAuth == 3) {
			$student = db('student', [], false)->where('student_id', $this->userId)->select();
			$classes_id = $student[0]['student_classes_id'];
			$list = CourseModel::all(['course_classes_id' => $classes_id]);
			if ($list) {
				return json_return($list, '课程列表信息查询成功', 1);
			} else {
				return json_return(null, '课程列表信息查询失败', 0);
			}
		} else {
			return json_return(null, '课程列表信息查询失败', 0);
		}
	}

	// 根据id查询课程信息
	public function read($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，课程信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$course = CourseModel::get($id);
			if ($course) {
				return json_return($course, '课程信息查询成功', 1);
			} else{
				return json_return(null, '课程信息查询失败', 0);
			}
		} elseif ($this->userAuth == 2) {
			$course = CourseModel::get(['course_id' => $id, 'course_teacher_id' => $this->userId]);
			if ($course) {
				return json_return($course, '课程信息查询成功', 1);
			} else{
				return json_return(null, '课程信息查询失败', 0);
			}
		} elseif ($this->userAuth == 3) {
			$student = db('student', [], false)->where('student_id', $this->userId)->select();
			$classes_id = $student[0]['student_classes_id'];
			$course = CourseModel::get(['course_id' => $id, 'course_classes_id' => $classes_id]);
			if ($course) {
				return json_return($course, '课程信息查询成功', 1);
			} else{
				return json_return(null, '课程信息查询失败', 0);
			}
		} else {
			return json_return(null, '课程信息查询失败', 0);
		}
	}

	// 添加课程信息
	public function add()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，课程信息添加失败', 0);
		}
		if ($this->userAuth == 1) {
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
		} else {
			return json_return(null, '用户权限不够，课程信息添加失败', 0);
		}
	}

	// 根据id删除课程信息
	public function delete($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，课程信息删除失败', 0);
		}
		if ($this->userAuth == 1) {
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
		} else {
			return json_return(null, '用户权限不够，课程信息删除失败', 0);
		}
	}

	// 根据id修改信息课程信息
	public function update($id)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，课程信息修改失败', 0);
		}
		if ($this->userAuth == 1) {
			$course = CourseModel::get($id);
			if (!$course) {
				return json_return(null, '不存在该课程，课程信息修改失败', 0);
			}
			if ($course->allowField(true)->save(input('put.'))) {
				return json_return($course->course_id, '课程信息修改成功', 1);
			} else {
				return json_return(null, '课程信息修改失败', 0);
			}
		} else {
			return json_return(null, '用户未权限不够，课程信息修改失败', 0);
		}
	}
}