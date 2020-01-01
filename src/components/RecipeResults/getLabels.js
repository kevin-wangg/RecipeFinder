var fs = require('fs');

function getLabels() {
	var imageFile = fs.readFileSync('apple.jpg');

	var encoded = Buffer.from(imageFile).toString('base64');
	console.log(encoded);
}

getLabels();

