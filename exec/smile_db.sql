-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: smile-db.c6nqdmwmr1mh.ap-northeast-2.rds.amazonaws.com    Database: smile_db
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `smile_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `smile_db` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `smile_db`;

--
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_messages` (
  `cm_id` bigint NOT NULL AUTO_INCREMENT,
  `cm_content` text NOT NULL,
  `cm_send_time` timestamp NOT NULL,
  `cm_session` varchar(255) NOT NULL,
  `si_id` int NOT NULL,
  `user_id` int NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  PRIMARY KEY (`cm_id`),
  KEY `fk_chat_messages_study_informations1_idx` (`si_id`),
  KEY `fk_chat_messages_users1_idx` (`user_id`),
  CONSTRAINT `fk_chat_messages_study_informations1` FOREIGN KEY (`si_id`) REFERENCES `study_informations` (`si_id`),
  CONSTRAINT `fk_chat_messages_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_messages`
--

LOCK TABLES `chat_messages` WRITE;
/*!40000 ALTER TABLE `chat_messages` DISABLE KEYS */;
INSERT INTO `chat_messages` VALUES (1,'?뺥삙二쇰떂???낆옣?섏뀲?듬땲??','2023-02-16 06:37:52','ENTER',2,3,'2023-02-16 06:37:52','2023-02-16 06:37:52',1,1),(2,'?곗? ?덈뀞?섏꽭??.?','2023-02-16 06:37:57','TALK',2,3,'2023-02-16 06:37:57','2023-02-16 06:37:57',1,1),(3,'?꾨Т???녿꽕...','2023-02-16 06:38:03','TALK',2,3,'2023-02-16 06:38:03','2023-02-16 06:38:03',1,1),(4,'?뺥삙二쇰떂???낆옣?섏뀲?듬땲??','2023-02-16 06:38:06','ENTER',2,3,'2023-02-16 06:38:06','2023-02-16 06:38:06',1,1),(5,'?뺥삙二쇰떂???낆옣?섏뀲?듬땲??','2023-02-16 06:41:07','ENTER',2,3,'2023-02-16 06:41:07','2023-02-16 06:41:07',1,1),(6,'?뺥삙二쇰떂???낆옣?섏뀲?듬땲??','2023-02-16 06:49:52','ENTER',2,3,'2023-02-16 06:49:52','2023-02-16 06:49:52',1,1),(7,'?쇰Ⅸ ?ㅼ뼱?ㅼ꽭??,'2023-02-16 06:50:01','TALK',2,3,'2023-02-16 06:50:01','2023-02-16 06:50:01',1,1),(8,'?뺥삙二쇰떂???낆옣?섏뀲?듬땲??','2023-02-16 06:50:09','ENTER',2,3,'2023-02-16 06:50:09','2023-02-16 06:50:09',1,1),(9,'?뺥삙二쇰떂???낆옣?섏뀲?듬땲??','2023-02-16 06:50:13','ENTER',2,3,'2023-02-16 06:50:13','2023-02-16 06:50:13',1,1),(10,'?뺥삙二쇰떂???낆옣?섏뀲?듬땲??','2023-02-16 06:50:52','ENTER',2,3,'2023-02-16 06:50:52','2023-02-16 06:50:52',1,1),(11,'湲곕씪?섏씠 ?낆옣?섏뀲?듬땲??','2023-02-16 07:09:13','ENTER',2,2,'2023-02-16 07:09:13','2023-02-16 07:09:13',1,1);
/*!40000 ALTER TABLE `chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_providers`
--

DROP TABLE IF EXISTS `login_providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_providers` (
  `lp_id` int NOT NULL AUTO_INCREMENT,
  `lp_provider` varchar(255) NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  PRIMARY KEY (`lp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_providers`
--

LOCK TABLES `login_providers` WRITE;
/*!40000 ALTER TABLE `login_providers` DISABLE KEYS */;
INSERT INTO `login_providers` VALUES (1,'kakao','2023-02-02 05:15:27','2023-02-02 05:15:27',1,1),(2,'google','2023-02-09 12:24:08','2023-02-09 12:24:08',2,2),(3,'naver','2023-02-09 12:24:25','2023-02-09 12:24:25',2,2);
/*!40000 ALTER TABLE `login_providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_types`
--

DROP TABLE IF EXISTS `schedule_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_types` (
  `sct_id` int NOT NULL AUTO_INCREMENT,
  `sct_name` varchar(255) NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  PRIMARY KEY (`sct_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_types`
--

LOCK TABLES `schedule_types` WRITE;
/*!40000 ALTER TABLE `schedule_types` DISABLE KEYS */;
INSERT INTO `schedule_types` VALUES (1,'硫댁젒','2023-02-02 05:16:27','2023-02-02 05:16:27',1,1),(2,'?쒕쪟','2023-02-07 16:51:02','2023-02-07 16:51:02',1,1),(3,'?ㅽ꽣??,'2023-02-07 16:51:29','2023-02-07 16:51:29',1,1),(4,'?쒗뿕','2023-02-07 16:51:46','2023-02-07 16:51:46',1,1);
/*!40000 ALTER TABLE `schedule_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_board_comments`
--

DROP TABLE IF EXISTS `study_board_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_board_comments` (
  `sbc_id` int NOT NULL AUTO_INCREMENT,
  `sbc_content` text NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `sbc_is_deleted` tinyint NOT NULL,
  `sb_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`sbc_id`),
  KEY `fk_study_board_comments_study_boards1_idx` (`sb_id`),
  KEY `fk_study_board_comments_users1_idx` (`user_id`),
  CONSTRAINT `fk_study_board_comments_study_boards1` FOREIGN KEY (`sb_id`) REFERENCES `study_boards` (`sb_id`),
  CONSTRAINT `fk_study_board_comments_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_board_comments`
--

LOCK TABLES `study_board_comments` WRITE;
/*!40000 ALTER TABLE `study_board_comments` DISABLE KEYS */;
INSERT INTO `study_board_comments` VALUES (1,'?뚯씠??!!!','2023-02-16 06:50:26','2023-02-16 06:50:26',1,1,0,2,3);
/*!40000 ALTER TABLE `study_board_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_board_files`
--

DROP TABLE IF EXISTS `study_board_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_board_files` (
  `sbf_id` int NOT NULL AUTO_INCREMENT,
  `sbf_name` varchar(255) NOT NULL,
  `sbf_path` varchar(255) NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `sbf_is_deleted` tinyint NOT NULL,
  `sb_id` int NOT NULL,
  PRIMARY KEY (`sbf_id`),
  KEY `fk_stduy_board_files_study_boards1_idx` (`sb_id`),
  CONSTRAINT `fk_stduy_board_files_study_boards1` FOREIGN KEY (`sb_id`) REFERENCES `study_boards` (`sb_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_board_files`
--

LOCK TABLES `study_board_files` WRITE;
/*!40000 ALTER TABLE `study_board_files` DISABLE KEYS */;
INSERT INTO `study_board_files` VALUES (1,'?먤뀽.png','https://smile-project-bucket.s3.ap-northeast-2.amazonaws.com/study-file/2/2/d8cb6b56-2505-4733-8fd4-6e320d9e3200.png','2023-02-16 06:46:53','2023-02-16 06:46:53',1,1,0,2);
/*!40000 ALTER TABLE `study_board_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_board_types`
--

DROP TABLE IF EXISTS `study_board_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_board_types` (
  `sbt_id` int NOT NULL AUTO_INCREMENT,
  `sbt_type` varchar(255) NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  PRIMARY KEY (`sbt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_board_types`
--

LOCK TABLES `study_board_types` WRITE;
/*!40000 ALTER TABLE `study_board_types` DISABLE KEYS */;
INSERT INTO `study_board_types` VALUES (1,'怨듭?','2023-02-07 00:42:42','2023-02-07 00:42:42',1,1),(2,'?먮즺','2023-02-08 01:41:44','2023-02-08 01:41:44',1,1),(3,'?쇰컲','2023-02-08 01:42:08','2023-02-08 01:42:08',1,1);
/*!40000 ALTER TABLE `study_board_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_boards`
--

DROP TABLE IF EXISTS `study_boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_boards` (
  `sb_id` int NOT NULL AUTO_INCREMENT,
  `sb_title` varchar(255) NOT NULL,
  `sb_view` int NOT NULL,
  `sb_content` text NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `sb_is_deleted` tinyint NOT NULL,
  `si_id` int NOT NULL,
  `sbt_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`sb_id`),
  KEY `fk_study_boards_study_informations1_idx` (`si_id`),
  KEY `fk_study_boards_study_board_types1_idx` (`sbt_id`),
  KEY `fk_study_boards_users1_idx` (`user_id`),
  CONSTRAINT `fk_study_boards_study_board_types1` FOREIGN KEY (`sbt_id`) REFERENCES `study_board_types` (`sbt_id`),
  CONSTRAINT `fk_study_boards_study_informations1` FOREIGN KEY (`si_id`) REFERENCES `study_informations` (`si_id`),
  CONSTRAINT `fk_study_boards_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_boards`
--

LOCK TABLES `study_boards` WRITE;
/*!40000 ALTER TABLE `study_boards` DISABLE KEYS */;
INSERT INTO `study_boards` VALUES (1,'?덈뀞',7,'<p>?뉎꽩?밤꽩?뉎꽮?담뀋</p>','2023-02-16 07:06:28','2023-02-16 06:44:44',1,1,0,2,2,3),(2,'怨듭??ы빆?낅땲??',5,'<p>怨듬? ?댁떖?덊븯?몄슂!</p>','2023-02-16 07:06:31','2023-02-16 06:46:53',1,1,0,2,1,1);
/*!40000 ALTER TABLE `study_boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_comments`
--

DROP TABLE IF EXISTS `study_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_comments` (
  `sc_id` int NOT NULL AUTO_INCREMENT,
  `sc_content` text NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `sc_is_deleted` tinyint NOT NULL,
  `user_id` int NOT NULL,
  `si_id` int NOT NULL,
  PRIMARY KEY (`sc_id`),
  KEY `fk_study_comments_users1_idx` (`user_id`),
  KEY `fk_study_comments_study_informations1_idx` (`si_id`),
  CONSTRAINT `fk_study_comments_study_informations1` FOREIGN KEY (`si_id`) REFERENCES `study_informations` (`si_id`),
  CONSTRAINT `fk_study_comments_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_comments`
--

LOCK TABLES `study_comments` WRITE;
/*!40000 ALTER TABLE `study_comments` DISABLE KEYS */;
INSERT INTO `study_comments` VALUES (1,'媛숈씠 ?댁떖???댁슂!!!!','2023-02-16 06:37:18','2023-02-16 06:37:18',1,1,0,3,2),(2,'媛숈씠 怨듬??댁슂~!','2023-02-16 07:11:29','2023-02-16 07:11:22',1,1,0,1,3);
/*!40000 ALTER TABLE `study_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_informations`
--

DROP TABLE IF EXISTS `study_informations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_informations` (
  `si_id` int NOT NULL AUTO_INCREMENT,
  `si_name` varchar(255) NOT NULL,
  `si_start_date` date NOT NULL,
  `si_end_date` date NOT NULL,
  `si_time` varchar(255) NOT NULL,
  `si_img` varchar(255) DEFAULT NULL,
  `si_person` int NOT NULL,
  `si_max_person` int NOT NULL,
  `si_desc` text,
  `si_view` int NOT NULL,
  `si_deadline` tinyint NOT NULL,
  `si_rule` text,
  `si_chatroom_id` varchar(255) NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `si_is_end` tinyint NOT NULL,
  `st_id` int NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `si_last_visited_time` timestamp NOT NULL,
  PRIMARY KEY (`si_id`),
  KEY `fk_study_informations_study_types1_idx` (`st_id`),
  CONSTRAINT `fk_study_informations_study_types1` FOREIGN KEY (`st_id`) REFERENCES `study_types` (`st_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_informations`
--

LOCK TABLES `study_informations` WRITE;
/*!40000 ALTER TABLE `study_informations` DISABLE KEYS */;
INSERT INTO `study_informations` VALUES (1,'SSAFY 硫댁젒 ?ㅽ꽣??,'2023-02-16','2023-02-28','14:00 ~ 18:00','https://smile-project-bucket.s3.ap-northeast-2.amazonaws.com/study-img/27845d84-5590-4371-9508-7368eb3cc1a0.jpeg',2,3,'SSAFY 硫댁젒 ?ㅽ꽣?붿엯?덈떎!!\n??媛숈씠 硫댁젒 以鍮꾪빐??',5,0,NULL,'bc370593-0db1-40e2-9fe4-88f204a46353','2023-02-16 06:20:26','2023-02-16 06:18:43',0,1,1,1,'2023-02-16 06:18:43'),(2,'SSAFY 硫댁젒 ?ㅽ꽣??,'2023-02-16','2023-02-28','10:00 ~ 12:00','https://smile-project-bucket.s3.ap-northeast-2.amazonaws.com/study-img/f0e5eec6-8a86-40c6-9494-ace67cb2761d.jpeg',3,3,'SSAFY 硫댁젒 ?ㅽ꽣?붿엯?덈떎.\n媛숈씠 硫댁젒 以鍮꾪븯怨?SSAFY媛묒떆??!',36,0,NULL,'19b5bf06-2589-493c-86bc-84d9db4e6409','2023-02-16 07:09:03','2023-02-16 06:25:07',0,1,1,1,'2023-02-16 06:25:07'),(3,'OPIC ?ㅽ꽣??,'2023-02-16','2023-02-28','09:00 ~ 12:00','https://smile-project-bucket.s3.ap-northeast-2.amazonaws.com/study-img/726968d1-7956-4434-a0f4-3abc96a03451.jpeg',2,6,'OPIC ?ㅽ꽣?붿엯?덈떎!',4,0,NULL,'e8106af4-9fe6-4d83-bf62-e012f501dfab','2023-02-16 07:11:39','2023-02-16 07:11:10',0,3,1,1,'2023-02-16 07:11:10');
/*!40000 ALTER TABLE `study_informations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_meeting_types`
--

DROP TABLE IF EXISTS `study_meeting_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_meeting_types` (
  `smt_id` int NOT NULL AUTO_INCREMENT,
  `smt_name` varchar(255) NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  PRIMARY KEY (`smt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_meeting_types`
--

LOCK TABLES `study_meeting_types` WRITE;
/*!40000 ALTER TABLE `study_meeting_types` DISABLE KEYS */;
INSERT INTO `study_meeting_types` VALUES (1,'?쇰컲','2023-02-09 13:12:33','2023-02-09 13:12:33',2,2),(2,'硫댁젒','2023-02-09 13:12:45','2023-02-09 13:12:45',2,2);
/*!40000 ALTER TABLE `study_meeting_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_meetings`
--

DROP TABLE IF EXISTS `study_meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_meetings` (
  `sm_id` int NOT NULL AUTO_INCREMENT,
  `sm_name` varchar(255) NOT NULL,
  `sm_is_end` int NOT NULL,
  `sm_start_time` datetime NOT NULL,
  `si_id` int NOT NULL,
  `smt_id` int NOT NULL,
  `user_id` int NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_id` int NOT NULL,
  `update_id` int NOT NULL,
  PRIMARY KEY (`sm_id`),
  KEY `fk_study_meetings_study_informations1_idx` (`si_id`),
  KEY `fk_study_meetings_study_meeting_types1_idx` (`smt_id`),
  KEY `fk_study_meetings_users1_idx` (`user_id`),
  CONSTRAINT `fk_study_meetings_study_informations1` FOREIGN KEY (`si_id`) REFERENCES `study_informations` (`si_id`),
  CONSTRAINT `fk_study_meetings_study_meeting_types1` FOREIGN KEY (`smt_id`) REFERENCES `study_meeting_types` (`smt_id`),
  CONSTRAINT `fk_study_meetings_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_meetings`
--

LOCK TABLES `study_meetings` WRITE;
/*!40000 ALTER TABLE `study_meetings` DISABLE KEYS */;
/*!40000 ALTER TABLE `study_meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_replies`
--

DROP TABLE IF EXISTS `study_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_replies` (
  `sr_id` int NOT NULL AUTO_INCREMENT,
  `sr_content` text NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `sr_is_deleted` tinyint NOT NULL,
  `user_id` int NOT NULL,
  `sc_id` int NOT NULL,
  PRIMARY KEY (`sr_id`),
  KEY `fk_study_replies_users1_idx` (`user_id`),
  KEY `fk_study_replies_study_comments1_idx` (`sc_id`),
  CONSTRAINT `fk_study_replies_study_comments1` FOREIGN KEY (`sc_id`) REFERENCES `study_comments` (`sc_id`),
  CONSTRAINT `fk_study_replies_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_replies`
--

LOCK TABLES `study_replies` WRITE;
/*!40000 ALTER TABLE `study_replies` DISABLE KEYS */;
INSERT INTO `study_replies` VALUES (1,'?롢뀕?롢뀕?롢뀕','2023-02-16 06:51:13','2023-02-16 06:51:13',1,1,0,3,1),(2,'?꾧뎄???섏쁺','2023-02-16 07:11:36','2023-02-16 07:11:36',1,1,0,1,2);
/*!40000 ALTER TABLE `study_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_schedules`
--

DROP TABLE IF EXISTS `study_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_schedules` (
  `ss_id` int NOT NULL AUTO_INCREMENT,
  `ss_start_time` timestamp NOT NULL,
  `ss_end_time` timestamp NOT NULL,
  `ss_name` varchar(255) NOT NULL,
  `ss_desc` text NOT NULL,
  `ss_part` int DEFAULT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `ss_is_deleted` tinyint NOT NULL,
  `si_id` int NOT NULL,
  `sct_id` int NOT NULL,
  `ss_url` varchar(255) DEFAULT NULL,
  `ss_color` varchar(255) NOT NULL,
  PRIMARY KEY (`ss_id`),
  KEY `fk_study_schedules_study_informations1_idx` (`si_id`),
  KEY `fk_study_schedules_schedule_types1_idx` (`sct_id`),
  CONSTRAINT `fk_study_schedules_schedule_types1` FOREIGN KEY (`sct_id`) REFERENCES `schedule_types` (`sct_id`),
  CONSTRAINT `fk_study_schedules_study_informations1` FOREIGN KEY (`si_id`) REFERENCES `study_informations` (`si_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_schedules`
--

LOCK TABLES `study_schedules` WRITE;
/*!40000 ALTER TABLE `study_schedules` DISABLE KEYS */;
/*!40000 ALTER TABLE `study_schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_types`
--

DROP TABLE IF EXISTS `study_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_types` (
  `st_id` int NOT NULL AUTO_INCREMENT,
  `st_name` varchar(255) NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  PRIMARY KEY (`st_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_types`
--

LOCK TABLES `study_types` WRITE;
/*!40000 ALTER TABLE `study_types` DISABLE KEYS */;
INSERT INTO `study_types` VALUES (1,'硫댁젒','2023-02-02 05:15:28','2023-02-02 05:15:28',1,1),(2,'?먭꺽利?,'2023-02-09 05:02:43','2023-02-09 05:02:43',1,1),(3,'?멸뎅??,'2023-02-09 05:02:47','2023-02-09 05:02:47',1,1);
/*!40000 ALTER TABLE `study_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_join_studies`
--

DROP TABLE IF EXISTS `user_join_studies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_join_studies` (
  `ujs_is_leader` tinyint NOT NULL,
  `ujs_is_ban` tinyint NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `ujs_is_deleted` tinyint NOT NULL,
  `user_id` int NOT NULL,
  `si_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`si_id`),
  KEY `fk_user_join_studies_study_informations1_idx` (`si_id`),
  CONSTRAINT `fk_user_join_studies_study_informations1` FOREIGN KEY (`si_id`) REFERENCES `study_informations` (`si_id`),
  CONSTRAINT `fk_user_join_studies_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_join_studies`
--

LOCK TABLES `user_join_studies` WRITE;
/*!40000 ALTER TABLE `user_join_studies` DISABLE KEYS */;
INSERT INTO `user_join_studies` VALUES (0,0,'2023-02-16 06:20:26','2023-02-16 06:18:43',1,1,0,1,1),(1,0,'2023-02-16 06:25:07','2023-02-16 06:25:07',1,1,0,1,2),(0,0,'2023-02-16 07:11:39','2023-02-16 07:11:10',1,1,0,1,3),(0,0,'2023-02-16 06:36:48','2023-02-16 06:36:48',1,1,0,2,2),(0,0,'2023-02-16 06:37:22','2023-02-16 06:37:22',1,1,0,3,2);
/*!40000 ALTER TABLE `user_join_studies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_memos`
--

DROP TABLE IF EXISTS `user_memos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_memos` (
  `um_id` int NOT NULL AUTO_INCREMENT,
  `um_content` text NOT NULL,
  `um_x` int DEFAULT NULL,
  `um_y` int DEFAULT NULL,
  `um_is_deleted` tinyint NOT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`um_id`),
  KEY `fk_user_memos_users1_idx` (`user_id`),
  CONSTRAINT `fk_user_memos_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_memos`
--

LOCK TABLES `user_memos` WRITE;
/*!40000 ALTER TABLE `user_memos` DISABLE KEYS */;
INSERT INTO `user_memos` VALUES (1,'New Note!',64,45,1,'2023-02-16 06:46:12','2023-02-16 06:11:16',1,1,1),(2,'New Note!',18,5,1,'2023-02-16 06:46:12','2023-02-16 06:11:16',1,1,1),(3,'New Note!',41,39,1,'2023-02-16 06:46:12','2023-02-16 06:11:16',1,1,1),(4,'New Note!',10,44,1,'2023-02-16 06:46:12','2023-02-16 06:45:58',1,1,1),(5,'New Note!',64,6,1,'2023-02-16 06:46:12','2023-02-16 06:45:58',1,1,1),(6,'New Note!',71,19,1,'2023-02-16 06:46:12','2023-02-16 06:45:59',1,1,1),(7,'?덈뀞?섏꽭??\n?ㅻ쭏?쇱엯?덈떎!',63,15,1,'2023-02-16 06:46:12','2023-02-16 06:45:59',1,1,1),(8,'New Note!',24,41,1,'2023-02-16 06:46:12','2023-02-16 06:45:59',1,1,1),(9,'New Note!',43,38,0,'2023-02-16 07:06:56','2023-02-16 07:06:56',1,1,1),(10,'New Note!',29,5,0,'2023-02-16 07:06:56','2023-02-16 07:06:56',1,1,1),(11,'New Note!',73,42,0,'2023-02-16 07:06:56','2023-02-16 07:06:56',1,1,1);
/*!40000 ALTER TABLE `user_memos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_password` varchar(255) NOT NULL,
  `user_nickname` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_img` varchar(255) DEFAULT NULL,
  `update_time` timestamp NOT NULL,
  `create_time` timestamp NOT NULL,
  `update_id` int NOT NULL,
  `create_id` int NOT NULL,
  `user_is_deleted` tinyint NOT NULL,
  `user_refresh_token` varchar(255) DEFAULT NULL,
  `lp_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_nickname_UNIQUE` (`user_nickname`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  KEY `fk_users_login_providers1_idx` (`lp_id`),
  CONSTRAINT `fk_users_login_providers1` FOREIGN KEY (`lp_id`) REFERENCES `login_providers` (`lp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'password','?ㅽ깭??,'oth5447@naver.com','http://k.kakaocdn.net/dn/x5d7C/btrUYPKWgIR/ZpKK5S714a3cl5cUIELut1/img_110x110.jpg','2023-02-16 07:06:51','2023-02-16 06:10:06',1,1,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzbWlsZSIsImlhdCI6MTY3NjUzMTIxMCwiZXhwIjoxNjc3MTM2MDEwfQ.uD_ytg89HEWQamiaBSFZng9KcivjyvF-VSGfFawwmVnO3R88ryjLXVtEFHliQEPu_UZs5_7ZRZ-JZzaXYlQOXg',1),(2,'password','湲곕씪','thdrlfk93@naver.com','http://k.kakaocdn.net/dn/LFS4Z/btrVVQNDPKP/3UmraBxepd5yArhSwBEg10/img_110x110.jpg','2023-02-16 06:20:09','2023-02-16 06:11:20',1,1,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzbWlsZSIsImlhdCI6MTY3NjUyODQwOSwiZXhwIjoxNjc3MTMzMjA5fQ.VE6L_hrfRMDXILrbxM7RhlAiUWlC2XYSk_jDWpT-dlSoCda6FWrcGf2PHI6GR2nQirLAGRFEJWBUBVHCoaOmUg',1),(3,'password','?뺥삙二?,'doitforjung@kakao.com','http://k.kakaocdn.net/dn/dkvB3i/btrWnpjzSv6/V4XJH4Og55qTMmsBstAae1/img_110x110.jpg','2023-02-16 06:36:59','2023-02-16 06:36:59',1,1,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzbWlsZSIsImlhdCI6MTY3NjUyOTQxOCwiZXhwIjoxNjc3MTM0MjE4fQ.42QcjecyRhol5jMza0wSFx5Wiz_ekTUjZ1Gy6Lo3s1A75f6_4Z-Br3QmteFPDxqDiD3URLNam4HRi6Fjm4V_Eg',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 16:16:15
