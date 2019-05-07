'use scrict';

const fs = require('fs');
const express = require('express');
const multer = require('multer'); // file storing middleware
const bodyParser = require('body-parser'); //cleans our req.body
const path = require('path');

const app = express();
const dir = './webpages/images';

app.use(bodyParser.urlencoded({extended:false})); //handle body requests
app.use(bodyParser.json()); // let's make JSON work too!

//MULTER CONFIG: to get file photos to temp server storage
const multerConfig = {
  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({
    //specify destination
    destination: function(req, file, next){
      next(null, './webpages/images');
    },

    //specify the filename to be unique
    filename: function(req, file, next){
      console.log(file);
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split('/')[1];
      fs.readdir(dir, (err, files) => {
        var i = files.length;
        //set the file fieldname to a unique name containing the original name, current datetime and the extension.
        next(null, `${(i + 1) + '.' + ext}`);
      });
    }
  }),

  // filter out and prevent non-image files.
  fileFilter: function(req, file, next){
    if(!file){
      next();
    }

    // only permit image mimetypes
    const image = file.mimetype.startsWith('image/');
    if(image){
      console.log('photo uploaded');
      next(null, true);
    }else{
      console.log("file not supported")
      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};

app.post('/upload', multer(multerConfig).single('photo'),function(req, res){
  res.send('Your file has been sent to the server. Please note that files that are not in jpeg format are rejected. <a href="index.html"> HOME');
});

app.post('/delete', function(req, res){
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dir, file), err => {
        if (err) throw err;
      });
    }
  });
  res.send('All images have successfully been removed from the carousel. <a href="index.html"> HOME');
});

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
