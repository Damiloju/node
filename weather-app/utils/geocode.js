const request = require("request");

const geocodeUrl = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiZG9uZ3VuIiwiYSI6ImNrMHJjamtxYjA0aW4zaG1yOXVpYWI1Y3UifQ.hrmds2Ip7fIXEPhLBSmUOQ&limit=1`;

	request({ url, json: true }, (err, res) => {
		if (err) {
			callback("Unable to connect to Location services");
		} else if (res.body.features.length === 0) {
			callback(
				"Unable to find location try again with different search term"
			);
		} else {
			const latitude = res.body.features[0].center[1];
			const longitude = res.body.features[0].center[0];
			const location = res.body.features[0].place_name;
			callback(undefined, {
				latitude,
				longitude,
				location
			});
		}
	});
};

module.exports = geocodeUrl;
