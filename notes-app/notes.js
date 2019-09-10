const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find(note => note.title === title);

	if (!duplicateNote) {
		notes.push({
			title,
			body
		});

		saveNotes(notes);

		console.log(chalk.green("Note added succesfully"));
	} else {
		console.log(chalk.red("Note title taken"));
	}
};

const getNote = title => {
	const notes = loadNotes();
	const note = notes.find(note => note.title === title);

	if (note) {
		console.log(chalk.green(note.title));
		console.log(note.body);
	} else {
		console.log(chalk.red("Note not found"));
	}
};

const getNotes = () => {
	const allNotes = loadNotes();
	allNotes.forEach(note => console.log(note.title));
};

const loadNotes = () => {
	try {
		const notesBuffer = fs.readFileSync("notes.json");
		const notes = notesBuffer.toString();
		return JSON.parse(notes);
	} catch (error) {
		return [];
	}
};

const removeNote = title => {
	const notes = loadNotes();
	const newNotes = notes.filter(note => note.title !== title);

	if (notes.length === newNotes.length) {
		console.log(chalk.red("No note found"));
	} else {
		saveNotes(newNotes);
		console.log(chalk.green("Note removed succesfully"));
	}
};

const saveNotes = notes => {
	const dataJSON = JSON.stringify(notes);

	fs.writeFileSync("notes.json", dataJSON);
};

module.exports = { getNotes, addNote, removeNote, getNote };
