'use scrict';

const fs = require('fs');
const express = require('express');
const app = express();

app.get('/save', (req, res) => {

  const shopName = (req.query.shopName);
  const caption = (req.query.caption);

  let newShopData = {
    "shopName": `${shopName}`,
    "caption": `${caption}`
  };

  let data = JSON.stringify(newShopData);
  fs.writeFileSync('./webpages/shopData.json', data);
});

app.use(express.static('./webpages'));

app.listen(process.env.PORT || 8080);
