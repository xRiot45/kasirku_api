-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: kasirku
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` varchar(36) NOT NULL,
  `selected_variant` varchar(100) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `productId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9c77aaa5bc26f66159661ffd808` (`productId`),
  CONSTRAINT `FK_9c77aaa5bc26f66159661ffd808` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkouts`
--

DROP TABLE IF EXISTS `checkouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkouts` (
  `id` varchar(36) NOT NULL,
  `total_order_price` int NOT NULL,
  `checkout_date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `payment_amount` int NOT NULL,
  `change_returned` int NOT NULL,
  `order_status` enum('Order Dikonfirmasi','Order Sedang Diproses','Order Selesai','Order Dibatalkan') NOT NULL DEFAULT 'Order Dikonfirmasi',
  `payment_method` enum('Tunai','Kartu Kredit','Transfer Bank') NOT NULL DEFAULT 'Tunai',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `seat_number` varchar(25) NOT NULL,
  `invoice` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkouts`
--

LOCK TABLES `checkouts` WRITE;
/*!40000 ALTER TABLE `checkouts` DISABLE KEYS */;
/*!40000 ALTER TABLE `checkouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `selected_variant` varchar(100) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `total_price` int NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `checkoutId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8624dad595ae567818ad9983b33` (`productId`),
  KEY `FK_45261d2b1f4b99787dce98a690c` (`checkoutId`),
  CONSTRAINT `FK_45261d2b1f4b99787dce98a690c` FOREIGN KEY (`checkoutId`) REFERENCES `checkouts` (`id`),
  CONSTRAINT `FK_8624dad595ae567818ad9983b33` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` varchar(36) NOT NULL,
  `product_category_name` varchar(100) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9440f8bc11714827c62431051a` (`product_category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES ('0be59be8-3ebb-4c24-aceb-2f0a69b32331','Minuman','2024-10-05 05:30:48.172321','2024-10-05 05:30:48.172321'),('461cd66f-20a9-4a1c-bd18-82fcaed2c711','Makanan','2024-10-05 05:30:15.128307','2024-10-05 05:30:15.128307'),('fe409136-80cf-4d0f-aeb3-56374aa99359','Snack','2024-10-13 16:42:37.629846','2024-10-13 16:42:37.629846');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_code` varchar(100) NOT NULL,
  `product_description` text NOT NULL,
  `product_variants` json NOT NULL,
  `product_status` enum('Tersedia','Tidak Tersedia') NOT NULL DEFAULT 'Tersedia',
  `productCategoryId` varchar(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `product_stock` varchar(100) NOT NULL,
  `product_price` varchar(100) NOT NULL,
  `product_photo` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5210b3add61b23c9c2d1bbc187d` (`productCategoryId`),
  CONSTRAINT `FK_5210b3add61b23c9c2d1bbc187d` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('0362e381-4c63-46e3-af7d-a1d126b2411b','Kopi Indonesia','WT7N765W2U','Kopi Indonesia terkenal dengan cita rasa yang kaya, sering disajikan dalam bentuk kopi hitam atau kopi susu.','[{\"variant\": \"Kopi Pahit\"}, {\"variant\": \"Kopi Manis\"}]','Tersedia','0be59be8-3ebb-4c24-aceb-2f0a69b32331','2024-11-15 08:02:13.281452','2024-11-15 08:02:13.281452','100','5000','uploads/1731657733276-664833276-A_small_cup_of_coffee.jpeg'),('1ae20fc2-bd10-4147-95b8-06ab57f1dbcf','Nasi Goreng','VL9XJS9O2Z','Nasi goreng adalah salah satu makanan Indonesia yang paling populer, terbuat dari nasi yang digoreng dengan bumbu seperti kecap manis, bawang merah, bawang putih, dan rempah-rempah lainnya. Biasanya disajikan dengan telur mata sapi, kerupuk, dan lauk tambahan seperti ayam atau udang.','[{\"variant\": \"Sangat Pedas\"}, {\"variant\": \"Pedas Sedang\"}, {\"variant\": \"Tidak Pedas\"}]','Tersedia','461cd66f-20a9-4a1c-bd18-82fcaed2c711','2024-11-15 07:21:36.797653','2024-11-15 07:21:36.797653','100','16000','uploads/1731655296787-906719529-61949959e07d3 (1).jpg'),('2bfc3fdb-b0c8-47b8-967a-1e0eed563862','Nasi Padang','S3EI4PTDME','Nasi Padang adalah hidangan khas Minangkabau yang terdiri dari nasi putih dengan berbagai macam lauk pauk, seperti rendang, ayam pop, sambal ijo, dan gulai.','[{\"variant\": \"Nasi Padang Ayam\"}, {\"variant\": \"Nasi Padang Dendeng\"}]','Tersedia','461cd66f-20a9-4a1c-bd18-82fcaed2c711','2024-11-15 07:58:04.619887','2024-11-15 07:58:04.619887','100','20000','uploads/1731657484615-674896297-nasipadang.jpeg'),('405cdb21-08b1-40ce-988f-66f38714c48a','Es Cendol','YK56NL9BSS','Es cendol adalah minuman manis yang terbuat dari santan, gula merah cair, dan cendol (jelly berbentuk panjang dari tepung beras). ','[{\"variant\": \"Cendol Durian\"}, {\"variant\": \"Cendol Kelapa Muda\"}]','Tersedia','0be59be8-3ebb-4c24-aceb-2f0a69b32331','2024-11-15 07:59:58.209476','2024-11-15 07:59:58.209476','100','10000','uploads/1731657598206-960950991-escendol.jpg'),('5ba51e45-65ba-4efe-b9e3-2de5bf6a3634','Soto','Q7WTO49BKU','Soto adalah sup berkuah yang umumnya terdiri dari daging ayam atau sapi dengan bumbu rempah dan disajikan dengan nasi atau lontong.','[{\"variant\": \"Soto Ayam (soto dengan ayam)\"}, {\"variant\": \"Soto Betawi (dengan santan)\"}, {\"variant\": \"Soto Lamongan (dengan kuah kunir)\"}]','Tersedia','461cd66f-20a9-4a1c-bd18-82fcaed2c711','2024-11-15 07:59:11.496082','2024-11-15 07:59:11.496082','20','10000','uploads/1731657551492-749413724-soto.jpg'),('672c7f8c-9927-49cb-8e97-86131ac8b7d1','Sate','48MPWFY949','Sate adalah potongan daging (biasanya ayam, kambing, atau sapi) yang ditusuk dan dipanggang, disajikan dengan sambal kacang atau bumbu kecap manis. ','[{\"variant\": \"Sate Ayam\"}, {\"variant\": \"Sate Kambing\"}, {\"variant\": \"Sate Madura (dengan bumbu kacang)\"}]','Tersedia','461cd66f-20a9-4a1c-bd18-82fcaed2c711','2024-11-15 07:54:34.883342','2024-11-15 07:54:34.883342','50','15000','uploads/1731657274874-304896745-sate.jpeg'),('7692d582-2adb-4cd9-860e-b222f3c160d0','Rujak','I9JSXFVXAU','Rujak adalah campuran buah-buahan segar yang disiram dengan bumbu sambal kacang yang pedas dan manis.','[{\"variant\": \"Rujak Buah\"}, {\"variant\": \"Rujak Cingur\"}]','Tersedia','fe409136-80cf-4d0f-aeb3-56374aa99359','2024-11-15 08:03:45.633970','2024-11-15 08:03:45.633970','100','10000','uploads/1731657825628-42329707-Rujak_Buah_(Indonesian_Fruit_Salad).jpg'),('7fd75b95-d541-47e7-a7f9-ea3b0abf7c34','Rendang','DU81JYWZDE','Rendang adalah masakan khas Padang yang terbuat dari daging sapi yang dimasak dengan santan dan bumbu rempah seperti kunyit, jahe, lengkuas, dan cabai. Masakan ini dimasak hingga bumbu meresap dan daging menjadi empuk. ','[{\"variant\": \"Rendang Daging Sapi\"}, {\"variant\": \"Rendang Ayam\"}]','Tersedia','461cd66f-20a9-4a1c-bd18-82fcaed2c711','2024-11-15 07:53:36.733736','2024-11-15 07:53:36.733736','120','100000','uploads/1731657216728-926374146-rendang.jpg'),('924018dc-24d4-4884-a546-a0cb17937032','Es Teh Manis','6PH05F1WLM','Es teh manis adalah minuman teh yang diberi gula dan disajikan dingin.','[{\"variant\": \"Es Teh Manis Lemon\"}, {\"variant\": \"Es Teh Manis Jeruk\"}]','Tersedia','0be59be8-3ebb-4c24-aceb-2f0a69b32331','2024-11-15 08:00:47.231003','2024-11-15 08:00:47.231003','100','5000','uploads/1731657647227-72759280-produk_1578041377.jpg'),('bcecf49d-2864-4680-9a29-74b0122c413f','Kerak Telor','7CB1RIQH2F','Kerak telor adalah jajanan khas Betawi yang terbuat dari nasi ketan, telur, dan bumbu rempah yang dimasak hingga mengering di atas wajan.','[{\"variant\": \"Kerak Telor Original\"}, {\"variant\": \"Kerak Telor Daging\"}]','Tersedia','fe409136-80cf-4d0f-aeb3-56374aa99359','2024-11-15 08:05:57.442499','2024-11-15 08:05:57.442499','100','10000','uploads/1731657957437-987412048-Kerak_telor_Betawi.jpg'),('d772de8a-b189-46b4-8dfe-3b476d3b781f','Klepon','WFNAFF5UT6','Klepon adalah bola ketan isi kelapa yang diberi gula merah di dalamnya. Saat digigit, gula merah meleleh keluar.','[{\"variant\": \"Klepon Pisang\"}, {\"variant\": \"Klepon Ketan Hitam\"}, {\"variant\": \"Klepon Gula Merah\"}]','Tersedia','fe409136-80cf-4d0f-aeb3-56374aa99359','2024-11-15 08:04:38.602226','2024-11-15 08:04:38.602226','100','10000','uploads/1731657878599-12644001-klepon.jpeg'),('de672aa1-b82d-4562-9325-6ed0a3afcda6','Gado-Gado','3PKPMEXRRB','Gado-gado adalah salad sayuran yang direbus, seperti kacang panjang, kentang, tauge, dan telur rebus, lalu disiram dengan saus kacang yang kaya rasa.','[{\"variant\": \"Gado-Gado Betawi\"}, {\"variant\": \"Gado-Gado Jawa\"}]','Tersedia','461cd66f-20a9-4a1c-bd18-82fcaed2c711','2024-11-15 07:55:32.223308','2024-11-15 07:55:32.223308','50','20000','uploads/1731657332217-873516197-gado-gado-MAHI.jpg'),('f8234ba4-e824-459e-ad00-7fbbe9eefc8f','Bakso','FGBIQNAG8F','Bakso adalah bola daging yang terbuat dari daging sapi cincang yang dicampur dengan tepung tapioka, biasanya disajikan dengan kuah kaldu.','[{\"variant\": \"Bakso Urat\"}, {\"variant\": \"Bakso Sapi\"}, {\"variant\": \"Bakso Tahu (bakso isi tahu)\"}]','Tersedia','461cd66f-20a9-4a1c-bd18-82fcaed2c711','2024-11-15 07:56:43.124599','2024-11-15 07:56:43.124599','100','16000','uploads/1731657403119-341149824-bakso.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` varchar(36) NOT NULL,
  `reporting_date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `total_order_price` int NOT NULL,
  `checkout_date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `payment_amount` int NOT NULL,
  `change_returned` int NOT NULL,
  `order_status` enum('Order Dikonfirmasi','Order Sedang Diproses','Order Selesai','Order Dibatalkan') NOT NULL DEFAULT 'Order Dikonfirmasi',
  `payment_method` enum('Tunai','Kartu Kredit','Transfer Bank') NOT NULL DEFAULT 'Tunai',
  `seat_number` varchar(25) NOT NULL,
  `invoice` varchar(255) NOT NULL,
  `orders` json NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES ('b1f9de48-4de5-4ba8-ac9d-8c07f40c6bf1','2024-11-15 08:19:23.180265',51000,'2024-11-15 08:15:16.860000',100000,49000,'Order Selesai','Tunai','1A','INV-20241115-UEE4JITM','[{\"id\": \"f09d52e0-d31a-4290-9fbf-466accdb8cdf\", \"quantity\": 1, \"createdAt\": \"2024-11-15T08:09:54.241Z\", \"productId\": {\"id\": \"924018dc-24d4-4884-a546-a0cb17937032\", \"createdAt\": \"2024-11-15T08:00:47.231Z\", \"updatedAt\": \"2024-11-15T08:00:47.231Z\", \"product_code\": \"6PH05F1WLM\", \"product_name\": \"Es Teh Manis\", \"product_photo\": \"uploads/1731657647227-72759280-produk_1578041377.jpg\", \"product_price\": \"5000\", \"product_stock\": \"100\", \"product_status\": \"Tersedia\", \"product_variants\": [{\"variant\": \"Es Teh Manis Lemon\"}, {\"variant\": \"Es Teh Manis Jeruk\"}], \"productCategoryId\": {\"id\": \"0be59be8-3ebb-4c24-aceb-2f0a69b32331\", \"createdAt\": \"2024-10-05T05:30:48.172Z\", \"updatedAt\": \"2024-10-05T05:30:48.172Z\", \"product_category_name\": \"Minuman\"}, \"product_description\": \"Es teh manis adalah minuman teh yang diberi gula dan disajikan dingin.\"}, \"updatedAt\": \"2024-11-15T08:15:16.886Z\", \"total_price\": 5000, \"selected_variant\": \"Es Teh Manis Lemon\"}, {\"id\": \"f023d135-77da-4439-9e8c-44c2c31e239a\", \"quantity\": 2, \"createdAt\": \"2024-11-15T08:09:54.241Z\", \"productId\": {\"id\": \"d772de8a-b189-46b4-8dfe-3b476d3b781f\", \"createdAt\": \"2024-11-15T08:04:38.602Z\", \"updatedAt\": \"2024-11-15T08:04:38.602Z\", \"product_code\": \"WFNAFF5UT6\", \"product_name\": \"Klepon\", \"product_photo\": \"uploads/1731657878599-12644001-klepon.jpeg\", \"product_price\": \"10000\", \"product_stock\": \"100\", \"product_status\": \"Tersedia\", \"product_variants\": [{\"variant\": \"Klepon Pisang\"}, {\"variant\": \"Klepon Ketan Hitam\"}, {\"variant\": \"Klepon Gula Merah\"}], \"productCategoryId\": {\"id\": \"fe409136-80cf-4d0f-aeb3-56374aa99359\", \"createdAt\": \"2024-10-13T16:42:37.629Z\", \"updatedAt\": \"2024-10-13T16:42:37.629Z\", \"product_category_name\": \"Snack\"}, \"product_description\": \"Klepon adalah bola ketan isi kelapa yang diberi gula merah di dalamnya. Saat digigit, gula merah meleleh keluar.\"}, \"updatedAt\": \"2024-11-15T08:15:16.881Z\", \"total_price\": 20000, \"selected_variant\": \"Klepon Ketan Hitam\"}, {\"id\": \"bc422ca3-f2ee-4898-b7eb-2104ab23d205\", \"quantity\": 1, \"createdAt\": \"2024-11-15T08:09:54.239Z\", \"productId\": {\"id\": \"1ae20fc2-bd10-4147-95b8-06ab57f1dbcf\", \"createdAt\": \"2024-11-15T07:21:36.797Z\", \"updatedAt\": \"2024-11-15T07:21:36.797Z\", \"product_code\": \"VL9XJS9O2Z\", \"product_name\": \"Nasi Goreng\", \"product_photo\": \"uploads/1731655296787-906719529-61949959e07d3 (1).jpg\", \"product_price\": \"16000\", \"product_stock\": \"100\", \"product_status\": \"Tersedia\", \"product_variants\": [{\"variant\": \"Sangat Pedas\"}, {\"variant\": \"Pedas Sedang\"}, {\"variant\": \"Tidak Pedas\"}], \"productCategoryId\": {\"id\": \"461cd66f-20a9-4a1c-bd18-82fcaed2c711\", \"createdAt\": \"2024-10-05T05:30:15.128Z\", \"updatedAt\": \"2024-10-05T05:30:15.128Z\", \"product_category_name\": \"Makanan\"}, \"product_description\": \"Nasi goreng adalah salah satu makanan Indonesia yang paling populer, terbuat dari nasi yang digoreng dengan bumbu seperti kecap manis, bawang merah, bawang putih, dan rempah-rempah lainnya. Biasanya disajikan dengan telur mata sapi, kerupuk, dan lauk tambahan seperti ayam atau udang.\"}, \"updatedAt\": \"2024-11-15T08:15:16.874Z\", \"total_price\": 16000, \"selected_variant\": \"Sangat Pedas\"}, {\"id\": \"ad84e2e3-58e9-4dce-9b4d-60f75fc3c7bd\", \"quantity\": 2, \"createdAt\": \"2024-11-15T08:09:54.242Z\", \"productId\": {\"id\": \"0362e381-4c63-46e3-af7d-a1d126b2411b\", \"createdAt\": \"2024-11-15T08:02:13.281Z\", \"updatedAt\": \"2024-11-15T08:02:13.281Z\", \"product_code\": \"WT7N765W2U\", \"product_name\": \"Kopi Indonesia\", \"product_photo\": \"uploads/1731657733276-664833276-A_small_cup_of_coffee.jpeg\", \"product_price\": \"5000\", \"product_stock\": \"100\", \"product_status\": \"Tersedia\", \"product_variants\": [{\"variant\": \"Kopi Pahit\"}, {\"variant\": \"Kopi Manis\"}], \"productCategoryId\": {\"id\": \"0be59be8-3ebb-4c24-aceb-2f0a69b32331\", \"createdAt\": \"2024-10-05T05:30:48.172Z\", \"updatedAt\": \"2024-10-05T05:30:48.172Z\", \"product_category_name\": \"Minuman\"}, \"product_description\": \"Kopi Indonesia terkenal dengan cita rasa yang kaya, sering disajikan dalam bentuk kopi hitam atau kopi susu.\"}, \"updatedAt\": \"2024-11-15T08:15:16.871Z\", \"total_price\": 10000, \"selected_variant\": \"Kopi Pahit\"}]','2024-11-15 08:19:23.180265','2024-11-15 08:19:23.180265'),('e5569c26-c8de-4932-be7a-2521fb3940db','2024-11-15 08:33:56.858118',10000,'2024-11-15 08:33:33.915000',12000,2000,'Order Selesai','Tunai','1B','INV-20241115-3K2OSEN3','[{\"id\": \"d7b28c59-278d-4d79-b9e2-873558e9152c\", \"quantity\": 1, \"createdAt\": \"2024-11-15T08:33:18.463Z\", \"productId\": {\"id\": \"d772de8a-b189-46b4-8dfe-3b476d3b781f\", \"createdAt\": \"2024-11-15T08:04:38.602Z\", \"updatedAt\": \"2024-11-15T08:04:38.602Z\", \"product_code\": \"WFNAFF5UT6\", \"product_name\": \"Klepon\", \"product_photo\": \"uploads/1731657878599-12644001-klepon.jpeg\", \"product_price\": \"10000\", \"product_stock\": \"100\", \"product_status\": \"Tersedia\", \"product_variants\": [{\"variant\": \"Klepon Pisang\"}, {\"variant\": \"Klepon Ketan Hitam\"}, {\"variant\": \"Klepon Gula Merah\"}], \"productCategoryId\": {\"id\": \"fe409136-80cf-4d0f-aeb3-56374aa99359\", \"createdAt\": \"2024-10-13T16:42:37.629Z\", \"updatedAt\": \"2024-10-13T16:42:37.629Z\", \"product_category_name\": \"Snack\"}, \"product_description\": \"Klepon adalah bola ketan isi kelapa yang diberi gula merah di dalamnya. Saat digigit, gula merah meleleh keluar.\"}, \"updatedAt\": \"2024-11-15T08:33:33.919Z\", \"total_price\": 10000, \"selected_variant\": \"Klepon Gula Merah\"}]','2024-11-15 08:33:56.858118','2024-11-15 08:33:56.858118'),('e80ae51a-2a77-414c-b5e6-891173552710','2024-11-18 03:40:02.113548',20000,'2024-11-18 03:28:44.356000',25000,5000,'Order Selesai','Tunai','10','INV-20241118-XCW9EKAV','[{\"id\": \"207be2dd-91e6-4bbd-97a8-2e04dbeb48c5\", \"quantity\": 1, \"createdAt\": \"2024-11-18T03:26:18.756Z\", \"productId\": {\"id\": \"7692d582-2adb-4cd9-860e-b222f3c160d0\", \"createdAt\": \"2024-11-15T08:03:45.633Z\", \"updatedAt\": \"2024-11-15T08:03:45.633Z\", \"product_code\": \"I9JSXFVXAU\", \"product_name\": \"Rujak\", \"product_photo\": \"uploads/1731657825628-42329707-Rujak_Buah_(Indonesian_Fruit_Salad).jpg\", \"product_price\": \"10000\", \"product_stock\": \"100\", \"product_status\": \"Tersedia\", \"product_variants\": [{\"variant\": \"Rujak Buah\"}, {\"variant\": \"Rujak Cingur\"}], \"productCategoryId\": {\"id\": \"fe409136-80cf-4d0f-aeb3-56374aa99359\", \"createdAt\": \"2024-10-13T16:42:37.629Z\", \"updatedAt\": \"2024-10-13T16:42:37.629Z\", \"product_category_name\": \"Snack\"}, \"product_description\": \"Rujak adalah campuran buah-buahan segar yang disiram dengan bumbu sambal kacang yang pedas dan manis.\"}, \"updatedAt\": \"2024-11-18T03:28:44.367Z\", \"total_price\": 10000, \"selected_variant\": \"Rujak Cingur\"}, {\"id\": \"1a9dd70f-011d-414b-905d-12dc282185c3\", \"quantity\": 1, \"createdAt\": \"2024-11-18T03:26:18.758Z\", \"productId\": {\"id\": \"7692d582-2adb-4cd9-860e-b222f3c160d0\", \"createdAt\": \"2024-11-15T08:03:45.633Z\", \"updatedAt\": \"2024-11-15T08:03:45.633Z\", \"product_code\": \"I9JSXFVXAU\", \"product_name\": \"Rujak\", \"product_photo\": \"uploads/1731657825628-42329707-Rujak_Buah_(Indonesian_Fruit_Salad).jpg\", \"product_price\": \"10000\", \"product_stock\": \"100\", \"product_status\": \"Tersedia\", \"product_variants\": [{\"variant\": \"Rujak Buah\"}, {\"variant\": \"Rujak Cingur\"}], \"productCategoryId\": {\"id\": \"fe409136-80cf-4d0f-aeb3-56374aa99359\", \"createdAt\": \"2024-10-13T16:42:37.629Z\", \"updatedAt\": \"2024-10-13T16:42:37.629Z\", \"product_category_name\": \"Snack\"}, \"product_description\": \"Rujak adalah campuran buah-buahan segar yang disiram dengan bumbu sambal kacang yang pedas dan manis.\"}, \"updatedAt\": \"2024-11-18T03:28:44.362Z\", \"total_price\": 10000, \"selected_variant\": \"Rujak Buah\"}]','2024-11-18 03:40:02.113548','2024-11-18 03:40:02.113548');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `role_name` enum('Admin','Kasir','Koki') NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('0e051e69-46b1-4ffa-bc01-c13978123806','Kasir','2024-10-19 03:02:31.531621','2024-10-19 03:02:31.531621'),('e325206f-3809-478d-958e-a1f2479db723','Koki','2024-10-19 02:57:41.364650','2024-10-19 02:57:41.364650'),('fadd17bf-70e0-4e0b-97a1-70330449ae53','Admin','2024-10-02 09:07:06.339875','2024-10-02 09:07:06.339875');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `employee_number` varchar(50) NOT NULL,
  `birthday_date` date DEFAULT NULL,
  `place_of_birth` text,
  `phone_number` varchar(25) DEFAULT NULL,
  `gender` enum('Laki-Laki','Perempuan') DEFAULT NULL,
  `address` text,
  `photo` text,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `roleId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  KEY `FK_368e146b785b574f42ae9e53d5e` (`roleId`),
  CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('01870eb4-2716-4b44-af45-55202a6f9b33','kasir@gmail.com','Ayu Dinda','$2b$12$/0kD8XSWoXj5jN6lxHdXeuKNyJF6.zaKWKGwxkOxDQkKbFuEg8u4S','5RF9P32A','2001-12-04','Pontianak','08225264892','Perempuan','Jl. Akcaya , Gg. Surya Suci , Azwari Kost , Pontianak Selatan , Kota Pontianak, Kalimantan Barat','uploads/1731308134096-573789059-Sandrinna-Michelle-masuk-daftar-wanita-Indonesia-tercantik-di-dunia-2.jpg','2024-10-28 06:27:28.467467','2024-11-15 06:47:41.055796','0e051e69-46b1-4ffa-bc01-c13978123806'),('163327fa-1cf7-4ec1-b084-6ff2d2da6de4','koki@gmail.com','Indah Wahyuni ','$2a$12$t.k6to3FukegP.YJwwB.re.Ck4T32KTFeM85gcuGWlQG5xIx7DeiC','D7FQKIF7','2002-11-05','Pontianak','08123456789','Perempuan','JALAN KOM YOS SUDARSO','uploads/1731653276968-821493271-IMG-20230316-WA0134.jpg','2024-11-03 14:17:00.967224','2024-11-15 06:47:56.975094','e325206f-3809-478d-958e-a1f2479db723'),('21072cc5-ba18-4dd8-ab14-53a5ac300f62','admin@gmail.com','Thomas Alberto','$2b$12$yqwc2jPcZzOXPOUE7Xi1beBILzs.r8uO9g8MSBdh0cA4sgKeQD4u.','ANE91VS0','2004-02-05','Pontianak','081234567879','Laki-Laki','Jl.Kom Yos Sudarso','uploads/1731307029647-327105673-Foto Thomas Alberto.jpeg','2024-10-04 08:23:06.959162','2024-11-15 06:47:24.944522','fadd17bf-70e0-4e0b-97a1-70330449ae53');
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

-- Dump completed on 2024-11-18 11:36:03
