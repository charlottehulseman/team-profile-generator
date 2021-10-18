const inquirer = require("inquirer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")
const generateHtml = require("./util/generateHtml")
const allEmployees = []
const fs = require("fs")

// Ask a series of questions to user
const managerQuestions = [{
    type: "input",
    message: "What is the manager's name?",
    name: "managerName"
}, {
    type: "input",
    message: "What is the manager's ID?",
    name: "managerId",
}, {
    type: "input",
    message: "What is the manager's email?",
    name: "managerEmail",
}, {
    type: "input",
    message: "What is the manager's office number?",
    name: "managerOfficeNumber",
}]

const engineerQuestions = [{
    type: "input",
    message: "What is the engineer's name?",
    name: "engineerName"
}, {
    type: "input",
    message: "What is the engineer's ID?",
    name: "engineerId",
}, {
    type: "input",
    message: "What is the engineer's email?",
    name: "engineerEmail",
}, {
    type: "input",
    message: "What is the engineer's GitHub?",
    name: "engineerGitHub",
}]

const internQuestions = [{
    type: "input",
    message: "What is the intern's name?",
    name: "internName"
}, {
    type: "input",
    message: "What is the intern's ID?",
    name: "internId",
}, {
    type: "input",
    message: "What is the intern's email?",
    name: "internEmail",
}, {
    type: "input",
    message: "Where does the intern go to school?",
    name: "internSchool",
}]

// Take input and associate with appropriate class
function managerPrompt() {
    inquirer.prompt(managerQuestions)
        .then(function (data) {
            const tempEmployee = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber)

            // Combine objects into an array
            allEmployees.push(tempEmployee)
            secondPrompt()
        }).catch(function (err) {
            console.log(err)
        })
}


function engineerPrompt() {
    inquirer.prompt(engineerQuestions)
        .then(function (data) {
            const tempEmployee = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGitHub)
            // Combine objects into an array
            allEmployees.push(tempEmployee)
            secondPrompt()
        })
}

function internPrompt() {
    inquirer.prompt(internQuestions)
        .then(function (data) {
            const tempEmployee = new Intern(data.internName, data.internId, data.internEmail, data.internSchool)
            // Combine objects into an array
            allEmployees.push(tempEmployee)
            secondPrompt()
        })
}

function secondPrompt() {
    inquirer.prompt([{
        type: "list",
        name: "employeeType",
        message: "Which employee do you want to create?",
        choices: ["Intern", "Engineer", "None"]
    }]).then(function ({ employeeType }) {
        switch (employeeType) {
            case "Intern":
                internPrompt()
                break
            case "Engineer":
                engineerPrompt()
                break
            default:
            const htmlString = generateHtml(allEmployees) 
            // Pass array to generateHtml function
            // Take html string returned, create HTML file

            fs.writeFileSync("./dist/index.html", htmlString)
            

        }
    }).catch(function (err) {
        console.log(err)
    })
}

function init() {
    managerPrompt()
}

init()
