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
        'sid'  => '\d+',
        'cid'  => '\d+',
        'pass' => '\w+',
        'newpass' => '\w+',
        // 'year' => '\w+',
        'term' => '\d+',
    ],

    '[api/user]'            => [
        '/index'        => ['api/user/indexList', ['method' => 'get']],
        ':id'           => ['api/user/read', ['method' => 'get']],
        '/add'          => ['api/user/add', ['method' => 'post']],
        '/update/:id'   => ['api/user/update', ['method' => 'put']],
        '/delete/:id'    => ['api/user/delete', ['method' => 'delete']],
    ],

    '[api/classes]'           => [
        '/index'        => ['api/classes/indexList', ['method' => 'get']],
        ':id'           => ['api/classes/read', ['method' => 'get']],
        '/add'          => ['api/classes/add', ['method' => 'post']],
        '/update/:id'   => ['api/classes/update', ['method' => 'put']],
        '/delete/:id'    => ['api/classes/delete', ['method' => 'delete']],
    ],

    '[api/course]'           => [
        '/index'        => ['api/course/indexList', ['method' => 'get']],
        ':id'           => ['api/course/read', ['method' => 'get']],
        '/add'          => ['api/course/add', ['method' => 'post']],
        '/update/:id'   => ['api/course/update', ['method' => 'put']],
        '/delete/:id'    => ['api/course/delete', ['method' => 'delete']],
    ],

    '[api/department]'           => [
        '/index'        => ['api/department/indexList', ['method' => 'get']],
        ':id'           => ['api/department/read', ['method' => 'get']],
        '/add'          => ['api/department/add', ['method' => 'post']],
        '/update/:id'   => ['api/department/update', ['method' => 'put']],
        '/delete/:id'    => ['api/department/delete', ['method' => 'delete']],
    ],

    '[api/score]'           => [
        '/index'        => ['api/score/indexList', ['method' => 'get']],
        '/:sid/:cid'           => ['api/score/read', ['method' => 'get']],
        '/add'          => ['api/score/add', ['method' => 'post']],
        '/update/:sid/:cid'   => ['api/score/update', ['method' => 'put']],
        '/delete/:sid/:cid'    => ['api/score/delete', ['method' => 'delete']],
        '/addByCid/:courseid/:classesid' => ['api/score/addByClasses', ['method' => 'post']],
        '/indexScoreByCid/:courseid' => ['api/score/indexScoreByClassesIdNoAdd', ['method' => 'get']],
        '/addSoreByClasses/:courseid' => ['api/score/addSoreByClasses', ['method' => 'put']],
        'indexScoreByCidAdd/:courseid' => ['api/score/indexScoreByClassesIdAdd', ['method' => 'get']],
        '/indexSecondScoreByCid/:courseid' => ['api/score/indexSecondScoreByClassesIdNoAdd', ['method' => 'get']],
        '/addSecondSoreByClasses/:courseid' => ['api/score/addSecondSoreByClasses', ['method' => 'put']],
        '/indexSecondScoreByCidAdd/:courseid' => ['api/score/indexSecondScoreByClassesIdAdd', ['method' => 'get']],
        '/updateSecond/:sid/:cid' => ['api/score/updateSecond', ['method' => 'put']],
    ],

    '[api/student]'           => [
        '/index'        => ['api/student/indexList', ['method' => 'get']],
        ':id'           => ['api/student/read', ['method' => 'get']],
        '/indexByCid/:cid' => ['api/student/indexByClassId', ['method' => 'get']],
        '/add'          => ['api/student/add', ['method' => 'post']],
        '/update/:id'   => ['api/student/update', ['method' => 'put']],
        '/delete/:id'    => ['api/student/delete', ['method' => 'delete']],
    ],

    '[api/teacher]'           => [
        '/index'        => ['api/teacher/indexList', ['method' => 'get']],
        ':id'           => ['api/teacher/read', ['method' => 'get']],
        'indexByDid/:did' => ['api/teacher/indexByDepartmentId', ['method' => 'get']],
        '/add'          => ['api/teacher/add', ['method' => 'post']],
        '/update/:id'   => ['api/teacher/update', ['method' => 'put']],
        '/delete/:id'    => ['api/teacher/delete', ['method' => 'delete']],
    ],

    '[user/admin]'              =>[
        '/studentPassReset/:id' => ['user/admin/studentPasswordReset', ['method' => 'put']],
        '/teacherPassReset/:id' => ['user/admin/teacherPasswordReset', ['method' => 'put']],
        '/modifyPass/:pass/:newpass' => ['user/admin/modifyPass' , ['method' => 'put']],
        '/passReset' => ['user/passReset' , ['method' => 'put']],
         '/classesCourse/:cid'   =>   ['user/admin/classesCourse', ['method' => 'get']],
    ],

    '[user/student]'            => [
        '/reSetPass/:pass/:newpass' => ['user/student/reSetPass', ['method' => 'put']],
        '/queryCourseByYear/:year' => ['user/student/queryCourseByYear', ['method' => 'get']],
        '/queryScoreByTerm/:year/:term' => ['user/student/queryScoreByTerm', ['method' => 'get']],
        '/queryScoreByYear/:year' => ['user/student/queryScoreByYear', ['method' => 'get']],
        
    ],

    '[user/teacher]'            => [
        '/reSetPass/:pass/:newpass' => ['user/teacher/reSetPass', ['method' => 'put']],
        '/courseIndexByCid/:cid/:year/:term' => ['user/teacher/courseIndexByClassesId', ['method' => 'get']],
        '/courseIndex/:year/:term' => ['user/teacher/courseIndex', ['method' => 'get']],
    ],

    // '[user/index]'              => [
    //     'login'         => ['user/index/login', ['method' => 'post']],
    // ],

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
