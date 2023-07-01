const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile('./db.json', JSON.stringify(notes))
    console.log(chalk.bgGreen( 'note was added!!!'))
}
async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function redactNotes(id, msg) {
    const notes = await getNotes()
  notes.forEach(note => {
        if(note.id === id) {
            note.id = id
            note.title = msg
        }
        })
    await fs.writeFile('./db.json', JSON.stringify(notes))
}

async function printNotes() {
   const notes =  await getNotes()

    console.log('Here is the list of notes:')
    notes.forEach(note=>{
        console.log(chalk.red(note.title, note.id))
    })
}

async function removeNote(id) {
    const notes = await getNotes()
    const index = notes.findIndex(el => +el.id === id )
    notes.splice(notes[index], 1)
    await fs.writeFile('./db.json', JSON.stringify(notes))

}

module.exports = {
    addNote, printNotes,removeNote, getNotes, redactNotes
}