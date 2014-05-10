var webapi = require('./index');

var WebApi = new webapi('APIKEY');

/*
WebApi.getTournaments('en', function(e, tournaments){
	if(e){
		console.log(e);
	}else{
		console.log(tournaments);
	}
});

*/

/*
// Get Team Info
WebApi.getTeamInfo(5, function(e, info){
	if(e){
		console.log(e);
	}else{
		console.log(info);
	}
});

*/


/*
// Get Team Logo
// Be carefull with big numbers
WebApi.GetUGCFile('597017828284742302', function(e, data){
	if(e){
		console.log(e);
	}else{
		console.log(data);
	}
});
*/
/*
// Download Schema
WebApi.DownloadSchema('es', 'schema.js', function(e){
	if(e){
		console.log(e);
	}else{
		console.log('File: Downloaded.');
	}
});

*/
/*
// Download Items Game
WebApi.DownloadItemsGame('items_game.txt', function(e){
	if (e) {
		console.log(e);
	}else{
		console.log('Items Game Downloaded.');
	}
});
*/