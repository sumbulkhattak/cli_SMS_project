#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';

interface Student {
    id: number;
    name: string;
    age: number;
    grade: string;
    address: string;
    contact: string;
}

const students: Student[] = [];

async function main() {
    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: chalk.bold.underline.yellow('Choose an action:'),
                choices: ['Add Student', 'View All Students', 'Search Student', 'Remove Student', 'Exit']
            }
        ]);

        if (choice === 'Add Student') {
            const studentData = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: chalk.italic.blue('Enter student ID:')
                },
                {
                    type: 'input',
                    name: 'name',
                    message: chalk.green.bold.italic('Enter student name:')
                },
                {
                    type: 'input',
                    name: 'age',
                    message: chalk.blue.bold.italic('Enter student age:')
                },
                {
                    type: 'input',
                    name: 'grade',
                    message: chalk.green.bold.italic('Enter student grade:')
                },
                {
                    type: 'input',
                    name: 'address',
                    message: chalk.blue.bold.italic('Enter student address:')
                },
                {
                    type: 'input',
                    name: 'contact',
                    message: chalk.green.bold.italic('Enter student contact number:')
                }
            ]);
            const id = parseFloat(studentData.id)
            const student: Student = {
                id: isNaN(id) ? 0 : id,
                name: studentData.name,
                age: studentData.age,
                grade: studentData.grade,
                address: studentData.address,
                contact: studentData.contact
            };
            students.push(student);
            console.log(chalk.bold.underline.magenta('\n\t\t\tStudent added successfully!\n'));

        } else if (choice === 'View All Students') {
            if (students.length === 0) {
                console.log(chalk.bold.red('No students found.\n'));
            } else {
                console.log(chalk.bold.red.underline.italic('All Students:'));
                students.forEach(student => {
                    console.log(chalk.bold.cyan("student id" , student.id))
                    console.log(chalk.bold.cyan("student age" , student.age))
                    console.log(chalk.bold.cyan("student name" , student.name))
                    console.log(chalk.bold.cyan("student grade" , student.grade))
                    console.log(chalk.bold.cyan("student address" , student.address))
                    console.log(chalk.bold.cyan("student contect" , student.contact))
                    console.log(chalk.bold.yellow("------------------------------------------"))
                });
                
                console.log();
            }

        } else if (choice === 'Search Student') {
            const { searchId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'searchId',
                    message: chalk.bold.italic.yellow.underline('Enter ID of the student to search:')
                }
            ]);
            const student = students.find(s => s.id === parseFloat(searchId));
            if (student) {
                console.log(chalk.red.bold.underline('Student found:'));
                console.log(chalk.bold.magenta("student id" , student.id))
                console.log(chalk.bold.magenta("student age" , student.age))
                console.log(chalk.bold.magenta("student name" , student.name))
                console.log(chalk.bold.magenta("student grade" , student.grade))
                console.log(chalk.bold.magenta("student address" , student.address))
                console.log(chalk.bold.magenta("student contect" , student.contact))
                console.log(chalk.bold.magenta("------------------------------------------"))
                
            } else {
                console.log(chalk.bold.red('\n\t\t\tStudent not found.\n'));
            }
            
        } else if (choice === 'Remove Student') {
            const { removeId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'removeId',
                    message: chalk.bold.italic.yellow.underline('Enter ID of the student to remove:')
                }
            ]);
            const index = students.findIndex(s => s.id === parseFloat(removeId));
            if (index !== -1) {
                students.splice(index, 1);
                console.log(chalk.bold.underline.magenta('\n\t\t\tStudent removed successfully!\n'));
            } else {
                console.log(chalk.red.bold('\n\t\t\tStudent not found.\n'));
            }
        } else {
            console.log(chalk.bold.red('\n\t\t\tExiting program...'));
            process.exit();
        }
    }
}

main();