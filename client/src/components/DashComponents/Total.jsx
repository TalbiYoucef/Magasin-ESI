import React from 'react'

function Total(props) {
  return (
    <div style={{ width:'100%' ,  marginLeft:'2%'}}>
         <div style={{ fontSize: '31px', display: 'flex', alignItems: 'center', gap: '40%' }}>
  <b>{props.total}</b>
  <div style={{ boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', borderRadius: '10px', alignItems: 'center', color: '#347AE2', padding: '5px' }}>
    {props.icon}
  </div>

         </div>
    
    <div style={{fontSize :'17px ' ,color:'#333333'}}>
         {props.item}
    </div>
      
       
    </div>
  )
}

export default Total