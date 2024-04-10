const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const port = process.argv[3] || 3000;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

// mongoose.connect("mongodb+srv://vikas:304215VVvv@cluster0.zex2pfn.mongodb.net/movieapp?retryWrites=true&w=majority");

mongoose.connect("mongodb+srv://vikas:304215VVvv@cluster0.zex2pfn.mongodb.net/movieapp?retryWrites=true&w=majority", {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('errokr', console.error.bind(console, 'connection error'));

db.once('open', function(){
  console.log("connection Done");
});

const UserSchame = new mongoose.Schema({
  name: String,
  surname: String
});

const Todo = mongoose.model('users', UserSchame);


app.get('/post', async (req, res) => {
  try{
    const todo = new Todo({
      name: "asa"
    });
    await todo.save();
    res.status(201).json(todo);
  } catch(err) {
    res.status(500).json(err);
  }
});

app.get('/fetch', async (req, res) => {
  try{
    const todo = await Todo.find();
    res.status(201).json(todo);
  } catch(err) {
    res.status(500).json(err);
  }
});


app.get('/update/:id', async (req, res) => {
  try{
    const todo = await Todo.findByIdAndUpdate( req.params.id,
      {name: "vikas"},
      {new: true}
      );
    res.status(201).json(todo);
  } catch(err) {
    res.status(500).json(err);
  }
});

app.get('/delete/:id', async (req, res) => {
  try{
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(201).json({message: "Deleted"});
  } catch(err) {
    res.status(500).json(err);
  }
});



// const InsertInDB = async () => {
//   const Userdata = mongoose.model('users', UserSchame);
//   let Data = new Userdata({
//     name : "chhagan",
//     surname : "Kumar 2",
//     address : {
//       road : "sdsds"
//     }
//   });
//   const result = await Data.save();
//   console.log(result);
// }

// // InsertInDB();

// const UpdateInDB = async () => {
//   const Userdata = mongoose.model('users', UserSchame);
//   const result = await Userdata.updateOne({_id: "661529093304f8aa238541bc"}, {
//     $set: {
//       name: "Vikas 10000",
//       surname: "Kumar 78",
//       address: {
//         road: "fgfgff",
//         pincode: 125554
//       }
//     }});
//   console.log(result);
// }

// // UpdateInDB();

// const DeleteInDB = async () => {
//   const Userdata = mongoose.model('users', UserSchame);
//   const result = await Userdata.deleteOne({_id: "6615cffac96b07cf6f18723e"});
//   console.log(result);
// }

// // DeleteInDB();

// const FetchInDB = async () => {
//   const Userdata = mongoose.model('users', UserSchame);
//   const result = await Userdata.find({});
//   console.log(result);
// }

// FetchInDB();


// const popullaerSchame = new mongoose.Schema({
//   name: String,
//   surname: String,
// });

// const PopullaerUser = mongoose.model('Popullaers', popullaerSchame);

// const User = mongoose.model('users', UserSchame);

// app.get('/getuser', (req, res) => {
//   User.find({}).then(function(users){
//     res.json(users);
//   }).catch(function(err){
//     res.json({"msg": "Error"});
//   })
// });


// app.get('/popullaer', (req, res) => {
//   PopullaerUser.find({}).then(function(users){
//     res.json(users);
//   }).catch(function(err){
//     res.json({"msg": "Error"});
//   })
// })

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/api', (req, res) => {
//   res.json({"msg": "Hello world"});
// });


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})