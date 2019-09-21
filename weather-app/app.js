const geocodeUrl = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];

if (location) {
	geocodeUrl(location, (err, res) => {
		if (err) {
			return console.log(err);
		}

		const { latitude, longitude, location } = res;

		forecast(latitude, longitude, (err, data) => {
			if (err) {
				return console.log(err);
			}

			console.log(location);
			console.log(data);
		});
	});
} else {
	console.log("Please provide a location");
}
