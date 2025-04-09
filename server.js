// https://www.youtube.com/watch?v=SccSCuHhOw0  just watched this guy and basically followed most of wat he did

const express = require("express")
const app =express()
const path = require('path');
//  if i use this it doesnt load home.ejs // app.use(express.static("public"));

//middle ware 

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log('Request received:', req.url);
    next();
  });
  

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('home');
}) 

app.get("/greeting/:name", (req, res) => {
    res.render('greeting', { name: req.params.name });
})

app.post("/submit", (req, res) => {
    console.log('Form data received:', req.body);
    res.redirect('/greeting/' + req.body.username);
})

app.get("/download", (req, res) => {
    const filePath = path.join(__dirname, 'public', 'cat.png');
    res.download(filePath);
})


app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke ugh');
});


app.listen(3000)