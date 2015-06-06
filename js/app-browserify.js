
var Promise = require('es6-promise').Promise;
// just Node?
// var fetch = require('node-fetch')
// Browserify?
require('whatwg-fetch'); //--> not a typo, don't store as a var

// es6 polyfills, powered by babel
require('babel/register');


   var urls = ['https://api.github.com/users/joebobdog9', 'https://api.github.com/users/joebobdog9/repos'];

   var requests = urls.map(function (url) {
       return fetch(url).then(function (r) {
           return r.json();
       });
   });

   function qs(selector) {
       return document.querySelector(selector);
   }

   Promise.all(requests).then(function (data) {
       var profile = data[0],
           repos = data[1];

       var profile_string = ['name', 'login', 'location', 'email', 'html_url'].map(function (key) {
           return '<li>' + key + ': ' + profile[key] + '</li>';
       }).join('');
       var repo_string = repos.map(function (repo) {
           return '<li><a href="' + repo.html_url + '">' + repo.name + '</a></li>';
       }).join('');

       qs('.profile img').src = profile.avatar_url;
       qs('.profile ul').innerHTML = profile_string;
       qs('.repos ul').innerHTML = repo_string;
   });
