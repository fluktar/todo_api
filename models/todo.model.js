const db = require("../data/database");
const mongodb = require("mongodb");
class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
  static async getTodos() {
    const todoDocument = await db.getDb().collection("todos").find().toArray();
    
    return todoDocument.map(function (todoDocument) {
      return new Todo(todoDocument.text, todoDocument._id);
    });
  }
  save() {
    if (this.id) {
      const todoId = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("todos")
        .updateOne({ _id: todoId }, { $set: { text: this.text } });
    } else {
      return db.getDb().collection("todos").insertOne({ text: this.text });
    }
  }
  delete() {
    if (!this.id) {
      console.log("brak takiej pozycji");
      throw new Error("Trying to delete todo without id!");
    }
    const todoId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("todos").deleteOne({ _id: todoId });
  }
}

module.exports = Todo;
