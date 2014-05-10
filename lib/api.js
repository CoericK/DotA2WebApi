
var request = require('request');

var bignumJSON = require('json-bignum');

var httpgg = require('http-get');

var WebApi = function(apiKey){
	require('events').EventEmitter.call(this);
	this.apiKey = apiKey;
	this.urlGetTournaments = 'http://api.steampowered.com/IDOTA2Match_570/GetLeagueListing/v1/?key='+this.apiKey+'&language=';
	this.urlGetTeamInfo = 'http://api.steampowered.com/IDOTA2Match_570/GetTeamInfoByTeamID/v1?key='+this.apiKey+'&teams_requested=1&start_at_team_id=';
	this.urlgGetUGCFile = 'http://api.steampowered.com/ISteamRemoteStorage/GetUGCFileDetails/v1/?key='+this.apiKey+'&appid=570&ugcid=';
	this.urlGetSchema = 'http://api.steampowered.com/IEconItems_570/GetSchema/v0001/?key='+this.apiKey+'&language=';
};

require('util').inherits(WebApi, require('events').EventEmitter);

WebApi.prototype.getTournaments = function(lang, cb){
	request(this.urlGetTournaments+lang, function(e, response, body){
		if(e){
			cb(e);
		}else{
			if(response.statusCode == 200){
				cb(null, bignumJSON.parse(body).result.leagues);
			}else{
				cb({error: true, errorStatusCode: response.statusCode});
			}
		}
	});
};

WebApi.prototype.getTeamInfo = function(team, cb){
	request(this.urlGetTeamInfo+team, function(e, response, body){
		if(e){
			cb(e);
		}else{
			if(response.statusCode == 200){
				var result = bignumJSON.parse(body).result; 
				if(result.teams.length > 0){
					cb(null, result.teams[0]);
				}else{
					cb({error: true, errorMsg: 'Team doesnt exist.'});
				}
			}else{
				cb({error: true, errorStatusCode: response.statusCode});
			}
		}
	});
};


WebApi.prototype.GetUGCFile = function(ugcid, cb){
	request(this.urlgGetUGCFile.concat(ugcid), function(e, response, body){
		if(e){
			cb(e);
		}else{
			if(response.statusCode == 200){
				cb(null, bignumJSON.parse(body).data);
			}else{
				cb({error: true, errorStatusCode: response.statusCode});
			}
		}
	});
};

WebApi.prototype.GetSchema = function(lang, cb){
	var url = this.urlGetSchema.concat(lang);
	request(url, function(e, response, body){
		if(e){
			cb(e);
		}else{
			if(response.statusCode == 200){
				cb(null, bignumJSON.parse(body).result);
			}else{
				cb({error: true, errorStatusCode: response.statusCode});
			}
		}
	});
}

WebApi.prototype.DownloadSchema = function(lang, name, cb){
	var url = this.urlGetSchema.concat(lang);
	httpgg.get(url, name, function (error, result){
		if(error){
			cb(error);
		}else{
			cb(null);
		}			
	});

};

WebApi.prototype.DownloadItemsGame = function(name, cb){
	this.GetSchema('en', function(e, schema){
		if(e){
			cb(e);
		}else{
			var url = schema.items_game_url;
			httpgg.get(url, name, function(error, result){
				if(error){
					cb(error);
				}else{
					cb(null);					
				}
			});
		}
	});
};

module.exports = WebApi;