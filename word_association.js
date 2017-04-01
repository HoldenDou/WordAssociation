var https = require("https");
var _und = require("underscore");
// GET https://twinword-word-associations-v1.p.mashape.com/associations/
// X-Mashape-Key=t6GU3q78m5msh22vOrxFusXZRMqwp1TmZgTjsnBEHIoHRWic2t
// https://twinword-word-associations-v1.p.mashape.com/associations/?entry=On+the+farm

function findBestAssociation (word1, word2, numWords, callback) {
    if(!callback) {
        callback = findBestAssociationCallback;
    }
    var request = https.request({
        hostname: "twinword-word-associations-v1.p.mashape.com",
        method: "GET",
        headers: {
            "X-Mashape-Key": "t6GU3q78m5msh22vOrxFusXZRMqwp1TmZgTjsnBEHIoHRWic2t",
            "Accept": "application/json"
        },
        path: "/associations/?entry=" + encodeURIComponent(word1)
    }, function (response) {
        response.on("data", function (chunk) {
            var wordAssArray = JSON.parse(chunk.toString()).associations_array;
            callback(wordAssArray, word2, numWords);
        })
    });
    request.end(null);
}

function findBestAssociationCallback (wordAssArray, word2, numWords) {
    var request = https.request({
        hostname: "twinword-word-associations-v1.p.mashape.com",
        method: "GET",
        headers: {
            "X-Mashape-Key": "t6GU3q78m5msh22vOrxFusXZRMqwp1TmZgTjsnBEHIoHRWic2t",
            "Accept": "application/json"
        },
        path: "/associations/?entry=" + encodeURIComponent(word2)
    }, function (response) {
        response.on("data", function (chunk) {
            var wordAssArray2 = JSON.parse(chunk.toString()).associations_array;
            console.log(_und.intersection(wordAssArray, wordAssArray2).filter(function (word) {
                return word.length == numWords;
            }));;
        })
    });
    request.end(null);
}

module.exports = findBestAssociation;
