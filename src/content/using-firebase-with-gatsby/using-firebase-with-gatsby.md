---
layout: post
title: Using Firbase with Gatsby
image: assets/cover.jpg
author: goncy
permalink: using-firebase-with-gatsby
date: 2020-03-23T07:03:47.149Z
draft: false
tags: 
  - Firebase
  - Tips
  - React
  - Gatsby
---

I struggled a lot with this because you don't have the window object when trying to initialize firebase, so every post I found in how to solve it propones to create a method to check if it was initialized and save the instance to a variable.

I don't like that, I just want to use it without caring if I have to initialize it or not.

This is how I solved it:

```js
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

export default new Proxy(
  {
    get database() {
      return firebase.firestore();
    },
    get auth() {
      return firebase.auth();
    },
    providers: {
      get google() {
        return new firebase.auth.GoogleAuthProvider();
      },
    },
  },
  {
    get: function(target, name) {
      if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: process.env.GATSBY_API_KEY,
          authDomain: process.env.GATSBY_AUTH_DOMAIN,
          databaseURL: process.env.GATSBY_DATABASE_URL,
          projectId: process.env.GATSBY_PROJECT_ID,
          storageBucket: process.env.GATSBY_STORAGE_BUCKET,
          messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
          appId: process.env.GATSBY_APP_ID,
        });
      }

      return target[name];
    },
  }
);
```

This way we always check if firebase is initialized without the need of doing it explicitly, just be sure to have the window object when you call a method.

Example of use:
```js
import firebase from "../firebase";
import { IUser } from "../session";

import { ITodo } from "./types";

export default {
  add: (user: IUser["uid"], todo: Partial<ITodo>) =>
    firebase.database
      .collection("users")
      .doc(user)
      .collection("todos")
      .add(todo),
  update: (user: IUser["uid"], todo: ITodo) =>
    firebase.database
      .collection("users")
      .doc(user)
      .collection("todos")
      .doc(todo.id)
      .update(todo),
  remove: (user: IUser["uid"], id: ITodo["id"]) =>
    firebase.database
      .collection("users")
      .doc(user)
      .collection("todos")
      .doc(id)
      .delete(),
  onChange: (user: IUser["uid"], callback: (todos: ITodo[]) => void) =>
    firebase.database
      .collection("users")
      .doc(user)
      .collection("todos")
      .onSnapshot(snapshot => callback(snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as ITodo) })))),
};
```

You can find the full repo where this is being used in here:
https://github.com/goncy/typescript-firebase-context-gatsby-todos
