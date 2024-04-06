import React, { useState, useEffect } from "react";
import { useNavigate, useParams ,Link} from 'react-router-dom'; // Import useNavigate
import produitData from '../data/ProduitData';

import "./viewepc.css";
import Side from './side.jsx'
import Nav from './nav.jsx'

const BonDeComande = () => {
  let products = produitData;
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPrint, setShowPrint] = useState(false);
  const [cmdData, setCmdData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("selectedCommand"));
    if (storedData) {
      setCmdData(storedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, []);// Initialize variables to store retrieved data
let fournisseurInfo = null;

// Retrieve data from localStorage
const storedData = JSON.parse(localStorage.getItem("selectedCommand"));

// Ensure storedData exists and contains necessary information
if (storedData && storedData.chapitre && storedData.Article && storedData.supplier) {
  // Find the corresponding chapitre in produitData
  const chapitre = produitData.find(chapitre => chapitre.chapitre === storedData.chapitre);
  
  if (chapitre) {
    // Find the corresponding article in the found chapitre
    const article = chapitre.articles.find(article => article.nom === storedData.Article);
    
    if (article) {
      // Find the corresponding fournisseur in the found article
      const fournisseur = article.fournisseurs.find(fournisseur => fournisseur.nom === storedData.supplier);
      
      if (fournisseur) {
        // Store the fournisseur information in the variable
        fournisseurInfo = {
          nom: fournisseur.nom,
          formeJuridique: fournisseur.formeJuridique,
          adresse: fournisseur.adresse,
          telephone: fournisseur.telephone,
          fax: fournisseur.fax,
          nif: fournisseur.nif,
          rc: fournisseur.rc,
          rib: fournisseur.rib,
          produitsFournis: fournisseur.produitsFournis
        };
      }
    }
  }
}

// Check if fournisseurInfo contains data
if (fournisseurInfo) {
  console.log('Fournisseur information:', fournisseurInfo);
} else {
  console.log('Fournisseur not found or incomplete data in localStorage');
}


  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
 

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      // Delete the page from local storage
      localStorage.removeItem("cmdinfos");
      // Navigate back to the previous page
      navigate(-1); // Use navigate function to go back
    }
  };

  const handlePrintClick = () => {
    setShowPrint(true);
    window.print();
    setShowPrint(false);
  };
 // Function to convert number to words
const numberToWords = (number) => {
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
      if (chunk > 0) {
        let chunkStr = '';

        // Hundreds
        const hundreds = Math.floor(chunk / 100);
        if (hundreds > 0) {
          chunkStr += units[hundreds] + ' cent ';
        }

        // Tens and Units
        const tensUnits = chunk % 100;
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

  const splittedNumber = number.toString().split('.');
  const integerPart = parseInt(splittedNumber[0], 10);
  let decimalPart = parseInt(splittedNumber[1] || '0', 10);

  // Convert decimal part to words
  let decimalWords = '';
  if (decimalPart > 0) {
    decimalWords = 'et ';
    if (decimalPart < 10) {
      decimalWords += units[decimalPart] + ' centimes';
    } else if (decimalPart < 100) {
      const tensDigit = Math.floor(decimalPart / 10);
      const unitsDigit = decimalPart % 10;
      if (unitsDigit === 0) {
        decimalWords += tens[tensDigit] + ' centimes';
      } else {
        decimalWords += tens[tensDigit];
        if (unitsDigit === 1) {
          decimalWords += '-et-un';
        } else {
          decimalWords += '-' + units[unitsDigit];
        }
        decimalWords += ' centimes';
      }
    } else {
      decimalWords += numberToString(decimalPart) + ' centimes';
    }
  }

  let result = numberToString(integerPart) + ' dinars';

  if (decimalWords !== '') {
    result += ' ' + decimalWords;
  }

  return result;
};

  // Function to calculate the amount
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
    storedData.products.forEach((product) => {
      const fournisseurProduct = fournisseurInfo.produitsFournis.find(item => item.id === product.idp);
      const prixUnitaire = fournisseurProduct ? fournisseurProduct.prixUnitaire : 0;
      const montant = product.quantite * prixUnitaire;
      totalAmount += montant;
    });
    return totalAmount.toLocaleString("en-US"); // Format the total amount with commas
  };
  
  const totalAmount = calculateTotalAmount(products);
  const totalAmountNumber = parseFloat(totalAmount.replace(',', '')); // Remove commas if present and parse as float
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
          
     <div className="pageEpc">
    <div className="topp">
      <h3 className="num-com">Command N°: {cmdData.numCmd}</h3>
 
   
     <div className="right-buttons">
     <Link to="/commands-list" className="commands-list-link">
  <button className="commands-list" onClick={() => navigate(-1)}>
    Commands List 
  </button>
</Link>
          <Link to="/another-page" className="create-receipt-link">
    <button className="create-receipt" onClick={() => console.log("Create Receipt clicked")} style={{ display: cmdData.state === 'partially' || cmdData.state === 'validated' ? 'block' : 'none' }}>+ Create Receipt</button>
  </Link>
  <Link to="/bon-de-reception" className="view-receipt-link">
    <button className="view-receipt" onClick={() => console.log("View Receipt clicked")} style={{ display: cmdData.state === 'partially' || cmdData.state === 'processed' ? 'block' : 'none' }}>View Receipt</button>
  </Link>

  </div>
  </div>
  <div className='EPC'>
  <table className='table1'>
    <thead>
      <tr>
        <td  className="Esp-res">Espace réservé au <br/> Service du contrôle<br/>  financier<br/>
      </td>
        <td><th className="bar-re" >REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE<br/>  MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE <br/> <br/> BON DE COMMANDE <br/> N° {cmdData.numCmd} date:{cmdData.date}</th></td>
      </tr>     
    </thead>
    <tbody>
    <tr>
  <td className="LEFT">A………………………  <br/>
        Le………………………</td>
  <th className="RIGHT" colSpan={tableService[0].length}>Identification du service contractant</th>

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
  <th className="RIGHT" colSpan='2'>Identification du prestataire</th>

            <tr><td className="info-service" colSpan='2'>Nom ou raison sociale (mentionner la forme juridique): {fournisseurInfo.nom}</td> </tr>
            <tr><td className="info-service" colSpan='2'>Adresse: {fournisseurInfo.adresse}</td></tr>
            <tr ><td className="info-service" colSpan='2'>Téléphone et Fax: {fournisseurInfo.telephone} / {fournisseurInfo.fax}</td> </tr>
            <tr ><td className="info-service" colSpan='2'> N°  R.C: {fournisseurInfo.rc} &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  numéro d'identification discale  (NIF): {fournisseurInfo.nif}</td> </tr>
            <tr><td className="info-service" colSpan='2'>RIB (ou RIP): {fournisseurInfo.rib}</td></tr>
         
       
  </tr>
  
     </tbody>
  </table>
  <table className='table2'>
    <thead>
      <tr ><th className="RIGHT">Caractéristiques de la commande </th>
      <tr className="obj-cmd">
        <td className="LEFT" > 

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
        <strong>{cmdData.supplier} </strong></td>
      </tr>
      </tr>
      </thead>
      <tbody>

      </tbody>
      </table>
      <table className="table3">
            <thead>
             <tr className="bar-pro">
        <th>N°</th>
        <th>Désignation</th>
        <th>Quantité</th>
        <th>Prix unitaire</th>
        <th>Montant</th>
      </tr>
    </thead>
    <tbody>
  {storedData && storedData.products.map((product, index) => {
    // Find the product in fournisseurInfo.produitsFournis
    const fournisseurProduct = fournisseurInfo.produitsFournis.find(item => item.id === product.idp);
    // Get the prixUnitaire if the product is found
    const prixUnitaire = fournisseurProduct ? fournisseurProduct.prixUnitaire : 'N/A';

    return (
      <tr key={index}>
        <td>{product.idp}</td> {/* N° = idp */}
        <td>{product.nommP}</td> {/* Désignation = nommP */}
        <td>{product.quantite}</td> {/* Quantité = quantite */}
        <td>{prixUnitaire}</td> {/* prixUnitaire */}
        <td>{calculateMontant(product.quantite, prixUnitaire)}</td> {/* Calculate Montant */}
      </tr>
    );
  })}        <tr>
               <td colSpan="2" className="vide"></td>  
      <td   colSpan="2" style={{ textAlign: 'center' }}>TOTAL HT:</td>
      <td>{totalAmount.toLocaleString("en-US")}</td>
      </tr>
      <tr>
      <td colSpan="2"  className="vide"></td> 
      <td colSpan="2" style={{ textAlign: 'center' }}>TVA 19%:</td>
      <td>{tva.toLocaleString("en-US")}</td>
      </tr>
      <tr>
      <td colSpan="2" className="vide"></td> 
      
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

<div className="contner1">
        <div className="buttns1">
          <button className="edit1" onClick={() => window.location.href="/edit-page"}>Edit</button>
          <button className="delete1" onClick={handleDelete}>Delete</button>
          <button className="print" onClick={handlePrintClick}>Print</button>
      
        </div>
</div>
</div>
</section>
</div>
</div>

</>
);
};

export default BonDeComande;