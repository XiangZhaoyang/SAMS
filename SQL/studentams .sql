-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-04-08 09:00:38
-- 服务器版本： 10.1.21-MariaDB
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentams`
--
CREATE DATABASE IF NOT EXISTS `studentams` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `studentams`;

-- --------------------------------------------------------

--
-- 表的结构 `class`
--

CREATE TABLE `class` (
  `class_id` int(8) UNSIGNED NOT NULL,
  `class_name` varchar(15) NOT NULL,
  `class_department_id` int(8) UNSIGNED NOT NULL,
  `class_majorName` varchar(20) NOT NULL,
  `class_information` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `class`
--

INSERT INTO `class` (`class_id`, `class_name`, `class_department_id`, `class_majorName`, `class_information`) VALUES
(10000001, '信息系统与信息管理1班', 10101010, '信息管理与信息系统', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `course`
--

CREATE TABLE `course` (
  `course_id` int(8) UNSIGNED NOT NULL,
  `course_teacher_id` bigint(12) UNSIGNED NOT NULL,
  `course_class_id` int(8) UNSIGNED NOT NULL,
  `course_department_id` int(8) UNSIGNED NOT NULL,
  `course_belong` varchar(10) DEFAULT NULL,
  `course_style` varchar(10) NOT NULL,
  `course_credit` tinyint(1) NOT NULL,
  `course_name` varchar(15) NOT NULL,
  `course_year` char(9) NOT NULL,
  `course_term` tinyint(1) NOT NULL,
  `course_information` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `course`
--

INSERT INTO `course` (`course_id`, `course_teacher_id`, `course_class_id`, `course_department_id`, `course_belong`, `course_style`, `course_credit`, `course_name`, `course_year`, `course_term`, `course_information`) VALUES
(21212121, 200120012001, 10000001, 10101010, NULL, '专业必修', 3, 'C语言', '2013-2014', 2, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `department`
--

CREATE TABLE `department` (
  `department_id` int(8) UNSIGNED NOT NULL,
  `department_name` varchar(15) NOT NULL,
  `department_information` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `department`
--

INSERT INTO `department` (`department_id`, `department_name`, `department_information`) VALUES
(10101010, '计算机科学与工程', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `grade`
--

CREATE TABLE `grade` (
  `grade_course_id` int(8) UNSIGNED NOT NULL,
  `grade_student_id` bigint(12) UNSIGNED NOT NULL,
  `grade_score` float(3,2) DEFAULT NULL,
  `grade_gpa` float(1,1) DEFAULT NULL,
  `grade_pass` tinyint(1) DEFAULT NULL,
  `grade_second` float(3,2) DEFAULT NULL,
  `grade_information` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `studnet`
--

CREATE TABLE `studnet` (
  `studnet_id` bigint(12) UNSIGNED NOT NULL,
  `studnet_class_id` int(8) UNSIGNED NOT NULL,
  `studnet_sex` tinyint(1) NOT NULL,
  `studnet_name` varchar(10) NOT NULL,
  `studnet_brith` char(8) DEFAULT NULL,
  `studnet_address` varchar(30) DEFAULT NULL,
  `studnet_imghref` varchar(20) DEFAULT NULL,
  `studnet_information` text,
  `studnet_phoneNum` bigint(11) DEFAULT NULL,
  `studnet_email` varchar(30) DEFAULT NULL,
  `studnet_idcard` bigint(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `studnet`
--

INSERT INTO `studnet` (`studnet_id`, `studnet_class_id`, `studnet_sex`, `studnet_name`, `studnet_brith`, `studnet_address`, `studnet_imghref`, `studnet_information`, `studnet_phoneNum`, `studnet_email`, `studnet_idcard`) VALUES
(201301094134, 10000001, 1, '向阳', '19941117', '重庆', NULL, NULL, 15351311517, 'xyang@outllok.com', 5001000199411178097);

-- --------------------------------------------------------

--
-- 表的结构 `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` bigint(12) UNSIGNED NOT NULL,
  `teacher_department_id` int(8) UNSIGNED NOT NULL,
  `teacher_name` varchar(10) NOT NULL,
  `teacher_sex` tinyint(1) NOT NULL,
  `teacher_brith` char(8) DEFAULT NULL,
  `teacher_address` varchar(30) DEFAULT NULL,
  `teacher_imghref` varchar(20) DEFAULT NULL,
  `teacher_information` text,
  `teacher_phoneNum` bigint(11) DEFAULT NULL,
  `teacher_email` varchar(30) DEFAULT NULL,
  `teacher_idvard` bigint(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `teacher`
--

INSERT INTO `teacher` (`teacher_id`, `teacher_department_id`, `teacher_name`, `teacher_sex`, `teacher_brith`, `teacher_address`, `teacher_imghref`, `teacher_information`, `teacher_phoneNum`, `teacher_email`, `teacher_idvard`) VALUES
(200120012001, 10101010, '向量', 1, NULL, NULL, NULL, NULL, 15315211518, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` bigint(12) UNSIGNED NOT NULL,
  `user_pass` varchar(256) NOT NULL DEFAULT '7c4a8d09ca3762af61e59520943dc26494f8941b',
  `user_createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_auth` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `user_pass`, `user_createTime`, `user_auth`) VALUES
(199211178097, 'ce4c41a80b6d1146f9f0e08eea21bc56e011cfd9', '2017-04-08 06:49:11', 3),
(200120012001, '7c4a8d09ca3762af61e59520943dc26494f8941b', '2017-04-08 06:49:55', 2),
(201301094134, '7c4a8d09ca3762af61e59520943dc26494f8941b', '2017-04-08 06:50:07', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `class_department_id` (`class_department_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `course_teacher_id` (`course_teacher_id`),
  ADD KEY `course_class_id` (`course_class_id`),
  ADD KEY `course_department_id` (`course_department_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`grade_course_id`,`grade_student_id`),
  ADD KEY `grade_student_id` (`grade_student_id`);

--
-- Indexes for table `studnet`
--
ALTER TABLE `studnet`
  ADD PRIMARY KEY (`studnet_id`),
  ADD KEY `studnet_class_id` (`studnet_class_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacher_id`),
  ADD KEY `teacher_department_id` (`teacher_department_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- 限制导出的表
--

--
-- 限制表 `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`class_department_id`) REFERENCES `department` (`department_id`);

--
-- 限制表 `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`course_teacher_id`) REFERENCES `teacher` (`teacher_id`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`course_class_id`) REFERENCES `class` (`class_id`),
  ADD CONSTRAINT `course_ibfk_3` FOREIGN KEY (`course_department_id`) REFERENCES `department` (`department_id`);

--
-- 限制表 `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`grade_course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`grade_student_id`) REFERENCES `studnet` (`studnet_id`);

--
-- 限制表 `studnet`
--
ALTER TABLE `studnet`
  ADD CONSTRAINT `studnet_ibfk_1` FOREIGN KEY (`studnet_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `studnet_ibfk_2` FOREIGN KEY (`studnet_class_id`) REFERENCES `class` (`class_id`);

--
-- 限制表 `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`teacher_department_id`) REFERENCES `department` (`department_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;