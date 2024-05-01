import React, { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import Nav from "../nav/nav";
import Side from "../side/side";
import logoesi from "../../assets/image.png";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'; 
import{GrNext} from "react-icons/gr";
const Decharge = () => {
  //utilisateur
  const userData=[{
    id:1,
    roleuser:'magasinier'
  }];
    const styles = {
        section: {
          display: 'flex',
          height: '94vh',
          flexDirection: 'column'
        },
        bndecharge: {
          marginLeft:'8%',
          textDecoration: 'none',
          justifyContent: 'space-between',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '8%'
       
        },
        buttonsRightdc: {
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'flex-end',
          justifyContent: 'center'
        },
        fourntList: {
          display: 'flex',
          justifyContent:' space-between',
          width: '240px',
          backgroundColor: '#100B39',
          borderRadius: '30px',
          marginRight: '80px',
          marginBottom: '5px',
          padding: '10px 45px',
          fontSize: '16px',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          textDecoration: 'none'
        },
        framedc: {
          fontSize: '16px',
          border: '1px solid #ccc',
          padding: '20px',
          margin: 'auto',
          height: 'max-content',
          width: 'max-content',
          marginBottom: '0px',
          marginTop: '0px',
          display: 'flex'
        }, 
        bndechrg:{
          marginTop:'5px',
          marginLeft:' 8%',
        },
        contframedc: {
        height:'max-content',
        padding: '5px',
          display: 'flex',
          fontFamily: 'Arial, sans-serif',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          flexWrap: 'wrap'
        },
        logoesiImg: {
          width: '95%',
          marginLeft:'4%'
        },
        decharge: {
          textDecoration: 'underline',
          display: 'flex',
          alignContent: 'center',
          flexWrap: 'wrap',
          flexDirection: 'column',
          justifyContent: 'center'
        },
        infdirection: {
          marginBottom: '10px',
          marginLeft: '5%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        },
       
        tableDecherge: {
          marginTop: '20px',
          marginLeft: '5%',
          marginRight: '5%',
          fontSize: 'xx-large',
          width: '90%',
          borderCollapse: 'collapse',
          border: '1px solid #000', 
        },
        trdecharge:{
            height:'100px',   
        },
        headreference: {
            width:'40%'
        },
        headdecharge: {
          fontSize: 'large',
          textAlign: 'center',
          border: '1px solid #000',
          height: '20px',
        },
        infdecharge: {
         padding:'8px',
          fontSize: 'large',
          border: '1px solid #000',
        },
        lieudate: {
            marginRight:'15%',
            marginTop:'5%',
            display: 'flex',
            alignContent: 'right',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'right'
          },
        signature:{   display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft:'10%',
        marginRight:'10%',
        marginBottom:'20%'
    },
    viewSortie:{
      backgroundColor: '#0047FF',
      width: '240px',
      borderRadius: '30px',
      marginRight: '80px',
      marginBottom: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      color: '#fff', /* Change the text color */
      cursor: 'pointer'
    },
        printButton: {
          backgroundColor: '#0047FF',
          color: 'white',
          width: '130px',
          height: '40px',
          borderRadius: '30px',
          borderColor: 'transparent',
          marginLeft:'10px'
        },
        printCont: {
          marginTop: '20px',
          transition: 'border-color 0.3s ease',
          fontWeight: '500',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        },
        editdc:{
          backgroundColor: 'orange',
          color: 'white',
          width: '130px',
          height: '40px',
          borderRadius: '30px',
          borderColor: 'transparent',
        padding: '10px 20px',
          
        },
        deletedc:{
          backgroundColor: 'red',
          color: 'white',
          marginLeft: '10px',
          width: '130px',
          height: '40px',
          borderRadius: '30px',
          borderColor: 'transparent',
        padding: '10px 20px',
        },
      
      };
    
  const dechargeData = [
    {id:'0',
     numDC:'1',
     date:'08/09/2024',
     designation:'designation du 1   article',
      numref: [
        { numserie: 0, numinventaire: 'MAV-01-2023'}
      ],
      observation:'observation produit ',
    }
  ];
  const navigate = useNavigate();
  const frameRef = useRef(null);
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      // Delete the page from local storage
      localStorage.removeItem("fournitureinfos");
      // Navigate back to the previous page
      navigate(-1); // Use navigate function to go back
    }};
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
      pdf.save("bon_de_decharge.pdf");
    });
  };

  return (
    <>
     <section style={styles.section}>
          <nav ><Nav/> </nav>
        <div ><div> 
              <Side/>
            </div>
            <div style={styles.bndecharge}>
              <h3 className="bndechrg">BON DE DECHARGE N° {dechargeData[0].numDC} </h3>
              <div style={styles.buttonsRightdc}>
                <Link to="/decharge-list" style={{ textDecoration: 'none' }}>
                  <button style={styles.fourntList} onClick={() => navigate(-2)}>
                    Fourniture List  <GrNext />
                  </button>
                </Link>
                <Link to="/bondesortie" className="viewbnsortie-link">
    <button style={styles.viewSortie} onClick={() => console.log("View bn de sortie clicked")}> View Bon De Sortie</button>
  </Link>
              </div>
            </div>
            <div style={styles.framedc} >
              <div style={{ ...styles.contframedc, maxWidth: "800px" }}ref={frameRef}>
                <div>
                  <img style={styles.logoesiImg} src={logoesi} alt="My Image"  />
                </div>
            
                <div style={styles.infdirection}>
                  <h4>Direction  <br /> Secretariat General <br/>Sous-Direction des Finances, et des Moyens </h4>
                </div>
                <div style={styles.decharge}>
                  <h1 style={{ textDecoration: 'underline' }}>DECHARGE N°{dechargeData[0].numDC} </h1>                
                </div>
                <table style={styles.tableDecherge}>
                  <thead>
                    <tr>
                      <th style={styles.headdecharge}>DESIGNATION DES ARTICLES</th>
                      <th style={{ ...styles.headdecharge, ...styles.headreference }}>NUMEROS DE REFERENCE</th> 
                      <th style={styles.headdecharge}>OBSERVATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dechargeData[0].numref.map((nref, index) => (
                      <tr key={index}style={styles.trdecharge}>
                        <td style={styles.infdecharge}>{dechargeData[0].designation}</td>
                        <td style={{ ...styles.infdecharge, ...styles.infoNom }}>N° serie : {nref.numinventaire}<br/>N°inventaire : {nref.numserie}</td>
                        <td style={styles.infdecharge}> {dechargeData[0].observation} </td>
                      
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={styles.lieudate}>
                <h4> Sidi Bel Abbes le: {dechargeData[0].date} </h4>
                </div>
                <h4>
                <div style={styles.signature}>
    <span> Le Magasinier</span>  <span> Le Directeur</span>  <span> Le Preneur</span> 

                </div>
                </h4> 
              </div>
            </div>
            <div style={styles.printCont}>
            {userData[0].roleuser === 'magasinier' && (
  <button style={styles.editdc} onClick={() => window.location.href="/edit-page"}>Edit</button>
)}   {userData[0].roleuser === 'magasinier' && (<button style={styles.deletedc} onClick={handleDelete}>Delete</button>
 )} <button style={styles.printButton} onClick={handleDownload}>
                Download
              </button>
            </div>
          
        </div>
        </section>
      
    </>
  );
};

export default Decharge;
