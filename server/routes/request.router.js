const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { Pool } = require('@mui/icons-material');

/**
 * GET route template
 */
router.get('/',rejectUnauthenticated, (req, res) => {
 
//   const sqlText = `
   
//  SELECT *
//  FROM "request"
//  WHERE "request_status" = 'APPROVED'
//   ORDER BY "date_time" ASC;
//   `

const sqlText = `
SELECT *
FROM "request"
WHERE "request".request_status = 'APPROVED'
ORDER BY "date_time" ASC; 
`
  pool.query(sqlText)
   .then((result) =>{
    // console.log('all result is:',result.rows)
    res.send(result.rows)
   })
   .catch((error) =>{
    console.log('error fetching items', error)
    res.sendStatus(500)
   })
});

router.get('/unapproved',rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('in fetch unap')
  
  console.log('in fetch Unapproved',req.body);
  const sqlText = `
  SELECT *
  FROM "request"
  WHERE "request_status" != 'APPROVED';
  `;
  pool.query(sqlText)
   .then((result) =>{
    console.log('pending result is:',result.rows)
    res.send(result.rows)
    
   })
   .catch((error) =>{
    console.log('error fetching items', error)
    res.sendStatus(500)
   })
});

router.get('/:id',rejectUnauthenticated, (req, res) => {
  console.log('in get by id', req.params.id)
  // GET route code here
  const sqlText = `
  SELECT*
  FROM "request"
  WHERE "user_id" = $1
  ORDER BY "date_time" ASC;
  `;
  pool.query(sqlText,[req.user.id])
   .then((result) =>{
    // console.log('result is:',result.rows)
    res.send(result.rows)
   })
   .catch((error) =>{
    console.log('error fetching items', error)
    res.sendStatus(500)
   })
});


/**
 * POST route template
 */
 router.post('/',rejectUnauthenticated , (req, res) => {
  // endpoint functionality
  console.log("req.body is:",req.body)
  const sqlText = `
  INSERT INTO "request"
  ("user_id","pickup_location","destination","date_time","car_type")
  VALUES
  ($1,$2,$3,$4,$5);
  `;

  pool.query(sqlText,[req.user.id,req.body.pickUp,req.body.dropOff,req.body.dateTime,req.body.car])

  .then((result) =>{
    // console.log('result.rows is:', result.rows)
    res.sendStatus(201)
  })
  .catch((error) =>{
    console.log('error in /POST', error)
  })
});

router.put('/:id',rejectUnauthenticated, (req,res) =>{
  console.log('req.body is:',req.params.id)
  const sqlText =`
  UPDATE "request"
 SET "request_status"= 'APPROVED'
 WHERE "id" = $1;
  `;
  pool.query(sqlText,[req.params.id])
  .then((result) =>{
    res.sendStatus(201)
  })
  .catch((error) =>{
    console.log('error in /PUT', error)
  })
});

router.put('/deny/:id',rejectUnauthenticated, (req,res) =>{
  console.log('req.body is:',req.params.id)
  const sqlText =`
  UPDATE "request"
 SET "request_status"= 'DENIED'
 WHERE "id" = $1;
  `;
  pool.query(sqlText,[req.params.id])
  .then((result) =>{
    res.sendStatus(201)
  })
  .catch((error) =>{
    console.log('error in /PUT', error)
  })
});


router.delete('/:id',rejectUnauthenticated,(req,res) =>{
  console.log('req.body:',req.params)
  const sqlText = `
  DELETE
  FROM "request"
  WHERE "id" = $1;
  `;

  pool.query(sqlText,[req.params.id])
  .then((result) =>{
    res.sendStatus(200)
  })
  .catch((error) =>{
    console.log('error deleting request',error);
  })
});




module.exports = router;
