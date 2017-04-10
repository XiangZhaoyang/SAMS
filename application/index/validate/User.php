<?php
namespace app\index\validate;

use think\Validate;

class User extends Validate
{
	// 验证规则
	protected $rule = [
		'nickname' => 'require|min:5|token',
		'email'    => 'require|email',
		'brithday' => 'dateFormat:Y-m-d',
	];
}