import React, { useRef }from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import Nav from "../nav/nav";
import Side from "../side/side";
import logoesi from "../../assets/image.png";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import { useState } from 'react';

const FicheInventaire = () => {
   //utilisateur
   const userData=[{
    id:1,
    roleuser:'Magasinier'
  }];
 
  //DATA of list produit in fiche inventaire
  const listproduct = [
        { idp: 0, nommP: 'Produit 1', quantitephysique: 20 },
        { idp: 1, nommP: 'Produit 1', quantitephysique: 5 },
        { idp: 2, nommP: 'Produit 2', quantitephysique: 35 },
        { idp: 3, nommP: 'Produit 1', quantitephysique: 100},
        { idp: 4, nommP: 'Produit 2', quantitephysique: 7 },
     
]
 //data of Fiche Inventaire 
 const ficheInventair=[{
  date:"10-05-2024",
  items: [
    { idp: 0, nommP: 'Produit 1', quantiteLgique: 40,observation :' observation of product' },
    { idp: 1, nommP: 'Produit 1', quantiteLgique: 5,observation :' observation of product' },
    { idp: 2, nommP: 'Produit 2', quantiteLgique: 5 ,observation :' observation of product'},
    { idp: 3, nommP: 'Produit 1', quantiteLgique: 10,observation :' observation of product'},
    { idp: 4, nommP: 'Produit 2', quantiteLgique: 7 ,observation :' observation of product'},
    { idp: 5, nommP: 'Produit 3', quantiteLgique: 70 ,observation :' observation of product'}
]}
 ]
  const styles = {
    section: {
      display: 'flex', height: '92vh',flexDirection: 'column'
    },
    framee: {
      fontSize: '16px',border: '1px solid #ccc',borderRadius: '30px',padding: '10px', margin: 'auto', height: 'max-content',width: 'max-content',  marginBottom: '0px',marginTop: '0px',display: 'flex',justifyContent: 'center'
    }, 
    
    contframee: {
      padding: '5px', display: 'flex',  fontFamily: 'Arial, sans-serif',flexDirection: 'column',
      justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap'
    },
    logoesiImg: {
      width: '95%',  marginLeft:'4%'
    },
    ficheinventaire: {
      textDecoration: 'underline',display: 'flex',alignContent: 'center', flexWrap: 'wrap',flexDirection: 'column', justifyContent: 'center'
    },
    infoDirection: {
     marginLeft:'5%',   marginRight: '20px',display: 'flex',
      flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'
    },
    tableinventaire: {
      marginTop: '5px',marginLeft: '40px',   marginRight: '20px',fontSize: 'x-small',width: '90%',
      borderCollapse: 'collapse', border: '1px solid #000', tableLayout: 'fixed'
    },
    headDesignation: {
      width: '50%'
    },
    head: {
      fontSize: 'small', textAlign: 'center', border: '1px solid #000',   height: '20px'
    },
    infoprodinventaire: {
      fontSize: 'small',  height: '20px',border: '1px solid #000', textAlign: 'center'
    },
    infoNom: {
      textAlign: 'left',paddingLeft: '2px',width: '60%'
    },
    printButton: {
      backgroundColor: '#0047FF', color: 'white',width: '130px',   height: '40px', borderRadius: '30px',  borderColor: 'transparent',  padding: '10px 20px', marginLeft:'10px'
    },
    printCont: {
      marginTop: '20px', transition: 'border-color 0.3s ease',fontSize: '16px',display: 'flex',justifyContent: 'center', alignItems: 'center', textAlign: 'center'
    },
    editdf:{
      backgroundColor: 'orange',color: 'white',width: '130px',height: '40px',
      borderRadius: '30px',borderColor: 'transparent',borderRadius: '30px',borderColor: 'transparent',padding: '10px 20px',
        },};
  const navigate = useNavigate();
  const frameRef = useRef(null);
  const [loader, setLoader] = useState(false);
    const downloadPDF = () => {
      const capture = frameRef.current;
      setLoader(true);
      setTimeout(() => {
        html2canvas(capture).then((canvas) => {
          console.log(canvas); // log the canvas to see if it's generated
          const imgData = canvas.toDataURL('image/png');
          const doc = new jsPDF('p', 'mm', 'a4');
          const componentWidth = doc.internal.pageSize.getWidth();
          const componentHeight = doc.internal.pageSize.getHeight();
          doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
          console.log(doc); // log the created PDF to ensure it's correct
          setLoader(false);
          doc.save('fourniture.pdf');
        }); }, 100); // ajust the delay as needed
    }; 
return (
    <> <div >
     <section> <nav > <Nav/> </nav>
        <div >
        <div>  <Side/> </div>
            <div style={{...styles.framee ,marginTop:"90px",boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)'}} >
              <div style={{ ...styles.contframee, maxWidth: "800px",paddingBottom:"70px"}}  ref={frameRef}>
                <div>
                  <img style={styles.logoesiImg} src={logoesi} alt="My Image"  />
                </div>
                <div style={styles.infoDirection}>
                  <h4>Direction  <br /> Secretariat general </h4>
                  <h4> Sidi Bel Abbes le: {ficheInventair[0].date} </h4>
                </div>
                <div style={styles.ficheinventaire}>
                  <h3 ><i style={{ textDecoration: 'underline' }}>FICHE INVENTAIRE </i></h3>                
                </div>
                <table style={styles.tableinventaire}>
                  <thead>
                    <tr>
                      <th style={styles.head}>N°</th>
                      <th style={{ ...styles.head, ...styles.headDesignation }}>Désignation</th>
                      <th style={styles.head}>Quantité Physique</th>
                      <th style={styles.head}>Quantité Logique</th>
                      <th style={styles.head}>Observation</th>
                    </tr>
                  </thead>
                  <tbody>
  {listproduct.map((product, index) => (
    <tr key={index}>
      <td style={styles.infoprodinventaire}>{index + 1}</td>
      <td style={{ ...styles.infoprodinventaire, ...styles.infoNom }}>{product.nommP}</td>
      <td style={styles.infoprodinventaire}>{product.quantitephysique}</td>
      {/* Access the corresponding item in ficheInventair using the same index */}
      <td style={styles.infoprodinventaire}>{ficheInventair[0].items[index].quantiteLgique}</td>
      <td style={styles.infoprodinventaire}>{ficheInventair[0].items[index].observation}</td>
    </tr>
  ))}
</tbody>
 </table>
    </div>
        </div>
            <div style={styles.printCont}>
           
  <button style={styles.editdf} onClick={() => window.location.href="/edit-page"}>Edit</button> 
<button style={styles.printButton}   onClick={downloadPDF}
                disabled={!(loader===false)}  >
                {loader?(
                  <span>Downloading</span> ):(
                  <span>Download</span>
       )}</button>
            </div>
        </div>
        </section>
      </div>
    </>
  );
};

export default FicheInventaire;
