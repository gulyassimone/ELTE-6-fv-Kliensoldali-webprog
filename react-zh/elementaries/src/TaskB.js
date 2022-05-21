import {useEffect, useRef, useState} from "react";

export const TaskB = () => {
    const input = useRef();
    const [disabled, setDisabled] = useState(true);

    const handleChange = ()=>{
        setDisabled(input.current?.value.length === 0)
    };

  return (
    <>
      <h2>2. feladat</h2>
      <input ref={input} onChange={handleChange} type="text" />
      <button disabled={disabled}>Submit</button>
    </>
  );
};
