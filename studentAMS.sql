create database studentAMS;

use studentAMS;

create table user(
	user_id bigint(12) UNSIGNED not null primary key,
	user_pass varchar(256) not null default '7c4a8d09ca3762af61e59520943dc26494f8941b',
	user_createTime timestamp default CURRENT_TIMESTAMP,
	user_auth tinyint(1) not null default 1
)engine=innodb default charset=utf8;

create table department(
	department_id int(8) UNSIGNED not null primary key,
	department_name varchar(15) not null,
	department_information text null
)engine=innodb default charset=utf8;

create table class(
	class_id int(8) UNSIGNED not null primary key,
	class_name varchar(15) not null,
	class_department_id int(8) UNSIGNED not null,
	class_majorName varchar(20) not null,
	class_information text null,
	foreign key(class_department_id) references department(department_id)
)engine=innodb default charset=utf8;

create table student(
	student_id bigint(12) UNSIGNED not null primary key,
	student_class_id int(8) UNSIGNED not null,
	student_sex tinyint(1) not null,
	student_name varchar(10) not null,
	student_brith char(8) null,
	student_address varchar(30) null,
	student_imghref varchar(20) null,
	student_information text null,
	student_phoneNum bigint(11) null,
	student_email varchar(30) null,
	student_idcard bigint(18) null,
	foreign key(student_id) references user(user_id),
	foreign key(student_class_id) references class(class_id)
)engine=innodb default charset=utf8;

create table teacher(
	teacher_id bigint(12) UNSIGNED not null primary key,
	teacher_department_id int(8) UNSIGNED not null,
	teacher_name varchar(10) not null,
	teacher_sex tinyint(1) not null,
	teacher_brith char(8) null,
	teacher_address varchar(30) null,
	teacher_imghref varchar(20) null,
	teacher_information text null,
	teacher_phoneNum bigint(11) null,
	teacher_email varchar(30) null,
	teacher_idvard bigint(18) null,
	foreign key(teacher_id) references user(user_id),
	foreign key(teacher_department_id) references department(department_id)
)engine=innodb default charset=utf8;


create table course(
	course_id int(8) UNSIGNED not null primary key,
	course_teacher_id bigint(12) UNSIGNED not null,
	course_class_id int(8) UNSIGNED not null,
	course_department_id int(8) UNSIGNED not null,
	course_belong varchar(10) null,
	course_style varchar(10) not null,
	course_credit tinyint(1) not null,
	course_name varchar(15) not null,
	course_year char(9) not null,
	course_term tinyint(1) not null,
	course_information text null,
	foreign key(course_teacher_id) references teacher(teacher_id),
	foreign key(course_class_id) references class(class_id),
	foreign key(course_department_id) references department(department_id)
)engine=innodb default charset=utf8;

create table grade(
	grade_course_id int(8) UNSIGNED not null,
	grade_student_id bigint(12) UNSIGNED not null,
	grade_score float(3,2) null,
	grade_gpa float(1,1) null,
	grade_pass tinyint(1) null,
	grade_second float(3,2) null,
	grade_information text null,
	foreign key(grade_course_id) references course(course_id),
	foreign key(grade_student_id) references student(student_id),
	primary key(grade_course_id, grade_student_id)
)engine=innodb default charset=utf8;