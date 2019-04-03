CREATE TABLE `user` (
  `user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `student_ID` int(11) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `student_email` varchar(60) NOT NULL,
  `password` varchar(120) NOT NULL,
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `user_UN` (`username`,`student_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='Table which shows all user information';

CREATE TABLE `room` (
  `room_ID` int(3) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(5) NOT NULL,
  `capacity` int(2) NOT NULL,
  `projector` tinyint(1) NOT NULL,
  `tv` tinyint(1) NOT NULL,
  `whiteboard` tinyint(1) NOT NULL,
  PRIMARY KEY (`room_ID`),
  UNIQUE KEY `room_UN` (`room_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table that shows all the information about rooms';

CREATE TABLE `booking` (
  `booking_ID` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `duration` time NOT NULL,
  `booking_title` varchar(100) DEFAULT NULL,
  `username` varchar(10) NOT NULL,
  `room_ID` int(3) NOT NULL,
  PRIMARY KEY (`booking_ID`),
  KEY `booking_room_FK` (`room_ID`),
  CONSTRAINT `booking_room_FK` FOREIGN KEY (`room_ID`) REFERENCES `room` (`room_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table that shows all the booking information';
