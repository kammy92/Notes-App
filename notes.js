const chalk = require('chalk')
const fs = require('fs')

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgBlue("Your Notes"))
    notes.forEach(note => {
        console.log("Title: " + note.title)
        console.log("Body: " + note.body)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find(note => note.title === title)
    if (noteFound) {
        console.log(chalk.bgBlue("Note Found"))
        console.log(chalk.bgGreen("Title: " + noteFound.title))
        console.log(chalk.bgGreen("Body: " + noteFound.body))
    } else {
        console.log(chalk.bgRed("No Note found?"))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)
    if (duplicateNote) {
        console.log(chalk.bgRed("Note already added!"))
    } else {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen("New note added!"))
    }
}


const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter(note => note.title != title)
    if (notes.length > filteredNotes.length) {
        saveNotes(filteredNotes)
        console.log(chalk.bgGreen("Note removed!"))
    } else {
        console.log(chalk.bgRed("No note found!"))
    }
}

const saveNotes = (notes) => fs.writeFileSync("notes.json", JSON.stringify(notes))

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync("notes.json").toString())
    } catch (e) {
        return []
    }
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
}