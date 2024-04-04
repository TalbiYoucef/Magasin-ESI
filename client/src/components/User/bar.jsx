import React , {useState} from 'react'
import './user.css'
function Bar() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  return (
    <div className='bar'>
<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
 <div className='un'>User name </div>
 <div className='ee'>E-mail</div>
 <div className=' stt'>Status</div>
</div> 
  )
}

export default Bar
