-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: sales_stock_db
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (9,'Mobiles'),(10,'cable'),(11,'handfree'),(13,'speaker'),(14,'smart watch'),(15,'adaptors'),(16,'charger');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `closing`
--

DROP TABLE IF EXISTS `closing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `closing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `telenorLoad` decimal(10,2) NOT NULL,
  `zongLoad` decimal(10,2) NOT NULL,
  `jazzLoad` decimal(10,2) NOT NULL,
  `ufoneLoad` decimal(10,2) NOT NULL,
  `easypaisa` decimal(10,2) NOT NULL,
  `jazzCash` decimal(10,2) NOT NULL,
  `loan` decimal(10,2) NOT NULL,
  `cash` decimal(10,2) NOT NULL,
  `bank` decimal(10,2) NOT NULL,
  `credit` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `closing`
--

LOCK TABLES `closing` WRITE;
/*!40000 ALTER TABLE `closing` DISABLE KEYS */;
INSERT INTO `closing` VALUES (1,'2024-01-16',100.00,200.00,300.00,400.00,500.00,600.00,700.00,800.00,900.00,1000.00,3500.00),(2,'2024-01-16',200.00,300.00,400.00,500.00,600.00,700.00,800.00,900.00,1000.00,1600.00,3800.00),(3,'2024-01-16',1000.00,1500.00,2000.00,2500.00,3000.00,3500.00,4000.00,4500.00,5000.00,5500.00,21500.00),(4,'2024-01-16',1000.00,1500.00,2000.00,2500.00,3000.00,3500.00,4000.00,4500.00,5000.00,15500.00,11500.00),(5,'2024-01-16',100.00,200.00,300.00,400.00,500.00,600.00,700.00,8000.00,16000.00,30000.00,-3200.00),(6,'2024-01-27',100.00,200.00,300.00,400.00,500.00,600.00,700.00,800.00,900.00,3000.00,1500.00);
/*!40000 ALTER TABLE `closing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commissions`
--

DROP TABLE IF EXISTS `commissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `phone` varchar(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `profit` decimal(10,2) NOT NULL,
  `service` varchar(20) NOT NULL,
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discountAmount` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commissions`
--

LOCK TABLES `commissions` WRITE;
/*!40000 ALTER TABLE `commissions` DISABLE KEYS */;
INSERT INTO `commissions` VALUES (1,'2024-01-15','03305000247',8000.00,80.00,'easypaisa',0.00,0.00),(2,'2024-01-14','03305000247',25000.00,250.00,'easypaisa',5.00,12.50),(3,'2024-01-14','03345465851',-4000.00,0.00,'jazzcash',0.00,0.00),(4,'2024-01-15','03325809703',3000.00,30.00,'jazzcash',0.00,0.00),(5,'2024-01-17','03317894561',3000.00,30.00,'easypaisa',0.00,0.00),(6,'2024-01-17','03317896541',-6000.00,0.00,'easypaisa',0.00,0.00),(7,'2024-01-20','03451234567',60000.00,600.00,'easypaisa',0.00,0.00),(8,'2024-01-20','03345465851',80000.00,800.00,'jazzcash',18.00,144.00),(9,'2024-01-20','03332863920',16000.00,160.00,'jazzcash',0.00,0.00),(10,'2024-01-20','03171122334',21000.00,197.40,'easypaisa',6.00,12.60),(11,'2024-01-20','03171122378',21000.00,197.40,'jazzcash',6.00,12.60),(12,'2024-01-20','03121234567',21000.00,197.00,'jazzcash',6.00,12.60),(13,'2024-01-20','03305000247',1600.00,16.00,'jazzcash',0.00,0.00),(14,'2024-01-20','03345465851',1800.00,18.00,'easypaisa',0.00,0.00),(15,'2024-01-21','03332863920',10000.00,100.00,'easypaisa',0.00,0.00),(16,'2024-01-21','03332863920',10000.00,100.00,'easypaisa',0.00,0.00),(17,'2024-01-21','03332863920',10000.00,100.00,'easypaisa',0.00,0.00),(18,'2024-01-21','03315901234',30000.00,285.00,'easypaisa',5.00,15.00),(19,'2024-01-26','03065816928',6000.00,57.00,'easypaisa',5.00,3.00),(20,'2024-01-27','03363361129',16000.00,160.00,'easypaisa',0.00,0.00),(21,'2024-02-07','03301236547',20000.00,200.00,'easypaisa',0.00,0.00);
/*!40000 ALTER TABLE `commissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cnic` varchar(15) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cnic` (`cnic`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Abdul Wahab','house No 85, Street 1, Korang Town, Islamabad','3730320613933','+923305000247'),(2,'alisha','house 53, dha 2, islamabad','3730315428359','03348569463'),(3,'hanan','house No 85, Street 1, Korang Town, Islamabad','3730323006879','03368880020'),(4,'bareera','house 53, dha 2, islamabad','3730323580619','03332863920'),(5,'alisha','house 53, dha 2, islamabad','3730320613934','+923332863920'),(18,'Wahab','house No 85, Street 1, Korang Town, Islamabad','3728259292262','+923345465851'),(19,'abdul ghaffar','tibbi bangla , tehsil sohawa, district jhelum','3730312345679','03345465851'),(20,'talat habiba','tibbi bangla, sohawa, jehlum','3730320613958','+923332863920'),(24,'Abdul wahab','tibbi bangla, sohawa, jehlum','3730320611759','03305000247'),(25,'huma sheraz','cust university','37303123456789','0333scvjsnvcj'),(26,'usman','cust','3730318692751','03331824357'),(27,'nuray','house 85,street1,korang town','3730320813933','03335111247'),(28,'Nadeem','soan garden','3730345612377','03451234567'),(31,'jawad','dha2','3730312345698','03319837590'),(32,'ahsan','house No 85, Street 1, Korang Town, Islamabad','3730312398748','03065816928'),(33,'Danial umer','apartment 3B, block 2, askari tower','3730314648663','03363361129');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giveloan`
--

DROP TABLE IF EXISTS `giveloan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giveloan` (
  `loan_id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `installment` int DEFAULT NULL,
  `monthly_installment` decimal(10,2) DEFAULT NULL,
  `remaining_amount` decimal(10,2) DEFAULT '0.00',
  `total_loan` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`loan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giveloan`
--

LOCK TABLES `giveloan` WRITE;
/*!40000 ALTER TABLE `giveloan` DISABLE KEYS */;
INSERT INTO `giveloan` VALUES (34,'2024-01-12','179245','abdul wahab',6000.00,2,3000.00,0.00,132400.00),(35,'2024-01-12','330222','alisha',5200.00,4,1300.00,0.00,132400.00),(36,'2024-01-12','259589','bareera',3000.00,3,1000.00,0.00,132400.00),(37,'2024-01-12','148295','talat habiba',3000.00,3,1000.00,0.00,132400.00),(38,'2024-01-12','158607','nuray',3000.00,6,500.00,0.00,132400.00),(39,'2024-01-12','199096','barrea',500.00,1,500.00,0.00,132400.00),(40,'2024-01-12','939168','soban',6000.00,5,1200.00,0.00,132400.00),(41,'2024-01-12','196043','hanan',300.00,2,150.00,0.00,132400.00),(42,'2024-01-12','145365','ahsan',400.00,2,200.00,0.00,132400.00),(43,'2024-01-12','220135','usman',8000.00,2,4000.00,0.00,132400.00),(44,'2024-01-14','939471','raja iqbal',4000.00,4,1000.00,0.00,132400.00),(45,'2024-01-16','275663','mohsin',6000.00,2,3000.00,0.00,132400.00),(46,'2024-01-16','107534','danish',2000.00,3,666.67,0.00,132400.00),(47,'2024-01-16','190195','huma',3000.00,1,3000.00,0.00,132400.00),(48,'2024-01-16','767388','ahmad',3200.00,6,533.33,0.00,132400.00),(49,'2024-01-16','125539','usman ali',4000.00,2,2000.00,0.00,132400.00),(50,'2024-01-16','117304','abdul',7000.00,1,7000.00,0.00,132400.00),(51,'2024-01-16','720527','guujar',600.00,1,600.00,0.00,132400.00),(52,'2024-01-16','285722','bareera zarish',9000.00,6,1500.00,0.00,132400.00),(53,'2024-01-16','168894','imran',3000.00,1,3000.00,0.00,132400.00),(54,'2024-01-16','128792','khan',6000.00,1,6000.00,0.00,132400.00),(55,'2024-01-16','142238','sattar',900.00,1,900.00,0.00,132400.00),(56,'2024-01-16','333410','shahazad',1600.00,1,1600.00,0.00,132400.00),(60,'2024-01-17','405843','riza',1600.00,1,1600.00,0.00,132400.00),(61,'2024-01-19','180811','raja tayyab',1600.00,2,800.00,0.00,132400.00),(62,'2024-01-19','282205','usama',600.00,1,600.00,0.00,132400.00),(63,'2024-01-19','320888','hassan',9000.00,12,750.00,0.00,132400.00),(64,'2024-01-19','117207','romana',2000.00,6,333.33,0.00,132400.00),(65,'2024-01-20','321473','Nadeem',3000.00,3,1000.00,0.00,132400.00),(66,'2024-01-20','326141','hanan',20000.00,6,3333.00,0.00,132400.00),(67,'2024-01-20','174604','abdul ghaffar',1100.00,1,1100.00,0.00,132400.00),(68,'2024-01-20','350931','huma sheraz',2800.00,4,700.00,0.00,132400.00),(69,'2024-01-21','259323','jawad',3000.00,4,750.00,0.00,132400.00),(70,'2024-01-24','168059','ahsan',2000.00,3,666.00,0.00,132400.00);
/*!40000 ALTER TABLE `giveloan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'2023-12-19','jsbsjfb','abdul wahab',300.00,0.00,10,3000.00),(2,'2023-12-19','huawei','nadeem',250.00,0.00,10,2500.00),(3,'2023-12-19','jsbsjfb','abdul wahab',300.00,0.00,30,9000.00),(4,'2023-12-19','jsbsjfb','abdul wahab',300.00,0.00,50,15000.00),(5,'2023-12-19','jsbsjfb','abdul wahab',300.00,0.00,50,15000.00),(6,'2023-12-19','huawei','nadeem',250.00,0.00,50,12500.00),(7,'2023-12-19','abcd','nadeem',6200.00,0.00,3,18600.00),(8,'2023-12-19','jsbsjfb','abfj',300.00,0.00,5,1500.00),(9,'2023-12-19','abcd','nadeem',6200.00,0.00,80,496000.00),(10,'2023-12-22','huawei','abdul hanan',250.00,0.00,2,500.00),(11,'2023-12-22','abcd','nadeem',6200.00,0.00,50,310000.00),(12,'2023-12-23','huawei','abdul wahab',250.00,0.00,30,7500.00),(13,'2023-12-23','Iphone 13','abdul wahab',195000.00,0.00,2,390000.00),(14,'2023-12-23','infinix','abdul hanan',200.00,0.00,50,10000.00),(15,'2023-12-25','Iphone 13','nadeem',195000.00,0.00,2,390000.00),(16,'2023-12-31','Redmi Note 8','nadeem',150.00,0.00,3,450.00),(17,'2024-01-23','iphone cabe local','abdul wahab',300.00,0.00,10,3000.00),(18,'2024-01-23','jbl chota speaker','ibrahim khan',1300.00,0.00,2,2600.00),(19,'2024-01-24','iphone cabe local','ibrahim khan',300.00,70.00,20,1400.00),(20,'2024-01-24','ultra watch 8','ibrahim khan',8000.00,2100.00,2,4200.00),(21,'2024-01-27','3.1A erorex charger','abdul wahab',350.00,70.00,5,350.00);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(5) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `cost` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (40,'44444','Infinix Charger Cable','High-quality USB cable for Infinix phones',10.00,'cable',0.00),(41,'55555','Huawei Type-C Cable','Durable Type-C cable for Huawei devices',220.00,'cable',40.00),(43,'77777','iPhone Lightning Cable','Original Apple Lightning cable for iPhones',300.00,'cable',70.00),(44,'88888','Xiaomi USB-C Cable','Xiaomi-branded USB-C cable for various devices',12.00,'cable',0.00),(45,'12345','Redmi Note 8','Budget-friendly smartphone',150.00,'Mobiles',0.00),(46,'67890','Samsung Galaxy S21','Flagship phone with great camera',6200.00,'Mobiles',1700.00),(47,'11111','Infinix Hot 10','Budget-friendly phone with large display',250.00,'cable',0.00),(48,'22222','Huawei P30','Premium smartphone with Leica cameras',300.00,'cable',0.00),(49,'33333','iPhone 13 Pro Max','Flagship iPhone with advanced features',195000.00,'Mobiles',0.00),(50,'19703','audionic','Boss-5, great quality',2000.00,'speakers',0.00),(51,'61249','erorex handfree','High Class Bass, outclass quality with noise cancellation',2000.00,'handfree',0.00),(52,'52908','3.1A erorex charger','3.1 A ultra fast charger good quality and make battery health good ',350.00,'chargers',70.00),(53,'43826','3.1A charger','fast',300.00,'chargers',0.00),(54,'88179','ronin bass','good quality',700.00,'handfree',490.00),(55,'92782','iphone cabe local','local quality',300.00,'cable',70.00),(56,'09207','jbl chota speaker','outclass quality',1300.00,'speakers',600.00),(57,'19883','ultra watch 8','good quality',8000.00,'smart watch',2100.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receiveloan`
--

DROP TABLE IF EXISTS `receiveloan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receiveloan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `loan_type` varchar(50) NOT NULL,
  `installment_amount` decimal(10,2) DEFAULT NULL,
  `total_installment` int DEFAULT NULL,
  `installment_number` int DEFAULT NULL,
  `remaining_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receiveloan`
--

LOCK TABLES `receiveloan` WRITE;
/*!40000 ALTER TABLE `receiveloan` DISABLE KEYS */;
INSERT INTO `receiveloan` VALUES (4,'2024-01-13','158607','nuray',3000.00,'monthly_installment',500.00,6,1,2500.00,'2024-01-13 19:47:30'),(5,'2024-01-13','179245','abdul wahab',6000.00,'monthly_installment',3000.00,2,1,3000.00,'2024-01-13 19:53:24'),(7,'2024-01-13','330222','alisha',5200.00,'full_amount',0.00,0,0,0.00,'2024-01-13 20:11:43'),(8,'2024-01-13','939168','soban',6000.00,'full_amount',0.00,0,0,0.00,'2024-01-13 20:14:23'),(9,'2024-01-16','275663','mohsin',6000.00,'monthly_installment',3000.00,2,1,3000.00,'2024-01-16 11:10:21'),(10,'2024-01-16','107534','danish',2000.00,'monthly_installment',666.67,3,1,1333.34,'2024-01-16 11:19:01'),(11,'2024-01-16','107534','danish',1333.34,'monthly_installment',666.67,3,2,666.67,'2024-01-16 11:21:01'),(12,'2024-01-20','179245','abdul wahab',3000.00,'monthly_installment',3000.00,2,2,0.00,'2024-01-20 08:30:54'),(13,'2024-01-20','321473','Nadeem',3000.00,'monthly_installment',1000.00,3,1,2000.00,'2024-01-20 08:41:02'),(14,'2024-01-20','326141','hanan',20000.00,'monthly_installment',3333.00,6,1,16665.00,'2024-01-20 09:00:30'),(15,'2024-01-20','350931','huma sheraz',2800.00,'monthly_installment',700.00,4,0,2100.00,'2024-01-20 09:15:44'),(16,'2024-01-20','350931','huma sheraz',2100.00,'monthly_installment',700.00,4,2,1400.00,'2024-01-20 15:04:00'),(17,'2024-01-21','259323','jawad',3000.00,'monthly_installment',750.00,4,1,2250.00,'2024-01-21 11:14:19'),(18,'2024-01-27','179245','abdul wahab',3000.00,'monthly_installment',3000.00,2,2,0.00,'2024-01-27 15:14:27');
/*!40000 ALTER TABLE `receiveloan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `profit` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,'2023-12-31','cable','Infinix Hot 10',50,250.00,0.00,0.00,1000.00),(2,'2023-12-31','cable','Samsung Micro USB Cable',15,8.00,0.00,0.00,120.00),(4,'2023-12-31','cable','Infinix Charger Cable',5,10.00,0.00,0.00,50.00),(5,'2023-12-31','Mobiles','Huawei Type-C Cable',2,15.00,0.00,0.00,30.00),(6,'2024-01-01','Mobiles','Huawei P30',2,300.00,0.00,0.00,600.00),(7,'2024-01-02','Mobiles','iPhone 13 Pro Max',5,195000.00,0.00,0.00,975000.00),(8,'2024-01-20','speakers','Infinix Charger Cable',2,10.00,0.00,0.00,20.00),(9,'2024-01-24','speakers','jbl chota speaker',2,1300.00,600.00,0.00,1400.00),(10,'2024-01-24','chargers','3.1A erorex charger',1,350.00,70.00,0.00,280.00),(11,'2024-01-24','handfree','3.1A erorex charger',1,350.00,70.00,0.00,280.00),(12,'2024-01-24','speakers','jbl chota speaker',1,1300.00,600.00,0.00,700.00),(13,'2024-01-24','smart watch','ultra watch 8',1,8000.00,2100.00,0.00,5900.00),(14,'2024-01-26','chargers','ronin bass',2,700.00,490.00,420.00,1400.00),(15,'2024-01-26','smart watch','ultra watch 8',1,8000.00,2100.00,5900.00,8000.00),(16,'2024-01-27','speakers','3.1A erorex charger',2,350.00,70.00,560.00,700.00),(17,'2024-02-06','smart watch','ultra watch 8',1,8000.00,2100.00,5900.00,8000.00),(18,'2024-02-06','charger','3.1A erorex charger',2,350.00,70.00,560.00,700.00);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,1,'GAteJ_g3Uv9cue8vmvjSXv217YEd5psA','2024-01-28 14:17:12'),(2,1,'Bafk8IOWyTlSROJPLRKG3Bke_hAsHBSL','2024-01-28 14:32:17'),(4,19,'_taeQcWy3kZ9NrtBAtfOyNbCCySRbzv1','2024-01-28 14:37:34'),(9,19,'VET-o3JueDatnpZIkBJcJpZo2Rc8Hn9U','2024-01-28 16:43:10'),(11,1,'MaRf9fG4Yzk5EfyhzelrlY02whJYxl-A','2024-01-28 17:47:54'),(12,1,'jf5HPm8YPB0fjFDQuoUrJfN8OgOKpJVD','2024-01-28 17:49:24'),(13,4,'LExmnlAgHLJ3mi3EFZhfizX8ImIu2x7i','2024-01-28 17:52:35'),(14,4,'eNBsbE8aNbMJ1YyxsoZAGkHdc0o5CwCQ','2024-01-28 17:53:43'),(15,4,'vTdwVzyAIcQZGnwEED9QXQOt38I5JLGm','2024-01-28 17:54:58'),(16,1,'dJrMdX9WRU4IXoR3s_QvsV5ocf2e6tN-','2024-01-28 17:56:14'),(17,4,'UWYWYLTc2EroMP9I7mGCi-N5NGsYJ0rI','2024-01-28 18:04:06'),(18,19,'sEW7DqYuYc3aU_VyoqLOR9-GK8e6ZOxY','2024-01-28 18:05:38'),(19,19,'DUUQoHxpeeZ1ELW6IDQuVaia3XaBh5Vg','2024-01-28 18:06:22'),(22,16,'O3M5LwaFByrCIEV7fpncdwdk6XjUJtyO','2024-01-29 00:30:48'),(23,4,'Co7rjJNRxxnuwVjST4F7np79c9W9cmJW','2024-01-31 00:24:40'),(26,4,'FjcxdSQlII9xuynftpRpz9aSWywDlor0','2024-01-31 00:29:18'),(27,19,'vctSyGnR4ZN5YaY-xBdtqviRxSKjwXqh','2024-01-31 00:34:55'),(28,4,'P0_ocrWCEicBqW6Rrw5oovbHb6_BywTK','2024-01-31 00:38:31'),(29,4,'25r4BZ77CflcVEBl0IXRnfOD83GEOCRb','2024-01-31 02:38:32'),(30,4,'Z9FEMhwan127hh-JC934tzRzUfr8Bl0i','2024-01-31 02:41:02'),(31,19,'eG2D0V0QcPtaGADgPO5FoIbnDDwP3dEa','2024-01-31 02:50:01'),(32,19,'NPPOqTe3_4BlK6b2qhTEL1JZx8DDT-hX','2024-01-31 02:50:20'),(33,4,'3N8vdUkYV3byZ-puBFNHzlJ0RUQkbyIU','2024-01-31 02:50:38'),(34,1,'v1fXTD5WwGU9xEHmfk0c6XGh5c7xJVAd','2024-01-31 02:51:26'),(35,4,'tUYfeUISQq0C5oyqUlN_p6MkZopQy_6M','2024-01-31 02:55:36'),(36,4,'lI0jkHELcxTv37o1_0TvW8Rx0kCUDYwl','2024-01-31 02:56:39'),(37,4,'mX13yQ6NXshhxwapotPiQfaJDDX6GJCF','2024-01-31 03:01:15'),(38,4,'XHUtwP6QPJPOomF3Gu14ci9tC0AUJQOq','2024-01-31 03:04:36'),(39,4,'yJ9FDIaLGvYcqTdE4F0d51zUUly80Rn-','2024-01-31 03:09:02'),(40,4,'1LPqhspmVaECe8tcZIeOdQeq0nRYfbte','2024-01-31 03:17:32'),(41,19,'0L405fFjAMCPcESBFXKCfyfhhAOELFKs','2024-01-31 03:19:18'),(42,19,'IxvFwNxl_7IGBNMEV1d0nXVGqhY9yS-v','2024-01-31 03:22:22'),(43,4,'oeXjwI3F5HzKSaEh1nMm4PI6fCAWFcnc','2024-01-31 03:26:52'),(44,4,'Or41egx3g_zEN1R1r2a_kLKZz-Hwx4yI','2024-01-31 14:09:37'),(45,19,'T3FUt2PaYro4hKF8ScP8Y9v4U64et0A0','2024-01-31 14:46:27'),(46,4,'cB9k2AHgOEyC_N1AewNi0DAiO6veEZVH','2024-01-31 14:54:13'),(47,4,'mEE_Mw_6ApBRvQ6MpoMNgPufyhBZXs34','2024-01-31 14:59:41'),(48,19,'gsPc2syLL4frgSXERVM-ruyR3j4JtwFU','2024-01-31 15:10:38'),(49,19,'rXEPi1OjA4ExSCQDgLJMmXwc72MpjJpo','2024-01-31 15:11:49'),(50,1,'X7vs-oHLcafCxUb3elJ4wtENG4aogrdE','2024-01-31 18:32:46'),(51,19,'0jVweJRMVRlJVzZ82uvRdJ_2sqkci5-X','2024-01-31 18:38:46'),(52,1,'ZunL0qbJVqD99fOiY9oimk8CailVVsP5','2024-01-31 18:40:16'),(53,4,'-XzE9j-TbVFemSb9NgsT_aFnt-4iVHw8','2024-01-31 18:49:19'),(54,4,'VcQ9vUXkJp-7h9se94hS_0PC42Mc5LrY','2024-01-31 18:56:55'),(55,19,'zWTn7ugUNVOf75l1-OKC8ao24H4xuWkK','2024-01-31 19:02:48'),(56,19,'CmaGOw1n_CwAGwSGZDT6We2Ef9vIAP99','2024-01-31 19:07:15'),(57,19,'WOKE0RLpPf-yMaZNXHLErMHWoPZpNDOc','2024-01-31 19:09:55'),(58,4,'DmBygb6Ye0LxFatD59j2kokUKEv0Kq6G','2024-02-01 01:09:01'),(59,4,'Wgn9h2JdIlxz_Xom6cwePfTq-wB0zXba','2024-02-01 01:13:13'),(60,1,'dsiMUx4yIebu4w2tRstEXMUgN0zuITRb','2024-02-01 01:15:02'),(61,20,'A05xeCQqn9aVQ19XZMcNvGpcyvcN_GMh','2024-02-03 12:34:07'),(62,19,'61zO4_NCM9GcDuf8lZAdvcwdf0TK9odp','2024-02-05 13:14:54'),(63,19,'eP88HQSiir2Ka49ohb7DvauCJdRAGKid','2024-02-05 13:31:22'),(64,19,'oUxgf8ukttj9VKCsCj3ohJshvO5ZN-Xl','2024-02-05 13:32:55'),(65,19,'04MDBL8_x2SvNmYCtS7PGqsiAJGS2krp','2024-02-06 14:54:18'),(66,19,'aUTgp-FvulY25t24bEuJYdN4m1BMCOPF','2024-02-06 14:57:06'),(67,19,'Y5RwLkJrcwjUITiPhUoei1glIKADrg70','2024-02-06 15:00:47'),(68,19,'7kXxLOV4YrTWV_S10jju5NyfDFrGt9Fg','2024-02-06 19:57:45'),(69,19,'g_sF4tpntKhTolHk5_oi4mPr97SQiiF4','2024-02-06 20:05:44'),(70,19,'m9qaIUeX8GF8QZOE4vHdf-bDPJcj76Xb','2024-02-06 20:10:50'),(71,19,'u0YyLgEbTp9oh2DS0P-BrItkqjHvtQh4','2024-02-07 00:30:33'),(72,19,'R9LpIfWpb5r2PvQHTgTqt6wPSiBgd7ER','2024-02-07 00:38:50'),(73,19,'I22rIwJV-WwFwJXJow4CKwfXdWEpBPL7','2024-02-07 01:49:34'),(74,19,'GhbN5KImyKnkHlG0S9szFhEVWW7fx0Fv','2024-02-07 01:52:27'),(75,22,'Z05U6KXbCLnSKSZNDEZBUGKTL2qm1D7l','2024-02-07 03:24:53'),(76,22,'MlBhkOmYUmcP-JNwg3XaoLEuG8mfBr_H','2024-02-07 03:25:35');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(255) NOT NULL,
  `supplier_address` text NOT NULL,
  `contact_number` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (78,'abdul wahab','house 85','03305000247'),(79,'hanan','tibbi bangla','0330528926'),(80,'nadeem','dhmkhaal','02312154212'),(82,'abdul hanan','shop#5,street#02,alnafay 3.','03368880020'),(83,'ibrahim khan','raja bazaar imperial 3rd floor','03311234567'),(84,'fancy traders','shop 5, pwd main market','03331456789'),(85,'abdul wahab','house 85','03305000247');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `total_sales`
--

DROP TABLE IF EXISTS `total_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total_sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total_sales`
--

LOCK TABLES `total_sales` WRITE;
/*!40000 ALTER TABLE `total_sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `total_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Abdul Wahab','abdulwahab01567@gmail.com','+923305000247','abdulwahab01567@gmail.com','$2b$10$IhZ/pmA6ke27L3wGV37iw.uo9ZSivoGqcr2YrZ8XupAcrpubkmU/C','cf6509a1-93e8-4500-a4ea-7f095664b11c',NULL),(2,'alisha','aleeshaafreen006@gmail.com','+923345465851','aleeshaafreen006@gmail.com','$2b$10$Xu.u0IVI0C6tfK4alHp4IOzt3rlHsGtVbJOWzoO.glPd4p0CiCB1e',NULL,NULL),(3,'abdul hanan','abdulhanan@gmail.com','+923368880020','abdulhanan@gmail.com','$2b$10$eBytD/SKrfGFTPndQdVLW.czq0Y2LSYQBCoavHLoEyuRaXzL/zb3u',NULL,NULL),(4,'bareera','bareera123@gmail.com','+923332863920','bareera123','$2b$10$QU7j.EeK0VJFF8lKXu1zkOSGDV8YIbpdCoCOtVFdWNHqhZ4udCKBG',NULL,NULL),(7,'abdul ghaffar','abdulghaffar@gmail.com','+923345465851','ghaffar01','$2b$10$2jdJsEbZlmI7Kxgqr36FxeiB2x/cIAlwNAbg4sP.j9HcZ8E8kdbA.',NULL,NULL),(8,'alisha afreen','alishaafreen006@gmail.com','+923325809703','alisha1','$2b$10$oDHXPr7NUCvmPs//xsVnSO01uCY3MkUXUcNSnpSQmhPrGOYw9qCly',NULL,NULL),(9,'abdullah','abdullah@gmail.com','+923368889968','abdullah2','$2b$10$pO4vIx2m3Duomlf/Sgw6nOBc3JsO/T6f5VsbzUq1ZnXpkvX4Acsx6',NULL,NULL),(10,'m mohsin','mohisn@gmail.com','cjbcjskclanc','mohsin123','$2b$10$230WKGgYZvDKkq35e43DFuI7L9oUB7Pv1MIHm.tcTJC3AUteLFPcm',NULL,NULL),(11,'babar','babar@gmail.com','03311234567','babar','$2b$10$vlNSgoich9IiR2ykCq6TZO17FtcHRJ/0sa4Ds/Jmt.A6DZ7lesoym',NULL,NULL),(12,'huma sheraz','huma@gmail.com','03311234568','humma','$2b$10$3wgJy.hCpaNTuOok7xuYkeeophQaWLhdxM9hMF1o2yb2Wrf5SYGWW',NULL,NULL),(13,'wahab','abdulwahab@gmail.com','+923305000247','vksbjs','$2b$10$i9Rm9QZShLX6G5vYHVoIrudcvMQecGQQoZyzpjDJo3YuTF6W2JurK',NULL,NULL),(15,'nadeem','nadeem1@gmail.com','03345465951','nadeem123','$2b$10$U72hv1Lgtpa/ySgfnr6p3.kraBuElrNnNoPqMBi..DuHEnHmGPdQm',NULL,NULL),(16,'abdul hanan','honey123@gmail.com','03368880020','honey123','$2b$10$qtyrApKb5FMK3msbDI9K0.ICWiWgiDPva7AzcbdhX2u/fOvFEtvUe',NULL,NULL),(17,'danial','danialumer876@gmail.com','03363361129','danial','$2b$10$UvCxAnKbqrkQELQH3SDnCuiNqG8qKXcE8FOJ3190ww9vDvpnHCyJy',NULL,NULL),(18,'ahsan khaliq','ahsankhaliq88@gmail.com','03065816928','ahsan123','$2b$10$GqXqHmoEmr4eR40u3HWOn.N5UzrbmnRoeCkbjRwCL25649TDDl7Oi',NULL,NULL),(19,'talat habiba','talathabiba123@gmail.com','03368880050','talat12','$2b$10$9cb6BfrVErztziiss2bSheB9p.h25Ui/w2dnI67729fnWzhK7Zkuq',NULL,NULL),(20,'Muhammad Nadeem','muhammadnadeemali286@gmail.com','03405869009','nadeem99','$2b$10$HHhg5//.r4IPSh5wbJY8R.jx1sEFqM.KOwOQWlALRGw/QWC7IKbHC','9d426b2b-0ea0-4af5-9210-1636520d89b7',NULL),(22,'danial umer','anyonepk1@gmail.com','03363361129','danial876','$2b$10$ZVcgrdTZ8z3rSd7aSBOGRe/BjpvEpVq4vb44Ly1VzHB4OQoxGn2sC',NULL,NULL);
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

-- Dump completed on 2024-02-07  2:35:28
