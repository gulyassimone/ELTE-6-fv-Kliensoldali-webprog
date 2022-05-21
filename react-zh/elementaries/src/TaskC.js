import {useRef, useState} from "react";



const ImageForm = (props) => {
    const {list,handleSubmit,handleChange} = props
    console.log(list)
  return (
      <>
    <form onSubmit={handleSubmit}>
      Kép URL:
      <input onChange={handleChange} type="url"  />
        <input type="submit" />
    </form>

              {list?.map((elem,key)=> (<img key={key}
                  src={elem}
                  style={{ height: "200px" }}
                  alt=""
              />))}
      </>
  );
};

export const TaskC = () => {
    const [list, setList] = useState([]);
    const [name, setName] = useState("");

    const handleChange = (e) => setName(e.target.value)

    const handleSubmit = (event) => {
        event.preventDefault();
        setList( [...list, name]);
    }

    return (
        <>
          <h2>3. feladat</h2>
          <ImageForm list = {list} handleSubmit = {handleSubmit} handleChange={handleChange} />
          <h3>Képlista</h3>
        </>
  );
};
