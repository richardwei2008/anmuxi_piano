SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE IF NOT EXISTS `user_info` (
  `id` int(11) NOT NULL,
  `subscribe` varchar(64) COLLATE utf8_bin NOT NULL,
  `openid` varchar(256) COLLATE utf8_bin NOT NULL,
  `nickname` varchar(128) COLLATE utf8_bin NOT NULL,
  `sex` tinyint(4) NOT NULL,
  `language` varchar(64) COLLATE utf8_bin NOT NULL,
  `city` varchar(128) COLLATE utf8_bin NOT NULL,
  `province` varchar(128) COLLATE utf8_bin NOT NULL,
  `country` varchar(128) COLLATE utf8_bin NOT NULL,
  `headimgurl` varchar(256) COLLATE utf8_bin NOT NULL,
  `subscribe_time` int(11) NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE IF NOT EXISTS `user_score` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `score` double NOT NULL,
  `trial` int(11) NOT NULL,
  `createtime` datetime NOT NULL,
  `updatetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
