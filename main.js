#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const students = [];
async function main() {
    while (true) {
        const { choice } = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'choice',
                message: chalk_1.default.bold.underline.yellow('Choose an action:'),
                choices: ['Add Student', 'View All Students', 'Search Student', 'Remove Student', 'Exit']
            }
        ]);
        if (choice === 'Add Student') {
            const studentData = await inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: chalk_1.default.italic.blue('Enter student ID:')
                },
                {
                    type: 'input',
                    name: 'name',
                    message: chalk_1.default.green.bold.italic('Enter student name:')
                },
                {
                    type: 'input',
                    name: 'age',
                    message: chalk_1.default.blue.bold.italic('Enter student age:')
                },
                {
                    type: 'input',
                    name: 'grade',
                    message: chalk_1.default.green.bold.italic('Enter student grade:')
                },
                {
                    type: 'input',
                    name: 'address',
                    message: chalk_1.default.blue.bold.italic('Enter student address:')
                },
                {
                    type: 'input',
                    name: 'contact',
                    message: chalk_1.default.green.bold.italic('Enter student contact number:')
                }
            ]);
            const id = parseFloat(studentData.id);
            const student = {
                id: isNaN(id) ? 0 : id,
                name: studentData.name,
                age: studentData.age,
                grade: studentData.grade,
                address: studentData.address,
                contact: studentData.contact
            };
            students.push(student);
            console.log(chalk_1.default.bold.underline.magenta('\n\t\t\tStudent added successfully!\n'));
        }
        else if (choice === 'View All Students') {
            if (students.length === 0) {
                console.log(chalk_1.default.bold.red('No students found.\n'));
            }
            else {
                console.log(chalk_1.default.bold.red.underline.italic('All Students:'));
                students.forEach(student => {
                    console.log(chalk_1.default.bold.cyan("student id", student.id));
                    console.log(chalk_1.default.bold.cyan("student age", student.age));
                    console.log(chalk_1.default.bold.cyan("student name", student.name));
                    console.log(chalk_1.default.bold.cyan("student grade", student.grade));
                    console.log(chalk_1.default.bold.cyan("student address", student.address));
                    console.log(chalk_1.default.bold.cyan("student contect", student.contact));
                    console.log(chalk_1.default.bold.yellow("------------------------------------------"));
                });
                console.log();
            }
        }
        else if (choice === 'Search Student') {
            const { searchId } = await inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'searchId',
                    message: chalk_1.default.bold.italic.yellow.underline('Enter ID of the student to search:')
                }
            ]);
            const student = students.find(s => s.id === parseFloat(searchId));
            if (student) {
                console.log(chalk_1.default.red.bold.underline('Student found:'));
                console.log(chalk_1.default.bold.magenta("student id", student.id));
                console.log(chalk_1.default.bold.magenta("student age", student.age));
                console.log(chalk_1.default.bold.magenta("student name", student.name));
                console.log(chalk_1.default.bold.magenta("student grade", student.grade));
                console.log(chalk_1.default.bold.magenta("student address", student.address));
                console.log(chalk_1.default.bold.magenta("student contect", student.contact));
                console.log(chalk_1.default.bold.magenta("------------------------------------------"));
            }
            else {
                console.log(chalk_1.default.bold.red('\n\t\t\tStudent not found.\n'));
            }
        }
        else if (choice === 'Remove Student') {
            const { removeId } = await inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'removeId',
                    message: chalk_1.default.bold.italic.yellow.underline('Enter ID of the student to remove:')
                }
            ]);
            const index = students.findIndex(s => s.id === parseFloat(removeId));
            if (index !== -1) {
                students.splice(index, 1);
                console.log(chalk_1.default.bold.underline.magenta('\n\t\t\tStudent removed successfully!\n'));
            }
            else {
                console.log(chalk_1.default.red.bold('\n\t\t\tStudent not found.\n'));
            }
        }
        else {
            console.log(chalk_1.default.bold.red('\n\t\t\tExiting program...'));
            process.exit();
        }
    }
}
main();
