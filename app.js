const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.listen(5000, () => {
  console.log("Application started and Listening on port 5000");
});

// serve your css as static
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.render('/index') 
  //res.json({"message":"Ok"})
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

