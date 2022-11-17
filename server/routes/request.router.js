const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `
  SELECT * 
  FROM "request";
  `;
  pool.query(sqlText)
   .then((result) =>{
    console.log('result is:',result.rows)
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
router.post('/',rejectUnauthenticated,(req, res) => {
  // POST route code here

});



module.exports = router;
