const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let TotalPrice = 0;
  TotalPrice + (cartTotal + newItemPrice);
  res.send(TotalPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let finalPrice;
  let discount = 2;
  if (isMember) {
    finalPrice = cartTotal - cartTotal * (discount / 100);
  } else {
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  const taxRate = 5;
  let taxAmount = (cartTotal * taxRate) / 100;
  res.send(taxAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);
  let deliveryRate;
  if (shippingMethod === 'Standard') {
    deliveryRate = 50;
  } else {
    deliveryRate = 100;
  }
  let deliveryDays = Math.ceil(distance / deliveryRate);

  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  const pointsMultiplier = 2;
  let loyaltyPoints = purchaseAmount * pointsMultiplier;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
