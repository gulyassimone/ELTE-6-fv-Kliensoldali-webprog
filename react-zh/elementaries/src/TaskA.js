import { useState } from "react";

export const TaskA = () => {
    const [hide, setHide] = useState(false)
    const handleHide = () => {
        setHide(!hide)
    }
console.log(hide)
  return (
    <>
      <h2>1. feladat</h2>
      <p>
        <button onClick={handleHide}>{!hide?"Rejtsd el":"Jelenítsd meg" } az alábbi elemet</button>
      </p>
        {hide?<></>:<p>Egyszerű feladat a feltételes renderelésről.</p>}
    </>
  );
};
