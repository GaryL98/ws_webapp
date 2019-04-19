var index = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("slides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  index++;
  if (index > x.length) {index = 1}
  x[index-1].style.display = "block";
  setTimeout(carousel, 5000); // Change image every 5 seconds
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
    }
  }
};

function toggleHint() {
  var x = document.getElementById("hint");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
};

function toggleConfigureBtn() {
  var x = document.getElementById("configureBtn");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
};

function toggleClearBtn() {
  var x = document.getElementById("clearBtn");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
};

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 70) {
    toggleFullscreen();
    toggleHint();
    toggleConfigureBtn();
    toggleClearBtn();
  }
};

function getData() {
  // Retrieve
  document.getElementById("shopName").innerHTML = localStorage.getItem("Shop name");
  document.getElementById("caption").innerHTML = localStorage.getItem("Caption");
};

function clearData() {
  if(!confirm('Are you sure?'))e.preventDefault();
  localStorage.clear();
};

async function submit() {

    var shopName = document.getElementById("newShopName");
    var caption = document.getElementById("newCaption");

    if ((shopName.value.length !== 0) && (caption.value.length !== 0))  {
      const url = (`/save?shopName=${shopName.value}&caption=${caption.value}`);
      window.location.href = "index.html";
      const response = await fetch(url);
    } else {
      alert("All input boxes must be filled.");
    }
};

async function pageLoaded() {
  $.getJSON("shopData.json", function(data) {
    document.getElementById("shopName").innerHTML = data.shopName;
    document.getElementById("caption").innerHTML = data.caption;
  });
};

window.addEventListener("load", pageLoaded);
