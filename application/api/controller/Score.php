<?php
namespace app\api\controller;

use app\api\model\Score as ScoreModel;
use app\api\controller\Base;
use think\Db;

class Score extends Base
{
	// 查询成绩列表信息
	public function indexList()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩列表信息查询失败', 0);
		}
		if ($this->userAuth == 1) {
			$list = ScoreModel::all();
			if ($list) {
				return json_return($list, '成绩列表查询成功', 1);
			} else {
				return json_return(null, '成绩列表查询失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，成绩列表查询失败');
		}
	}

	// 根据主键查询成绩列表
	public function read($sid, $cid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩信息查询失败');
		}
		if ($this->userAuth == 1) {
			$score = ScoreModel::get(['score_course_id' => $cid, 'score_student_id' => $sid]);
			if ($score) {
				return json_return($score, '成绩信息查询成功', 1);
			} else {
				return json_return(null, '成绩信息查询失败', 0);
			}
		} elseif ($this->userAuth == 3) {
			;
		}
	}

	// 添加成绩信息
	public function add()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩信息添加失败', 0);
		}
		if ($this->userAuth == 1) {
			$score = ScoreModel::get(['score_course_id' => input('post.score_course_id'), 'score_student_id' => input('post.score_student_id')]);
			if ($score) {
				return json_return(null, '该成绩信息已存在，添加失败', 0);
			}
			$score = new ScoreModel;
			if ($score->allowField(true)->save(input('post.'))) {
				return json_return([$score->score_course_id, $score->score_student_id], '成绩信息添加成功', 1);
			} else {
				json_return(null, '成绩信息添加失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，成绩信息添加失败', 0);
		}
	}

	//添加一个班的成绩表
	public function addByClasses($courseid, $classesid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩表信息添加失败', 0);
		}
		$str = 'select student_id from student where student_classes_id = ?';
		$student_id = Db::query($str, [$classesid]);
		if (!$student_id) {
			return json_return(null, '不存在此班级学生，成绩表添加失败', 0);
		}
		$list = [];
		if ($this->userAuth == 1) {
			$score = new ScoreModel;
			foreach ($student_id as $key => $value) {
				array_push($list, ['score_course_id' => $courseid, 'score_student_id' => $value['student_id']]);
			}
			if ($score->saveAll($list)) {
				$rt = Db::table('course')->where('course_id', $courseid)->update(['course_add' => '1']);
				if ($rt) {
					return json_return(true, '成绩表添加成功', 1);
				} else {
					return json_return(false, '成绩表添加出错', 0);
				}
			} else {
				return json_return($score->getError(), '成绩表添加失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，成绩表添加失败', 0);
		}
	}

	//查询一个班的成绩
	public function indexScoreByClassesId($courseid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩添加失败', 0);
		}
		if ($this->userAuth == 2 || $this->userAuth == 1) {
			$str = 'select score.score_course_id,score.score_student_id ,student.student_name as student_name from score,student where score.score_student_id = student.student_id and score.score_course_id =? ';
			$list = Db::query($str, [$courseid]);
			if ($list) {
				return json_return($list, '成绩列表信息查询成功', 1);
			} else {
				return json_return(null, '成绩列表信息查询失败', 0);
			}
		}
	}

	//添加一个班的成绩
	public function addSoreByClasses()
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩信息添加失败', 0);
		}
		if ($this->userAuth == 2 || $this->userAuth == 1) {
			$data = input('post.');
		}
	}

	// 根据主键修改
	public function update($sid, $cid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩信息更新失败', 0);
		}
		if ($this->userAuth == 1) {
			$score = ScoreModel::get(['score_course_id' => $cid, 'score_student_id' => $sid]);
			if (!$score) {
				return json_return(null, '不存在此成绩信息，成绩信息修改失败', 0);
			}
			if ($score->allowField(true)->save(input('put.'))) {
				return json_return([$score->score_course_id, $score->score_student_id], '成绩信息修改成功', 1);
			} else {
				json_return(null, '成绩信息修改失败', 0);
			}
		} else {
			json_return(null, '用户权限不够，成绩信息添加失败', 0);
		}
	}

	// 根据主键删除成绩信息
	public function delete($sid, $cid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩信息删除失败', 0);
		}
		if ($this->userAuth == 1) {
			$score = ScoreModel::get(['score_course_id' => $cid, 'score_student_id' => $sid]);
			if (!$score) {
				return json_return(null, '不存在此成绩信息，成绩信息删除失败', 0);
			}
			$rt = db('score')->where('score_course_id', $cid)->where('score_student_id', $sid)->delete();
			if ($rt) {
				return json_return($rt, '成绩信息删除成功', 1);
			} else {
				return json_return(null, '成绩信息删除失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，成绩列表删除失败', 0);
		}
	}
}