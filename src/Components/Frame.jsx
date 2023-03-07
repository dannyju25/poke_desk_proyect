import '../sass/Frame.scss'
import React from 'react'

const Frame = ({name, img}) => {
  return (
    <div className="frame">
        <p className="frame__name">{name}</p>
        <div className="frame__poke" ></div>
        <img className="frame__img" src={img} alt="poke.jpg" />
      
    </div>
  )
}

export {Frame}
