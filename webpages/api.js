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

function submit() {
  var shopName = document.getElementById("newShopName").value;
  var caption = document.getElementById("newCaption").value;

  if ((shopName.length !== 0) && (caption.length !== 0))  {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("Shop name", shopName);
      localStorage.setItem("Caption", caption);
      window.location.href = "index.html";
    } else {
      document.getElementById("shopName").innerHTML = "Sorry, your browser does not support web storage.";
    }
  } else {
    alert("All input boxes must be filled.");
  }
};

function getData() {
  // Retrieve
  document.getElementById("shopName").innerHTML = localStorage.getItem("Shop name");
  document.getElementById("caption").innerHTML = localStorage.getItem("Caption");
}

function clearData() {
  if(!confirm('Are you sure?'))e.preventDefault();
  localStorage.clear();
}
