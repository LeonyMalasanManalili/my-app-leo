import * as React from "react";
import { useState, useEffect } from 'react';
import styles from "./App.module.css";

export interface Post {
  id: number | null;
  title: string | null;
  text: string | null;
}

export default function App() {
  let [index, setIndex] = React.useState<number>(1);
  
  function onlyAvanti(){  
  if(index < 1){
    setIndex(index +1);
    alert("non puoi scendere piu di 0")
  }
  else
  setIndex(index -1)
  }

  const [post, setPost] = React.useState<Post>({
    id: null,
    title: null,
    text: null,
  });

  React.useEffect(() => {
    Fetchami();
  }, [index]);

  function Fetchami() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${index}`)
    .then((res) => res.json())
    .then((res) => {
      setPost({ id: res.id, title: res.title, text: res.body });
    });
  }

  return (

    <div className={styles.container}>
      {/* card container */}
      <div className={styles["card-container"]}>
        <div className={styles.card}>
          <h2 className={styles["card__title"]}>{post?.title}</h2>
          <p className={styles["card__text"]}>{post?.text}</p>
          <p style={{ color: "grey" }} className={styles["card__text"]}>
            Post number: #{post?.id}
          </p>
        </div>
      </div>

      {/* Card Actions */}
      <div className={styles["card__actions"]}>
        {/* Btn decrease */}
        <button
          className={styles["btn--decrease"]}
          onClick={() => onlyAvanti()}
        >
          Decrease
        </button>

        {/* Btn increase */}
        <button
          className={styles["btn--increase"]}
          onClick={() => setIndex(index +1)}
        >
          Increase
        </button>
      </div>
    </div>
  );
}
