var index = 0;

//display images one by one like a carousel
function getCarousel() {
  var i;
  var x = document.getElementsByClassName("slides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  };
  index++;
  if (index > x.length) {index = 1};
  x[index-1].style.display = "block";
  setTimeout(getCarousel, 5000); //change image every 5 seconds
};

//toggles fullscreen
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

//toggles the 'hint' element
function toggleHint() {
  var x = document.getElementById("hint");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  };
};

//toggles the configure button
function toggleConfigureBtn() {
  var x = document.getElementById("configureBtn");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  };
};

//toggles the clear button
function toggleClearBtn() {
  var x = document.getElementById("clearBtn1");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  };
};

//toggles fullscreen/hint/configure button/clear button when the 'f' key is pressed
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

//clears user data and resets the title/caption to default
async function clearData() {
  if(!confirm('Are you sure?'))e.preventDefault();
  var shopName = "Please set shop details...";
  var caption = "...on the configure page.";

  const url = (`/save?shopName=${shopName}&caption=${caption}`);
  window.location.href = "index.html";
  const response = await fetch(url);
};

//sends user input to the server to be saved in the shopData.json file
async function submit() {
    var shopName = document.getElementById("newShopName");
    var caption = document.getElementById("newCaption");

    if ((shopName.value.length !== 0) && (caption.value.length !== 0))  {
      const url = (`/save?shopName=${shopName.value}&caption=${caption.value}`);
      window.location.href = "index.html";
      const response = await fetch(url);
    } else {
      //validation
      alert("All input boxes must be filled.");
    };
};

//gets shop name and caption from the shopData.json file
//gets images from the images dir
//calls carousel function
async function getData() {
  $.getJSON("shopData.json", function(data) {
    document.getElementById("shopName").innerHTML = data.shopName;
    document.getElementById("caption").innerHTML = data.caption;
  });

  const url = `/getNoOfImages`;
  //request result from server
  var response = await fetch(url);
  //extract result body
  var result = await response.json();

  if (result == 0) {
    document.getElementById("carousel").innerHTML = '<h1 id="noImage">Please upload photo ads on the configure page.</h1>';
  } else {
    var i;
    for (i = 1; i <= result; i++) {
      $(".carousel").append(`<img class="slides" src="/images/${i}.jpeg">`);
    };
    getCarousel();
  };
};
