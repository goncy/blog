import { database } from "../firebase";

export default {
  add: (user, todo) =>
    database
      .collection("users")
      .doc(user)
      .collection("todos")
      .add(todo),
  remove: (user, id) =>
    database
      .collection("users")
      .doc(user)
      .collection("todos")
      .doc(id)
      .delete(),
  onChange: (user, callback) =>
    database
      .collection("users")
      .doc(user)
      .collection("todos")
      .onSnapshot(snapshot => callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()})))),
};
