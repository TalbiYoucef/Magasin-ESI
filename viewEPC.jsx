import React, { useState,useRef} from "react";
import { useNavigate,Link} from 'react-router-dom';
import "./viewepc.css";
import Side from '../side/side.jsx';
import Nav from '../nav/nav.jsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BonDeComande = () => {
const navigate = useNavigate();
const [selectedOption, setSelectedOption] = useState(null);
const frameRef = useRef(null);
  //data of bon de commande
  const cmdData = [
  {
    id: '0',
    numCmd: '1',
    chapitre: 'Chapitre 1',
    article: 'Article 1',
    supplier: 'Sarl PC STORE',
    date: '04-03-2024',
    state: 'partially',
    products: [
      { idp: 0, nommP: 'Produit 1', quantite: 2 },
      { idp: 1, nommP: 'Produit 2', quantite: 1 },
      { idp: 2, nommP: 'Produit 3', quantite: 2 }
    ]
  }
];
//data of produit
const produitData = [
  {
    chapitre: 'Chapitre 1',
    articles: [
      {
        nom: 'Article 1',
        produits: [
          { id: 0, nom: 'Produit 1', description: 'Description du Produit 2A', prixUnitaire: 100 },
          { id: 1, nom: 'Produit 2', description: 'Description du Produit 1B', prixUnitaire: 80 },
          { id: 2, nom: 'Produit 3', description: 'Description du Produit 2B', prixUnitaire: 120 }
        ]
      }
    ]
  },{
  chapitre: 'Chapitre 2',
  articles: [
    {
      nom: 'Article 1',
      produits: [
        { id: 10, nom: 'Produit 1', description: 'Description du Produit 2A', prixUnitaire: 400 },
        { id: 1, nom: 'Produit 2', description: 'Description du Produit 1B', prixUnitaire: 800 },
        { id: 2, nom: 'Produit 3', description: 'Description du Produit 2B', prixUnitaire: 1200 }
      ]}]}];
//data of supplier
  const fourniseur = {
    nom: 'Sarl PC STORE',
    formeJuridique: 'Sarl',
    adresse: 'N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes',
    telephone: '048-74-14-52',
    fax: '048-74-14-52',
    nif: '00062200230774',
    rc: '22/00 - 0087099 C05',
    rib: '773 0568 301 587 12 BNA SBA'
  };
  let fournisseurInfo = null;
  if (cmdData[0] && cmdData[0].supplier) {
    const supplierName = cmdData[0].supplier.trim();
    const fourniseurNom = fourniseur.nom.trim();
    if (fourniseurNom === supplierName) {
      fournisseurInfo = {
        nom: fourniseur.nom,
        formeJuridique: fourniseur.formeJuridique,
        adresse: fourniseur.adresse,
        telephone: fourniseur.telephone,
        fax: fourniseur.fax,
        nif: fourniseur.nif,
        rc: fourniseur.rc,
        rib: fourniseur.rib
      };
    }}
  console.log(fournisseurInfo);
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);};
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      // Delete the page from local storage
      localStorage.removeItem("cmdinfos");
      // Navigate back to the previous page
      navigate(-1); // Use navigate function to go back
    }};
    const handleDownloadClick = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const buttons = document.querySelectorAll(".buttns1");
      buttons.forEach(button => button.style.display = 'none');
  
      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
  
      // Define the width and height of the frame (adjust as needed)
      const FRAME_WIDTH = 220; // in mm
     
      // Add margin at the top (adjust this value as needed)
      const TOP_MARGIN = 20;
  
      html2canvas(frameRef.current, { scrollY: -window.scrollY }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
  
        // Add margin at the top of the PDF
        pdf.addImage(imgData, 'PNG', 0, TOP_MARGIN, FRAME_WIDTH, (canvas.height * FRAME_WIDTH) / canvas.width);
  
        // Save the PDF
        pdf.save("bon_de_commande.pdf");
  
        buttons.forEach(button => button.style.display = 'block');
      }).catch((error) => {
        console.error("Error during canvas creation:", error);
      });
    };
  const numberToWords = (number) => {
    if (typeof number !== 'string') {
      number = String(number);
  }
  console.log("Number:", number);
  number = number.replace(',', '');

  // Define units, teens, tens, and bigs arrays as before
  const units = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const teens = ['', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
  const bigs = ['', 'mille', 'million', 'milliard', 'billion'];
  const digitToString = (digit, prevDigit) => {
    if (digit === 0) {
        return '';
    } else if (prevDigit === 1) {
        return teens[digit];
    } else if (prevDigit === 7 || prevDigit === 9) {
        if (digit === 0) {
            return prevDigit === 7 ? 'soixante' : 'quatre-vingt';
        } else {
            return tens[prevDigit] + (digit === 1 ? ' et ' : '-') + units[digit];
        }
    } else {
        return tens[prevDigit] + (digit === 1 ? ' et ' : '-') + units[digit];
    }
};

    const numberToString = (num) => {
      if (num === 0) return 'zéro';
  
      let str = '';
  
      let bigIdx = 0;
  
      while (num > 0) {
          const chunk = num % 1000;
          console.log("Chunk:", chunk); // Add this line for debugging
          if (chunk > 0) {
              let chunkStr = '';
  
              // Hundreds
              const hundreds = Math.floor(chunk / 100);
              console.log("Hundreds:", hundreds); // Add this line for debugging
              if (hundreds > 0) {
                  chunkStr += units[hundreds] + ' cent ';
              }
  
              // Tens and Units
              const tensUnits = chunk % 100;
              console.log("Tens Units:", tensUnits); // Add this line for debugging
              if (tensUnits > 0) {
                  chunkStr += digitToString(tensUnits % 10, Math.floor(tensUnits / 10));
              }
  
              // Bigs
              if (bigIdx > 0 && chunkStr !== '') {
                  chunkStr += ' ' + bigs[bigIdx];
              }
  
              str = chunkStr + ' ' + str;
          }
  
          num = Math.floor(num / 1000);
          bigIdx++;
      }
  
      return str.trim();
  };
  
    const splittedNumber = number.split('.');
    const integerPart = parseInt(splittedNumber[0] || '0', 10);
    const decimalPart = parseInt(splittedNumber[1] || '0', 10);
    console.log("Integer Part:", integerPart); // Add this line for debugging
    console.log("Decimal Part:", decimalPart);
    // Convert integer and decimal parts to words
    const integerWords = numberToString(integerPart) + ' dinars';
    const decimalWords = numberToString(decimalPart) + ' centimes';

    // Combine integer and decimal words
    let result = integerWords;
    if (decimalWords !== 'zéro centimes') {
        result += ' et ' + decimalWords;
    }

    return result;
};
  const calculateMontant = (quantite, prixUnitaire) => {
    const montant = quantite * prixUnitaire;
    return montant.toLocaleString("en-US"); // Format the amount with commas
  };

  const tableService = [
    ["-Dénomination:ECOLE SUPERIEURE EN INFORMATIQUE SIDI BEL ABBES"],
   [" -Code Gestionnaire (ordonnateur):268.543"],
   ["-Adresse:01 Rue guerrouche mohamed sidi bel abbes."],
  ["-Téléphone et Fax:(048) 74- 94 -52"],
  ];
  const calculateTotalAmount = (products) => {
    let totalAmount = 0;
    console.log("Products:", products); // Log the products array to see its value
    if (products && Array.isArray(products)) { // Check if products is defined and is an array
        products.forEach((product) => {
            const produit = produitData[0]?.articles[0]?.produits.find(p => p.nom === product.nommP);
            if (produit) {
                const prixUnitaire = produit.prixUnitaire;
                const montant = product.quantite * prixUnitaire;
                console.log("Montant:", montant); // Log the individual amount
                totalAmount += montant;
                console.log("Total Amount After Increment:", totalAmount); // Log the total amount after each increment
            } else {
                console.error(`Product with name ${product.nommP} not found.`);
            }});
        return totalAmount; // Return the total amount as a number
    } else {
        console.error("Products array is not populated correctly:", products);
        return NaN; // Return NaN if products is not populated correctly
    }};
const totalAmount = calculateTotalAmount(cmdData[0].products);
console.log("Total Amount:", totalAmount); // Log the total amount to see if it's calculated correctly
const totalAmountNumber = parseFloat(totalAmount); // Remove the .replace part
console.log(typeof totalAmountNumber); // Check the type of totalAmountNumber
console.log(totalAmountNumber); // Check the value of totalAmountNumber
// Calculate TVA
const tva = totalAmountNumber * 0.19;
console.log("TVA:", tva);
 // Calculate the Total TTC
const totalTTC = totalAmountNumber + tva;
// Convert the total TTC amount to words
  const totalTTCWords = numberToWords(totalTTC);
  return (
    <>
      <div >
   <nav >  <Nav/> </nav>
      <div className="row">
        <section >
          <div>   <Side/> </div>     
     <div className="pageEpc">
    <div className="top-Epc">
      <h3 className="num-command">Command N°: {cmdData[0].numCmd}</h3>
     <div className="right-buttons">
     <Link to="/commands-list" className="commands-list-link">
  <button className="commands-list" onClick={() => navigate(-1)}>
    Commands List 
  </button>
</Link>
          <Link to="/another-page" className="create-receipt-link">
    <button className="create-receipt" onClick={() => console.log("Create Receipt clicked")} style={{ display: cmdData[0].state === 'partially' || cmdData[0].state === 'validated' ? 'block' : 'none' }}>+ Create Receipt</button>
  </Link>
  <Link to="/bondereception" className="view-receipt-link">
    <button className="view-receipt" onClick={() => console.log("View Receipt clicked")} style={{ display: cmdData[0].state === 'partially' || cmdData[0].state === 'processed' ? 'block' : 'none' }}>View Receipt</button>
  </Link>
  </div>
  </div>
  <div ref={frameRef} style={{ margin: 'auto' }} >
  <div className='EPC' >
  <table className='table1'>
    <thead>
      <tr>
        <td  className="Esp-reserve">Espace réservé au <br/> Service du contrôle<br/>  financier<br/>
      </td>
        <td><th className="republic-alg" >REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE<br/>  MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE <br/> <br/> BON DE COMMANDE <br/> N° {cmdData[0].numCmd} date:{cmdData[0].date}</th></td>
      </tr>     
    </thead>
    <tbody>
    <tr>
  <td className="left-col">A………………………  <br/>
        Le………………………</td>
  <th className="right-col" colSpan={tableService[0].length}>Identification du service contractant</th>
{tableService.map((row, rowIndex) => (
  <tr key={rowIndex}>
    {row.map((cell, cellIndex) => (
      <td className="info-service" colSpan='2' key={cellIndex}>{cell}</td>
    ))}
  </tr>
))}
</tr>
<tr>
  <td></td>
  <th className="right-col" colSpan='2'>Identification du prestataire</th>
            <tr><td className="info-service" colSpan='2'>Nom ou raison sociale (mentionner la forme juridique): {cmdData[0].supplier}</td> </tr>
            <tr><td className="info-service" colSpan='2'>Adresse:  {fournisseurInfo ? fournisseurInfo.adresse : 'N/A'}</td></tr>
            <tr ><td className="info-service" colSpan='2'>Téléphone et Fax:  {fournisseurInfo ? fournisseurInfo.telephone : 'N/A'} /  {fournisseurInfo ? fournisseurInfo.fax : 'N/A'}</td> </tr>
            <tr ><td className="info-service" colSpan='2'> N°  R.C: {fournisseurInfo ? fournisseurInfo.rc : 'N/A'} &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  numéro d'identification discale  (NIF):  {fournisseurInfo ? fournisseurInfo.nif : 'N/A'}</td> </tr>
            <tr><td className="info-service" colSpan='2'>RIB (ou RIP): {fournisseurInfo ? fournisseurInfo.rib : 'N/A'}</td></tr>    
  </tr>
     </tbody>
  </table>
  <table className='table2'>
    <thead>
      <tr ><th className="right-col">Caractéristiques de la commande </th>
      <tr className="obj-cmd">
        <td className="left" > 
        <label>
                <input
                  type="radio"
                  name="options"
                  value="matériel"
                  checked={selectedOption === "matériel"}
                  onChange={handleRadioChange}
                />
                matériel
              </label>
              <br/>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="fourniture"
                  checked={selectedOption === "fourniture"}
                  onChange={handleRadioChange}
                />
                Fourniture
              </label>
              <br/>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="service"
                  checked={selectedOption === "service"}
                  onChange={handleRadioChange}
                />
                 Service
              </label>
            </td>
        <td className="RIGHT-CARA" >objet de la commande (Article) :
        <br/>
        <strong>{cmdData[0].article} </strong></td>
      </tr>
      </tr>
      </thead>
      <tbody>
      </tbody>
      </table>
  
<table className="table3">
  <thead>
    <tr className="tr-table">
      <th>N°</th>
      <th>Désignation</th>
      <th>Quantité</th>
      <th>Prix unitaire</th>
      <th>Montant</th>
    </tr>
  </thead>
  <tbody>
  {cmdData[0]?.products.map((product, index) => {
    const produit = produitData[0]?.articles[0]?.produits.find(p => p.nom === product.nommP);
    if (produit) {
      const prixUnitaire = produit.prixUnitaire;
      const description = produit.description;
      const montant = calculateMontant(product.quantite, prixUnitaire);
      return (
        <tr key={index}>
          <td>{product.idp}</td> {/* N° = idp */}
          <td>{product.nommP} {description}</td> {/* Désignation = description */}
          <td>{product.quantite}</td> {/* Quantité = quantite */}
          <td>{prixUnitaire}</td> {/* Prix unitaire */}
          <td>{montant}</td> {/* Montant */}
        </tr>
      );
    } else {
      console.error(`Product with name ${product.nommP} not found.`);
      // Si le produit n'est pas trouvé, affichez "N/A" pour le prix unitaire et le montant
      return (
        <tr key={index}>
          <td>{product.idp}</td>
          <td>{product.nommP}</td>
          <td>{product.quantite}</td>
          <td>N/A</td>
          <td>N/A</td>
        </tr>
      );
    }
  })}
  <tr>
    <td colSpan="2" className="td-table"></td>
    <td colSpan="2" style={{ textAlign: 'center' }}>TOTAL HT:</td>
    <td>{totalAmount.toLocaleString("en-US")}</td>
  </tr>
  <tr>
    <td colSpan="2" className="td-table"></td>
    <td colSpan="2" style={{ textAlign: 'center' }}>TVA 19%:</td>
    <td>{tva.toLocaleString("en-US")}</td>
  </tr>
  <tr>
    <td colSpan="2" className="td-table"></td>
    <td colSpan="2" style={{ textAlign: 'center' }}>TOTAL TTC:</td>
    <td>{totalTTC.toLocaleString("en-US")}</td>
  </tr>
</tbody>

</table>
          <div className="montant">
           <p> Arrêté le présent bon de commande à la somme de (en lettres):</p>
            <strong> {totalTTCWords}</strong>
            </div>
      <div className="footer">
        <p>- Le prestataire s'engage à exécuter la présente commande selon les conditions arrêtées.</p>
        <p>- La source de financement : le budget de fonctionnement de l’école de l’exercice 2024</p>
        <p>- Le délai de livraison ou d'exécution est estimé à 60 jours à compter de la date de signature du présent bon de commande.</p>    
      </div>
      <strong className="directeur">LE DIRECTEUR</strong>
</div>
</div>
<div className="contner1">
            <div className="buttns1">
              <button className="edit1" onClick={() => window.location.href="/edit-page"}>Edit</button>
              <button className="delete1" onClick={handleDelete}>Delete</button>
              <button className="download1" onClick={handleDownloadClick}>Download</button> {/* Replace Print button with Download */}
            </div>
          </div>
</div>
</section>
</div>
</div>
</>
);
}
export default BonDeComande;