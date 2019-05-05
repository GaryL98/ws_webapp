const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function(req, file, next){
      next(null, './public/photo-storage');
    },

    //Then give the file a unique name
    filename: function(req, file, next){
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.'+ext);
    }
  }),

  //A means of ensuring only images are uploaded.
  fileFilter: function(req, file, next){
    if(!file){
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if(image){
      console.log('photo uploaded');
      next(null, true);
    }else{
      console.log("file not supported");
      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};

app.post('/upload',multer(multerConfig).single('photo'),function(req,res){
  res.send('Complete!');
});

var index = 0;

function getCarousel() {
  var i;
  var x = document.getElementsByClassName("slides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  };
  index++;
  if (index > x.length) {index = 1};
  x[index-1].style.display = "block";
  setTimeout(getCarousel, 5000); // Change image every 5 seconds
};

function toggleFullscreen(elem) {
  elem = elem || document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    };
  };
};

function toggleHint() {
  var x = document.getElementById("hint");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  };
};

function toggleConfigureBtn() {
  var x = document.getElementById("configureBtn");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  };
};

function toggleClearBtn() {
  var x = document.getElementById("clearBtn1");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  };
};

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (window.location.pathname == '/index.html') {
    if (evt.keyCode == 70) {
      toggleFullscreen();
      toggleHint();
      toggleConfigureBtn();
      toggleClearBtn();
    };
  };
};

async function clearData() {
  if(!confirm('Are you sure?'))e.preventDefault();

  var shopName = "Please set shop details...";
  var caption = "...on the configure page.";

  const url = (`/save?shopName=${shopName}&caption=${caption}`);
  window.location.href = "index.html";
  const response = await fetch(url);
};

async function submit() {
    var shopName = document.getElementById("newShopName");
    var caption = document.getElementById("newCaption");

    if ((shopName.value.length !== 0) && (caption.value.length !== 0))  {
      const url = (`/save?shopName=${shopName.value}&caption=${caption.value}`);
      window.location.href = "index.html";
      const response = await fetch(url);
    } else {
      window.location.href = "index.html";
    };
};

function getData() {
  $.getJSON("shopData.json", function(data) {
    document.getElementById("shopName").innerHTML = data.shopName;
    document.getElementById("caption").innerHTML = data.caption;
  });
};
