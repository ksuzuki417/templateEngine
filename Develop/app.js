//linking team info
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// requirements
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// an empty array for team members to be added
const team = [];
//output resulsts
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const keyQuestion = [
    {
        type: "list",
        message: "Which role would like to add to your team?",
        choices: ["A Manager", "An Engineer", "An Intern", "Done"],
        name: "role"
    },
    
];

const managerQuestions = [
    {
        type: "input",
        message: "What is your manager's name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your manager's email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is your manager's ID number?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber",
    }
];

const engineerQuestions = [
    {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your engineer's email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is your engineer's ID number?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your engineer's Github username?",
        name: "github",
    }
];

const internQuestions = [
    {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your intern's email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is your intern's ID number?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your intern's school name?",
        name: "school",
    }
];


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function newTeam () {
    inquirer.prompt(keyQuestion)
    .then(function(response){
        switch (response.role) {
            case "A Manager":
                manager()
                break;
            case "An Engineer":
                engineer()
                break;
            case "An Intern":
                intern()
                break;
            case "Done":
                render(team)
                break;
        }
    });
}

function manager () {
    inquirer.prompt(managerQuestions)
    .then(function (response) {
        const newMgr = new Manager(response.name, response.email, response.id, response.officeNumber)
        team.push(newMgr)
        newTeam();    
    })
    .then(function() {
        console.log("a manager is added!")
    })
    .catch(function(err) {
        console.log(err);
    })
};
function engineer () {
    inquirer.prompt(engineerQuestions)
    .then(function (response) {
        const newEng = new Engineer(response.name, response.email, response.id, response.github)
        team.push(newEng)
        newTeam();
    })
    .then(function() {
        console.log("an engineer is added!")
    })
    .catch(function(err) {
        console.log(err);
    })
};
function intern () {
    inquirer.prompt(internQuestions)
    .then(function (response) {
        const newInt = new Intern(response.name, response.email, response.id, response.school)
        team.push(newInt)
        newTeam();
    })
    .then(function() {
        console.log("an intern is added!")
    })
    .catch(function(err) {
        console.log(err);
    })
};


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function generateTeam() {
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath)
    };
    fs.writeFileSync(outputPath, render(team), "utf-8");
    console.log("Your team is complete!")
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

generateTeam();


newTeam();