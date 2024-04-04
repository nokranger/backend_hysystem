-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2024 at 01:40 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_code` varchar(7) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bank_account_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employee`
--

-- --------------------------------------------------------

--
-- Table structure for table `holiday`
--

CREATE TABLE `holiday` (
  `TRIP_NO` varchar(15) DEFAULT NULL,
  `TRIP_ALLOWANCE` varchar(20) DEFAULT NULL,
  `TOTAL_ALLOWANCE` varchar(20) DEFAULT NULL,
  `OT_HOURS` varchar(10) DEFAULT NULL,
  `DEPARTURE_POINT` varchar(10) DEFAULT NULL,
  `DEPARTURE_DATETIME` varchar(10) DEFAULT NULL,
  `YARDOUTDATE` varchar(10) DEFAULT NULL,
  `DRIVER1` varchar(10) DEFAULT NULL,
  `NAME` varchar(200) DEFAULT NULL,
  `DRIVER2` varchar(10) DEFAULT NULL,
  `DEALER1` varchar(200) DEFAULT NULL,
  `DEALER2` varchar(20) DEFAULT NULL,
  `DEALER3` varchar(20) DEFAULT NULL,
  `DEALER4` varchar(20) DEFAULT NULL,
  `DEALER5` varchar(20) DEFAULT NULL,
  `UNITS1` varchar(20) DEFAULT NULL,
  `UNITS2` varchar(20) DEFAULT NULL,
  `UNITS3` varchar(20) DEFAULT NULL,
  `UNITS4` varchar(20) DEFAULT NULL,
  `UNITS5` varchar(20) DEFAULT NULL,
  `TAX_FLAG` varchar(2) DEFAULT NULL,
  `payment_status_2` varchar(2) DEFAULT NULL,
  `payment_date_st` varchar(10) DEFAULT NULL,
  `payment_status_3` varchar(2) DEFAULT NULL,
  `payment_date_st_2` varchar(10) DEFAULT NULL,
  `payment_status_ot` varchar(2) DEFAULT NULL,
  `payment_date_st_ot` varchar(10) DEFAULT NULL,
  `create_time` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructor_controller`
--

CREATE TABLE `instructor_controller` (
  `number` varchar(3) DEFAULT NULL,
  `TRIP_NO` varchar(15) DEFAULT NULL,
  `TRIP_ALLOWANCE` varchar(10) DEFAULT NULL,
  `TOTAL_ALLOWANCE` varchar(10) DEFAULT NULL,
  `DEPARTURE_DATETIME` varchar(10) DEFAULT NULL,
  `YARDOUTDATE` varchar(10) DEFAULT NULL,
  `DRIVER1` varchar(10) DEFAULT NULL,
  `NAME` varchar(200) DEFAULT NULL,
  `DRIVER2` varchar(10) DEFAULT NULL,
  `DEALER1` varchar(200) DEFAULT NULL,
  `DEALER2` varchar(20) DEFAULT NULL,
  `DEALER3` varchar(20) DEFAULT NULL,
  `DEALER4` varchar(20) DEFAULT NULL,
  `DEALER5` varchar(20) DEFAULT NULL,
  `UNITS1` varchar(20) DEFAULT NULL,
  `UNITS2` varchar(20) DEFAULT NULL,
  `UNITS3` varchar(20) DEFAULT NULL,
  `UNITS4` varchar(20) DEFAULT NULL,
  `UNITS5` varchar(20) DEFAULT NULL,
  `TAX_FLAG` varchar(2) DEFAULT NULL,
  `payment_status_2` varchar(2) DEFAULT NULL,
  `payment_date_st` varchar(10) DEFAULT NULL,
  `payment_status_3` varchar(2) DEFAULT NULL,
  `payment_date_st_2` varchar(10) DEFAULT NULL,
  `payment_status_ot` varchar(2) DEFAULT NULL,
  `payment_date_st_ot` varchar(10) DEFAULT NULL,
  `create_time` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `instructor_controller`
--
--
-- Table structure for table `tnos_system5`
--

CREATE TABLE `tnos_system5` (
  `Working_date` varchar(10) DEFAULT NULL,
  `job_code` varchar(10) DEFAULT NULL,
  `shift` varchar(6) DEFAULT NULL,
  `trip_no` varchar(2) DEFAULT NULL,
  `ttt_employee_code` varchar(10) DEFAULT NULL,
  `tlep_driver_code` varchar(10) DEFAULT NULL,
  `tlep_driver_name` varchar(200) DEFAULT NULL,
  `company_code` varchar(10) DEFAULT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `trailer_code` varchar(7) DEFAULT NULL,
  `trailer_type_code` varchar(4) DEFAULT NULL,
  `trailer_type` varchar(14) DEFAULT NULL,
  `ttt_payment_status` varchar(10) DEFAULT NULL,
  `calling_sheet_no` varchar(15) DEFAULT NULL,
  `trip_type` varchar(10) DEFAULT NULL,
  `recieve_job_dateandtime` varchar(22) DEFAULT NULL,
  `from_code` varchar(8) DEFAULT NULL,
  `from_name` varchar(20) DEFAULT NULL,
  `yard_out_dateandtime` varchar(22) DEFAULT NULL,
  `to_code` varchar(20) DEFAULT NULL,
  `to_name` varchar(100) DEFAULT NULL,
  `to_in_dateandtime` varchar(22) DEFAULT NULL,
  `reture_code` varchar(20) DEFAULT NULL,
  `return_name` varchar(100) DEFAULT NULL,
  `return_in_dateandtime` varchar(22) DEFAULT NULL,
  `loading_units` varchar(2) DEFAULT NULL,
  `loading_count` varchar(2) DEFAULT NULL,
  `unloading_count` varchar(2) DEFAULT NULL,
  `number_of_driver` varchar(2) DEFAULT NULL,
  `nd2_employee_code` varchar(10) DEFAULT NULL,
  `nd2_tlep_driver_code` varchar(10) DEFAULT NULL,
  `nd2_tlep_driver_name` varchar(200) DEFAULT NULL,
  `mileage` varchar(10) DEFAULT NULL,
  `allowance` varchar(10) DEFAULT NULL,
  `allowance2` varchar(10) DEFAULT NULL,
  `allowance3` varchar(10) DEFAULT NULL,
  `allowance4` varchar(10) DEFAULT NULL,
  `total_allowance` varchar(10) DEFAULT NULL,
  `standard_ot` varchar(10) DEFAULT NULL,
  `over_ot` varchar(10) DEFAULT NULL,
  `total_ot` varchar(10) DEFAULT NULL,
  `payment_status` varchar(4) DEFAULT NULL,
  `ot_payment_date` varchar(12) DEFAULT NULL,
  `allowance_payment_date` varchar(12) DEFAULT NULL,
  `TAX_FLAG` varchar(2) DEFAULT NULL,
  `payment_status_2` varchar(2) DEFAULT NULL,
  `payment_date_st` varchar(10) DEFAULT NULL,
  `payment_status_3` varchar(2) DEFAULT NULL,
  `payment_date_st_2` varchar(10) DEFAULT NULL,
  `payment_status_ot` varchar(2) DEFAULT NULL,
  `payment_date_st_ot` varchar(10) DEFAULT NULL,
  `create_time` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tnos_system5`
--


-- --------------------------------------------------------

--
-- Table structure for table `welfare`
--

CREATE TABLE `welfare` (
  `TRIP_NO` varchar(15) DEFAULT NULL,
  `TRIP_ALLOWANCE` varchar(20) DEFAULT NULL,
  `TOTAL_ALLOWANCE` varchar(20) DEFAULT NULL,
  `OT_HOURS` varchar(10) DEFAULT NULL,
  `DEPARTURE_POINT` varchar(10) DEFAULT NULL,
  `DEPARTURE_DATETIME` varchar(10) DEFAULT NULL,
  `YARDOUTDATE` varchar(10) DEFAULT NULL,
  `DRIVER1` varchar(10) DEFAULT NULL,
  `NAME` varchar(200) DEFAULT NULL,
  `DRIVER2` varchar(10) DEFAULT NULL,
  `DEALER1` varchar(200) DEFAULT NULL,
  `DEALER2` varchar(20) DEFAULT NULL,
  `DEALER3` varchar(20) DEFAULT NULL,
  `DEALER4` varchar(20) DEFAULT NULL,
  `DEALER5` varchar(20) DEFAULT NULL,
  `UNITS1` varchar(20) DEFAULT NULL,
  `UNITS2` varchar(20) DEFAULT NULL,
  `UNITS3` varchar(20) DEFAULT NULL,
  `UNITS4` varchar(20) DEFAULT NULL,
  `UNITS5` varchar(20) DEFAULT NULL,
  `TAX_FLAG` varchar(2) DEFAULT NULL,
  `payment_status_2` varchar(2) DEFAULT NULL,
  `payment_date_st` varchar(10) DEFAULT NULL,
  `payment_status_3` varchar(2) DEFAULT NULL,
  `payment_date_st_2` varchar(10) DEFAULT NULL,
  `payment_status_ot` varchar(2) DEFAULT NULL,
  `payment_date_st_ot` varchar(10) DEFAULT NULL,
  `create_time` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `master_data`
--

CREATE TABLE `master_data` (
  `Working_date` varchar(10) DEFAULT NULL,
  `job_code` varchar(10) DEFAULT NULL,
  `shift` varchar(6) DEFAULT NULL,
  `trip_no` varchar(2) DEFAULT NULL,
  `ttt_employee_code` varchar(10) DEFAULT NULL,
  `tlep_driver_code` varchar(10) DEFAULT NULL,
  `tlep_driver_name` varchar(200) DEFAULT NULL,
  `company_code` varchar(10) DEFAULT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `trailer_code` varchar(7) DEFAULT NULL,
  `trailer_type_code` varchar(4) DEFAULT NULL,
  `trailer_type` varchar(14) DEFAULT NULL,
  `ttt_payment_status` varchar(10) DEFAULT NULL,
  `calling_sheet_no` varchar(15) DEFAULT NULL,
  `trip_type` varchar(10) DEFAULT NULL,
  `recieve_job_dateandtime` varchar(22) DEFAULT NULL,
  `from_code` varchar(8) DEFAULT NULL,
  `from_name` varchar(20) DEFAULT NULL,
  `yard_out_dateandtime` varchar(22) DEFAULT NULL,
  `to_code` varchar(20) DEFAULT NULL,
  `to_name` varchar(100) DEFAULT NULL,
  `to_in_dateandtime` varchar(22) DEFAULT NULL,
  `reture_code` varchar(20) DEFAULT NULL,
  `return_name` varchar(100) DEFAULT NULL,
  `return_in_dateandtime` varchar(22) DEFAULT NULL,
  `loading_units` varchar(2) DEFAULT NULL,
  `loading_count` varchar(2) DEFAULT NULL,
  `unloading_count` varchar(2) DEFAULT NULL,
  `number_of_driver` varchar(2) DEFAULT NULL,
  `nd2_employee_code` varchar(10) DEFAULT NULL,
  `nd2_tlep_driver_code` varchar(10) DEFAULT NULL,
  `nd2_tlep_driver_name` varchar(200) DEFAULT NULL,
  `mileage` varchar(10) DEFAULT NULL,
  `allowance` varchar(10) DEFAULT NULL,
  `allowance2` varchar(10) DEFAULT NULL,
  `allowance3` varchar(10) DEFAULT NULL,
  `allowance4` varchar(10) DEFAULT NULL,
  `total_allowance` varchar(10) DEFAULT NULL,
  `standard_ot` varchar(10) DEFAULT NULL,
  `over_ot` varchar(10) DEFAULT NULL,
  `total_ot` varchar(10) DEFAULT NULL,
  `payment_status` varchar(4) DEFAULT NULL,
  `ot_payment_date` varchar(12) DEFAULT NULL,
  `allowance_payment_date` varchar(12) DEFAULT NULL,
  `TAX_FLAG` varchar(2) DEFAULT NULL,
  `payment_status_2` varchar(2) DEFAULT NULL,
  `payment_date_st` varchar(10) DEFAULT NULL,
  `payment_status_3` varchar(2) DEFAULT NULL,
  `payment_date_st_2` varchar(10) DEFAULT NULL,
  `payment_status_ot` varchar(2) DEFAULT NULL,
  `payment_date_st_ot` varchar(10) DEFAULT NULL,
  `create_time` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
--
-- Dumping data for table `welfare`
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
