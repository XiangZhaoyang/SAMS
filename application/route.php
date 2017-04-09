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

Route::rule('hi/[:name]', 'index/index/hi');

return [
    '__pattern__' => [
        'name' => '\w+',
    ],
    '[hello]'     => [
        ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
        ':name' => ['index/hello', ['method' => 'post']],
    ],
    // 添加路由规则 路由到 index控制器的hi操作方法
    // 'hi/[:name]' => 'index/index/hi',
    'test/[:name]' => function ($name) {
    	return 'test,'.$name;
    },

    // 'blog/:year/:month' => ['index/blog/archive', ['method' => 'get'], ['year' => '\d{4}', 'month' => '\d{2}']],
    // 'blog/:id' => ['index/blog/get', ['method' => 'get'], ['id' => '\d+']],
    // 'blog/:name' => ['index/blog/read', ['method' => 'get'], ['name' => '\w+']],

    '[blog]' => [
        'blog-<year>-<month>' => ['index/blog/archive', ['method' => 'get'], ['year' => '\d{4}', 'month' => '\d{2}']],
        ':id' => ['index/blog/get', ['method' => 'get'], ['id' => '\d+']],
        ':name' => ['index/blog/read', ['method' => 'get'], ['name' => '\w+']],
    ],

];
