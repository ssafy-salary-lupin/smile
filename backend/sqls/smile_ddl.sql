-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema smile_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smile_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smile_db` DEFAULT CHARACTER SET utf8 ;
USE `smile_db` ;

-- -----------------------------------------------------
-- Table `smile_db`.`login_providers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`login_providers` (
  `lp_id` INT NOT NULL AUTO_INCREMENT,
  `lp_provider` VARCHAR(255) NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  PRIMARY KEY (`lp_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_password` VARCHAR(255) NOT NULL,
  `user_nickname` VARCHAR(255) NOT NULL,
  `user_email` VARCHAR(255) NOT NULL,
  `user_img` VARCHAR(255) NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  `user_is_deleted` TINYINT NOT NULL,
  `user_refresh_token` VARCHAR(255) NULL,
  `lp_id` INT NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_nickname_UNIQUE` (`user_nickname` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE,
  INDEX `fk_users_login_providers1_idx` (`lp_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_login_providers1`
    FOREIGN KEY (`lp_id`)
    REFERENCES `smile_db`.`login_providers` (`lp_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_types` (
  `st_id` INT NOT NULL AUTO_INCREMENT,
  `st_name` VARCHAR(255) NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  PRIMARY KEY (`st_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_informations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_informations` (
  `si_id` INT NOT NULL AUTO_INCREMENT,
  `si_name` VARCHAR(255) NOT NULL,
  `si_start_date` DATE NOT NULL,
  `si_end_date` DATE NOT NULL,
  `si_time` VARCHAR(255) NOT NULL,
  `si_img` VARCHAR(255) NULL,
  `si_person` INT NOT NULL,
  `si_max_person` INT NOT NULL,
  `si_desc` TEXT NULL,
  `si_view` INT NOT NULL,
  `si_deadline` TINYINT NOT NULL,
  `si_rule` TEXT NULL,
  `si_chatroom_id` VARCHAR(255) NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `si_is_end` TINYINT NOT NULL,
  `st_id` INT NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  `si_last_visited_time` TIMESTAMP NOT NULL,
  PRIMARY KEY (`si_id`),
  INDEX `fk_study_informations_study_types1_idx` (`st_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_informations_study_types1`
    FOREIGN KEY (`st_id`)
    REFERENCES `smile_db`.`study_types` (`st_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`user_join_studies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`user_join_studies` (
  `ujs_is_leader` TINYINT NOT NULL,
  `ujs_is_ban` TINYINT NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  `ujs_is_deleted` TINYINT NOT NULL,
  `user_id` INT NOT NULL,
  `si_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `si_id`),
  INDEX `fk_user_join_studies_study_informations1_idx` (`si_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_join_studies_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `smile_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_join_studies_study_informations1`
    FOREIGN KEY (`si_id`)
    REFERENCES `smile_db`.`study_informations` (`si_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_comments` (
  `sc_id` INT NOT NULL AUTO_INCREMENT,
  `sc_content` TEXT NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  `sc_is_deleted` TINYINT NOT NULL,
  `user_id` INT NOT NULL,
  `si_id` INT NOT NULL,
  PRIMARY KEY (`sc_id`),
  INDEX `fk_study_comments_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_study_comments_study_informations1_idx` (`si_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_comments_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `smile_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_comments_study_informations1`
    FOREIGN KEY (`si_id`)
    REFERENCES `smile_db`.`study_informations` (`si_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_board_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_board_types` (
  `sbt_id` INT NOT NULL AUTO_INCREMENT,
  `sbt_type` VARCHAR(255) NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  PRIMARY KEY (`sbt_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_boards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_boards` (
  `sb_id` INT NOT NULL AUTO_INCREMENT,
  `sb_title` VARCHAR(255) NOT NULL,
  `sb_view` INT NOT NULL,
  `sb_content` TEXT NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  `sb_is_deleted` TINYINT NOT NULL,
  `si_id` INT NOT NULL,
  `sbt_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`sb_id`),
  INDEX `fk_study_boards_study_informations1_idx` (`si_id` ASC) VISIBLE,
  INDEX `fk_study_boards_study_board_types1_idx` (`sbt_id` ASC) VISIBLE,
  INDEX `fk_study_boards_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_boards_study_informations1`
    FOREIGN KEY (`si_id`)
    REFERENCES `smile_db`.`study_informations` (`si_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_boards_study_board_types1`
    FOREIGN KEY (`sbt_id`)
    REFERENCES `smile_db`.`study_board_types` (`sbt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_boards_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `smile_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_board_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_board_comments` (
  `sbc_id` INT NOT NULL AUTO_INCREMENT,
  `sbc_content` TEXT NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  `sbc_is_deleted` TINYINT NOT NULL,
  `sb_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`sbc_id`),
  INDEX `fk_study_board_comments_study_boards1_idx` (`sb_id` ASC) VISIBLE,
  INDEX `fk_study_board_comments_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_board_comments_study_boards1`
    FOREIGN KEY (`sb_id`)
    REFERENCES `smile_db`.`study_boards` (`sb_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_board_comments_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `smile_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_replies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_replies` (
  `sr_id` INT NOT NULL AUTO_INCREMENT,
  `sr_content` TEXT NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  `sr_is_deleted` TINYINT NOT NULL,
  `user_id` INT NOT NULL,
  `sc_id` INT NOT NULL,
  PRIMARY KEY (`sr_id`),
  INDEX `fk_study_replies_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_study_replies_study_comments1_idx` (`sc_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_replies_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `smile_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_replies_study_comments1`
    FOREIGN KEY (`sc_id`)
    REFERENCES `smile_db`.`study_comments` (`sc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_board_files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_board_files` (
  `sbf_id` INT NOT NULL AUTO_INCREMENT,
  `sbf_name` VARCHAR(255) NOT NULL,
  `sbf_path` VARCHAR(255) NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  `sbf_is_deleted` TINYINT NOT NULL,
  `sb_id` INT NOT NULL,
  PRIMARY KEY (`sbf_id`),
  INDEX `fk_study_board_files_study_boards1_idx` (`sb_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_board_files_study_boards1`
    FOREIGN KEY (`sb_id`)
    REFERENCES `smile_db`.`study_boards` (`sb_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`schedule_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`schedule_types` (
  `sct_id` INT NOT NULL AUTO_INCREMENT,
  `sct_name` VARCHAR(255) NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  PRIMARY KEY (`sct_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_schedules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_schedules` (
  `ss_id` INT NOT NULL AUTO_INCREMENT,
  `ss_start_time` TIMESTAMP NOT NULL,
  `ss_end_time` TIMESTAMP NOT NULL,
  `ss_name` VARCHAR(255) NOT NULL,
  `ss_desc` TEXT NOT NULL,
  `ss_part` INT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  `ss_is_deleted` TINYINT NOT NULL,
  `si_id` INT NOT NULL,
  `sct_id` INT NOT NULL,
  `ss_url` VARCHAR(255) NULL,
  PRIMARY KEY (`ss_id`),
  INDEX `fk_study_schedules_study_informations1_idx` (`si_id` ASC) VISIBLE,
  INDEX `fk_study_schedules_schedule_types1_idx` (`sct_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_schedules_study_informations1`
    FOREIGN KEY (`si_id`)
    REFERENCES `smile_db`.`study_informations` (`si_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_schedules_schedule_types1`
    FOREIGN KEY (`sct_id`)
    REFERENCES `smile_db`.`schedule_types` (`sct_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_meeting_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_meeting_types` (
  `smt_id` INT NOT NULL AUTO_INCREMENT,
  `smt_name` VARCHAR(255) NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  PRIMARY KEY (`smt_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`study_meetings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`study_meetings` (
  `sm_id` INT NOT NULL AUTO_INCREMENT,
  `sm_name` VARCHAR(255) NOT NULL,
  `sm_is_end` INT NOT NULL,
  `sm_start_time` DATETIME NOT NULL,
  `si_id` INT NOT NULL,
  `smt_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_id` INT NOT NULL,
  `update_id` INT NOT NULL,
  PRIMARY KEY (`sm_id`),
  INDEX `fk_study_meetings_study_informations1_idx` (`si_id` ASC) VISIBLE,
  INDEX `fk_study_meetings_study_meeting_types1_idx` (`smt_id` ASC) VISIBLE,
  INDEX `fk_study_meetings_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_meetings_study_informations1`
    FOREIGN KEY (`si_id`)
    REFERENCES `smile_db`.`study_informations` (`si_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_meetings_study_meeting_types1`
    FOREIGN KEY (`smt_id`)
    REFERENCES `smile_db`.`study_meeting_types` (`smt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_meetings_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `smile_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smile_db`.`chat_messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smile_db`.`chat_messages` (
  `cm_id` BIGINT NOT NULL,
  `cm_content` TEXT NOT NULL,
  `cm_send_time` TIMESTAMP NOT NULL,
  `cm_session` VARCHAR(255) NOT NULL,
  `si_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `update_time` TIMESTAMP NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `update_id` INT NOT NULL,
  `create_id` INT NOT NULL,
  PRIMARY KEY (`cm_id`),
  INDEX `fk_chat_messages_study_informations1_idx` (`si_id` ASC) VISIBLE,
  INDEX `fk_chat_messages_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_chat_messages_study_informations1`
    FOREIGN KEY (`si_id`)
    REFERENCES `smile_db`.`study_informations` (`si_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chat_messages_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `smile_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
