import React , {useState} from 'react'
import './barr.css'

function Barr() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  return (
    <div className='barr'>
    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    <div className='rl'>Roles </div>
    </div> 
  )
}

export default Barr 
