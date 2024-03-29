Camera shop advertisement display
==========

Functionality:
* stores and displays the shop name
* stores and displays the shop caption
* stores and displays image advertisements
* images are displayed on a carousel that rotates every 5 seconds
* fullscreen display mode is toggled when the 'f' key is pressed on the display panel
* display panel is refreshed every 30 seconds to get new data

Deployment
* 'npm install' to download libraries
* 'npm start' to start the server
* webpage can be accessed on the localhost at port 8080
* test images are provided in the 'test_images' folder

How to
==========

How to change the shop name/caption:
* go to the configure page and submit the desired shop name and caption

How to reset the shop name/caption to default settings:
* go to the configure page and press the 'Click to reset display panel' button on the top right corner

How to add new image advertisement onto the carousel:
* go to the configure page and upload the image using the form

How to delete all images from the carousel:
* go to the configure page and press the 'Delete all photos' button

How to enter display mode:
* go to the homepage and press the 'f' key to go in/out of display mode

Design
==========

I wanted this web application to be easy and simple to use for the user.
The display board and configure page were designed so it was user friendly, simple to
understand and had a very clear design. This was important because I wanted anyone to
use this web application with little to no training needed.

The only modules I had used were express, fs, multer, body-parser and path. No other
external libraries were used.
