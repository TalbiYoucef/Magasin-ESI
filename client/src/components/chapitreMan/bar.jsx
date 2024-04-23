import React , {useState} from 'react'
import './bar.css'

function Bar() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  return (
    <div className='barr'>
    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    <div className='rl'>Chapitre </div>
    </div> 
  )
}

export default Bar