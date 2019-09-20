const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/059756f4a146e14641dfb21d3837d363/${encodeURIComponent(
		latitude
	)},${encodeURIComponent(longitude)}`;

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback("Unable to connect to Weather API");
		} else if (body.error) {
			callback("Unable to find location");
		} else {
			const data = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`;

			callback(undefined, data);
		}
	});
};

module.exports = forecast;
