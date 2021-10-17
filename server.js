const http = require('http')
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('./controllers/productController')

const server = http.createServer((req, res) => {
    if(req.url === '/api/notes' && req.method === 'GET') {
        getNotes(req, res)
    } else if(req.url.match(/\/api\/notes\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getNote(req, res, id)
    } else if(req.url === '/api/notes' && req.method === 'POST') {
        createNote(req, res)
    } else if(req.url.match(/\/api\/notes\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateNote(req, res, id)
    } else if(req.url.match(/\/api\/notes\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteNote(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

const PORT =  process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;
