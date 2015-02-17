(function () {
  "use strict";
  var Foxx = require("org/arangodb/foxx");
  var db = require("internal").db;
  var controller = new Foxx.Controller(applicationContext);
  var joi = require("joi");

  // the collection we're running the searches on
  var completions = db._collection("completions");

  controller.get("/autocomplete", function (req, res) {
    // search phrase entered by user
    var searchString = req.params("q").trim() || "";
    // lower bound for search range
    var begin = searchString.replace(/[^a-zA-Z]/g, " ").toLowerCase();
    if (begin.length === 0) {
      // search phrase is empty - no need to perfom a search at all
      res.json([]);
      return;
    }
  
    // upper bound for search range    
    var end = begin.substr(0, begin.length - 1) + String.fromCharCode(begin.charCodeAt(begin.length - 1) + 1);
    // bind parameters for query
    var queryParams = { 
      "@collection" : "completions",
      "begin" : begin,
      "end" : end
    };
    // the search query
    var query = "FOR doc IN @@collection FILTER doc.lookup >= @begin && doc.lookup < @end SORT doc.lookup RETURN { label: doc.pretty, value: doc.pretty, id: doc._key }";
    res.json(db._query(query, queryParams).toArray());
  }).queryParam("q", {
    description: "The search string",
    type: joi.string().required()
  });
}());
