<?php
namespace app\index\controller;

use think\Controller;

class Index extends Controller
{
    public function index()
    {
        return 'index';
    }

    public function test($name = '')
    {
    	return '这是一个测试方法'. $name;
    }

    public function hello($name = 'xzhaoyang')
    {
    	$this->assign('name', $name);
    	return $this->fetch();
    }

    public function hi($name = 'World', $city = '')
    {
    	return 'Hi,' .$name . '!You come from ' . $city . '.';
    }
}
