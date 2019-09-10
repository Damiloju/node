const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

/**
 *  Customize Yargs
 *
 * Update Version
 * Create add Command
 * Create remove Command
 * Create list Command
 * Create read Command
 * */

yargs.version("1.1.0");

yargs.command({
	command: "add",
	describe: "Add a new Note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string"
		},
		body: {
			describe: "Body of the note",
			demandOption: true,
			type: "string"
		}
	},
	handler: argv => {
		console.log(chalk.blue(`Adding note...........`));
		notes.addNote(argv.title, argv.body);
	}
});

yargs.command({
	command: "remove",
	describe: "Remove a new Note",
	builder: {
		title: {
			describe: "Title of the note",
			demandOption: true,
			type: "string"
		}
	},
	handler: argv => {
		console.log(chalk.blue("Removing note....."));
		notes.removeNote(argv.title);
	}
});

yargs.command({
	command: "list",
	describe: "List all Notes",
	handler: () => {
		console.log(chalk.blue("Your notes....."));
		notes.getNotes();
	}
});

yargs.command({
	command: "read",
	describe: "Read a Note",
	builder: {
		title: {
			describe: "Title of the note",
			demandOption: true,
			type: "string"
		}
	},
	handler: argv => {
		notes.getNote(argv.title);
	}
});

/** end customization */

yargs.parse();
