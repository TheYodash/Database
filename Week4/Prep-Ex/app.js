import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export async function getDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db('myrecipes');
        console.log('Connected to myrecipes database');
        return db;
    }
    catch (e) {
        console.error(`Cannot connect to MongoDB: ${e}`);
    }
}

export async function closeDatabase() {
    try {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
    catch (e) {
        console.error(`Cannot disconnect from MongoDB: ${e}`);
    }
}

async function main() {
    const db = await getDatabase();
    const ingredients = db.collection('ingredients');
    const steps = db.collection('steps');
    const recipes = db.collection('recipes');
    const categories = db.collection('categories');

    // Drop the collections
    await ingredients.drop();
    await steps.drop();
    await recipes.drop();
    await categories.drop();

    // Insert a document into the ingredients collection
    const newIngredient = {
        ingredient_name: 'carrot',
    };
    const result = await ingredients.insertOne(newIngredient);
    console.log(result);
    console.log(`New ingredient created with the following id: ${result.insertedId}`);

    // Insert a document into the steps collection
    const newStep = {
        step_instruction: 'Peel the carrot',
    };
    const result2 = await steps.insertOne(newStep);
    console.log(`New step created with the following id: ${result2.insertedId}`);

    // Insert a document into the categories collection
    const newCategory = {
        category_name: 'appetizer',
    };
    const result3 = await categories.insertOne(newCategory);
    console.log(`New category created with the following id: ${result3.insertedId}`);

    // Insert a document into the recipes collection
    const newRecipe = {
        recipe_name: 'Carrot Soup',
        ingredients: [result.insertedId],
        steps: [result2.insertedId],
        categories: [result3.insertedId],
    };
    const result4 = await recipes.insertOne(newRecipe);
    console.log(`New recipe created with the following id: ${result4.insertedId}`);

    // Find all recipes
    const recipe = await recipes.find({}).toArray();
    console.log(recipe);

    // close the connection
    await closeDatabase();

    }

main().catch(console.error);

