/*
	BioCountdown - Clock
	By: @BestGirlZoey / Zoey#0001
	and: @juju2143 / Yuki#2138
*/

// Imports
const Twitter = require('twit'), moment = require('moment'), tokens = require('./tokens.json');

// Twitter access
const TwitterAPI = new Twitter({
	consumer_key: tokens.consumer_key,
	consumer_secret: tokens.consumer_secret,
	access_token: tokens.token,
	access_token_secret: tokens.token_secret
});

// Current bio
const oldBio = "ジュジュ. Useless web dev, non sequitur tweeter, Linux-lover, 日本語でophile, head of @codewalr_us/@MLPQuebec/@zarminaxyz, apply to be my waifu today. Avi by Kurenji.";
const bio = `Useless web dev, catgirls-lover, head of @codewalr_us/@MLPQuebec/@zarminaxyz, apply to be my waifu today. It's __:__ somewhere in the world, I should go sleep.`;

// Interval time
const interval = 1000;

// Main loop that's ran every minute
function countdownLoop() {

	var secs = moment().format('s');
	if(secs == 0)
	{

		var time = moment().format('H:mm');

		var newBio = bio.replace("__:__", time);

		// Post to Twitter
		TwitterAPI.post("account/update_profile", {description: newBio}, (err, data, response) => {
			if(err) throw err;
		});
	}
}

// Interval
var countdownInterval = setInterval(countdownLoop, interval);
countdownLoop();
