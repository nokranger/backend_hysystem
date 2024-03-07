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

app.use((req, res, next) =>{
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
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'hrsystem'
});

// Connect to MySQL
connection.getConnection(function(err) {
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
    rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, new Date((req.body[i].DEPARTURE_DATETIME - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), new Date((req.body[i].YARDOUTDATE - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, , req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO holiday (TRIP_NO, TRIP_ALLOWANCE, TOTAL_ALLOWANCE, OT_HOURS, DEPARTURE_POINT, DEPARTURE_DATETIME, YARDOUTDATE, DRIVER1, NAME, DRIVER2, NULLS, , DEALER1, DEALER2, DEALER3, DEALER4, DEALER5, UNITS1, UNITS2, UNITS3, UNITS4, UNITS5, TAX_FLAG) VALUES ?';
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
    rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, new Date((req.body[i].DEPARTURE_DATETIME - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), new Date((req.body[i].YARDOUTDATE - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO welfare (TRIP_NO, TRIP_ALLOWANCE, TOTAL_ALLOWANCE, OT_HOURS, DEPARTURE_POINT, DEPARTURE_DATETIME, YARDOUTDATE, DRIVER1, NAME, DRIVER2, NULLS) VALUES ?';
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

app.post('/welfare2', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].TRIP_NO, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO welfare2 (TRIP_NO, DEALER1, DEALER2, DEALER3, DEALER4, DEALER5, UNITS1, UNITS2, UNITS3, UNITS4, UNITS5, TAX_FLAG) VALUES ?';
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

app.post('/tnos', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].Working_date, req.body[i].job_code, req.body[i].shift, req.body[i].trip_no, req.body[i].ttt_employee_code, req.body[i].tlep_driver_code, req.body[i].tlep_driver_name, req.body[i].company_code, req.body[i].trailer_code, req.body[i].trailer_type_code, req.body[i].calling_sheet_no])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO tnos_system (Working_date, job_code, shift, trip_no, ttt_employee_code, tlep_driver_code, tlep_driver_name, company_code, trailer_code, trailer_type_code, calling_sheet_no) VALUES ?';
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
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].Working_date, req.body[i].job_code, req.body[i].shift, req.body[i].trip_no, req.body[i].ttt_employee_code, req.body[i].tlep_driver_code, req.body[i].tlep_driver_name, req.body[i].company_code, req.body[i].company_name, req.body[i].trailer_code, req.body[i].trailer_type_code, req.body[i].trailer_type, req.body[i].ttt_payment_status, req.body[i].calling_sheet_no, req.body[i].trip_type, req.body[i].recieve_job_dateandtime, req.body[i].from_code, req.body[i].from_name, req.body[i].yard_out_dateandtime, req.body[i].to_code, req.body[i].to_name, req.body[i].to_in_dateandtime, req.body[i].reture_code, req.body[i].return_name, req.body[i].return_in_dateandtime, req.body[i].loading_units, req.body[i].loading_count, req.body[i].unloading_count, req.body[i].number_of_driver, req.body[i].nd2_employee_code, req.body[i].nd2_tlep_driver_code, req.body[i].nd2_tlep_driver_name, req.body[i].mileage, req.body[i].allowance, req.body[i].allowance2, req.body[i].allowance3, req.body[i].allowance4, req.body[i].total_allowance, req.body[i].standard_ot, req.body[i].over_ot, req.body[i].total_ot, req.body[i].payment_status, req.body[i].ot_payment_date, req.body[i].allowance_payment_date, 1])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO tnos_system5 (Working_date, job_code, shift, trip_no, ttt_employee_code, tlep_driver_code, tlep_driver_name, company_code, company_name, trailer_code, trailer_type_code, trailer_type, ttt_payment_status, calling_sheet_no, trip_type, recieve_job_dateandtime, from_code, from_name, yard_out_dateandtime, to_code, to_name, to_in_dateandtime, reture_code, return_name, return_in_dateandtime, loading_units, loading_count, unloading_count, number_of_driver, nd2_employee_code, nd2_tlep_driver_code, nd2_tlep_driver_name, mileage, allowance, allowance2, allowance3, allowance4, total_allowance, standard_ot, over_ot, total_ot, payment_status, ot_payment_date, allowance_payment_date, TAX_FLAG) VALUES ?';
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
app.post('/tnos2', (req, res) => {
  // console.log('DATA: ', req.body)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].trailer_type, req.body[i].ttt_payment_status, req.body[i].calling_sheet_no, req.body[i].trip_type, req.body[i].recieve_job_dateandtime, req.body[i].from_code, req.body[i].from_name, req.body[i].yard_out_dateandtime, req.body[i].to_code, req.body[i].to_name, req.body[i].to_in_dateandtime, req.body[i].reture_code])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO tnos_system2 (trailer_type, ttt_payment_status, calling_sheet_no, trip_type, recieve_job_dateandtime, from_code, from_name, yard_out_dateandtime, to_code, to_name, to_in_dateandtime, reture_code) VALUES ?';
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
app.post('/tnos3', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].calling_sheet_no, req.body[i].return_name, req.body[i].return_in_dateandtime, req.body[i].loading_units, req.body[i].loading_count, req.body[i].unloading_count, req.body[i].number_of_driver, req.body[i].nd2_employee_code, req.body[i].nd2_tlep_driver_code, req.body[i].nd2_tlep_driver_name, req.body[i].mileage])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO tnos_system3 (calling_sheet_no, return_name, return_in_dateandtime, loading_units, loading_count, unloading_count, number_of_driver, nd2_employee_code, nd2_tlep_driver_code, nd2_tlep_driver_name, mileage) VALUES ?';
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
app.post('/tnos4', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].calling_sheet_no, req.body[i].allowance, req.body[i].allowance2, req.body[i].allowance3, req.body[i].allowance4, req.body[i].total_allowance, req.body[i].standard_ot, req.body[i].over_ot, req.body[i].total_ot, req.body[i].payment_status, req.body[i].ot_payment_date, req.body[i].allowance_payment_date])
    // rows.push([req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].OT_HOURS, req.body[i].DEPARTURE_POINT, req.body[i].DEPARTURE_DATETIME, req.body[i].YARDOUTDATE, req.body[i].DRIVER1, req.body[i].NAME, req.body[i].DRIVER2, req.body[i].NULLS, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO tnos_system4 (calling_sheet_no, allowance, allowance2, allowance3, allowance4, total_allowance, standard_ot, over_ot, total_ot, payment_status, ot_payment_date, allowance_payment_date) VALUES ?';
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
    rows.push([req.body[i].number, req.body[i].TRIP_NO, req.body[i].TRIP_ALLOWANCE, req.body[i].TOTAL_ALLOWANCE, req.body[i].NULL1, req.body[i].NULL2, new Date((req.body[i].DEPARTURE_DATETIME - 1) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), new Date((req.body[i].DEPARTURE_DATETIME2) * 24 * 60 * 60 * 1000 + new Date(1900, 0, 0).getTime()), req.body[i].DRIVER1, req.body[i].NAME, req.body[i].NULL3, req.body[i].NULL4])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO instructor_controller (number, TRIP_NO, TRIP_ALLOWANCE, TOTAL_ALLOWANCE, NULL1, NULL2, DEPARTURE_DATETIME, DEPARTURE_DATETIME2, DRIVER1, NAME, NULL3, NULL4) VALUES ?';
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

app.post('/instructor2', (req, res) => {
  // console.log('DATA: ', req.body[1].empCode)
  const rows = []
  for (let i = 0; i < req.body.length; i++) {
    rows.push([req.body[i].TRIP_NO, req.body[i].DEALER1, req.body[i].DEALER2, req.body[i].DEALER3, req.body[i].DEALER4, req.body[i].DEALER5, req.body[i].UNITS1, req.body[i].UNITS2, req.body[i].UNITS3, req.body[i].UNITS4, req.body[i].UNITS5, req.body[i].TAX_FLAG])
    // rows.push([`emp_code${i}`, `name${i}`, `bank_account_number${i}`])
  }
  // console.log('data', rows)
  // console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = 'INSERT INTO instructor_controller2 (TRIP_NO, DEALER1, DEALER2, DEALER3, DEALER4, DEALER5, UNITS1, UNITS2, UNITS3, UNITS4, UNITS5, TAX_FLAG) VALUES ?';
      // var value = [req.body.emp_code, req.body.name, req.body.bank_account_number];
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
  connection.getConnection((err, con) => {
      if (err) throw err
      var sql = "SELECT Working_date,job_code,shift,trip_no,ttt_employee_code,tlep_driver_code,tlep_driver_name,company_code,company_name,trailer_code,trailer_type_code, trailer_type, ttt_payment_status, calling_sheet_no, trip_type, recieve_job_dateandtime, from_code, from_name, yard_out_dateandtime, to_code, to_name, to_in_dateandtime, reture_code, return_name, return_in_dateandtime, loading_units, loading_count, unloading_count, number_of_driver, nd2_employee_code, nd2_tlep_driver_code, nd2_tlep_driver_name, mileage,  allowance, allowance2, allowance3, allowance4, total_allowance, standard_ot, over_ot, total_ot, payment_status, ot_payment_date, allowance_payment_date, TAX_FLAG FROM tnos_system5  WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? GROUP BY ttt_employee_code;"
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
  console.log('welfaregetdata')
  connection.getConnection((err, con) => {
      if (err) throw err
      var sql = "SELECT welfare.TRIP_NO, welfare.DRIVER1, welfare.NAME, welfare.DEPARTURE_DATETIME, welfare.YARDOUTDATE, welfare2.DEALER1, welfare.TRIP_ALLOWANCE, welfare.OT_HOURS, welfare2.UNITS1, welfare2.TAX_FLAG from welfare INNER JOIN welfare2 on welfare.TRIP_NO = welfare2.TRIP_NO WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY DRIVER1;"
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
      var sql = "SELECT instructor_controller.number, instructor_controller.TRIP_NO, instructor_controller.DRIVER1, instructor_controller.NAME, instructor_controller.DEPARTURE_DATETIME, instructor_controller.DEPARTURE_DATETIME2, instructor_controller2.DEALER1, instructor_controller.TRIP_ALLOWANCE, instructor_controller2.UNITS1, instructor_controller2.TAX_FLAG from instructor_controller INNER JOIN instructor_controller2 on instructor_controller.TRIP_NO = instructor_controller2.TRIP_NO WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY DRIVER1;"
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
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
      if (err) throw err
      var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,sum(tnos_system5.total_allowance) AS total_allowance FROM tnos_system5 INNER JOIN employee on tnos_system5.ttt_employee_code = employee.emp_code AND STR_TO_DATE(tnos_system5.Working_date, '%d/%m/%Y') BETWEEN ? AND ? GROUP BY tnos_system5.ttt_employee_code;"
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
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
      if (err) throw err
      var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,welfare.total_allowance FROM welfare INNER JOIN employee on welfare.DRIVER1 = employee.emp_code AND DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY welfare.DRIVER1;"
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
      var sql = "SELECT employee.bank_account_number, employee.emp_code, employee.name ,instructor_controller.total_allowance FROM instructor_controller INNER JOIN employee on instructor_controller.DRIVER1 = employee.emp_code AND DATE(DEPARTURE_DATETIME) BETWEEN ? AND ?  GROUP BY instructor_controller.DRIVER1;"
      var value = [req.body.from, req.body.to];
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
app.post('/getdataattach8', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
      if (err) throw err
      var sql = "SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.total_allowance, tnos_system5.company_name, tnos_system5.total_ot, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY STR_TO_DATE(Working_date, '%d/%m/%Y');"
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
      var sql = "SELECT tnos_system5.ttt_employee_code ,tnos_system5.tlep_driver_name, sum(tnos_system5.total_ot) as total_ot FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND ttt_employee_code = ? GROUP BY tnos_system5.ttt_employee_code;"
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
      var sql = "SELECT tnos_system5.ttt_employee_code ,tnos_system5.tlep_driver_name, sum(tnos_system5.total_ot) as total_ot FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? GROUP BY tnos_system5.ttt_employee_code;"
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
      var sql = "SELECT welfare.DRIVER1, welfare.NAME ,welfare.OT_HOURS FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? GROUP BY welfare.DRIVER1;"
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
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
      if (err) throw err
      var sql = "SELECT instructor_controller.DRIVER1, instructor_controller.NAME ,instructor_controller.NULL1 FROM instructor_controller WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ?  GROUP BY instructor_controller.DRIVER1;"
      var value = [req.body.from, req.body.to];
      // connection.query("SELECT instructor_controller.DRIVER1, instructor_controller.NAME ,instructor_controller.NULL1 FROM instructor_controller WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ?  GROUP BY instructor_controller.DRIVER1;", (err, result, fields) => {
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
app.post('/getdataattach10one', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
      if (err) throw err
      var sql = "SELECT tnos_system5.recieve_job_dateandtime, tnos_system5.calling_sheet_no ,tnos_system5.to_name, tnos_system5.standard_ot, tnos_system5.over_ot, tnos_system5.total_ot, tnos_system5.ttt_employee_code, tnos_system5.tlep_driver_name FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND tnos_system5.ttt_employee_code = ? ORDER BY tnos_system5.ttt_employee_code;"
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
      var sql = "SELECT tnos_system5.calling_sheet_no ,tnos_system5.company_name, tnos_system5.standard_ot,total_allowance, tnos_system5.ttt_employee_code FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? ORDER BY tnos_system5.ttt_employee_code;"
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
      var sql = "SELECT ttt_employee_code as EMP_CODE, sum(total_ot) as OT FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND total_ot IS NOT NULL AND total_ot != 0 GROUP BY ttt_employee_code;"
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
      var sql = "SELECT DRIVER1 as EMP_CODE, sum(OT_HOURS) as OT FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND OT_HOURS IS NOT NULL AND OT_HOURS != 0 GROUP BY DRIVER1;"
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
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
      if (err) throw err
      var sql = "SELECT DRIVER1 as EMP_CODE, sum(NULL1) as OT FROM instructor_controller WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND NULL1 IS NOT NULL AND NULL1 != 0 GROUP BY DRIVER1;"
      var value = [req.body.from, req.body.to];
      // connection.query("SELECT DRIVER1 as EMP_CODE, sum(OT_HOURS) as OT FROM instructor_controller GROUP BY DRIVER1;", (err, result, fields) => {
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
app.post('/getdatapayrollallowance', (req, res) => {
  console.log('instructorgetdata')
  connection.getConnection((err, con) => {
      if (err) throw err
      var sql = "SELECT ttt_employee_code as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM tnos_system5 WHERE STR_TO_DATE(Working_date, '%d/%m/%Y') BETWEEN ? AND ? AND total_allowance IS NOT NULL AND total_allowance != 0 GROUP BY ttt_employee_code;"
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
      var sql = "SELECT DRIVER1 as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM welfare WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND total_allowance IS NOT NULL AND total_allowance != 0 GROUP BY DRIVER1;"
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
      var sql = "SELECT DRIVER1 as EMP_CODE, sum(total_allowance) as ALLOWANCE FROM instructor_controller WHERE DATE(DEPARTURE_DATETIME) BETWEEN ? AND ? AND total_allowance IS NOT NULL AND total_allowance != 0 GROUP BY DRIVER1;"
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
app.get('/pdfget', (req, res) => {
  fs.readFile('./pdf.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
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