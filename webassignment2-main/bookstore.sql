/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: bookstore
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `thumbnail` varchar(200) DEFAULT NULL,
  `bookId` varchar(100) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES
(1,'Clean Code','Robert C. Martin',25.99,'A Handbook of Agile Software Craftsmanship','https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=',NULL,1),
(2,'The Pragmatic Programmer','Andy Hunt',19.99,'Journey to Mastery','https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=',NULL,3),
(3,'Design Patterns','Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',45.00,'Elements of Reusable Object-Oriented Software','https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=',NULL,2),
(4,'JavaScript: The Good Parts','Douglas Crockford',19.99,'A deep dive into JS best practices.','https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=',NULL,3),
(5,'Political Cinema in Bangladesh','Saiyeed Shahjada Al Kareem',1086.00,'This book is the final outcome of a research project conducted by the author under the Bangladesh Film Archive Fellowship 2019-2020. The research has aimed to investigate the political cinema produced in Bangladesh during the 1970s, to understand how these films worked as the language of protest in the critical socio-political conditions of that time and to study the ways that these films are informed by the aesthetics of Third Cinema. In doing so, this research examines two films produced in two different political periods in post-independence Bangladesh—Abar Tora Manush Ho (1973) directed by Khan Ataur Rahman and Rupali Shoikotey (1979) directed by Alamgir Kabir. Through textual analysis of the films, the research finds that by being slightly indirect in representation, certain politically conscious films of Bangladesh worked as strong languages of protest and voiced important messages against the social and political problems in the existing system. With intense political content and transformation of traditional cinema techniques, the films express a notable harmony with Third Cinema.','http://books.google.com/books/content?id=OCxpEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','',2),
(6,'Hello World Polyglot','Arfath Mohammad',1008.00,'Hello World Polyglot A practical guide explaining How to create a Hello World computer program using Modern and GeneralPurpose Programming Languages, How to .....\' is a comprehensive guide that walks you through creating \'Hello World\' computer programs using numerous programming languages. This book explores a diverse range of programming languages, offering insights into creator name, release date, programming paradigm, language overview, a \'Hello World\' sample program, and a detailed explanation. Whether you\'re new to programming or an experienced developer, this book provides a valuable resource for exploring and understanding the vast world of programming languages.','http://books.google.com/books/content?id=Br9KEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','Br9KEQAAQBAJ',3),
(7,'The Truth About Creating Brands People Love','Donna D. Heckler, Brian D. Till',921.00,'Branding: secrets revealed, best practices explained, pitfalls exposed! • The truth about positioning brands and developing brand meaning • The truth about brands as corporate profit drivers • The truth about advertising, pricing, segmentation, and more Simply the best thinking the truth and nothing but the truth This book reveals the 51 bite-size, easy-to-use techniques for building great brands–and keeping them great. “I recommend this punchy, provocative book that uses vivid case studies to remind us of 51 truths about brands.” DAVID AAKER, Vice-Chairman, Prophet and Author of Building Strong Brands and Spanning Silos','http://books.google.com/books/content?id=6DhNprFiz6UC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','6DhNprFiz6UC',NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Kamal','kamal@gmail.com','kamal123',0),
(2,'Sunil','sunil@gmail.com','sunil123',0),
(3,'John Doe','john@example.com','$2b$10$3TCODS7yAzdDStmwqeUYOuiRWBAZkrYufzCBJQ/pheMXOdUoGihPi',0),
(4,'saman@gmail.com','saman@gmail.com','$2b$10$xSa113AsA93KDXk/n.0eceGYziD016siaHEgWAi3xAH3b3dOsA2dO',0),
(5,'fathima@gmail.com','fathima@gmail.com','$2b$10$Lc8e4OhxKj/9SJzOogRFMOQyLIpBW/rtzjqXMQiaCOYZ07Im/8I6m',0),
(6,'mirosh@gmail.com','mirosh@gmail.com','$2b$10$Xj5NkqUgEKrz.82r8SHgLOT93bKxQWtqjx.aFb.GzLy5SA.yTqcxy',0),
(7,'virantha@gmail.com','virantha@gmail.com','$2b$10$oPOqWsNS75wsB/Kv6Kk3Vu9G8ved79PXmB6nVvpTQJymlk2D/Vxe6',0),
(9,'vira@gmail.com','vira@gmail.com','$2b$10$psvnnG7beKWGRruZmauK6OCtIzsJho1N29N3sYu8Dfx/VCyQSYNvS',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bookstore'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-05-06 20:02:59
