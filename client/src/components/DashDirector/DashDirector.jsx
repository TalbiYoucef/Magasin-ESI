import React , {useState} from 'react'
import Side from '../side/side';
import Nav from '../nav/nav';
import TopConsumer from '../DashComponents/Total';
import Circle from '../DashComponents/Circle';
import Barchart from '../DashComponents/histogramme';
import Graph from '../DashComponents/MostGraphs';
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiStorefront } from "react-icons/pi";
import { GrDeliver } from "react-icons/gr";
import { FaCircle } from "react-icons/fa";

function DashDirector() {

    const [total, setTotal] = useState(255);
    const [TopConsumerName, setTopConsumer] = useState('Sidi Mohamed Benslimane');


      return (
<div> 
    <Nav />
    <div className='dwnusers'>
      <Side    link='commands'/>    
      <div   style={{ marginTop :"8vh" , marginLeft :' 7%' , width :'90%', height :'92vh' , padding :'10px'}}   >
                <div style={{display :'flex', borderRadius : '20px' ,width:'30%',boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,padding : '10px' , marginBottom :'10px' , marginLeft :'35%'}}>
                  <TopConsumer  Title={ 'Top Consumer'} item={TopConsumerName}  total ={total}  unit  ='product' service ='service des oeuvres socials ' />
                    </div>
               
            <div className='crcmd1' style={{display :'flex ' , gap:'20px' }}>

         <div style={{ width: '100% ', height: '450px' ,   boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',borderRadius:'20px', paddingTop :'20px' }}>
          <div style={{ display :'flex'}}>  <Barchart />
                      </div>
                     

        </div>

  
       </div>


        </div>

    </div>
</div>

  )
}

export default DashDirector
