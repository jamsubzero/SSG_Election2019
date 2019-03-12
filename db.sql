-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.21 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for ssg
CREATE DATABASE IF NOT EXISTS `ssg` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ssg`;


-- Dumping structure for table ssg.ballot
CREATE TABLE IF NOT EXISTS `ballot` (
  `terminal` varchar(50) NOT NULL,
  `start` int(11) NOT NULL,
  `incNum` int(11) NOT NULL,
  `current` int(11) NOT NULL,
  `sec1` varchar(50) DEFAULT NULL,
  `sec2` varchar(50) DEFAULT NULL,
  `sec3` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`terminal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ssg.ballot: ~5 rows (approximately)
/*!40000 ALTER TABLE `ballot` DISABLE KEYS */;
INSERT INTO `ballot` (`terminal`, `start`, `incNum`, `current`, `sec1`, `sec2`, `sec3`) VALUES
	('BA', 1, 1, 3, NULL, NULL, NULL),
	('CRIM', 1, 1, 2, NULL, NULL, NULL),
	('ED', 1, 1, 56, NULL, NULL, NULL),
	('Fi', 1, 1, 4, NULL, NULL, NULL),
	('IT', 1, 1, 2, NULL, NULL, NULL);
/*!40000 ALTER TABLE `ballot` ENABLE KEYS */;


-- Dumping structure for table ssg.candidate
CREATE TABLE IF NOT EXISTS `candidate` (
  `canID` int(11) NOT NULL AUTO_INCREMENT,
  `canPos` varchar(50) NOT NULL DEFAULT '',
  `canNum` varchar(50) NOT NULL DEFAULT '',
  `canName` varchar(50) NOT NULL DEFAULT '',
  `curScore` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`canID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

-- Dumping data for table ssg.candidate: ~21 rows (approximately)
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` (`canID`, `canPos`, `canNum`, `canName`, `curScore`) VALUES
	(1, 'pres', '1', 'Panes, Elvin Jr.', 0),
	(2, 'vp', '1', 'Ricaforte, Regene', 0),
	(3, 'sen', '1', 'Abajon, Noly', 0),
	(4, 'sen', '2', 'Acuyan, Angenitte', 0),
	(5, 'sen', '3', 'Caballero, Ryan', 0),
	(6, 'sen', '4', 'Egat, Ferlito Jr.', 0),
	(7, 'sen', '5', 'Española, Godpray', 0),
	(8, 'sen', '6', 'Española, Lorain Grace', 0),
	(9, 'sen', '7', 'Garganian, Alfie', 0),
	(10, 'sen', '8', 'Sanchez, Angelica', 0),
	(11, 'sen', '9', 'Singer, Jowella Sue', 0),
	(12, 'sen', '10', 'Solomon, Silvestre III', 0),
	(13, 'sen', '11', 'Tudillo, Caryl', 0),
	(14, 'sen', '12', 'Villanueva, Joey Jay', 0),
	(15, 'ED', '1', 'Aninacion, Cynthia', 0),
	(16, 'ED', '2', 'Balingbing, Elizabeth', 0),
	(17, 'BA', '1', 'Bayona, Roilan', 0),
	(18, 'BA', '2', 'Bendaño, Avan John', 0),
	(19, 'IT', '1', 'Ferolin, Ludwig Von', 0),
	(20, 'IT', '2', 'Tabaosares, Loyd', 0),
	(21, 'FI', '1', 'Diaz, Charlotte', 0);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;


-- Dumping structure for table ssg.votes
CREATE TABLE IF NOT EXISTS `votes` (
  `voteID` int(11) NOT NULL AUTO_INCREMENT,
  `canID` int(11) NOT NULL DEFAULT '0',
  `terminal` varchar(50) NOT NULL DEFAULT '0',
  `ballot` int(11) NOT NULL DEFAULT '0',
  `score` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`voteID`),
  UNIQUE KEY `canCode` (`canID`,`ballot`,`terminal`),
  CONSTRAINT `FK_votes_candidate` FOREIGN KEY (`canID`) REFERENCES `candidate` (`canID`)
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=latin1;

-- Dumping data for table ssg.votes: ~213 rows (approximately)
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` (`voteID`, `canID`, `terminal`, `ballot`, `score`) VALUES
	(1, 1, 'ED', 2, 1),
	(2, 2, 'ED', 2, 1),
	(3, 4, 'ED', 2, 1),
	(4, 5, 'ED', 2, 1),
	(5, 15, 'ED', 2, 1),
	(6, 1, 'ED', 3, 1),
	(7, 2, 'ED', 3, 1),
	(8, 4, 'ED', 3, 1),
	(9, 5, 'ED', 3, 1),
	(10, 4, 'ED', 4, 1),
	(11, 5, 'ED', 4, 1),
	(12, 3, 'ED', 5, 1),
	(13, 4, 'ED', 5, 1),
	(14, 5, 'ED', 5, 1),
	(15, 4, 'ED', 6, 1),
	(16, 5, 'ED', 6, 1),
	(17, 4, 'ED', 7, 1),
	(18, 5, 'ED', 7, 1),
	(19, 3, 'ED', 8, 1),
	(20, 4, 'ED', 8, 1),
	(21, 3, 'ED', 9, 1),
	(22, 4, 'ED', 10, 1),
	(23, 4, 'ED', 11, 1),
	(24, 4, 'ED', 12, 1),
	(25, 4, 'ED', 13, 1),
	(26, 3, 'ED', 14, 1),
	(27, 4, 'ED', 15, 1),
	(28, 5, 'ED', 15, 1),
	(29, 4, 'ED', 16, 1),
	(30, 5, 'ED', 16, 1),
	(31, 3, 'ED', 17, 1),
	(32, 4, 'ED', 18, 1),
	(33, 5, 'ED', 18, 1),
	(34, 4, 'ED', 19, 1),
	(35, 3, 'ED', 20, 1),
	(36, 4, 'ED', 20, 1),
	(37, 5, 'ED', 20, 1),
	(38, 3, 'ED', 21, 1),
	(39, 4, 'ED', 21, 1),
	(40, 5, 'ED', 21, 1),
	(41, 6, 'ED', 21, 1),
	(42, 7, 'ED', 21, 1),
	(43, 8, 'ED', 21, 1),
	(44, 9, 'ED', 21, 1),
	(45, 10, 'ED', 21, 1),
	(46, 11, 'ED', 21, 1),
	(47, 12, 'ED', 21, 1),
	(48, 13, 'ED', 21, 1),
	(49, 14, 'ED', 21, 1),
	(50, 3, 'ED', 23, 1),
	(51, 4, 'ED', 23, 1),
	(52, 5, 'ED', 23, 1),
	(53, 6, 'ED', 23, 1),
	(54, 7, 'ED', 23, 1),
	(55, 4, 'ED', 24, 1),
	(56, 4, 'ED', 25, 1),
	(57, 4, 'ED', 26, 1),
	(58, 4, 'ED', 27, 1),
	(59, 4, 'ED', 28, 1),
	(60, 4, 'ED', 29, 1),
	(61, 4, 'ED', 30, 1),
	(62, 4, 'ED', 31, 1),
	(63, 4, 'ED', 32, 1),
	(64, 4, 'ED', 33, 1),
	(65, 5, 'ED', 33, 1),
	(66, 14, 'ED', 34, 1),
	(67, 13, 'ED', 35, 1),
	(68, 14, 'ED', 35, 1),
	(69, 3, 'ED', 36, 1),
	(70, 3, 'ED', 37, 1),
	(71, 9, 'ED', 38, 1),
	(72, 14, 'ED', 39, 1),
	(73, 14, 'ED', 40, 1),
	(74, 3, 'ED', 41, 1),
	(75, 4, 'ED', 41, 1),
	(76, 6, 'ED', 41, 1),
	(77, 8, 'ED', 41, 1),
	(78, 15, 'ED', 42, 1),
	(79, 16, 'ED', 43, 1),
	(80, 1, 'ED', 44, 1),
	(81, 2, 'ED', 45, 1),
	(82, 12, 'ED', 46, 1),
	(83, 13, 'ED', 46, 1),
	(84, 10, 'ED', 47, 1),
	(85, 12, 'ED', 47, 1),
	(86, 4, 'ED', 48, 1),
	(87, 5, 'ED', 48, 1),
	(88, 7, 'ED', 49, 1),
	(89, 9, 'ED', 49, 1),
	(90, 12, 'ED', 49, 1),
	(91, 15, 'ED', 49, 1),
	(94, 1, 'BA', 2, 1),
	(95, 3, 'BA', 2, 1),
	(96, 5, 'BA', 2, 1),
	(97, 1, 'ED', 50, 1),
	(98, 2, 'ED', 50, 1),
	(99, 8, 'ED', 50, 1),
	(100, 11, 'ED', 50, 1),
	(101, 15, 'ED', 50, 1),
	(102, 16, 'ED', 50, 1),
	(103, 1, 'CRIM', 2, 1),
	(104, 2, 'CRIM', 2, 1),
	(105, 3, 'CRIM', 2, 1),
	(106, 4, 'CRIM', 2, 1),
	(107, 5, 'CRIM', 2, 1),
	(108, 8, 'CRIM', 2, 1),
	(109, 10, 'CRIM', 2, 1),
	(110, 11, 'CRIM', 2, 1),
	(111, 13, 'CRIM', 2, 1),
	(112, 14, 'CRIM', 2, 1),
	(113, 1, 'FI', 2, 1),
	(114, 2, 'FI', 2, 1),
	(115, 3, 'FI', 2, 1),
	(116, 4, 'FI', 2, 1),
	(117, 6, 'FI', 2, 1),
	(118, 8, 'FI', 2, 1),
	(119, 11, 'FI', 2, 1),
	(120, 14, 'FI', 2, 1),
	(121, 21, 'FI', 2, 1),
	(122, 3, 'ED', 51, 1),
	(123, 4, 'ED', 51, 1),
	(124, 7, 'ED', 51, 1),
	(125, 8, 'ED', 51, 1),
	(126, 9, 'ED', 51, 1),
	(127, 10, 'ED', 51, 1),
	(128, 11, 'ED', 51, 1),
	(129, 1, 'ED', 52, 1),
	(130, 2, 'ED', 52, 1),
	(131, 3, 'ED', 52, 1),
	(132, 4, 'ED', 52, 1),
	(133, 5, 'ED', 52, 1),
	(134, 7, 'ED', 52, 1),
	(135, 8, 'ED', 52, 1),
	(136, 9, 'ED', 52, 1),
	(137, 10, 'ED', 52, 1),
	(138, 11, 'ED', 52, 1),
	(139, 14, 'ED', 52, 1),
	(140, 15, 'ED', 52, 1),
	(141, 16, 'ED', 52, 1),
	(142, 3, 'FI', 3, 1),
	(143, 4, 'FI', 3, 1),
	(144, 5, 'FI', 3, 1),
	(145, 6, 'FI', 3, 1),
	(146, 7, 'FI', 3, 1),
	(147, 8, 'FI', 3, 1),
	(148, 10, 'FI', 3, 1),
	(149, 11, 'FI', 3, 1),
	(150, 12, 'FI', 3, 1),
	(151, 13, 'FI', 3, 1),
	(152, 1, 'ED', 53, 1),
	(153, 2, 'ED', 53, 1),
	(154, 3, 'ED', 53, 1),
	(155, 4, 'ED', 53, 1),
	(156, 8, 'ED', 53, 1),
	(157, 12, 'ED', 53, 1),
	(158, 14, 'ED', 53, 1),
	(159, 15, 'ED', 53, 1),
	(160, 16, 'ED', 53, 1),
	(161, 1, 'ED', 54, 1),
	(162, 3, 'ED', 54, 1),
	(163, 4, 'ED', 54, 1),
	(164, 5, 'ED', 54, 1),
	(165, 6, 'ED', 54, 1),
	(166, 7, 'ED', 54, 1),
	(167, 8, 'ED', 54, 1),
	(168, 9, 'ED', 54, 1),
	(169, 10, 'ED', 54, 1),
	(170, 12, 'ED', 54, 1),
	(171, 13, 'ED', 54, 1),
	(172, 15, 'ED', 54, 1),
	(173, 16, 'ED', 54, 1),
	(174, 1, 'FI', 4, 1),
	(175, 2, 'FI', 4, 1),
	(176, 3, 'FI', 4, 1),
	(177, 5, 'FI', 4, 1),
	(178, 6, 'FI', 4, 1),
	(179, 7, 'FI', 4, 1),
	(180, 8, 'FI', 4, 1),
	(181, 11, 'FI', 4, 1),
	(182, 12, 'FI', 4, 1),
	(183, 13, 'FI', 4, 1),
	(184, 21, 'FI', 4, 1),
	(185, 1, 'IT', 2, 1),
	(186, 2, 'IT', 2, 1),
	(187, 3, 'IT', 2, 1),
	(188, 4, 'IT', 2, 1),
	(189, 5, 'IT', 2, 1),
	(190, 6, 'IT', 2, 1),
	(191, 7, 'IT', 2, 1),
	(192, 8, 'IT', 2, 1),
	(193, 9, 'IT', 2, 1),
	(194, 10, 'IT', 2, 1),
	(195, 11, 'IT', 2, 1),
	(196, 12, 'IT', 2, 1),
	(197, 13, 'IT', 2, 1),
	(198, 14, 'IT', 2, 1),
	(199, 19, 'IT', 2, 1),
	(200, 20, 'IT', 2, 1),
	(201, 1, 'ED', 55, 1),
	(202, 2, 'ED', 55, 1),
	(203, 7, 'ED', 55, 1),
	(204, 12, 'ED', 55, 1),
	(205, 13, 'ED', 55, 1),
	(206, 15, 'ED', 55, 1),
	(207, 16, 'ED', 55, 1),
	(208, 1, 'ED', 56, 1),
	(209, 2, 'ED', 56, 1),
	(210, 7, 'ED', 56, 1),
	(211, 8, 'ED', 56, 1),
	(212, 12, 'ED', 56, 1),
	(213, 15, 'ED', 56, 1),
	(214, 16, 'ED', 56, 1),
	(215, 13, 'BA', 3, 1);
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
