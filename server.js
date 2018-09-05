const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:a8fa5b17-5ffe-43b4-bd2c-468d2eaabcc8',
  key: '47f49c93-f6c1-43eb-af6d-a40abc77c489:jy5mXbyy+Ke920GPpaisMvKUdBzUkhaTzgdHI5dw7ZY=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//create new user
app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})
//create new Room
app.post('/createTeam', (req, res) => {
  const data = req.body
  console.log(data);
  
  chatkit.createRoom({
    creatorId: data.username,
    name: data.teamname,
  })
  .then(() => res.send('Room Created Successfully'))
  .catch((err) => {
    console.log(err);
  });
  
})

//get User Rooms
app.get('/getTeam', (req, res) => {
  chatkit.getUserRooms({
    userId: 'rayees',
  })
  .then((responce) => {
    const  data  = responce;
    res.send({'data':'test', 'responce': data});
    console.log(data);
  }).catch((err) => {
    console.log(err);
  });
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body);
  res.end();
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
