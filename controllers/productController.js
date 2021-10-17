const Note = require('../models/productModel')

const { getPostData } = require('../utils')

// @desc    Gets All Notes
// @route   GET /api/notes
async function getNotes(req, res) {
    try {
        const notes = await Note.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(notes))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Note
// @route   GET /api/note/:id
async function getNote(req, res, id) {
    try {
        const note = await Note.findById(id)

        if(!note) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Note Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            const fs = require('fs')
            fs.readFile('./notes/'+note.description, 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(data)
            })
            console.log("content of the note")
            res.end(JSON.stringify(note))
            
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Note
// @route   POST /api/notes
async function createNote(req, res) {
    try {
        const body = await getPostData(req)

        const { name, description, price } = JSON.parse(body)

        const note = {
            name,
            description,
            price
        }

        const newNote = await Note.create(note)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newNote))
        
        

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a Note
// @route   PUT /api/notes/:id
async function updateNote(req, res, id) {
    try {
        const note = await Note.findById(id)

        if(!note) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Note Not Found' }))
        } else {
            const body = await getPostData(req)

            const { name, description, price } = JSON.parse(body)

            const noteData = {
                name: name || note.name,
                description: description || note.description,
                price: price || note.price
            }

            const updNote = await Note.update(id, noteData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updNote)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Note
// @route   DELETE /api/note/:id
async function deleteNote(req, res, id) {
    try {
        const note = await Note.findById(id)

        if(!note) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Note Not Found' }))
        } else {
            await Note.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Note ${id} removed` }))
            const fs = require('fs');
            // delete the file
            fs.unlink('./notes/'+note.description, (err) => {
                if (err) {
                    throw err;
                }
                console.log("File is deleted.");
            });

        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}

