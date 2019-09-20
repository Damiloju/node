const geocodeUrl = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];

if (location) {
	geocodeUrl(location, (err, { latitude, longitude, location }) => {
		if (err) {
			return console.log(err);
		}

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
