const express = require('express');
const app = express();
const router = express.Router();

const users = require("./user.json")

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname + '/home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  // res.send('This is profile router');
  res.sendFile(__dirname + '/user.json');
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

//http://localhost:8081/login?username=bret&password=bret@123
router.get('/login', (req,res) => {
  let usernames = req.query.username
  let passwords = req.query.password
  if (users.username === usernames && users.password === passwords) {          
      res.json({
        status: true,
        message: "User Is valid"
      })
      
  }

  else if (users.username !== usernames) {   
    res.json({
      status: false,
      message: "User Name is invalid"
    })
  }

  else if (users.password !== passwords) {   
    res.json({
      status: false,
      message: "Password is invalid"
    })
  }

  // res.send('This is login router');
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  let usernames = req.query.username
  res.send(`<b>${usernames} successfully logout.<b>`);
  // res.send('This is logout router');
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));
// console.log('Web Server is listening at port '+ 'http://localhost:8081');