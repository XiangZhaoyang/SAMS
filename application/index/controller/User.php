<?php
namespace app\index\controller;

use app\index\model\User as UserModel;

class User
{
	// 新增用户数据
	public function add()
	{
		$user		= [];
		// $user->nickname = '流年3';
		// $user->email = 'xhangzhao@outlook.com';
		// $user->birthday = strtotime('1992-11-12');
		// if ($user->save()) {
		// 	return '用户[' . $user->nickname . ': ' .$user->id . ' ]新增成功';
		// } else {
		// 	return $user->getError();
		// }
		$user['nickname'] = '看云';
	    $user['email']    = 'kancloud@qq.com';
	    $user['birthday'] = '1970-01-02';
	    if ($result = UserModel::create($user)) {
	        return '用户[ ' . $result->nickname . ':' . $result->id . ' ]新增成功';
	    } else {
	        return '新增出错';
	    }
	}

	// 批量新增用户数据
	public function addList()
	{
	    $user = new UserModel;
	    $list = [
	        ['nickname' => '张三', 'email' => 'zhanghsan@qq.com', 'birthday' => strtotime('1988-01-15')],
	        ['nickname' => '李四', 'email' => 'lisi@qq.com', 'birthday' => strtotime('1990-09-19')],
	    ];
	    if ($user->saveAll($list)) {
	        return '用户批量新增成功';
	    } else {
	        return $user->getError();
	    }
	}

	// 读取用户数据
	public function read($id='')
	{
	    $user = UserModel::get($id);
	    echo $user->nickname . '<br/>';
	    echo $user->email . '<br/>';
	    echo $user->birthday . '<br/>';
	    echo $user->user_birthday . '<br/>';
	}

	// 获取用户数据列表
	public function index()
	{
	    $list = UserModel::all();
	    foreach ($list as $user) {
	        echo $user->nickname . '<br/>';
	        echo $user->email . '<br/>';
	        echo date('Y/m/d', $user->birthday) . '<br/>';
	        echo '----------------------------------<br/>';
	    }
	}

	// 更新用户数据
	public function update($id)
	{
	    $user           = UserModel::get($id);
	    $user->nickname = '刘晨';
	    $user->email    = 'liu21st@gmail.com';
	    $user->save();
	    return '更新用户成功';
	}

	// 删除用户数据
	public function delete($id)
	{
	    $user = UserModel::get($id);
	    if ($user) {
	        $user->delete();
	        return '删除用户成功';
	    } else {
	        return '删除的用户不存在';
	    }
	}
}