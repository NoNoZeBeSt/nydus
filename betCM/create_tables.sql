
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'cm_poules'
-- 
-- ---

DROP TABLE IF EXISTS `cm_poules`;
        
CREATE TABLE `cm_poules` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `date` TIMESTAMP NULL DEFAULT NULL,
  `eq1` VARCHAR(40) NULL DEFAULT NULL,
  `eq2` VARCHAR(40) NULL DEFAULT NULL,
  `site` VARCHAR(40) NULL DEFAULT NULL,
  `groupe` VARCHAR(1) NULL DEFAULT NULL,
  `win` VARCHAR(40) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'cm_phase_finale'
-- 
-- ---

DROP TABLE IF EXISTS `cm_phase_finale`;
        
CREATE TABLE `cm_phase_finale` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `date` TIMESTAMP NULL DEFAULT NULL,
  `eq1` VARCHAR(40) NULL DEFAULT NULL,
  `eq2` VARCHAR(40) NULL DEFAULT NULL,
  `site` VARCHAR(40) NULL DEFAULT NULL,
  `niveau` VARCHAR(50) NULL DEFAULT NULL,
  `win` VARCHAR(40) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
        
CREATE TABLE `users` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `nickname` VARCHAR(60) NULL DEFAULT NULL,
  `password` VARCHAR(60) NULL DEFAULT NULL,
  `points` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'bets'
-- 
-- ---

DROP TABLE IF EXISTS `bets`;
        
CREATE TABLE `bets` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `id_user` INT NULL DEFAULT NULL,
  `id_match` INT NULL DEFAULT NULL,
  `bet` ENUM("1","N","2") NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `bets` ADD FOREIGN KEY (id_user) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `cm_poules` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `cm_phase_finale` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `bets` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `cm_poules` (`id`,`date`,`eq1`,`eq2`,`site`,`groupe`,`win`) VALUES
-- ('','','','','','','');
-- INSERT INTO `cm_phase_finale` (`id`,`date`,`eq1`,`eq2`,`site`,`niveau`,`win`) VALUES
-- ('','','','','','','');
-- INSERT INTO `users` (`id`,`nickname`,`password`,`points`) VALUES
-- ('','','','');
-- INSERT INTO `bets` (`id`,`id_user`,`id_match`,`bet`) VALUES
-- ('','','','');

