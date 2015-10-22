var parsedJSON = require('./data.json');
var fs = require('fs');

var result = parsedJSON.map(function(obj){
	return {
		[obj.iconclass_id]: {
			"iconclass_id": obj.iconclass_id,
			"beschrijving": obj.beschrijving
		}
	}
});

var resultString = JSON.stringify(result);

fs.writeFile('datatroughfs.json', resultString);

// data.map(value, index){
// 	return {
// 		parsedJSON.iconclass_id {
// 			"iconclass_id": parsedJSON.iconclass_id
// 			"beschrijving": parsedJSON.beschrijving
// 		}
// 	}
// };