const mongoose = require('mongoose');
const mongourl = 'mongodb+srv://vimalsonagara:Vim635311@cluster0.y9pdl.mongodb.net/goFoodMERN?retryWrites=true&w=majority';

const mongodb = async () => {
    try {
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const data=await fetched_data.find({}).toArray() 
        const catdata = await foodCategory.find({}).toArray();
        global.food_items = data;
        global.foodCategory = catdata;
    }
    catch (err) {
        console.error("Error during MongoDB operation:", err);
    }
};

module.exports = mongodb;
