-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dojo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dojo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dojo` DEFAULT CHARACTER SET utf8mb4 ;
USE `dojo` ;

-- -----------------------------------------------------
-- Table `dojo`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dojo`.`login` (
  `idlogin` INT NOT NULL AUTO_INCREMENT,
  `dsuser` VARCHAR(200) NOT NULL,
  `dssenha` VARCHAR(200) NOT NULL,
  `dsemail` VARCHAR(100) NOT NULL,
  `dtultimoacesso` DATETIME NULL,
  `dtcriacao` DATETIME NULL,
  `nrperfil` INT NULL,
  PRIMARY KEY (`idlogin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dojo`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dojo`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nmusuario` VARCHAR(150) NOT NULL,
  `dsemail` VARCHAR(60) NOT NULL,
  `nmrua` VARCHAR(200) NULL,
  `nmcidade` VARCHAR(100) NULL,
  `nmestado` VARCHAR(100) NULL,
  `dscomplemento` VARCHAR(45) NULL,
  `dsnumeroend` VARCHAR(45) NULL,
  `nrcelular` VARCHAR(45) NOT NULL,
  `nrcpf` VARCHAR(45) NULL,
  `idlogin` INT NOT NULL,
  PRIMARY KEY (`idusuario`),
  INDEX `fk_usuario_login_idx` (`idlogin` ASC),
  CONSTRAINT `fk_usuario_login`
    FOREIGN KEY (`idlogin`)
    REFERENCES `dojo`.`login` (`idlogin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
