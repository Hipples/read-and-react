/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('bookstoreDB');


db.getCollection('books').insertMany([
  {
    "_id": 0,
    "title": "Under the Banner of Heaven A Story of Violent Faith",
    "author": "Jon Krakauer",
    "genre": "True Crime",
    "type": "Used Trade Paperback",
    "price": 10.95,
    "cover_url": "https://covers.powells.com/9781400032808.jpg",
    "ISBN": 9781400032808
  },
  {
    "_id": 1,
    "title": "A Deadly Education (The Scholomance #1)",
    "author": "Naomi Novik",
    "genre": "Science Fiction and Fantasy",
    "type": "New Trade Paperback",
    "price": 18.00,
    "cover_url": "https://covers.powells.com/9780593128503.jpg",
    "ISBN": 9780593128503
  },
  {
    "_id": 2,
    "title": "Microsoft SQL Server 2005: The Complete Reference: Full Coverage of All New and Improved Features",
    "author": "Jeffrey Shapiro",
    "genre": "Computers and Internet",
    "type": "New Trade Paperback",
    "price": 64.00,
    "cover_url": "https://covers.powells.com/9780072261523.jpg",
    "ISBN": 9780072261523
  },
  {
    "_id": 3,
    "title": "I'll Be Gone in the Dark: One Woman's Obsessive Search for the Golden State Killer",
    "author": "Michelle McNamara",
    "genre": "True Crime",
    "type": "Used Hardcover",
    "price": 13.95,
    "cover_url": "https://covers.powells.com/9780062319784.jpg",
    "ISBN": 9780062319784
  },
  {
    "_id": 4,
    "title": "Stolen Focus Why You Cant Pay Attention & How to Think Deeply Again",
    "author": "Johann Hari",
    "genre": "Computers and Internet",
    "type": "New Trade Paperback",
    "price": 18.00,
    "cover_url": "https://covers.powells.com/9780593138533.jpg",
    "ISBN": 9780593138533
  },
  {
    "_id": 5,
    "title": "Little Witch Hazel: A Year in the Forest",
    "author": "Phoebe Wahl",
    "genre": "Picture Books",
    "type": "New Hardcover",
    "price": 19.99,
    "cover_url": "https://covers.powells.com/9780735264892.jpg",
    "ISBN": 9780735264892
  },
  {
    "_id": 6,
    "title": "The Devil in the White City: Murder  Magic  and Madness at the Fair That Changed America",
    "author": "Erik Larson",
    "genre": "True Crime",
    "type": "Used Trade Paperback",
    "price": 10.95,
    "cover_url": "https://covers.powells.com/9780375725609.jpg",
    "ISBN": 9780375725609
  },
  {
    "_id": 7,
    "title": "Norse Mythology",
    "author": "Neil Gaiman",
    "genre": "Science Fiction and Fantasy",
    "type": "New Trade Paperback",
    "price": 15.95,
    "cover_url": "https://covers.powells.com/9780393356182.jpg",
    "ISBN": 9780393356182
  },
  {
    "_id": 8,
    "title": "The Art Thief: A True Story of Love  Crime  and a Dangerous Obsession",
    "author": "Michael Finkel",
    "genre": "True Crime",
    "type": "New Hardcover",
    "price": 28.00,
    "cover_url": "https://covers.powells.com/9780525657323.jpg",
    "ISBN": 9780525657323
  },
  {
    "_id": 9,
    "title": "If You Tell: A True Story of Murder Family Secrets and the Unbreakable Bond of Sisterhood",
    "author": "Gregg Olsen",
    "genre": "True Crime",
    "type": "Used Trade Paperback",
    "price": 10.95,
    "cover_url": "https://covers.powells.com/9781542005234.jpg",
    "ISBN": 9781542005234
  }
])


db.getCollection('books').find({_id: 1});


db.books.aggregate([
  { $group: { _id: "$genre", count: { $sum: 1 } } }
]);

db.books.aggregate([
  { $group: { _id: null, maxPrice: { $max: "$price" } } }
]);

db.books.aggregate([
  { $group: { _id: null, minPrice: { $min: "$price" } } }
]);

db.books.aggregate([
  { $group: { _id: "$genre", totalRevenue: { $sum: "$price" } } }
]);

db.books.aggregate([
  {
    $group: {
      _id: "$type",
      books: {
        $push: {
          title: "$title",
          author: "$author",
          price: "$price"
        }
      }
    }
  }
]);


