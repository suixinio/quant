var talib = require('talib');

console.log("TALib Version: " + talib.version);

// Display all available indicator function names
var functions = talib.functions;
for (i in functions) {
    console.log(functions[i].name);
}











