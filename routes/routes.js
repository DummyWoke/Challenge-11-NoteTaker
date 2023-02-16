

module.exports = app => {

//route to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Get note route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))});


//Get / Return .json
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Get index route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.post("/api/notes", (req, res) => {
    let List = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let length = (List.length).toString();

    //create new property called id based on length and assign it to each json object
    req.body.id = length;
    //push updated note to the data containing notes history in db.json
    List.push(req.body);

    //write the updated data to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(List));
    res.json(List);})

app.delete("/api/notes/:id", (req, res) => {
    let List = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let Id = (req.params.id).toString();

    //filter all notes that does not have matching id and saved them as a new array
    //the matching array will be deleted
    List = List.filter(selected =>{
        return selected.id != Id;
    })

    //write the updated data to db.json and display the updated note
    fs.writeFileSync("./db/db.json", JSON.stringify(List));
    res.json(List);
});


}