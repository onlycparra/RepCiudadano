use repciudadano;
drop table if exists `votes`;
drop table if exists `reports`;
drop table if exists `part_of`;
drop table if exists `users`;
drop table if exists `communities`;
create table if not exists `communities`(
    `community_id` int(10) not null auto_increment,
    `community_name` varchar(40) not null unique,
    `country` varchar(40),
    `state` varchar(40),
    `city` varchar(40),
    `description` varchar(400) not null,
    constraint `pk0_communities` primary key (`community_id`)
);
create table if not exists `users`(
    `user_id` int(15) not null auto_increment,
	`username` varchar(40) not null unique,
    `email` varchar(40) not null unique,
    `first_name` varchar(40) not null,
    `last_name` varchar(40) not null,
    `password` varchar(64) not null,
    `activation_code` varchar(6) not null,
    `active` boolean,
    `signup_date` datetime not null,
	constraint `pk0_users` primary key (`user_id`) 
);
create table if not exists `part_of`(
    `user_id` int(15),
    `community_id` int(10),
    `authority` boolean,
    `description` varchar(200),
    CONSTRAINT `fk0_part_of` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    CONSTRAINT `fk1_part_of` FOREIGN KEY (`community_id`) REFERENCES `communities`(`community_id`),
    constraint `pk0_part_of` primary key (`user_id`,`community_id`)
);
create table if not exists `reports`(
	`report_id` int(20) auto_increment,
    `author_id` int(15),
    `community_id` int(10),
    `title` varchar(40),
    `problem` varchar(300),
    `proposal` varchar(300),
    `image` varchar(200),
    `publication_date` datetime,
    `bad_report_votes` int,
    `visible` boolean,
    CONSTRAINT `fk0_reports` FOREIGN KEY (`author_id`,`community_id`) REFERENCES `part_of`(`user_id`,`community_id`),
    constraint `pk0_reports` primary key (`report_id`)
);
create table if not exists `votes`(
    `user_id` int(15),
    `report_id` int(20),
    `voting_date` datetime,
    CONSTRAINT `fk0_votes` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    CONSTRAINT `fk1_votes` FOREIGN KEY (`report_id`) REFERENCES `reports`(`report_id`),
    constraint `pk0_votes` primary key (`user_id`,`report_id`)
);




-- DATA

INSERT INTO `communities` (`community_id`, `community_name`, `country`, `state`, `city`, `description`) VALUES
(1, 'Universidad Catolica del Maule', 'Chile', 'Region del Maule', 'Talca', 'La Universidad Catolica del Maule es una institucion de educacion superior fundada por Carlos Gonzalez Cruchaga, mediante Decreto de fecha 10 de julio de 1991.'),
(2, 'Poblacion Aurora', 'Chile', 'Region del Maule', 'San Clemente', 'Poblacion de San Clemente con cerca de 600 habitantes, a 13 kilometros de Talca viene a ser un tranquilo barrio.'),
(3, 'Universidad de Talca', 'Chile', 'Region del Maule', 'Talca', 'Su origen como institucion universitaria publica esta profundamente enraizado en la comunidad regional y se remonta mas alla de la fusion de las antiguas sedes de la Universidad Tecnica del Estado y d'),
(4, 'Poblacion Flor del Llano', 'Chile', 'Region del Maule', 'San Clemente', 'Tranquila poblacion a 14 kilometros de Talca, cuenta con cerca de 1000 habitantes y todos son amables.');

INSERT INTO `users` (`user_id`, `username`, `email`, `first_name`, `last_name`, `password`, `activation_code`, `active`, `signup_date`) VALUES
(1, 'onlycparra', 'onlycparra@hotmail.com', 'Claudio', 'Parra', 'asd123', 'VDCZA1', 1, '2015-03-09 01:13:23');