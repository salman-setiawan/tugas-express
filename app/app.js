// import dependensi
const express = require('express')
const cors = require('cors')
const app = express()

// port
const port = 3000

// dummy data
const hewan = [
  {id: 1, nama: 'Snowy', spesies: 'kucing'},
  {id: 2, nama: 'Blacki', spesies: 'anjing'},
  {id: 3, nama: 'Molly', spesies: 'kucing'},
  {id: 4, nama: 'Milo', spesies: 'kelinci'},
  {id: 5, nama: 'Rere', spesies: 'kucing'},
]

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// middleware untuk nomor 2
const postChecker = (req, res, next) => {
  const spesies = req.body.spesies
  const error = "spesies not valid"
  if (spesies != 'kucing' && spesies != 'kelinci' && spesies != 'anjing') {
    return res.status(400).json({error})
  }
  else {next()}
}

// route awal
app.get("/", (req, res) => {
  res.status(200).send("Hello, Dunia Hewan");
});

// route get all hewan
app.get("/hewan", (req, res) => {
  const message = "success get data pets"
  res.status(200).json({message, hewan});
});

// route post hewan (sudah ditambah middleware postChecker)
app.post("/hewan", postChecker, (req, res) => {
  const {nama, spesies} = req.body
  const message = "success adding one pet"
  const newHewan = {
    id : hewan.length + 1,
    nama : nama,
    spesies : spesies
  };
  hewan.push(newHewan);
  res.status(201)
  res.json({message, hewan});
});

// route get hewan by id
app.get("/hewan/:id", (req, res) => {
  const hewanFilter = hewan.find(hewani => hewani.id === Number(req.params.id))
  if (hewanFilter) {
    const message = "success get data pet"
    res.json({message, hewanFilter})
  } else {
    res.status(400).send("id not find")
  }
});

// route update hewan by id
app.put("/hewan/:id", (req, res) => {
  const hewanFilter = hewan.find(hewani => hewani.id === Number(req.params.id))
  const {nama, spesies} = req.body
  if(hewanFilter) {
    const message = "success update one pet"
    hewanFilter.nama = nama
    hewanFilter.spesies = spesies
    res.status(201)
    res.json({message, hewanFilter});
  } else {
    res.status(400).send("id not find")
  }
});

// route delete by id
app.delete("/hewan/:id", (req, res) => {
  const hewanFilter = hewan.find(hewani => hewani.id === Number(req.params.id))
  if(hewanFilter){
    const message = "success delete one pet"
    hewan.splice(Number(req.params.id) - 1, 1)
    res.json({message, hewan});
  } else {
    res.status(400).send("id not find")
  }
});

// server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log("this is logger")
})