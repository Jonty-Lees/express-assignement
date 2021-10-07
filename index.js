const express = require("express");
const app = express();
const port = 8080;

// Array given
const TOYS = [
  {
    id: 1,
    name: "Tchoo tchoo train",
    price: "100",
    minimalAge: 3
  },
  {
    id: 2,
    name: "Teddy the bear",
    price: "10",
    minimalAge: 1
  },
  {
    id: 3,
    name: "Duplo set",
    price: "25",
    minimalAge: 2
  },
  {
    id: 4,
    name: "Lego set",
    price: "30",
    minimalAge: 5
  },
  {
    id: 5,
    name: "Remote controlled car",
    price: "50",
    minimalAge: 7
  }
]


//  Create a / route that shows all the array 
app.get('/', (req, res) => {
  res.send(TOYS)
});


// Create a route that shows the id when searched
app.get('/products/:id', (req, res) => {
    //grab the given id
    let searchID = Number(req.params.id)

    //find the toy with given id
    let showToy = TOYS.find(toy => toy.id === searchID)

    if (showToy === undefined){
        res.send("None of our toys have this id. please pick one from 1 - 5")
    } else {
        res.send(showToy);
    }
})


//create a search route which searches with age and/or name. 

app.get('/search', (req, res) => {

  if ('name' in req.query === true && 'age' in req.query === true){

     let searchAge = Number(req.query.age)
      let searchName = req.query.name
     const showToys = TOYS.filter(toy => toy.name.includes(searchName) && toy.minimalAge <= searchAge)
     res.send(showToys);


  } 

  // Create an instance if just name is called.


  else if ('name' in req.query === true){

      let searchName = req.query.name
     const showToys = TOYS.filter(toy => toy.name.includes(searchName))
     res.send(showToys);


  }

  // Create an instance incase just age is called
  else if ('age' in req.query === true) {

     let searchAge = Number(req.query.age)
     const showToys = TOYS.filter(toy => toy.minimalAge <= searchAge)
     res.send(showToys);


  } 

// If nothing is called, show whole array

  else {

      res.send(TOYS)


  }
})


app.listen(port,()=>{
  console.log(`Listening to port ${port}`)
})