DotA 2 WebApi
===
Easy-to-use API client for the Dota 2 WebAPI [http://wiki.teamfortress.com/wiki/WebAPI#Dota_2](http://wiki.teamfortress.com/wiki/WebAPI#Dota_2).


Installation
-----------
    npm install dota2-webapi

## How to use

The following example shows you how to use this library. In this case we are getting the league listing provided by the API.

```js
var webapi = require('dota2-webapi');

var WebApi = new webapi('APIKEY');

WebApi.getTournaments('en', function(e, tournaments){
	if(e){
		console.log(e);
	}else{
		console.log(tournaments);
	}
})
```