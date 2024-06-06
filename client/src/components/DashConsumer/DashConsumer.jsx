import React , {useState} from 'react'
import Side from '../side/side';
import Nav from '../nav/nav';
import Barchart from '../DashComponents/histogrammeConsumer';


function DashConsumer() {

  

      return (
<div> 
    <Nav />
    <div className='dwnusers'>
      <Side    link='commands'/>    
      <div   style={{ marginTop :"8vh" , marginLeft :' 7%' , width :'90%', height :'92vh' , padding :'100px'}}   >
            <div className='crcmd1' style={{display :'flex ' }}>
         <div style={{ width: '100% ', height: '450px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',borderRadius:'20px', paddingTop :'20px', paddingLeft :'70px' }}>
          <div style={{ display :'flex'}}>  <Barchart />
                      </div>
                     

        </div>

  
       </div>


        </div>

    </div>
</div>

  )
}

export default DashConsumer
