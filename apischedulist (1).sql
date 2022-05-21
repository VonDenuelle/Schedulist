-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2022 at 03:08 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apischedulist`
--

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `day` varchar(255) NOT NULL,
  `time` time NOT NULL,
  `title` text NOT NULL,
  `description` longtext NOT NULL,
  `vibrate` tinyint(1) NOT NULL DEFAULT 0,
  `toggle` tinyint(1) NOT NULL DEFAULT 0,
  `notify_before` varchar(255) NOT NULL DEFAULT '''10''',
  `priority` tinyint(4) NOT NULL DEFAULT 0,
  `ringtone` varchar(255) DEFAULT 'Classic Alarm'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `userid`, `day`, `time`, `title`, `description`, `vibrate`, `toggle`, `notify_before`, `priority`, `ringtone`) VALUES
(143, 5, 'Thu', '19:24:00', 'Hello Task', 'hqklwlv jwo kwlckw', 0, 0, '10', 1, 'Samsung Morning Flower'),
(144, 5, 'Fri', '23:56:00', 'tllr', 'vkkdc', 0, 0, '10', 0, 'Saiki'),
(145, 5, 'Thu', '20:22:00', 'hahw', 'chwhww', 0, 0, '10', 0, 'Samsung Morning Flower'),
(146, 5, 'Fri', '23:49:00', 'hahw', 'chwhww', 0, 0, '10', 1, 'Samsung Morning Flower'),
(150, 5, 'Fri', '05:17:00', 'fyu', 'wgg', 0, 0, '10', 1, 'Classic Alarm'),
(151, 5, 'Fri', '23:58:00', 'ecrvvt', 'crrcvtvt', 0, 0, '10', 1, 'Beat Ringtone'),
(156, 5, 'Sat', '02:15:00', 'xjs', ' ss', 1, 0, '10', 1, 'Classic Alarm'),
(157, 6, 'Sat', '12:59:00', 'fyyf', 'ufuffu', 0, 0, '10', 1, 'Teruhashi'),
(158, 6, 'Sat', '13:05:00', 'vuvj', 'vugu', 0, 0, '10', 1, 'Saiki'),
(159, 6, 'Sat', '13:13:00', 'yu', 'cy', 1, 0, '10', 1, 'Classic Alarm');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` longtext NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `date_created`) VALUES
(1, 'Von Denuelle', 'sample@gmail.com', '$2y$10$eiojYzJoiuvc5S4Ni6Hmze5G5ZmixjAXS8koBpkk7vJ0PNP4u8byS', '2022-04-19 05:31:55'),
(2, 'sample 2', 'sample@g', '$2y$10$NRcHVYN9shp/rpyYwzuJD.6xiPOz.NvueObdA8H/4GG5oF4xUwhWS', '2022-04-21 04:51:31'),
(3, 'fweg', 'wgw@gw', '$2y$10$wtamghXm8ofs9Tu6mPqFPuK0jIRtLXqgvLN4lMQJ9b2ATbKhjb0t6', '2022-04-22 06:24:32'),
(4, 'sample3', 'sample3@g', '$2y$10$vJrIcaaXxpDOcNojdHsE0.92BGeziQ8muQhZqb8dRpJ6AKk18ZxFC', '2022-04-22 06:29:37'),
(5, 'Von Denuelle', '201910550@gordoncollege.edu.ph', '$2y$10$Fl.60bFsQInWjnc2rwCeIedIiZHgnsSUcUy7TOTzblUbFap/NNZne', '2022-05-07 14:02:02'),
(6, 'Mine', 'mine@g.com', '$2y$10$FeLxqXrflCPnpCHD8Mp2He7TPH4AbWJYmcbgtQVFaznhmV6Sx9ykm', '2022-05-21 04:24:53'),
(7, 'Von', 'vontandoc42@gmail.com', '$2y$10$rBcmKxpupK7SDoMStiGyteWJI5OOUpX4g9r2Yzkt/jjsQIvCgH68.', '2022-05-21 11:32:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
