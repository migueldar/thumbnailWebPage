const express = require("express");
const parseMp = require("express-parse-multipart");
const sharp = require("sharp")

let app = express();
app.use(parseMp);

function createResponse(imageName) {
	app.get("/100px" + imageName, function(req, res){
		res.download(__dirname + "/100px" + imageName)
	})
	
	app.get("/200px" + imageName, function(req, res){
		res.download(__dirname + "/100px" + imageName)
	})
	
	app.get("/400px" + imageName, function(req, res){
		res.download(__dirname + "/100px" + imageName)
	})

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
		<a id = "img100" href = ${"/100px" + imageName}> 100px </a>
		<a id = "img200" href = ${"/200px" + imageName}> 200px </a>
		<a id = "img400" href = ${"/400px" + imageName}> 400px </a>
	</body>
	</html>`
}

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});

app.post("/", function (req, res) {
	imageName = req.formData[0].filename;
	rawImage = req.formData[0].data;
	sharp(rawImage).resize(100, 100).toFile(__dirname + "/100px" + imageName);
    sharp(rawImage).resize(200, 200).toFile(__dirname + "/200px" + imageName);
    sharp(rawImage).resize(400, 400).toFile(__dirname + "/400px" + imageName);
    res.send(createResponse(imageName));
});

app.listen(5000, () => console.log("Listening in 5000"));