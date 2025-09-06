const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  fetch("http://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.map(post => post.title));
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });
});



app.listen(3001, () => {
  console.log("Server is running on port 3000");
});