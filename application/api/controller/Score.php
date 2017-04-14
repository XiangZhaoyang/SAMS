<?php
namespace app\api\controller;

use app\api\model\Score as ScoreModel;

class Score
{
	// 查询成绩列表信息
	public function indexList()
	{
		$list = ScoreModel::all();
		if ($list) {
			return json_return($list, '成绩列表查询成功', 1);
		} else {
			return json_return(null, '成绩列表查询失败', 0);
		}
	}

	// 根据主键查询成绩列表
	public function read($sid, $cid)
	{
		$score = ScoreModel::get(['score_course_id' => $cid, 'score_student_id' => $sid]);
		if ($score) {
			return json_return($score, '成绩信息查询成功', 1);
		} else {
			return json_return(null, '成绩信息查询失败', 0);
		}
	}

	// 添加成绩信息
	public function add()
	{
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
	}

	// 根据主键修改
	public function update($sid, $cid)
	{
		$score = ScoreModel::get(['score_course_id' => $cid, 'score_student_id' => $sid]);
		if (!$score) {
			return json_return(null, '不存在此成绩信息，成绩信息修改失败', 0);
		}
		if ($score->allowField(true)->save(input('put.'))) {
			return json_return([$score->score_course_id, $score->score_student_id], '成绩信息修改成功', 1);
		} else {
			json_return(null, '成绩信息修改失败', 0);
		}
	}

	// 根据主键删除成绩信息
	public function delete($sid, $cid)
	{
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
	}
}