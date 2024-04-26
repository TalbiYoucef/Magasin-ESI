import React , {useState} from 'react'


function Bar() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  return (
    <div  style={{ 
        display: 'flex',
        alignItems: 'center',
        width: '95%',
        height: '40px',
        borderRadius: '20px',
        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)', 
        color: '#100B39',
        border: 'none', // Changed text-decoration to border
        marginTop: '30px',
        marginLeft: '20px',
        flex: 1
      }}>
    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    <div  style={{
         width: '150px',
         marginleft: '25px',
         textAlign:'center',
         
    }}>Produit </div>
    </div> 
  )
}

export default Bar