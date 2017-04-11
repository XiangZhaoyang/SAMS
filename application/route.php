<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Route;

return [
    '__pattern__' => [
        'name' => '\w+',
        'id'   => '\d+',
    ],

    '[api/user]'        => [
        '$'         => ['api/user/index'],
        ':id'       => ['api/user/read'],
    ],

    // '[hello]'     => [
    //     ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
    //     ':name' => ['index/hello', ['method' => 'post']],
    // ],
    // 添加路由规则 路由到 index控制器的hi操作方法
    // 'hi/[:name]' => 'index/index/hi',
    // 'test/[:name]' => function ($name) {
    // 	return 'test,'.$name;
    // },
    // 'user/index'     => 'index/user/index',
    // 'user/create'    => 'index/user/create',
    // 'user/add'       => 'index/user/add',
    // 'user/add_list'  => 'index/user/addList',
    // 'user/update/:id'=> 'index/user/update',
    // 'user/delete/:id'=> 'index/user/delete',
    // 'user/:id'       => 'index/user/read'

    // 'blog/:year/:month' => ['index/blog/archive', ['method' => 'get'], ['year' => '\d{4}', 'month' => '\d{2}']],
    // 'blog/:id' => ['index/blog/get', ['method' => 'get'], ['id' => '\d+']],
    // 'blog/:name' => ['index/blog/read', ['method' => 'get'], ['name' => '\w+']],

    // '[blog]' => [
    //     'blog-<year>-<month>' => ['index/blog/archive', ['method' => 'get'], ['year' => '\d{4}', 'month' => '\d{2}']],
    //     ':id' => ['index/blog/get', ['method' => 'get'], ['id' => '\d+']],
    //     ':name' => ['index/blog/read', ['method' => 'get'], ['name' => '\w+']],
    // ],

];
