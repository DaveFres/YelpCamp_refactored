# YelpCamp

> A Node.js web application project from the Udemy course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp/)

## Live App

To see the app in action, go to [https://davidn-yelp-camp.herokuapp.com/](https://davidn-yelp-camp.herokuapp.com/)

## Features

* Authentication:
  
  * User login with username and password

* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users


* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload campground photos
  

* Manage user account with basic functionalities:
  * Profile page setup with sign-up

* Flash messages responding to users' interaction with the app

* Ratings and reviews

* Pagination on campgrounds index 

* Responsive web design

## Upcoming features

* Nice UI

* Authentication:
  * Admin sign-up with admin code

* Authorization:
  * Admin can manage all posts and comments


* Map API:
  * Display campground location on Google Maps

* Fuzzy Search
  * Search existing campgrounds

* Manage user account with basic functionalities:
  * Password reset via email confirmation


## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone or download this repository

```sh
git clone https://github.com/lucasweng/yelp-camp.git
```

### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

### Comments in code

Some comments in the source code are course notes and therefore might not seem necessary from a developer's point of view.

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [moment](https://momentjs.com/)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Heroku](https://www.heroku.com/)
* [Cloud9](https://aws.amazon.com/cloud9/?origin=c9io)

