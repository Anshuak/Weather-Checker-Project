const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const hbs = require('hbs');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
    res.render('index');
})


app.get("/about", (req, res) => {
    res.render("about");
})


app.get("/weather", (req, res) => {
    res.render("weather");
})

app.get("*", (req, res) => {
    res.render("404error", {
        errormsg: "Oops! PAGE NOT FOUND"
    });
})
app.listen(port, () => {
    console.log(`Listening to the server with Port = ${port} `);
})