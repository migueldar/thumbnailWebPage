const express = require("express");
const parseMp = require("express-parse-multipart");
const sharp = require("sharp");
const uuid = require("uuid");

let app = express();
app.use(parseMp);

function createResponse(imageName) {
	uuid100 = uuid.v4();
	uuid200 = uuid.v4();
	uuid400 = uuid.v4();

	app.get("/" + uuid100, function (req, res) {
		res.download(__dirname + "/100px" + imageName);
	});
	app.get("/" + uuid200, function (req, res) {
		res.download(__dirname + "/200px" + imageName);
	});
	app.get("/" + uuid400, function (req, res) {
		res.download(__dirname + "/400px" + imageName);
	});

	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Thumbnail</title>
	</head>
	<body>
		<h3> Get your thumbnails now </h3>
		<form action="http://localhost:5000" method="post" enctype="multipart/form-data">
			<p><input type="file" name="myFile">
			<p><button type="submit">Submit</button>
		</form>
		<a id = "img100" href = ${"/" + uuid100}> 100px <br> </a>
		<a id = "img200" href = ${"/" + uuid200}> 200px <br> </a>
		<a id = "img400" href = ${"/" + uuid400}> 400px <br> </a>
	</body>
	</html>`;
}

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});

app.post("/", async function (req, res) {
	imageName = req.formData[0].filename;
	rawImage = req.formData[0].data;
	try {
		await sharp(rawImage)
			.resize(100, 100)
			.toFile(__dirname + "/100px" + imageName);
		await sharp(rawImage)
			.resize(200, 200)
			.toFile(__dirname + "/200px" + imageName);
		await sharp(rawImage)
			.resize(400, 400)
			.toFile(__dirname + "/400px" + imageName);
		res.send(createResponse(imageName));
	} catch (err) {
		res.sendFile(__dirname + "/" + "notAnImage.html");
	}
});

app.listen(5000, () => console.log("Listening in 5000"));
