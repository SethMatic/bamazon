var inquirer = require('inquirer');
var mysql = require('mysql')
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err, res) {
    if (err) {
        throw err;
    } else {

    }
})


inquirer
    .prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "selection",
            choices: ['Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        },

    ])
    .then(function (answers) {
        var selection = answers.selection;
        if (selection === 'Products for Sale') {
            connection.query("SELECT * FROM product", function (err, result) {
                if (err) {
                    throw err;
                }
                console.table(result);
            })

        } else if (selection === 'View Low Inventory') {
            connection.query('SELECT * FROM product WHERE stock_quantity < 5', function (err, result) {
                if (err) {
                    throw err;
                }
                console.table(result);
            })

        } else if (selection === 'Add to Inventory') {
            connection.query("SELECT * FROM product", function (err, result) {
                if (err) {
                    throw err;
                }
                console.table(result);
                var choices = [];
                for (var i = 0; i < result.length; i++) {
                    choices.push(result[i].item_id + '');
                }

                inquirer.prompt([{
                        type: "list",
                        message: "What item would you like add stock to?",
                        name: "item_id",
                        choices: choices
                    },
                    {
                        type: "input",
                        message: "How many would you like to add?",
                        name: "quantity"
                    }
                ]).then(function (answers) {
                    connection.query("SELECT * FROM product WHERE item_id = ?", [answers.item_id], function (err, result) {
                        if (err) {
                            throw err;
                        }
                        var quantity = result[0].stock_quantity;


                        connection.query("UPDATE product SET ? WHERE item_id = ?", [{
                            stock_quantity: parseInt(quantity) + parseInt(answers.quantity)
                        }, answers.item_id], function (err, result) {
                            if (err) {
                                throw err;
                            }
                            console.log(result);

                        })
                    })

                });

            });


        } else if (selection === 'Add New Product') {
            connection.query("SELECT * FROM department", function (err, result) {
                if (err) {
                    throw err;
                }
                console.table(result);
                var choices = [];
                for (var i = 0; i < result.length; i++) {
                    choices.push(result[i].department_id + '');
                }

                inquirer.prompt([{
                        type: "input",
                        message: "What is the name of Product?",
                        name: "product_name"
                    },
                    {
                        type: "input",
                        message: "How much does product cost?",
                        name: "price",
                    },
                    {
                        type: "input",
                        message: "How many do you have in stock already?",
                        name: "stock_quantity"
                    },
                    {
                        type: "list",
                        message: "What department do you want to add to?",
                        name: "department_id",
                        choices: choices
                    }
                ]).then(function (answers) {
                    connection.query('INSERT INTO product SET ?',[{
                               product_name: answers.product_name,
                               price: parseFloat(answers.price),
                               stock_quantity:parseInt(answers.stock_quantity),
                               department_id: parseInt(answers.department_id),
                               product_sales:0
                                }],
                        function (err, result) {
                            if (err){
                                throw err;
                            }
                            console.log(result)
                        });

                });
            });
        }
    });