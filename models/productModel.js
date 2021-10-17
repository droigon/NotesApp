let notes = require('../data/notes')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(notes)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const note = notes.find((p) => p.id === id)
        resolve(note)
    })
}

function create(note) {
    return new Promise((resolve, reject) => {
        const newNote = {id: uuidv4(), ...note}
        notes.push(newNote)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/notes.json', notes);
            console.log("sdfdfsdf")
        }
        resolve(newNote)
    })
}

function update(id, note) {
    return new Promise((resolve, reject) => {
        const index = notes.findIndex((p) => p.id === id)
        notes[index] = {id, ...note}
        if (process.env.NODE_ENV !== 'test') {
        }
        resolve(notes[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        notes = notes.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/notes.json', notes);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}