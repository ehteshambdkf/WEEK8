const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/Week8';

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log("Error occurred during connection: " + err);
});

db.once('connected', () => {
    console.log(`Connected to ${MONGO_URI}`);
});


// Task 1

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    Gender: String,
    Salary: Number,
});

const Person = mongoose.model('Person', PersonSchema, 'personCollection');

const person1 = new Person({
    name: 'Jacky',
    age: 36,
    Gender: "Male",
    Salary: 3456,
});

person1.save()
    .then((doc) => {
        console.log("New document added: ", doc);
    })
    .catch((err) => {
        console.error("Error saving document: ", err);
    });


// Task 2

const manyPersons = [
    { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
    { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
    { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
    { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 },
];

Person.insertMany(manyPersons)
    .then(() => {
        console.log("Multiple documents added successfully.");
    })
    .catch((err) => {
        console.error("Error adding documents: ", err);
    });


// Task 3 - Fetch Data

    // Fetch all Document
Person.find().limit(5).then((docs) => {
    console.log("All documents: ", docs);
}).catch((err) => {
    console.error("Error fetching documents: ", err);
});

   // Fetch with Filtering
Person.find({ Gender: "Female", age: { $gt: 25 } }).then((docs) => {
    console.log("Filtered documents: ", docs);
}).catch((err) => {
    console.error("Error fetching documents: ", err);
});


// Task 4 - Count Documents

Person.countDocuments().exec().then((count) => {
    console.log("Total documents count: ", count);
}).catch((err) => {
    console.error("Error counting documents: ", err);
});


// Task 5 - Update Documents

Person.updateMany({ Gender: "Female" }, { Salary: 5555 }).exec().then((result) => {
    console.log("Updated documents: ", result.modifiedCount);
}).catch((err) => {
    console.error("Error updating documents: ", err);
});
