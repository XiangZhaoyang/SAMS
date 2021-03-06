<?php
namespace app\index\controller;

use think\Controller;
use think\Request;
use think\Db;

class Index extends Controller
{
    public function index()
    {
        return 'hollo';
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

    public function hehe(Request $request)
    {
    	dump($request->except(['name']));
    }

    public function read()
    {
    	$result = DB::table('user')
    		// ->where()
    		->select();
    	dump($result);
    }
}
