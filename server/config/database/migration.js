import db from "./connection.js";

db.serialize(() => {
  
});

db.close((error) => {
  if (error) {
    console.error('Error closing database:', error.message);
  } else {
    console.log('Database connection closed.');
  }
});