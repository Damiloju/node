const geocodeUrl = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocodeUrl("Abuja", (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});

forecast(9.05, 7.5, (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});
