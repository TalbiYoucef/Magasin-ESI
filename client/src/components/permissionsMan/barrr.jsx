import React , {useState} from 'react'
import './barrr.css'

function Barr() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  return (
    <div className='barrr'>
    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    <div className='pr'>Permission </div>
    </div> 
  )
}

export default Barr 
