import mysql from 'mysql2';

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'myRecipes'
});

// Test connection

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// query recipes with beef in the ingredients

// connection.query('SELECT name FROM recipes WHERE ingredient1_id ', (err, results) => {
//     if (err) {
//         console.error('Error querying the database:', err);
//     }
//     console.log('Recipes with beef in the ingredients:', results);
// });

// Join recipes and ingredients tables to get recipes with beef in the ingredients
connection.query('SELECT r.recipe_name FROM recipes r JOIN ingredients i ON r.ingredient1_id = i.ingredient_id WHERE i.ingredient_name = "beef"', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
    }
    console.log('Recipes with beef in the ingredients:', results);
});

// End connection

connection.end((err) => {
    if (err) {
        console.error('Error closing the database:', err);
        return;
    }
    console.log('Closed the database connection');
});
