const express = require('express')
const mongoose = require('mongoose')
const card = require('./models/Card')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())


app.post('/card', async (req, res) => {
  const data = req.body

  const newCard = new card(data)
  await newCard.save().then(savedDoc => {
  if(savedDoc === newCard){
    res.status(200).json({"RequestId": savedDoc.id, "Amount": savedDoc.Amount});
  }
});

});

const start = async () =>{
  try{
    await mongoose.connect('mongodb+srv://qwerty:qwerty123@cluster0.ngyuc.mongodb.net/cardValidation?retryWrites=true&w=majority')
    app.listen(PORT, ()=> console.log('Server started on port ', PORT))
  }
  catch(e){
    console.log(e);
  }
}
start()