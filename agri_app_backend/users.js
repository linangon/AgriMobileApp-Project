const express = require('express');
const router = express.Router();
var db = require('./db.js');

// register route
router.route('/register').post((req, res)=>{
    // get param
    // const id = req.body.id;
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var role = req.body.role;
    var status = req.body.status;
    var created_at = req.body.created_at;

    //create query
    var sql = `INSERT INTO users (email, name, password, role, status, created_at) VALUES (?, ?, ?, ?, ?, ?)`;

    //call database to insert
    db.query(sql, [email, name, password, role, status, created_at], function(error, data, fields){
        if(error){
            res.send(JSON.stringify({success:false, message:error}));
        } else {
            res.send(JSON.stringify({success:true, message:'register successfully'}));
        }
    });
});

router.route('/login').post((req, res)=>{
    
    var email = req.body.email;
    var password = req.body.password;

    var sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    db.query(sql, [email, password], function(error, data, fields){
        if(error){
            res.send(JSON.stringify({success:false, message:error}));
        } else {
            if(data.length > 0){
                res.send(JSON.stringify({success:true, message:'login successfully', data:data}));
            } else {
                res.send(JSON.stringify({success:false, message:'Invalid email or password'}));
            }
        }
    });
});

module.exports = router;

