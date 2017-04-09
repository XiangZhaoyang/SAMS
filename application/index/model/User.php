<?php
namespace app\index\model;

use think\Model;

class User extends Model
{
	// birthday读取器
    protected function getBirthdayAttr($birthday)
    {
        return date('Y-m-d', $birthday);
    }

    // // user_birthday读取器
    // protected function getUserBirthdayAttr($value,$data)
    // {
    //     return date('Y-m-d', $data['birthday']);
    // }

    // birthday修改器
    protected function setBirthdayAttr($value)
    {
        return strtotime($value);
    }
}