import '../sass/Button.scss'

const Button = ({icon, handleClick}) => {
  return (
    <div className='btn__box'>
    <button 
    className="btn" 
    onClick={handleClick}
    >{icon}</button>
    </div>
  )
}

export {Button}
