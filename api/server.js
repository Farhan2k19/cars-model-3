const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose
  .connect("mongodb://127.0.0.1:27017/mern-carApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });



const Car = require('./models/Car');

app.get('/cars', (req, res) => {
    Car.find().then((cars) => res.json(cars));
});

app.post('/newCar', (req, res) => {
    const newCar = new Car({
        name: req.body.name,
        model: req.body.model,
        color: req.body.color,
    });
    newCar.save().then((car) => res.json(car));
});

//code for updating a car color
app.put('/updateCar/:id', (req, res) => {
    Car.findById(req.params.id).then((car) => {
        car.color = req.body.color;
        car.save().then((car) => res.json(car));
    });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}   );
