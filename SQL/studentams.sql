-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-04-19 15:39:55
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

-- --------------------------------------------------------

--
-- 表的结构 `course`
--

CREATE TABLE `course` (
  `course_id` int(8) UNSIGNED NOT NULL,
  `course_teacher_id` bigint(12) UNSIGNED NOT NULL,
  `course_classes_id` int(8) UNSIGNED NOT NULL,
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

INSERT INTO `course` (`course_id`, `course_teacher_id`, `course_classes_id`, `course_department_id`, `course_belong`, `course_style`, `course_credit`, `course_name`, `course_year`, `course_term`, `course_information`) VALUES
(21212101, 200120012001, 10000001, 10101010, NULL, '专业必选', 4, 'c++程序设计', '2014-2015', 1, NULL),
(21212102, 200120012003, 10000001, 10101010, NULL, '专业必修', 5, '操作系统', '2014-2015', 1, NULL),
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
(10101010, '计算机科学与工程', NULL),
(10101020, '外国语学院', NULL);

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
(200120012001, 10101010, '向量', 1, NULL, NULL, NULL, NULL, 15315211518, NULL, NULL),
(200120012002, 10101010, '李明', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120012003, 10101010, '冯晓丽', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120012004, 10101010, '苏海平', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120012005, 10101010, '程琳', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120012006, 10101010, '朱新', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120012007, 10101010, '陈波', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120012008, 10101010, '向昕', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120012009, 10101010, '张鑫', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120012010, 10101010, '张伟', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120012011, 10101010, '李想', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120022001, 10101020, '高雯', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120022002, 10101020, '李华', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120022003, 10101020, '宋妍妍', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120022004, 10101020, '唐秋林', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200120022005, 10101020, '向敏', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` bigint(12) UNSIGNED NOT NULL,
  `user_pass` varchar(256) NOT NULL DEFAULT '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve',
  `user_createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_auth` tinyint(1) NOT NULL DEFAULT '3'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `user_pass`, `user_createTime`, `user_auth`) VALUES
(199211178097, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-08 06:50:07', 1),
(200120012001, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-08 06:49:55', 2),
(200120012002, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120012003, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120012004, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120012005, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120012006, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120012007, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120012008, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120012009, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120012010, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120012011, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:32:47', 3),
(200120022001, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:34:09', 3),
(200120022002, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:34:09', 3),
(200120022003, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:34:09', 3),
(200120022004, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:34:09', 3),
(200120022005, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:34:09', 3),
(201301014101, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014102, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014103, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014104, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014105, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014106, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014107, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014108, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014109, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014110, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014111, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014112, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014113, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014114, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301014115, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:32:43', 3),
(201301024101, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024102, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024103, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024104, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024105, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024106, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024107, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024108, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024109, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024110, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024111, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024112, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024113, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024114, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024115, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024116, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024117, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024118, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024119, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301024120, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:50:47', 3),
(201301034001, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034002, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034003, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034004, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034005, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034006, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034007, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034008, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034009, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034010, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034011, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034012, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034013, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034014, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034015, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034016, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034017, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034018, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034019, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034020, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:53:13', 3),
(201301034101, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034102, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034103, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034104, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034105, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034106, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034107, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034108, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034109, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034110, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034111, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034112, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034113, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034114, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034115, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034116, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034117, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034118, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034119, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301034120, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:55:23', 3),
(201301094101, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:27:31', 3),
(201301094102, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:28:05', 3),
(201301094103, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:28:05', 3),
(201301094104, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094105, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094106, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094107, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094108, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094109, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094110, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094111, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094112, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094113, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094114, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094115, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094116, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094117, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094118, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:29:38', 3),
(201301094133, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:27:31', 3),
(201301094134, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-08 06:49:11', 3),
(201302014101, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014102, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014103, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014104, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014105, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014106, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014107, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014108, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014109, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014110, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014111, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014112, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014113, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014114, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014115, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014116, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014117, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014118, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014119, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302014120, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 01:57:42', 3),
(201302024101, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024102, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024103, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024104, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024105, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024106, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024107, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024108, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024109, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024110, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024111, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024112, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024113, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024114, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024115, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024116, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024117, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024118, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024119, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302024120, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:00:04', 3),
(201302034101, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034102, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034103, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034104, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034105, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034106, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034107, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034108, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034109, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034110, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034111, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034112, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034113, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034114, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034115, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034116, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034117, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034118, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034119, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3),
(201302034120, '$2y$10$vZ0Wm.W7NbcZr9Bf7dDqzeYi/TG4FwIPEgrzqtJ8GsSXu9vclyuve', '2017-04-19 02:02:01', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `course_teacher_id` (`course_teacher_id`),
  ADD KEY `course_classes_id` (`course_classes_id`),
  ADD KEY `course_department_id` (`course_department_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

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
-- 限制表 `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`course_teacher_id`) REFERENCES `teacher` (`teacher_id`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`course_classes_id`) REFERENCES `classes` (`classes_id`),
  ADD CONSTRAINT `course_ibfk_3` FOREIGN KEY (`course_department_id`) REFERENCES `department` (`department_id`);

--
-- 限制表 `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`teacher_department_id`) REFERENCES `department` (`department_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
