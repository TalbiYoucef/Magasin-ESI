import React, { useState, useEffect } from "react";
import { useNavigate, useParams ,Link} from 'react-router-dom'; 
import "./viewBR.css";
import Nav from "../nav/nav";
import Side from "../side/side";


const BonDeReception = () => {
  const [cmdData, setCmdData] = useState([]);
  const [resData, setResData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("selectedCommand"));
    if (storedData) {
      setCmdData(storedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, []);
  useEffect(() => {
    const sData = JSON.parse(localStorage.getItem("selectedRecept"));
    if (sData) {
      setResData(sData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, []);
  const handlePrint = () => {
    window.print();
  };
  const navigate = useNavigate();
  return (
    <>
     <div className="container">
      <div className="row">
        <nav className="col-md-12 bordureOrange nav">
          <Nav/>
        </nav>
      </div>
      <div className="row">
        <section className="col-md-12 bordureBleue">
          <div className="col-md-5 bordureBleue section-128"> 
            <Side/>
          </div>
    <div className="barr"></div>
    <div className="bnrespt">
    <h4 className="BR">N°BON DE RECEPTION:{resData.numresp}</h4>
    <div className="buttons-right-rs">
    <Link to="/commands-list" >
  <button className="commands-ls" onClick={() => navigate(-2)}>
    Commands List 
  </button>
  
  </Link>
  <Link to="/bondecommand/:numCmd" className="view-cmd-link">
    <button className="view-cmd" onClick={() => console.log("View cmd clicked")} >View Command</button>
  </Link>
  </div>
  </div>
    <div className="frame1">
    <div className="cont" style={{ maxWidth: "800px" }}>
      <div className="bon-r">
        <h4>BON DE RECEPTION</h4>
        <div className="info-br">
          <h4>N° :{resData.numresp}</h4>
          <h4>Date :{resData.date}</h4>
        </div>
      </div>
      
      <div className="info1">
        <p>Fournisseur: {cmdData.supplier}</p>
        <div className="info-br2">
          <p>N° du Bon de commande :   {cmdData.numCmd}</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <p>Date du Bon de Commande : {cmdData.date}</p>
        </div>
      </div>
      <table className="table1">
        <thead>
          <tr>
            <th className="head">N°</th>
            <th className="head head-designation">Désignation</th>
            <th className="head">Quantité</th>
          </tr>
        </thead>
        <tbody>
        {cmdData && cmdData.products && cmdData.products.map((product, index) => (
  <tr key={index}>
    <td className="info-product">{product.idp}</td>
    <td className="info-product info-designation">{product.nommP}</td>
    <td className="info-product">{product.quantite}</td>
  </tr>
))}

</tbody>

      </table>
      <p className="magasinier">Le Magasinier</p>
 </div>
      </div>
      <div className="print-cont">
      <button className="print-button" onClick={handlePrint}>
        Print
      </button>
      </div>
      </section>
      </div>
      </div>
      </>
  );
};

export default BonDeReception;
