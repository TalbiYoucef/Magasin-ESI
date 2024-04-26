import React , {useState} from 'react'


function Baarr() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  return (
    <div className='barrr'>
    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    <div className='prr'>Products </div>
    </div> 
  )
}

export default Baarr 
