'use scrict';

const fs = require('fs');
const express = require('express');
//file storing middleware
const multer = require('multer');
//cleans req.body
const bodyParser = require('body-parser');
const path = require('path');

//image directory set
const app = express();
const dir = './webpages/images';

//handle body requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//multer configuration to get files to temp server storage
const multerConfig = {
  //specify diskStorage
  storage: multer.diskStorage({
    //specify destination
    destination: function(req, file, next){
      next(null, './webpages/images');
    },

    //specify the filename
    filename: function(req, file, next){
      console.log(file);
      //getting the file mimetype (eg. 'image/jpeg') split and takes the second value (eg. 'jpeg')
      const ext = file.mimetype.split('/')[1];
      fs.readdir(dir, (err, files) => {
        var i = files.length;
        //set the file fieldname to a number depending on the number of images in the dir, and the extension.
        next(null, `${(i + 1) + '.' + ext}`);
      });
    }
  }),

  //filters out and prevent non-image files
  fileFilter: function(req, file, next){
    if(!file){
      next();
    };

    //only allow image mimetypes
    const image = file.mimetype.startsWith('image/');
    if(image){
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log("file not supported")
      return next();
    }
  }
};

//passes the file to be saved in the images dir
app.post('/upload', multer(multerConfig).single('photo'),function(req, res){
  res.send('Your file has been sent to the server. Please note that files that are not in jpeg format are rejected. <a href="index.html"> HOME');
});

//deletes all images in the images dir
app.post('/delete', function(req, res){
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(dir, file), err => {
        if (err) throw err;
      });
    };
  });
  res.send('All images have successfully been removed from the carousel. <a href="index.html"> HOME');
});

//saves user input into shopdata.json file
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

//gets the number of images in the images dir
app.get('/getNoOfImages', (req, res) => {
  fs.readdir(dir, (err, files) => {
    var i = files.length;
    res.json(i);
  });
});

//static route
app.use(express.static('./webpages'));

//starts server on port 8080
app.listen(process.env.PORT || 8080);
