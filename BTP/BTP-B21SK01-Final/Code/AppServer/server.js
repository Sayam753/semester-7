const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const port = process.env.PORT || 8080
const authRoute = require('./routes/Auth/Auth')
const uploadRoute = require('./routes/Upload/Upload')
const modelRoute = require('./routes/Model/Model')
const notificationRoute = require('./routes/Notification/Notification')
const http = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors: {
      origin: '*',
    }
  })

dotenv.config()
app.use(cors());
app.use(express.json({ limit: '50mb' }))

mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false },()=>{
    console.log("Connected to Database")
});


app.use('/api/auth', authRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/model', modelRoute)
app.use('/api/notification', notificationRoute)


io.on('connection',  function(socket) {
    socket.on('join_room',({user_id}) =>{
        socket.join(user_id)
    })


    socket.on('modalsaved', ({user_id}) => {
        socket.to(user_id).emit('reload', {})    
    });

});

http.listen(port,() =>{
    console.log(`Server started on port ${port} ...`)
})
