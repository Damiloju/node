const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

//Setup handleBars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", { title: "Weather App", name: "Damiloju" });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About Page", name: "Damiloju" });
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		helpMesssage: "This is a sample help text",
		name: "Damiloju"
	});
});

app.get("/weather", (req, res) => {
	res.send({ forecast: "Rain", location: "London" });
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404 Page",
		errorMessage: "Help article Not Found",
		name: "Damiloju"
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404 Page",
		errorMessage: "Page Not Found",
		name: "Damiloju"
	});
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
