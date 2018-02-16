/*
	BioCountdown
	By: @BestGirlZoey / Zoey#0001
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
const bio = `Trans girl. Programming, tech and memes. Engaged to @shireen_gh.`;

// Interval time
const interval = 1000*60;

// Time
const now = new Date().getTime();
const end = new Date("2018-03-01T17:55:00").getTime();

// Difference
const diffTime = end - now;
var diffDuration = moment.duration(diffTime, 'milliseconds');

// Main loop that's ran every minute
function countdownLoop() {

	// Is there time left ?
	if(diffTime > 0) {
		diffDuration = moment.duration(diffDuration - interval, 'milliseconds');

		var newBio = `${bio} ✈ to 🇸🇪 in `;

		// If there's days left
		if(diffDuration.days() > 0) {
			newBio += `${diffDuration.days()} days`;

			// If there's hours left and minutes left
			if(diffDuration.hours() > 0 && diffDuration.minutes() > 0) {
				newBio += `, ${diffDuration.hours()} hours and ${diffDuration.minutes()} minutes`;
			} else if(diffDuration.hours() > 0 && diffDuration.minutes() == 0) { // If there's hours left but no minutes left
				newBio += ` and ${diffDuration.hours()} hours`;
			} else if(diffDuration.hours() == 0 && diffDuration.minutes() > 0) { // If there's no hours left but minutes left
				newBio += ` and ${diffDuration.minutes()} minutes`;
			}
		} else { // If there's no days left

			// If there's hours and minutes left
			if(diffDuration.hours() > 0 && diffDuration.minutes() > 0) {
				newBio += `${diffDuration.hours()} hours and ${diffDuration.minutes()} minutes`;
			} else if(diffDuration.hours() > 0 && diffDuration.minutes() == 0) { // If there's hours left but no minutes left
				newBio += `${diffDuration.hours()} hours`;
			} else if(diffDuration.hours() == 0 && diffDuration.minutes() > 0) { // If there's minutes left but no hours left
				newBio += `${diffDuration.minutes()} minutes`;
			}
		}

		newBio += `!`;

		// Post to Twitter
		TwitterAPI.post("account/update_profile", {description: newBio}, (err, data, response) => {
			if(err) throw err;
		});
	} else {
		var newBio = `${bio} I'm currently ✈ to 🇸🇪!`;

		// Post to Twitter
		TwitterAPI.post("account/update_profile", {description: newBio}, (err, data, response) => {
			if(err) throw err;

			clearInterval(countdownInterval);
			process.exit(1);
		});
	}
}

// Interval
var countdownInterval = setInterval(countdownLoop, interval);
countdownLoop();
