var express = require("express");
var fs = require("fs");
var compareArrays = require("./util/compareArrays");
var app = express();
var prevArray = [ {_id:1, someKey: "RINGING", meta: { subKey1: 1234, subKey2: 52 } } ];
    var currArray = [ {_id:1, someKey: "HANGUP",  meta: { subKey1: 1234 } },
        {_id:2, someKey: "RINGING", meta: { subKey1: 5678, subKey2: 207, subKey3: 52 } } ];

app.get('/', function (req,res){
    res.send(compareArrays.arrayDiffToHtmlTable(prevArray, currArray));
});

app.listen(8080,function (){
   console.log("Tenfold sample app listening on port 8080");
});