const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/059756f4a146e14641dfb21d3837d363/${encodeURIComponent(
		latitude
	)},${encodeURIComponent(longitude)}`;

	request({ url, json: true }, (err, res) => {
		if (err) {
			callback("Unable to connect to Weather API");
		} else if (res.body.error) {
			callback("Unable to find location");
		} else {
			const data = `${res.body.daily.data[0].summary} It is currently ${res.body.currently.temperature} degrees out. There is a ${res.body.currently.precipProbability}% chance of rain`;

			callback(undefined, data);
		}
	});
};

module.exports = forecast;
