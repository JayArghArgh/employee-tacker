"use strict";
const inquirer = require('inquirer');
const mysql = require('mysql');
const ADD = "ADD";
const VIEW = "VIEW";
const UPDATE = "UPDATE";

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'himypal',
	database: 'emp_tracker_db',
});

const addItem = (tableName, itemsToAdd) => {
	const query = "INSERT INTO ?? SET ?";
	let values = itemsToAdd;
	connection.query(query, [tableName, values], (err, result) => {
		if (err) throw err;
		console.log(result);
	});
};

const viewItem = (tableName) => {
	const query = 'SELECT * FROM ?';
	connection.query(query, tableName, (err, res) => {
		console.log("view");
	})
};

const updateItem = (tableName) => {
	const query = 'SELECT * FROM ?';
	connection.query(query, tableName, (err, res) => {
		console.log("updating");
	})
};

const mainMenu = () => {
	inquirer.prompt(
		{
			name: 'selectAction',
			type: 'list',
			message: 'Please select an action',
			choices: [ADD, VIEW, UPDATE],
		}
	).then((answer) => {
		switch (answer.selectAction) {
			case (ADD):
				console.log("adding");
				break;
			case (VIEW):
				console.log("viewin");
				break;
			case (UPDATE):
				console.log("updating");
				break;
			default:
				console.log("peace!");
				break;
		}
		connection.end();
	});
}

connection.connect((err) => {
	if(err) throw err;
	// addItem("department", {title: "survey"});
	// addItem("role", {title: "Surveyor", salary: 99999.99, department_id: 1});
	// addItem("employee",
	// 	{first_name: "Frank", last_name: "Beans", role_id: 1, manager_id: 1});
	// connection.end();
	mainMenu();
});
