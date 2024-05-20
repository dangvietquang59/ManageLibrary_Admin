const mongoose = require("mongoose");
async function connect() {
  try {
    mongoose.connect(
      "mongodb+srv://dvquang5902:54hiwo1WmhNao7bR@library-db.c3lwupk.mongodb.net/?retryWrites=true&w=majority&appName=library-db"
    );
    console.log("database Connected!");
  } catch (error) {
    console.log("Connection failure: " + error);
  }
}

module.exports = { connect };
