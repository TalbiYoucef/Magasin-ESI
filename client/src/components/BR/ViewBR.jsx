import React, { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import "./viewBR.css";
import Nav from "../nav/nav";
import Side from "../side/side";
import logoesi from "../../assets/image.png";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BonDeReception = () => {
  const cmdData = [
    {
      id: '0',
      numCmd: '1',
      chapitre: 'Chapitre1',
      article: 'Article1',
      supplier: 'Sarl PC STORE',
      date: '04-03-2024',
      state: 'initialized',
      products: [
        { idp: 0, nommP: 'Produit 1', quantite: 2 },
        { idp: 1, nommP: 'Produit 2', quantite: 1 },
        { idp: 2, nommP: 'Produit 3', quantite: 2 }
      ]
    }
  ];

  const brData=[
    {
      id: '2',
      date: '09-03-2024',
      cmdid: '1',
      commnt:'',
      type:'',
    }
  ];

  const navigate = useNavigate();
  const frameRef = useRef(null);

  const handleDownload = async () => {
    // Wait for the content to render
    await new Promise(resolve => setTimeout(resolve, 500)); // Adjust the delay as needed
  
    // Capture the entire content area
    html2canvas(frameRef.current, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Adjust height to maintain aspect ratio
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save("bon_de_reception.pdf");
    });
  };
  

  return (
    <>
      <div >
     <section>
          <nav >
            <Nav/>
          </nav>
      
        <div >
        
            <div> 
              <Side/>
            </div>
            <div className="bnrcpt">
              <h4 className="BR">BON DE RECEPTION N° : {brData[0].id}</h4>
              <div className="buttons-right-rs">
                <Link to="/commands-list" >
                  <button className="commands-ls" onClick={() => navigate(-2)}>
                    Commands List 
                  </button>
                </Link>
                <Link to={"/bondecommand"} className="view-cmd-link">
                  <button className="view-cmd" onClick={() => console.log("View cmd clicked")}>View Command</button>
                </Link>
              </div>
            </div>
            <div className="frame1" ref={frameRef}>
              <div className="cont-frame" style={{ maxWidth: "800px" }}>
                <div>
                  <img className='logoesi-img' src={logoesi} alt="My Image"  />
                </div>
                <div className="bon-reception">
                  <h4 >BON DE RECEPTION</h4>
                  <div className="info-br">
                    <p>N° :{brData[0].id}</p>&nbsp;&nbsp;
                    <p>Date :{brData[0].date}</p>
                  </div>
                </div>
                <div className="info1">
                  <p>Fournisseur: {cmdData[0].supplier}</p>
                  <div className="info-br2">
                    <p>N° du Bon de commande :   {cmdData[0].numCmd}</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p>Date du Bon de Commande : {cmdData[0].date}</p>
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
                    {cmdData[0].products.map((product, index) => (
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
              <button className="print-button" onClick={handleDownload}>
                Download PDF
              </button>
            </div>
          
        </div>
        </section>
      </div>
    </>
  );
};

export default BonDeReception;
