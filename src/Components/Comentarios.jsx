import React, { useState } from 'react';
import '../sass/comentarios.scss'

function TextArray() {
  const [texto, setText] = useState("");
  const [array, setArray] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAddText = () => {
    setArray([...array, texto]);
    setText("");
  };

  return (
    <div>
      <input className="imput__Coments" type="text" value={texto} onChange={handleTextChange} />
      <button className="button__Coments" onClick={handleAddText}>Aceptar</button>
      <ul>
        {array.map((item, index) => (
          <li className="comentarios" key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(TextArray);
