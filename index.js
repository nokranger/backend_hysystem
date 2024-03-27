const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const http = require('http');
const fs = require('fs');

const app = express();
// const route = express.Router()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
// const { PDFDocument, rgb } = PDFLib


// Middleware for handling file uploads
app.use(fileUpload());

//import route

app.use((req, res, next) => {
  // const error = new Error("Not found")
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
  next()
})

// bodyparser is deprecate
// app.use(bodyParser.urlencoded({extended : false}))
// app.use(bodyParser.json())
// app.use(express.urlencoded(({ extended: true })))
// app.use(express.json())
// Increase the limit (default is 100kb)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MySQL connection configuration
var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hrsystem'
});

// Connect to MySQL
connection.getConnection(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.get('/product', (req, res) => {
  res.send('<h1>Hello world</h1>')
  console.log('cc product')
})
app.post('/personal', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].empCode, req.body[i].name, req.body[i].bankaccount])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
    if (err) throw err
    console.log("Connected!")
    var sql = 'INSERT INTO employee (emp_code, name, bank_account_number) VALUES ?';
    var value = [req.body.emp_code, req.body.name, req.body.bank_account_number];
    console.log('dataSQL', sql)
    console.log('dataROWs', [rows])
    if (err) throw err
    connection.query(sql, [rows], (err, result, fields) => {
      console.log('sql queryplan')
      console.log('result is :', result)
      console.log('fields is :', result)
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).send('Data inserted successfully');
      }
      con.release()
    })
  })
  console.log('done selected')
})

app.get('/personals', (req, res) => {
  connection.getConnection((err, con) => {
    if (err) throw err
    connection.query("SELECT * FROM employee", (err, result, fields) => {
      if (err) throw err
      console.log('sql queryplan')
      console.log('result is :', result)
      console.log('fields is :', result)
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})

app.post('/holiday', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, new Date((req.body[i].DEPARTURE_DATETIME - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), new Date((req.body[i].YARDOUTDATE - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG, req.body[i].create_time, 0])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
    if (err) throw err
    console.log("Connected!")
    var sql = 'INSERT INTO holiday (TRIP_NO, TRIP_ALLOWANCE, TOTAL_ALLOWANCE, OT_HOURS, DEPARTURE_POINT, DEPARTURE_DATETIME, YARDOUTDATE, DRIVER1, NAME, DRIVER2, DEALER1, DEALER2, DEALER3, DEALER4, DEALER5, UNITS1, UNITS2, UNITS3, UNITS4, UNITS5, TAX_FLAG, create_time, payment_status_3) VALUES ?';
    var value = [req.body.emp_code, req.body.name, req.body.bank_account_number];
    // console.log('dataSQL', sql)
    // console.log('dataROWs', [rows])
    if (err) throw err
    connection.query(sql, [rows], (err, result, fields) => {
      console.log('sql queryplan')
      // console.log('result is :', result)
      // console.log('fields is :', result)
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).send('Data inserted successfully');
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/welfare', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, new Date((req.body[i].DEPARTURE_DATETIME - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), new Date((req.body[i].YARDOUTDATE - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG, req.body[i].create_time, 0])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
    if (err) throw err
    console.log("Connected!")
    var sql = 'INSERT INTO welfare (TRIP_NO, TRIP_ALLOWANCE, TOTAL_ALLOWANCE, OT_HOURS, DEPARTURE_POINT, DEPARTURE_DATETIME, YARDOUTDATE, DRIVER1, NAME, DRIVER2, DEALER1, DEALER2, DEALER3, DEALER4, DEALER5, UNITS1, UNITS2, UNITS3, UNITS4, UNITS5, TAX_FLAG, create_time, payment_status_3) VALUES ?';
    var value = [req.body.emp_code, req.body.name, req.body.bank_account_number];
    // console.log('dataSQL', sql)
    // console.log('dataROWs', [rows])
    if (err) throw err
    connection.query(sql, [rows], (err, result, fields) => {
      console.log('sql queryplan')
      // console.log('result is :', result)
      // console.log('fields is :', result)
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).send('Data inserted successfully');
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/tnos5', (req, res) => {
  console.log('DATA: ', req.body)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].Working_date, req.body[i].job_code, req.body[i].shift, req.body[i].trip_no, req.body[i].ttt_employee_code, req.body[i].tlep_driver_code, req.body[i].tlep_driver_name, req.body[i].company_code, req.body[i].company_name, req.body[i].trailer_code, req.body[i].trailer_type_code, req.body[i].trailer_type, req.body[i].ttt_payment_status, req.body[i].calling_sheet_no, req.body[i].trip_type, new Date((req.body[i].recieve_job_dateandtime - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].from_code, req.body[i].from_name, new Date((req.body[i].yard_out_dateandtime - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].to_code, req.body[i].to_name, new Date((req.body[i].to_in_dateandtime - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].reture_code, req.body[i].return_name, new Date((req.body[i].return_in_dateandtime - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].loading_units, req.body[i].loading_count, req.body[i].unloading_count, req.body[i].number_of_driver, req.body[i].nd2_employee_code, req.body[i].nd2_tlep_driver_code, req.body[i].nd2_tlep_driver_name, req.body[i].mileage, req.body[i].allowance, req.body[i].allowance2, req.body[i].allowance3, req.body[i].allowance4, req.body[i].total_allowance, req.body[i].standard_ot, req.body[i].over_ot, req.body[i].total_ot, req.body[i].payment_status, new Date((req.body[i].ot_payment_date - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), new Date((req.body[i].allowance_payment_date - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), 1, req.body[i].create_time, 0])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
    if (err) throw err
    console.log("Connected!")
    var sql = 'INSERT INTO tnos_system5 (Working_date, job_code, shift, trip_no, ttt_employee_code, tlep_driver_code, tlep_driver_name, company_code, company_name, trailer_code, trailer_type_code, trailer_type, ttt_payment_status, calling_sheet_no, trip_type, recieve_job_dateandtime, from_code, from_name, yard_out_dateandtime, to_code, to_name, to_in_dateandtime, reture_code, return_name, return_in_dateandtime, loading_units, loading_count, unloading_count, number_of_driver, nd2_employee_code, nd2_tlep_driver_code, nd2_tlep_driver_name, mileage, allowance, allowance2, allowance3, allowance4, total_allowance, standard_ot, over_ot, total_ot, payment_status, ot_payment_date, allowance_payment_date, TAX_FLAG, create_time, payment_status_3) VALUES ?;';
    var value = [req.body.emp_code, req.body.name, req.body.bank_account_number];
    // console.log('dataSQL', sql)
    // console.log('dataROWs', [rows])
    if (err) throw err
    connection.query(sql, [rows], (err, result, fields) => {
      console.log('sql queryplan')
      // console.log('result is :', result)
      // console.log('fields is :', result)
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).send('Data inserted successfully');
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/instructor', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].number, req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, new Date((req.body[i].DEPARTURE_DATETIME - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), new Date((req.body[i].YARDOUTDATE) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG, req.body[i].create_time, 0])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
    if (err) throw err
    console.log("Connected!")
    var sql = 'INSERT INTO instructor_controller (number, TRIP_NO, TRIP_ALLOWANCE, TOTAL_ALLOWANCE, DEPARTURE_DATETIME, YARDOUTDATE, DRIVER1, NAME, DEALER1, DEALER2, DEALER3, DEALER4, DEALER5, UNITS1, UNITS2, UNITS3, UNITS4, UNITS5, TAX_FLAG, create_time, payment_status_3) VALUES ?';
    var value = [req.body.emp_code, req.body.name, req.body.bank_account_number];
    // console.log('dataSQL', sql)
    // console.log('dataROWs', [rows])
    if (err) throw err
    connection.query(sql, [rows], (err, result, fields) => {
      console.log('sql queryplan')
      // console.log('result is :', result)
      // console.log('fields is :', result)
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).send('Data inserted successfully');
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/welfares', (req, res) => {
  connection.getConnection((err, con) => {
    if (err) throw err
    connection.query("SELECT * FROM employee", (err, result, fields) => {
      if (err) throw err
      console.log('sql queryplan')
      console.log('result is :', result)
      console.log('fields is :', result)
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/masterdata', (req, res) => {
  console.log('masterdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT Working_date,job_code,shift,trip_no,ttt_employee_code,tlep_driver_code,tlep_driver_name,company_code,company_name,trailer_code,trailer_type_code, trailer_type, ttt_payment_status, calling_sheet_no, trip_type, recieve_job_dateandtime, from_code, from_name, yard_out_dateandtime, to_code, to_name, to_in_dateandtime, reture_code, return_name, return_in_dateandtime, loading_units, loading_count, unloading_count, number_of_driver, nd2_employee_code, nd2_tlep_driver_code, nd2_tlep_driver_name, mileage, allowance, allowance2, allowance3, allowance4, total_allowance, standard_ot, over_ot, total_ot, payment_status, ot_payment_date, allowance_payment_date, TAX_FLAG, payment_status_2, payment_date_st, create_time FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ?"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT Working_date,job_code,shift,trip_no,ttt_employee_code,tlep_driver_code,tlep_driver_name,company_code,company_name,trailer_code,trailer_type_code, trailer_type, ttt_payment_status, calling_sheet_no, trip_type, recieve_job_dateandtime, from_code, from_name, yard_out_dateandtime, to_code, to_name, to_in_dateandtime, reture_code, return_name, return_in_dateandtime, loading_units, loading_count, unloading_count, number_of_driver, nd2_employee_code, nd2_tlep_driver_code, nd2_tlep_driver_name, mileage,  allowance, allowance2, allowance3, allowance4, total_allowance, standard_ot, over_ot, total_ot, payment_status, ot_payment_date, allowance_payment_date, TAX_FLAG FROM tnos_system5;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})

app.post('/welfaregetdata', (req, res) => {
  console.log('welfaregetdata', [req.body.from, req.body.to])
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT TRIP_NO, DRIVER1, NAME, DEPARTURE_DATETIME, YARDOUTDATE, DEALER1, TOTAL_ALLOWANCE, OT_HOURS, UNITS1, TAX_FLAG, payment_status_2, payment_date_st, create_time from welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ?"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT welfare.TRIP_NO, welfare.DRIVER1, welfare.NAME, welfare.DEPARTURE_DATETIME, welfare.YARDOUTDATE, welfare2.DEALER1, welfare.TRIP_ALLOWANCE, welfare.OT_HOURS, welfare2.UNITS1, welfare2.TAX_FLAG from welfare INNER JOIN welfare2 on welfare.TRIP_NO = welfare2.TRIP_NO;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/holidaygetdata', (req, res) => {
  console.log('welfaregetdata', [req.body.from, req.body.to])
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT TRIP_NO, DRIVER1, NAME, DEPARTURE_DATETIME, YARDOUTDATE, DEALER1, TOTAL_ALLOWANCE, OT_HOURS, UNITS1, TAX_FLAG, payment_status_2, payment_date_st, create_time from holiday WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ?"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT welfare.TRIP_NO, welfare.DRIVER1, welfare.NAME, welfare.DEPARTURE_DATETIME, welfare.YARDOUTDATE, welfare2.DEALER1, welfare.TRIP_ALLOWANCE, welfare.OT_HOURS, welfare2.UNITS1, welfare2.TAX_FLAG from welfare INNER JOIN welfare2 on welfare.TRIP_NO = welfare2.TRIP_NO;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})

app.post('/instructorgetdata', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT number, TRIP_NO, DRIVER1, NAME, DEPARTURE_DATETIME, YARDOUTDATE, DEALER1, TOTAL_ALLOWANCE, UNITS1, TAX_FLAG, payment_status_2, payment_date_st, create_time from instructor_controller WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ?"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT instructor_controller.number, instructor_controller.TRIP_NO, instructor_controller.DRIVER1, instructor_controller.NAME, instructor_controller.DEPARTURE_DATETIME, instructor_controller.DEPARTURE_DATETIME2, instructor_controller2.DEALER1, instructor_controller.TRIP_ALLOWANCE, instructor_controller2.UNITS1, instructor_controller2.TAX_FLAG from instructor_controller INNER JOIN instructor_controller2 on instructor_controller.TRIP_NO = instructor_controller2.TRIP_NO;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach7one', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code AND STR_TO_DATE(tnos_system5.Working_date, '%d/%m/%Y') BETWEEN ? AND ? WHERE emp_code = ? GROUP BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to, req.body.emp_code];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code AND STR_TO_DATE(tnos_system5.Working_date, '%d/%m/%Y') BETWEEN ? AND ? GROUP BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach7', (req, res) => {
  console.log('tnosgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance, tnos_system5.payment_status_2 FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND payment_status_2 != 1 GROUP BY tnos_system5.ttt_employee_code ORDER BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code AND STR_TO_DATE(tnos_system5.Working_date, '%d/%m/%Y') BETWEEN ? AND ? GROUP BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach72', (req, res) => {
  console.log('welfaregetdata', [req.body.from, req.body.to])
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(welfare.total_allowance) AS total_allowance, welfare.payment_status_2 FROM welfare INNER JOIN employee on CONCAT( SUBSTRING(REPLACE(welfare.DRIVER1, ' ', ''), 3, 5), SUBSTRING(REPLACE(welfare.DRIVER1, ' ', ''), -1) ) = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 != 1 GROUP BY welfare.DRIVER1 ORDER BY welfare.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,welfare.total_allowance FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code GROUP BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach721', (req, res) => {
  console.log('welfaregetdata', [req.body.from, req.body.to])
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(welfare.total_allowance) AS total_allowance, welfare.payment_status_2 FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 != 1 GROUP BY welfare.DRIVER1 ORDER BY welfare.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,welfare.total_allowance FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code GROUP BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach73', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(instructor_controller.total_allowance) AS total_allowance, instructor_controller.payment_status_2 FROM instructor_controller INNER JOIN employee on instructor_controller.DRIVER1 = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 != 1 GROUP BY instructor_controller.DRIVER1 ORDER BY instructor_controller.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code WHERE DATE(recieve_job_dateandtime) BETWEEN ? AND ? AND tnos_system5.payment_status_2 is NULL GROUP BY tnos_system5.ttt_employee_code ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach731', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(instructor_controller.total_allowance) AS total_allowance, instructor_controller.payment_status_2 FROM instructor_controller INNER JOIN employee on CONCAT( SUBSTRING(REPLACE(instructor_controller.DRIVER1, ' ', ''), 3, 5), SUBSTRING(REPLACE(instructor_controller.DRIVER1, ' ', ''), -1) ) = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 != 1 GROUP BY instructor_controller.DRIVER1 ORDER BY instructor_controller.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code WHERE DATE(recieve_job_dateandtime) BETWEEN ? AND ? AND tnos_system5.payment_status_2 is NULL GROUP BY tnos_system5.ttt_employee_code ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach8', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.to_name, tnos_system5.standard_ot, tnos_system5.ttt_employee_code, tnos_system5.over_ot, tnos_system5.tlep_driver_name FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND payment_status_2 != 1 AND total_ot IS NOT NULL ORDER BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach82', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT DEPARTURE_DATETIME, TRIP_NO, TOTAL_ALLOWANCE, DEALER1, NAME, DRIVER1 FROM `welfare`;"
    // var sql = "SELECT DEPARTURE_DATETIME, TRIP_NO, TOTAL_ALLOWANCE, DEALER1, CONCAT( SUBSTRING(REPLACE(welfare.DRIVER1, ' ', ''), 3, 5), SUBSTRING(REPLACE(welfare.DRIVER1, ' ', ''), -1) ), NAME FROM `welfare`;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
// app.post('/getdataattach821', (req, res) => {
//   console.log('instructorgetdata')
//   connection.getConnection((err, con) => {
//     if (err) throw err
//     var sql = "SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code, tnos_system5.over_ot FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;"
//     var value = [req.body.from, req.body.to];
//     // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
//     if (err) throw err
//     connection.query(sql, value, (err, result, fields) => {
//       if (err) {
//         console.error('Error inserting rows:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         console.log(`Inserted ${result.affectedRows} rows successfully`);
//         res.status(200).json({
//           result: result
//         });
//       }
//       con.release()
//     })
//   })
//   console.log('done selected')
// })
app.post('/getdataattach83', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT DEPARTURE_DATETIME, TRIP_NO, TOTAL_ALLOWANCE, DEALER1, NAME, DRIVER1 FROM `instructor_controller`;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach831', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.standard_ot, tnos_system5.ttt_employee_code, tnos_system5.over_ot FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach9one', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT tnos_system5.ttt_employee_code ,tnos_system5.tlep_driver_name, sum(tnos_system5.total_ot) as total_ot FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND ttt_employee_code = ? AND total_ot != 0 AND total_ot IS NOT NULL GROUP BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to, req.body.emp_code];
    // connection.query("SELECT tnos_system5.ttt_employee_code ,tnos_system5.tlep_driver_name, sum(tnos_system5.total_ot) as total_ot FROM tnos_system5 GROUP BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach9', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT tnos_system5.ttt_employee_code ,tnos_system5.tlep_driver_name, sum(tnos_system5.total_ot) as total_ot FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND payment_status_2 != 1 AND total_ot != 0 AND total_ot IS NOT NULL GROUP BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.ttt_employee_code ,tnos_system5.tlep_driver_name, sum(tnos_system5.total_ot) as total_ot FROM tnos_system5 GROUP BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach92', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT welfare.DRIVER1, welfare.NAME ,sum(welfare.OT_HOURS) as total_ot FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 != 1 AND OT_HOURS != 0 AND OT_HOURS IS NOT NULL GROUP BY welfare.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT welfare.DRIVER1, welfare.NAME ,welfare.OT_HOURS FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach93', (req, res) => {
  // console.log('instructorgetdata')
  // connection.getConnection((err, con) => {
  //   if (err) throw err
  //   var sql = "SELECT instructor_controller.DRIVER1, instructor_controller.NAME FROM instructor_controller WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY instructor_controller.DRIVER1;"
  //   var value = [req.body.from, req.body.to];
  //   // connection.query("SELECT instructor_controller.DRIVER1, instructor_controller.NAME ,instructor_controller.NULL1 FROM instructor_controller WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ?  GROUP BY instructor_controller.DRIVER1;", (err, result, fields) => {
  //   if (err) throw err
  //   connection.query(sql, value, (err, result, fields) => {
  //     if (err) {
  //       console.error('Error inserting rows:', err);
  //       res.status(500).send('Internal Server Error');
  //     } else {
  //       console.log(`Inserted ${result.affectedRows} rows successfully`);
  //       res.status(200).json({
  //         result: result
  //       });
  //     }
  //     con.release()
  //   })
  // })
  // console.log('done selected')
})
app.post('/getdataattach10one', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.to_name, tnos_system5.standard_ot,tnos_system5.over_ot, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND payment_status_2 != 1 ORDER BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to, req.body.emp_code];
    // connection.query("SELECT tnos_system5.calling_sheet_no ,tnos_system5.company_name, tnos_system5.standard_ot,total_allowance, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach10', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.tlep_driver_name, tnos_system5.calling_sheet_no ,tnos_system5.to_name, tnos_system5.standard_ot,tnos_system5.over_ot, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND payment_status_2 != 1 ORDER BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.calling_sheet_no ,tnos_system5.company_name, tnos_system5.standard_ot,total_allowance, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})

app.post('/getdatapayrollot', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT ttt_employee_code as EMP_CODE, sum(total_ot) as OT FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND payment_status_2 != 1 AND total_ot IS NOT NULL AND total_ot != 0 GROUP BY ttt_employee_code;"
    var value = [req.body.from, req.body.to];
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdatapayrollot2', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT DRIVER1 as EMP_CODE, sum(OT_HOURS) as OT FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 != 1 AND OT_HOURS IS NOT NULL AND OT_HOURS != 0 GROUP BY DRIVER1;"
    var value = [req.body.from, req.body.to];
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdatapayrollot3', (req, res) => {
  // console.log('instructorgetdata')
  // connection.getConnection((err, con) => {
  //   if (err) throw err
  //   var sql = "SELECT DRIVER1 as EMP_CODE FROM instructor_controller WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY DRIVER1;"
  //   var value = [req.body.from, req.body.to];
  //   // connection.query("SELECT DRIVER1 as EMP_CODE, sum(OT_HOURS) as OT FROM instructor_controller GROUP BY DRIVER1;", (err, result, fields) => {
  //   if (err) throw err
  //   connection.query(sql, value, (err, result, fields) => {
  //     if (err) {
  //       console.error('Error inserting rows:', err);
  //       res.status(500).send('Internal Server Error');
  //     } else {
  //       console.log(`Inserted ${result.affectedRows} rows successfully`);
  //       res.status(200).json({
  //         result: result
  //       });
  //     }
  //     con.release()
  //   })
  // })
  // console.log('done selected')
})
app.post('/getdatapayrollallowance', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT ttt_employee_code as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND payment_status_2 != 1 AND total_allowance IS NOT NULL AND total_allowance != 0 GROUP BY ttt_employee_code;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT ttt_employee_code as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM tnos_system5 GROUP BY ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdatapayrollallowance2', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT DRIVER1 as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 != 1 AND total_allowance IS NOT NULL AND total_allowance != 0 GROUP BY DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT DRIVER1 as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdatapayrollallowance3', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT DRIVER1 as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM instructor_controller WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 != 1 AND total_allowance IS NOT NULL AND total_allowance != 0 GROUP BY DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT DRIVER1 as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM instructor_controller GROUP BY DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
    // })
  })
  console.log('done selected')
})
app.post('/addpaymentstatusattach7', (req, res) => {
  const rows = []
  let count = 0
  console.log('instructorgetdata', req.body[1].payment_status)
  console.log('instructorgetdata', rows)
  connection.getConnection((err, con) => {
    for (let i = 0; i < req.body.length; i++) {
      // rows.push(`UPDATE tnos_system5 SET payment_status = ${req.body[i].payment_status} WHERE ttt_employee_code = ${req.body[i].emp_code}`)
      // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
      if (err) throw err
      var sql = `UPDATE tnos_system5 SET payment_status_2 = (case when ttt_employee_code = ${req.body[i].emp_code} then '${req.body[i].payment_status}' END), payment_date_st = (case when ttt_employee_code = ${req.body[i].emp_code} then '${req.body[i].payment_date}' END) WHERE ttt_employee_code in (${req.body[i].emp_code});`;
      var value = [req.body.payment_status, req.body.emp_code];
      // connection.query("SELECT DRIVER1 as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM instructor_controller GROUP BY DRIVER1;", (err, result, fields) => {
      if (err) throw err
      connection.query(sql, (err, result, fields) => {
        if (err) {
          console.error('Error inserting rows:', err);
          return res.status(500).send('Internal Server Error');
        } else {
          console.log(`Inserted ${result.affectedRows} rows successfully`);
          // return res.status(200).json({
          //   result: 'success'
          // });
        }
        // con.release()
      })
      count++
    }
    if (count === req.body.length) {
      return res.status(200).json({
        result: 'success'
      });
    }
    con.release()

    // })
  })
  console.log('done selected')
})
app.post('/addpaymentstatus', (req, res) => {
  const rows = []
  let count = 0
  console.log('update', req.body)
  // console.log('instructorgetdata', rows)
  connection.getConnection((err, con) => {
    // for (let i = 0; i < req.body.length; i++) {
    if (err) throw err
    var sql = `UPDATE holiday SET payment_status_2 = '${req.body.payment_status}', payment_date_st = '${req.body.payment_date}' WHERE DEPARTURE_DATETIME BETWEEN '${req.body.from}' AND '${req.body.to}';`;
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        return res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
          return res.status(200).json({
            result: '1'
          });
      }
    })
    con.release()

    // })
  })
  console.log('done selected')
})
app.post('/addpaymentstatus2', (req, res) => {
  const rows = []
  let count = 0
  console.log('update', req.body)
  // console.log('instructorgetdata', rows)
  connection.getConnection((err, con) => {
    // for (let i = 0; i < req.body.length; i++) {
    if (err) throw err
    var sql = `UPDATE welfare SET payment_status_2 = '${req.body.payment_status}', payment_date_st = '${req.body.payment_date}' WHERE DEPARTURE_DATETIME BETWEEN '${req.body.from}' AND '${req.body.to}';`;
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        return res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
          return res.status(200).json({
            result: '1'
          });
      }
    })
    con.release()

    // })
  })
  console.log('done selected')
})
app.post('/addpaymentstatus3', (req, res) => {
  const rows = []
  let count = 0
  console.log('update', req.body)
  // console.log('instructorgetdata', rows)
  connection.getConnection((err, con) => {
    // for (let i = 0; i < req.body.length; i++) {
    if (err) throw err
    var sql = `UPDATE tnos_system5 SET payment_status_2 = '${req.body.payment_status}', payment_date_st = '${req.body.payment_date}' WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN '${req.body.from}' AND '${req.body.to}';`;
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        return res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
          return res.status(200).json({
            result: '1'
          });
      }
    })
    con.release()

    // })
  })
  console.log('done selected')
})
app.post('/addpaymentstatus4', (req, res) => {
  const rows = []
  let count = 0
  console.log('update', req.body)
  // console.log('instructorgetdata', rows)
  connection.getConnection((err, con) => {
    // for (let i = 0; i < req.body.length; i++) {
    if (err) throw err
    var sql = `UPDATE instructor_controller SET payment_status_2 = '${req.body.payment_status}', payment_date_st = '${req.body.payment_date}' WHERE DEPARTURE_DATETIME BETWEEN '${req.body.from}' AND '${req.body.to}';`;
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        return res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
          return res.status(200).json({
            result: '1'
          });
      }
    })
    con.release()

    // })
  })
  console.log('done selected')
})
app.post('/updatepaymentstatus', (req, res) => {
  const rows = []
  let count = 0
  console.log('update', req.body)
  // console.log('instructorgetdata', rows)
  connection.getConnection((err, con) => {
    // for (let i = 0; i < req.body.length; i++) {
    if (err) throw err
    var sql = `UPDATE holiday SET payment_status_3 = '${req.body.payment_status}', payment_date_st_2 = '${req.body.payment_date}' WHERE DEPARTURE_DATETIME BETWEEN '${req.body.from}' AND '${req.body.to}';`;
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        return res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
          return res.status(200).json({
            result: '1'
          });
      }
    })
    con.release()

    // })
  })
  console.log('done selected')
})
app.post('/updatepaymentstatus2', (req, res) => {
  const rows = []
  let count = 0
  console.log('update', req.body)
  // console.log('instructorgetdata', rows)
  connection.getConnection((err, con) => {
    // for (let i = 0; i < req.body.length; i++) {
    if (err) throw err
    var sql = `UPDATE welfare SET payment_status_3 = '${req.body.payment_status}', payment_date_st_2 = '${req.body.payment_date}' WHERE DEPARTURE_DATETIME BETWEEN '${req.body.from}' AND '${req.body.to}';`;
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        return res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
          return res.status(200).json({
            result: '1'
          });
      }
    })
    con.release()

    // })
  })
  console.log('done selected')
})
app.post('/updatepaymentstatus3', (req, res) => {
  const rows = []
  let count = 0
  console.log('update', req.body)
  // console.log('instructorgetdata', rows)
  connection.getConnection((err, con) => {
    // for (let i = 0; i < req.body.length; i++) {
    if (err) throw err
    var sql = `UPDATE tnos_system5 SET payment_status_3 = '${req.body.payment_status}', payment_date_st_2 = '${req.body.payment_date}' WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN '${req.body.from}' AND '${req.body.to}';`;
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        return res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
          return res.status(200).json({
            result: '1'
          });
      }
    })
    con.release()

    // })
  })
  console.log('done selected')
})
app.post('/updatepaymentstatus4', (req, res) => {
  const rows = []
  let count = 0
  console.log('update', req.body)
  // console.log('instructorgetdata', rows)
  connection.getConnection((err, con) => {
    // for (let i = 0; i < req.body.length; i++) {
    if (err) throw err
    var sql = `UPDATE instructor_controller SET payment_status_3 = '${req.body.payment_status}', payment_date_st_2 = '${req.body.payment_date}' WHERE DEPARTURE_DATETIME BETWEEN '${req.body.from}' AND '${req.body.to}';`;
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        return res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
          return res.status(200).json({
            result: '1'
          });
      }
    })
    con.release()

    // })
  })
  console.log('done selected')
})
app.post('/getdataattach7P', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance, tnos_system5.payment_status_2 FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? GROUP BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code AND STR_TO_DATE(tnos_system5.Working_date, '%d/%m/%Y') BETWEEN ? AND ? GROUP BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach721P', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(welfare.total_allowance) AS total_allowance, welfare.payment_status_2 FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY welfare.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(welfare.total_allowance) AS total_allowance FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND welfare.payment_status_2 is NULL GROUP BY welfare.DRIVER1 ORDER BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach72P', (req, res) => {
  console.log('welfaregetdata', [req.body.from, req.body.to])
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(welfare.total_allowance) AS total_allowance FROM welfare INNER JOIN employee on CONCAT( SUBSTRING(REPLACE(welfare.DRIVER1, ' ', ''), 3, 5), SUBSTRING(REPLACE(welfare.DRIVER1, ' ', ''), -1) ) = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND welfare.payment_status_2 is NULL GROUP BY welfare.DRIVER1 ORDER BY welfare.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,welfare.total_allowance FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code GROUP BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach73P', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(instructor_controller.total_allowance) AS total_allowance, instructor_controller.payment_status_2 FROM instructor_controller INNER JOIN employee on instructor_controller.DRIVER1 = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY instructor_controller.DRIVER1;"
    var value = [req.body.from, req.body.to, req.body.payment_status];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,instructor_controller.total_allowance FROM instructor_controller INNER JOIN employee on instructor_controller.DRIVER1 = employee.emp_code AND DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY instructor_controller.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattach8one', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.to_name, tnos_system5.total_ot, tnos_system5.over_ot, tnos_system5.ttt_employee_code, tnos_system5.tlep_driver_name FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND tnos_system5.ttt_employee_code = ? ORDER BY STR_TO_DATE(Working_date, '%d/%m/%Y');"
    var value = [req.body.from, req.body.to, req.body.emp_code];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/getcomparedata1', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT * FROM `welfare`;"
    // var value = [req.body.from, req.body.to, req.body.emp_code];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/getcomparedata2', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT * FROM `tnos_system5`;"
    // var value = [req.body.from, req.body.to, req.body.emp_code];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/getcomparedata3', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT * FROM `instructor_controller`;"
    // var value = [req.body.from, req.body.to, req.body.emp_code];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/getcomparedata4', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT * FROM `holiday`;"
    // var value = [req.body.from, req.body.to, req.body.emp_code];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/deletewelfare', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "DELETE FROM `welfare` WHERE create_time = ?"
    var value = [req.body.create_time];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('delete done');
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/deleteinstructor', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = 'DELETE FROM `instructor_controller` WHERE create_time = ?'
    var value = [req.body.create_time];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('delete done');
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/deletetnos', (req, res) => {
  console.log('instructorgetdata', req.body.create_time)
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = 'DELETE FROM `tnos_system5` WHERE create_time = ?'
    var value = [req.body.create_time];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('delete done');
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/deleteholiday', (req, res) => {
  console.log('instructorgetdata', req.body.create_time)
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = 'DELETE FROM `holiday` WHERE create_time = ?'
    var value = [req.body.create_time];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('delete done');
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/selectdeletetnos', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = 'SELECT DISTINCT max(create_time) as create_time FROM tnos_system5;'
    var value = [req.body.create_time];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/selectdeletewelfare', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = 'SELECT DISTINCT max(create_time) as create_time FROM welfare;'
    var value = [req.body.create_time];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/selectdeleteinstructor', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = 'SELECT DISTINCT max(create_time) as create_time FROM instructor_controller;'
    var value = [req.body.create_time];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/selectdeleteholiday', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = 'SELECT DISTINCT max(create_time) as create_time FROM holiday;'
    var value = [req.body.create_time];
    // connection.query("SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattachholiday', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.emp_code, employee.NAME ,sum(holiday.OT_HOURS) as total_ot FROM holiday INNER JOIN employee on employee.emp_code = holiday.DRIVER1 WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND OT_HOURS != 0 AND OT_HOURS IS NOT NULL GROUP BY holiday.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT welfare.DRIVER1, welfare.NAME ,welfare.OT_HOURS FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattachholiday12', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.emp_code, employee.NAME ,sum(holiday.OT_HOURS) as total_ot FROM holiday INNER JOIN employee on employee.emp_code = CONCAT( SUBSTRING(REPLACE(holiday.DRIVER1, ' ', ''), 3, 5), SUBSTRING(REPLACE(holiday.DRIVER1, ' ', ''), -1) ) WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND OT_HOURS != 0 AND OT_HOURS IS NOT NULL GROUP BY holiday.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.calling_sheet_no ,tnos_system5.company_name, tnos_system5.standard_ot,total_allowance, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattachholiday2', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT holiday.DEPARTURE_DATETIME, holiday.TRIP_NO, holiday.DEALER1, employee.emp_code, employee.NAME ,sum(holiday.OT_HOURS) as total_ot FROM  holiday INNER JOIN employee on employee.emp_code = holiday.DRIVER1 WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND OT_HOURS != 0 AND OT_HOURS IS NOT NULL GROUP BY holiday.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT welfare.DRIVER1, welfare.NAME ,welfare.OT_HOURS FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdataattachholiday22', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT holiday.DEPARTURE_DATETIME, holiday.TRIP_NO, holiday.DEALER1, employee.emp_code, employee.NAME ,sum(holiday.OT_HOURS) as total_ot FROM holiday INNER JOIN employee on employee.emp_code = CONCAT( SUBSTRING(REPLACE(holiday.DRIVER1, ' ', ''), 3, 5), SUBSTRING(REPLACE(holiday.DRIVER1, ' ', ''), -1) ) WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND OT_HOURS != 0 AND OT_HOURS IS NOT NULL GROUP BY holiday.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT welfare.DRIVER1, welfare.NAME ,welfare.OT_HOURS FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/searchtrip1', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT * FROM `tnos_system5`"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.calling_sheet_no ,tnos_system5.company_name, tnos_system5.standard_ot,total_allowance, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/searchtrip2', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT * FROM `welfare`"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.calling_sheet_no ,tnos_system5.company_name, tnos_system5.standard_ot,total_allowance, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/searchtrip3', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT * FROM `instructor_controller`"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.calling_sheet_no ,tnos_system5.company_name, tnos_system5.standard_ot,total_allowance, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/searchtrip4', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT * FROM `holiday`"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT tnos_system5.calling_sheet_no ,tnos_system5.company_name, tnos_system5.standard_ot,total_allowance, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdatapayment', (req, res) => {
  console.log('tnosgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance, tnos_system5.payment_status_2 FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND payment_status_2 = 1 AND payment_status_3 != 1 GROUP BY tnos_system5.ttt_employee_code ORDER BY tnos_system5.ttt_employee_code;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code AND STR_TO_DATE(tnos_system5.Working_date, '%d/%m/%Y') BETWEEN ? AND ? GROUP BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdatapayment2', (req, res) => {
  console.log('welfaregetdata', [req.body.from, req.body.to])
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(welfare.total_allowance) AS total_allowance, welfare.payment_status_2 FROM welfare INNER JOIN employee on CONCAT( SUBSTRING(REPLACE(welfare.DRIVER1, ' ', ''), 3, 5), SUBSTRING(REPLACE(welfare.DRIVER1, ' ', ''), -1) ) = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 = 1 AND payment_status_3 != 1 GROUP BY welfare.DRIVER1 ORDER BY welfare.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,welfare.total_allowance FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code GROUP BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdatapayment21', (req, res) => {
  console.log('welfaregetdata', [req.body.from, req.body.to])
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(welfare.total_allowance) AS total_allowance, welfare.payment_status_2 FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 = 1 AND payment_status_3 != 1 GROUP BY welfare.DRIVER1 ORDER BY welfare.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,welfare.total_allowance FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code GROUP BY welfare.DRIVER1;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdatapayment3', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(instructor_controller.total_allowance) AS total_allowance, instructor_controller.payment_status_2 FROM instructor_controller INNER JOIN employee on instructor_controller.DRIVER1 = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 = 1 AND payment_status_3 != 1 GROUP BY instructor_controller.DRIVER1 ORDER BY instructor_controller.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code WHERE DATE(recieve_job_dateandtime) BETWEEN ? AND ? AND tnos_system5.payment_status_2 is NULL GROUP BY tnos_system5.ttt_employee_code ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.post('/getdatapayment31', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
    if (err) throw err
    var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(instructor_controller.total_allowance) AS total_allowance, instructor_controller.payment_status_2 FROM instructor_controller INNER JOIN employee on CONCAT( SUBSTRING(REPLACE(instructor_controller.DRIVER1, ' ', ''), 3, 5), SUBSTRING(REPLACE(instructor_controller.DRIVER1, ' ', ''), -1) ) = employee.emp_code WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND payment_status_2 = 1 AND payment_status_3 != 1 GROUP BY instructor_controller.DRIVER1 ORDER BY instructor_controller.DRIVER1;"
    var value = [req.body.from, req.body.to];
    // connection.query("SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code WHERE DATE(recieve_job_dateandtime) BETWEEN ? AND ? AND tnos_system5.payment_status_2 is NULL GROUP BY tnos_system5.ttt_employee_code ORDER BY tnos_system5.ttt_employee_code;", (err, result, fields) => {
    if (err) throw err
    connection.query(sql, value, (err, result, fields) => {
      if (err) {
        console.error('Error inserting rows:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Inserted ${result.affectedRows} rows successfully`);
        res.status(200).json({
          result: result
        });
      }
      con.release()
    })
  })
  console.log('done selected')
})
app.get('/pdfget', (req, res) => {
  fs.readFile('./pdf.html', function (err, html) {
    if (err) {
      throw err;
    }
    http.createServer(function (request, response) {
      response.writeHeader(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    }).listen(8000);
  });
})
// API endpoint for handling file upload
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const filePath = __dirname + '/uploads/' + file.name;

  file.mv(filePath, err => {
    if (err) {
      return res.status(500).send(err);
    }

    // Process the Excel file and insert data into MySQL
    processExcel(filePath);

    res.send('File uploaded!');
  });
});

// Function to process Excel file and insert data into MySQL
function processExcel(filePath) {
  // Use a library like 'xlsx' to read the Excel file and extract data
  // Insert the data into MySQL using the 'mysql' library
  // Example:
  // const workbook = xlsx.readFile(filePath);
  // const sheet = workbook.Sheets[workbook.SheetNames[0]];
  // ... process data ...
}

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, (req, res, next) => {
  const host = server.address().address
  const port = server.address().port
  console.log('Server is running on port : ' + PORT)
})