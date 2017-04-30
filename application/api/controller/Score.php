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
				$rt = db('course')->where('course_id', $courseid)->update(['course_add' => '1']);
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

	//查询一个班的成绩（未添加成绩）
	public function indexScoreByClassesIdNoAdd($courseid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩查询失败', 0);
		}
		if ($this->userAuth == 2 || $this->userAuth == 1) {
			$str = 'select score.score_id, score.score_course_id,score.score_student_id ,score.score_score,student.student_name as student_name from score,student where score.score_student_id = student.student_id and score.score_add = 0 and score.score_course_id =? ';
			$list = Db::query($str, [$courseid]);
			if ($list) {
				return json_return($list, '成绩列表信息查询成功', 1);
			} else {
				return json_return(null, '成绩列表信息查询失败', 0);
			}
		}
	}

	//查询一个班的成绩（还未补考的成绩）
	public function indexSecondScoreByClassesIdNoAdd($courseid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩查询失败', 0);
		}
		if ($this->userAuth == 2 || $this->userAuth == 1) {
			$str = 'select score.score_id, score.score_course_id,score.score_student_id ,score.score_second,student.student_name as student_name from score,student where score.score_student_id = student.student_id and score.score_add = 1 and score.score_course_id =? and score.score_pass = 0 and score.score_second is null';
			$list = Db::query($str, [$courseid]);
			if ($list) {
				return json_return($list, '成绩列表信息查询成功', 1);
			} else {
				return json_return(null, '此班级未有没通过的学生', 0);
			}
		}
	}

	//查询一个班的成绩（已添加成绩）
	public function indexScoreByClassesIdAdd($courseid)
	{
		if ($this->userAuth == 2 || $this->userAuth == 1) {
			$str = 'select score.score_id, score.score_course_id,score.score_student_id ,score.score_score,student.student_name as student_name from score,student where score.score_student_id = student.student_id and score.score_add = 1 and score.score_course_id =? ';
			$list = Db::query($str, [$courseid]);
			if ($list) {
				return json_return($list, '成绩列表信息查询成功', 1);
			} else {
				return json_return(null, '成绩列表信息查询失败', 0);
			}
		}
	}

	//查询一个班的成绩 （已补考的成绩）
	public function indexSecondScoreByClassesIdAdd($courseid)
	{
		if ($this->userAuth == 2 || $this->userAuth == 1) {
			$str = 'select score.score_id, score.score_course_id,score.score_student_id ,score.score_second,student.student_name as student_name from score,student where score.score_student_id = student.student_id and score.score_add = 1 and score.score_course_id =? and score.score_second is not null';
			$list = Db::query($str, [$courseid]);
			if ($list) {
				return json_return($list, '成绩列表信息查询成功', 1);
			} else {
				return json_return(null, '成绩列表信息查询失败', 0);
			}
		}
	}

	//添加一个班的成绩
	public function addSoreByClasses($courseid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩信息添加失败', 0);
		}
		if ($this->userAuth == 2 || $this->userAuth == 1) {
			$courseid = input('param.courseid');

			$str = 'select course_credit from course where course_id =?';

			$credit = Db::query($str, [$courseid]);
			$credit = $credit[0]['course_credit'];
			$data = input('put.');
			$list = [];
			foreach ($data as $key => $value) {
				$listItem = [];
				$score = floatval($value['score_score']);
				if ($score >= 60) {
					$listItem['score_pass'] = 1;
				} else {
					$listItem['score_pass'] = 0;
				}
				if ($score >= 50) {
					$listItem['score_gpa'] = number_format((($score - 50) / 10), 1);
				} else {
					$listItem['score_gpa'] = number_format(0, 1);
				}
				$listItem['score_score'] = $score;
				$listItem['score_course_id'] = $value['score_course_id'];
				$listItem['score_student_id'] = $value['score_student_id'];
				$listItem['score_id'] = $value['score_id'];
				$listItem['score_add'] = 1;
				array_push($list, $listItem);
			}
			$score = new ScoreModel;
			$rt = $score->saveAll($list,true);
			if ($rt) {
				return json_return($rt, '班级成绩信息添加成功', 0);
			} else {
				return json_return(null, '班级成信息添加失败', 1);
			}
		} else {
			return json_return(null, '用户权限不够，成绩信息添加失败', 0);
		}
	}

	//添加一个班的成绩(补考)
	public function addSecondSoreByClasses($courseid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩信息添加失败', 0);
		}
		if ($this->userAuth == 2 || $this->userAuth == 1) {
			$courseid = input('param.courseid');

			$str = 'select course_credit from course where course_id =?';

			$credit = Db::query($str, [$courseid]);
			$credit = $credit[0]['course_credit'];
			$data = input('put.');
			$list = [];
			foreach ($data as $key => $value) {
				$listItem = [];
				$score = floatval($value['score_second']);
				if ($score >= 60) {
					$score = 60;
				}
				if ($score >= 60) {
					$listItem['score_pass'] = 1;
				} else {
					$listItem['score_pass'] = 0;
				}
				if ($score >= 50) {
					$listItem['score_gpa'] = number_format((($score - 50) / 10), 1);
				} else {
					$listItem['score_gpa'] = number_format(0, 1);
				}
				$listItem['score_second'] = $score;
				$listItem['score_course_id'] = $value['score_course_id'];
				$listItem['score_student_id'] = $value['score_student_id'];
				$listItem['score_id'] = $value['score_id'];
				$listItem['score_add'] = 1;
				array_push($list, $listItem);
			}
			$score = new ScoreModel;
			$rt = $score->saveAll($list,true);
			if ($rt) {
				return json_return($rt, '班级成绩信息添加成功', 0);
			} else {
				return json_return(null, '班级成信息添加失败', 1);
			}
		} else {
			return json_return(null, '用户权限不够，成绩信息添加失败', 0);
		}
	}

	// 根据学生学号和课程编号修改
	public function update($sid, $cid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩信息更新失败', 0);
		}
		if ($this->userAuth == 1 || $this->userAuth == 2) {
			$scoreModel = ScoreModel::get(['score_course_id' => $cid, 'score_student_id' => $sid]);
			if (!$scoreModel) {
				return json_return(null, '不存在此成绩信息，成绩信息修改失败', 0);
			}
			$data = input('put.');
			$score = floatval($data['score_score']);
			if ($score >= 60) {
				$data['score_pass'] = 1;
			} else {
				$data['score_pass'] = 0;
			}
			if ($score >= 50) {
				$data['score_gpa'] = number_format((($score - 50) / 10), 1);
			} else {
				$data['score_gpa'] = number_format(0, 1);
			}
			// return json_return($data);
			if ($scoreModel->allowField(true)->save($data)) {
				return json_return([$scoreModel->score_course_id, $scoreModel->score_student_id], '成绩信息修改成功', 1);
			} else {
				return json_return(null, '成绩信息修改失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，成绩信息添加失败', 0);
		}
	}

	// 根据学生学号和课程编号修改(补考成绩)
	public function updateSecond($sid, $cid)
	{
		if (!$this->userId) {
			return json_return(null, '用户未登录，成绩信息更新失败', 0);
		}
		if ($this->userAuth == 1 || $this->userAuth == 2) {
			$scoreModel = ScoreModel::get(['score_course_id' => $cid, 'score_student_id' => $sid]);
			if (!$scoreModel) {
				return json_return(null, '不存在此成绩信息，成绩信息修改失败', 0);
			}
			$data = input('put.');
			$score = floatval($data['score_second']);
			if ($score >= 60) {
				$data['score_pass'] = 1;
			} else {
				$data['score_pass'] = 0;
			}
			if ($score >= 50) {
				$data['score_gpa'] = number_format((($score - 50) / 10), 1);
			} else {
				$data['score_gpa'] = number_format(0, 1);
			}
			// return json_return($data);
			if ($scoreModel->allowField(true)->save($data)) {
				return json_return([$scoreModel->score_course_id, $scoreModel->score_student_id], '成绩信息修改成功', 1);
			} else {
				return json_return(null, '成绩信息修改失败', 0);
			}
		} else {
			return json_return(null, '用户权限不够，成绩信息添加失败', 0);
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