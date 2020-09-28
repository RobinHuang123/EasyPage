from django.db import models

# Create your models here.


class User(models.Model):
    """
    CREATE TABLE `django_vue`.`user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `fullname` VARCHAR(500) NOT NULL,
    `email` VARCHAR(500) NOT NULL,
    `employeeid` INT NOT NULL,
    `admin` TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
    UNIQUE INDEX `employeeid_UNIQUE` (`employeeid` ASC) VISIBLE);
    """

    name = models.CharField(unique=True, max_length=255)
    fullname = models.CharField(max_length=500)
    email = models.CharField(max_length=500)
    employeeid = models.IntegerField(unique=True)
    admin = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'user'


