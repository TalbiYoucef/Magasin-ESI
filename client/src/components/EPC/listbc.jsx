import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ListBonRecp = ({ onClose }) => {
  const {id} = useParams();
  console.log(id)
  const navigate = useNavigate();
  const [receipts,setReceipts]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        try {
          const resp = await axios.get(
            `http://localhost:3036/purchaseorders/${id}/receipts`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          console.log(resp.data.receipts)
          setReceipts(resp.data.receipts)

        } catch (error) {
          alert(error.response.data.message);
          console.log(error);
        }
       
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [brData, setBrData] = useState([
    {
      id: '0',
      numrc: '1',
      date: '09-03-2024',
      numcmd: '1',
    },
    {
      id: '1',
      numrc: '2',
      date: '15-01-2024',
      numcmd: '1',
    },
    {
      id: '2',
      numrc: '3',
      date: '26-05-2024',
      numcmd: '1',
    },
  ]);
  const handleDelete = (index, event) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event propagation

    const confirmDelete = window.confirm('Are you sure you want to delete this bon de reception?');
    if (confirmDelete) {
      const newData = [...brData];
      newData.splice(index, 1); // Remove the item at the specified index
      setBrData(newData); // Update the state with the new array without the deleted item
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Define CSS styles using template literals
  const styles = `
    .create-user-form {
      padding: 20px;
      margin-top:500px;
      width: 70%;
      height: 500px;
      background-color: white;
      border-radius: 20px;
      box-shadow: 0 2px 5px #100B39;
      transform: translate(20%, -92%);
      display: flex;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 999;
      opacity: 0.99;
    }

    .title {
      margin-top: 10px;
      color: #5B548E; 
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 25px;
      margin-bottom: 20px;
      text-align: center; 
    }

    .bar {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      width: 95%;
      height: 4px;
      border-radius: 20px;
      box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1); 
      color: #100B39;
      text-decoration: solid;
      margin-top: 20px;
      margin-left: 40px;
      flex: 1;
      padding-left: 10px;
    }

    .champ {
      width: 25%;
    }

    .champdate{
      width: 180px;
      margin-left: 10px;
    }

    .v, .d {
      width: 120px;
      margin-left: 100px;
    }
    .v {
      text-decoration: none;
    }

    .recept {
      display: flex;
      align-items: center;
      width: 95%;
      height: 40px;
      border-radius: 20px;
      color: #616262;
      margin-left: 40px;
      flex: 1;
    }

    .cancel {
      color: white; 
      background-color: #0047FF;
      border-color: #0047FF;
      border-radius: 30px;
      padding: 10px 20px;
      font-size: 16px;
    }

    .btns {
      display: flex;
      justify-content: center;
    }

    .d {
      color: #D42803;
      text-decoration: none;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <form className="create-user-form">
        <div className="title"> Bon de Receptions</div>
        <div className='bar'>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <div className='champ' >N° </div>
          <div className='champ'>Date</div>
        </div>
        {receipts.map((recept, index) => (
          <div key={recept.receipt_id} className='recept'>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <div className='champ'>{recept.receipt_id}</div>
            <div className='champdate'>{String(recept.delivery_date).split('T')[0]}</div>
            <Link to={`/bon-reception/${recept.receipt_id}`} className='v'>View </Link>
            <button onClick={(event) => handleDelete(index, event)} className='d'>Delete</button>
          </div>
        ))}
        <div className='btns' style={{ marginTop: "20px" }}>
          <button type="button" onClick={onClose} className='cancel btn'>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default ListBonRecp;
