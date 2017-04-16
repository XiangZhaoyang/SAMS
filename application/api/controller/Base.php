<?php
namespace app\api\controller;

class Base
{
	protected  $userId;
	protected  $userAuth;

	function __construct()
	{
		$this->userId = session('userId');
		$this->userAuth = session('userAuth');
	}
}