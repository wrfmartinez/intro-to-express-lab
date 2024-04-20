const express = require('express');
const app = express();

// Exercise 1: Create a route that responds to URLs like /greetings/<username-paramter>
app.get('/greetings/:name', (req, res) => {
  res.send(`<h1>Hello there, ${req.params.name}!</h1>`);
});

// Exercise 2: Set up a route to handle URLs following the pattern /roll/<number-parameter>
app.get('/roll/:number', (req, res) => {
  // Converts URL parameter from a string to a number and stores that value into a variable
  const number = Number(req.params.number);
  const randomNumber = Math.floor(Math.random() * number);

  // Checks if the type of the number is 'number' and checks if the URL parameter input converted back to a string is equal to NaN then responds with randomNumber result.
  if (typeof number === 'number' && String(number) !== 'NaN') {
    res.send(`<h1>You rolled a ${randomNumber}.</h1>`);
  } else {
    res.send('<p>You must specify a number.</p>');
  }
});

// Exercise 3: Create a route for URLs like /collectibles/<index-parameter>
app.get('/collectibles/:itemId', (req, res) => {
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 },
  ]
  const params = req.params;
  let selectedItem = [];

  // Iterate through the collectibles array and checks if the index position matches with the URL parameter input value converted into a number then pushes that item into the selectedItem array
 collectibles.forEach((item, itemIndex) => {
  if (itemIndex === Number(params.itemId)) {
    selectedItem.push(item);
  }
 });

 // Checks if the selectedItem array is NOT empty then responds with the result if not it returns a helpful message to explain why
 if (selectedItem.length > 0) {
  res.send(`Would you like to purchase the ${selectedItem[0].name} for $${selectedItem[0].price}?`);
 } else {
  res.send('Oops this item is not yet in stock. Check back soon!');
 }
});

// Exercise 4: Create a route /shoes that filters the list of shoes based on query parameters
app.get('/shoes', (req, res) => {
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];
  const filteredShoeList = [];

  // Iterate through the shoes array and extract their key values then push selected items based on if the query parameter input respects the specific conditions
  shoes.forEach((shoe, index) => {
    // Price is above this limit
    if (shoe.price > req.query['min-price']) {
      filteredShoeList.push(shoe);
    }
    // Price is below this limit
    if(shoe.price < req.query['max-price']) {
      filteredShoeList.push(shoe);
    }
    // Matches the inputted shoe type
    if(shoe.type === req.query.type) {
      filteredShoeList.push(shoe);
    }
  });

  // Checks if the filteredShoeList array is NOT empty then responds with the items in the filteredShoeList. If not then it responds with the entire list of shoes
  if (filteredShoeList.length > 0) {
    res.send(filteredShoeList);
  } else {
    res.send(shoes);
  }
});

app.listen(3000, () => {
  console.log('server is listening');
});
