import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Import useNavigate

import "./viewepc.css";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";

const BonDeComande = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPrint, setShowPrint] = useState(false);

  //data of bon de commande
  const cmdData = [
    {
      id: "0",
      numCmd: "1",
      chapitre: "Chapitre 1",
      article: "Article 1",
      supplier: "Sarl PC STORE",
      date: "04-03-2024",
      state: "initialized",
      products: [
        { idp: 0, nommP: "Produit 1", quantite: 2 },
        { idp: 1, nommP: "Produit 2", quantite: 1 },
        { idp: 2, nommP: "Produit 3", quantite: 2 },
      ],
    },
  ];
  const produitData = [
    {
      chapitre: "Chapitre 1",
      articles: [
        {
          nom: "Article 1",
          fournisseurs: [
            {
              nom: "Sarl PC STORE",
              formeJuridique: "Sarl",
              adresse:
                "N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes",
              telephone: "048-74-14-52",
              fax: "048-74-14-52",
              nif: "00062200230774",
              rc: "22/00 - 0087099 C05",
              rib: "773 0568 301 587 12 BNA SBA",
              produitsFournis: [
                {
                  id: 0,
                  nom: "Produit 2A",
                  description: "Description du Produit 2A",
                  prixUnitaire: 200000.0,
                },
                {
                  id: 1,
                  nom: "Produit 2A",
                  description: "Description du Produit 2A",
                  prixUnitaire: 100.0,
                },
                {
                  id: 2,
                  nom: "Produit 2A",
                  description: "Description du Produit 2A",
                  prixUnitaire: 3500.0,
                },
              ],
            },
            {
              nom: "EURL Tech Solutions 1",
              formeJuridique: "EURL",
              adresse: "N° 10 Rue des Fleurs, Quartier des Roses, Alger",
              totalHT: 1500,
              telephone: "021-45-67-89",
              fax: "021-45-67-89",
              nif: "00071100234567",
              rc: "11/00 - 0123456 B07",
              rib: "786 1234 567 890 11 CPA ALG",
              produitsFournis: [
                {
                  id: 3,
                  nom: "Produit 1B",
                  description: "Description du Produit 1B",
                  prixUnitaire: 80,
                },
                {
                  id: 4,
                  nom: "Produit 2B",
                  description: "Description du Produit 2B",
                  prixUnitaire: 120,
                },
              ],
            },
          ],
        },
        {
          nom: "Article 2",
          fournisseurs: [
            {
              nom: "Sarl PC STORE 2",
              formeJuridique: "Sarl",
              adresse:
                "N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes",
              totalHT: 1000,
              telephone: "048-74-14-52",
              fax: "048-74-14-52",
              nif: "00062200230774",
              rc: "22/00 - 0087099 C05",
              rib: "773 0568 301 587 12 BNA SBA",
              produitsFournis: [
                {
                  id: 5,
                  nom: "Produit 3A",
                  description: "Description du Produit 3A",
                  prixUnitaire: 70,
                },
                {
                  id: 6,
                  nom: "Produit 4A",
                  description: "Description du Produit 4A",
                  prixUnitaire: 90,
                },
              ],
            },
            {
              nom: "EURL Tech Solutions 2",
              formeJuridique: "EURL",
              adresse: "N° 10 Rue des Fleurs, Quartier des Roses, Alger",
              totalHT: 1500,
              telephone: "021-45-67-89",
              fax: "021-45-67-89",
              nif: "00071100234567",
              rc: "11/00 - 0123456 B07",
              rib: "786 1234 567 890 11 CPA ALG",
              produitsFournis: [
                {
                  id: 7,
                  nom: "Produit 3B",
                  description: "Description du Produit 3B",
                  prixUnitaire: 110,
                },
                {
                  id: 8,
                  nom: "Produit 4B",
                  description: "Description du Produit 4B",
                  prixUnitaire: 130,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      chapitre: "Chapitre 2",
      articles: [
        {
          nom: "Article 3",
          fournisseurs: [
            {
              nom: "Sarl PC STORE 3",
              formeJuridique: "Sarl",
              adresse:
                "N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes",
              telephone: "048-74-14-52",
              fax: "048-74-14-52",
              nif: "00062200230774",
              rc: "22/00 - 0087099 C05",
              rib: "773 0568 301 587 12 BNA SBA",
              produitsFournis: [
                {
                  id: 2,
                  nom: "Produit 2A",
                  description: "Description du Produit 2A",
                  prixUnitaire: 100,
                },
              ],
            },
            {
              nom: "EURL Tech Solutions3 ",
              formeJuridique: "EURL",
              adresse: "N° 10 Rue des Fleurs, Quartier des Roses, Alger",
              totalHT: 1500,
              telephone: "021-45-67-89",
              fax: "021-45-67-89",
              nif: "00071100234567",
              rc: "11/00 - 0123456 B07",
              rib: "786 1234 567 890 11 CPA ALG",
              produitsFournis: [
                {
                  id: 3,
                  nom: "Produit 1B",
                  description: "Description du Produit 1B",
                  prixUnitaire: 80,
                },
                {
                  id: 4,
                  nom: "Produit 2B",
                  description: "Description du Produit 2B",
                  prixUnitaire: 120,
                },
              ],
            },
          ],
        },
        {
          nom: "Article 4",
          fournisseurs: [
            {
              nom: "Sarl PC STORE 4",
              formeJuridique: "Sarl",
              adresse:
                "N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes",
              totalHT: 1000,
              telephone: "048-74-14-52",
              fax: "048-74-14-52",
              nif: "00062200230774",
              rc: "22/00 - 0087099 C05",
              rib: "773 0568 301 587 12 BNA SBA",
              produitsFournis: [
                {
                  id: 5,
                  nom: "Produit 3A",
                  description: "Description du Produit 3A",
                  prixUnitaire: 70,
                },
                {
                  id: 6,
                  nom: "Produit 4A",
                  description: "Description du Produit 4A",
                  prixUnitaire: 90,
                },
              ],
            },
            {
              nom: "EURL Tech Solutions 4",
              formeJuridique: "EURL",
              adresse: "N° 10 Rue des Fleurs, Quartier des Roses, Alger",
              totalHT: 1500,
              telephone: "021-45-67-89",
              fax: "021-45-67-89",
              nif: "00071100234567",
              rc: "11/00 - 0123456 B07",
              rib: "786 1234 567 890 11 CPA ALG",
              produitsFournis: [
                {
                  id: 7,
                  nom: "Produit 3B",
                  description: "Description du Produit 3B",
                  prixUnitaire: 110,
                },
                {
                  id: 8,
                  nom: "Produit 4B",
                  description: "Description du Produit 4B",
                  prixUnitaire: 130,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      chapitre: "Chapitre 5",
      articles: [
        {
          nom: "Article 5",
          fournisseurs: [
            {
              nom: "Sarl XYZ",
              formeJuridique: "Sarl",
              adresse:
                "N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes",
              totalHT: 1000,
              telephone: "048-74-14-52",
              fax: "048-74-14-52",
              nif: "00062200230774",
              rc: "22/00 - 0087099 C05",
              rib: "773 0568 301 587 12 BNA SBA",
              produitsFournis: [
                {
                  id: 9,
                  nom: "Produit 7",
                  description: "Description du Produit 3B",
                  prixUnitaire: 1300,
                },
                {
                  id: 10,
                  nom: "Produit 8",
                  description: "Description du Produit 3B",
                  prixUnitaire: 1600,
                },
                {
                  id: 11,
                  nom: "Produit 9",
                  description: "Description du Produit 3B",
                  prixUnitaire: 1600,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  let fournisseurInfo = null;

  if (cmdData[0] && cmdData[0].supplier) {
    const supplierName = cmdData[0].supplier.trim(); // Remove extra spaces from the supplier name
    for (const chapitre of produitData) {
      for (const article of chapitre.articles) {
        for (const supplier of article.fournisseurs) {
          if (supplier.nom.trim() === supplierName) {
            // Also remove extra spaces from supplier names in produitData
            fournisseurInfo = {
              nom: supplier.nom,
              formeJuridique: supplier.formeJuridique,
              adresse: supplier.adresse,
              telephone: supplier.telephone,
              fax: supplier.fax,
              nif: supplier.nif,
              rc: supplier.rc,
              rib: supplier.rib,
              produitsFournis: supplier.produitsFournis,
            };
            break;
          }
        }
        if (fournisseurInfo) break;
      }
      if (fournisseurInfo) break;
    }
  } else {
    console.error("Supplier information is missing in cmdData[0]");
  }

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
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
  const numberToWords = (number) => {
    if (typeof number !== "string") {
      number = String(number);
    }
    console.log("Number:", number);
    number = number.replace(",", "");

    // Define units, teens, tens, and bigs arrays as before
    const units = [
      "zéro",
      "un",
      "deux",
      "trois",
      "quatre",
      "cinq",
      "six",
      "sept",
      "huit",
      "neuf",
    ];
    const teens = [
      "",
      "onze",
      "douze",
      "treize",
      "quatorze",
      "quinze",
      "seize",
      "dix-sept",
      "dix-huit",
      "dix-neuf",
    ];
    const tens = [
      "",
      "dix",
      "vingt",
      "trente",
      "quarante",
      "cinquante",
      "soixante",
      "soixante-dix",
      "quatre-vingt",
      "quatre-vingt-dix",
    ];
    const bigs = ["", "mille", "million", "milliard", "billion"];
    const digitToString = (digit, prevDigit) => {
      if (digit === 0) {
        return "";
      } else if (prevDigit === 1) {
        return teens[digit];
      } else if (prevDigit === 7 || prevDigit === 9) {
        if (digit === 0) {
          return prevDigit === 7 ? "soixante" : "quatre-vingt";
        } else {
          return tens[prevDigit] + (digit === 1 ? " et " : "-") + units[digit];
        }
      } else {
        return tens[prevDigit] + (digit === 1 ? " et " : "-") + units[digit];
      }
    };

    const numberToString = (num) => {
      if (num === 0) return "zéro";

      let str = "";

      let bigIdx = 0;

      while (num > 0) {
        const chunk = num % 1000;
        console.log("Chunk:", chunk); // Add this line for debugging
        if (chunk > 0) {
          let chunkStr = "";

          // Hundreds
          const hundreds = Math.floor(chunk / 100);
          console.log("Hundreds:", hundreds); // Add this line for debugging
          if (hundreds > 0) {
            chunkStr += units[hundreds] + " cent ";
          }

          // Tens and Units
          const tensUnits = chunk % 100;
          console.log("Tens Units:", tensUnits); // Add this line for debugging
          if (tensUnits > 0) {
            chunkStr += digitToString(
              tensUnits % 10,
              Math.floor(tensUnits / 10)
            );
          }

          // Bigs
          if (bigIdx > 0 && chunkStr !== "") {
            chunkStr += " " + bigs[bigIdx];
          }

          str = chunkStr + " " + str;
        }

        num = Math.floor(num / 1000);
        bigIdx++;
      }

      return str.trim();
    };

    const splittedNumber = number.split(".");
    const integerPart = parseInt(splittedNumber[0] || "0", 10);
    const decimalPart = parseInt(splittedNumber[1] || "0", 10);
    console.log("Integer Part:", integerPart); // Add this line for debugging
    console.log("Decimal Part:", decimalPart);
    // Convert integer and decimal parts to words
    const integerWords = numberToString(integerPart) + " dinars";
    const decimalWords = numberToString(decimalPart) + " centimes";

    // Combine integer and decimal words
    let result = integerWords;
    if (decimalWords !== "zéro centimes") {
      result += " et " + decimalWords;
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
    if (products && Array.isArray(products)) {
      // Check if products is defined and is an array
      products.forEach((product) => {
        const fournisseurProduct = fournisseurInfo.produitsFournis.find(
          (item) => item.id === product.idp
        );
        const prixUnitaire = fournisseurProduct
          ? fournisseurProduct.prixUnitaire
          : 0;
        const montant = product.quantite * prixUnitaire;
        totalAmount += montant;
      });
      return totalAmount.toLocaleString("en-US"); // Format the total amount with commas
    } else {
      console.error("Products array is not populated correctly:", products);
      return "N/A"; // Return a default value or handle the case when products is not populated
    }
  };

  const totalAmount = calculateTotalAmount(cmdData[0].products);
  console.log("Total Amount:", totalAmount); // Log the total amount to see if it's calculated correctly

  const totalAmountNumber = parseFloat(totalAmount.replace(",", "")); // Remove commas if present and parse as float
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
    <div style={{display:'flex', alignItems:'center' , justifyContent:'center',width:'100%'}}>
      <div className="container" style={{marginLeft:0,paddingLeft:0}}>
            <Nav />
            <div >
              <Side />
            </div>
        <div className="row">
          <section className="col-md-12 bordureBleue">

            <div className="pageEpc">
              <div className="topp">
                <h3 className="num-com">Command N°: {cmdData[0].numCmd}</h3>

                <div className="right-buttons">
                  <Link to="/commands-list" className="commands-list-link">
                    <button
                      className="commands-list"
                      onClick={() => navigate(-1)}
                    >
                      Commands List
                    </button>
                  </Link>
                  <Link to="/another-page" className="create-receipt-link">
                    <button
                      className="create-receipt"
                      onClick={() => console.log("Create Receipt clicked")}
                      style={{
                        display:
                          cmdData[0].state === "partially" ||
                          cmdData[0].state === "validated"
                            ? "block"
                            : "none",
                      }}
                    >
                      + Create Receipt
                    </button>
                  </Link>
                  <Link to="/bon-de-reception" className="view-receipt-link">
                    <button
                      className="view-receipt"
                      onClick={() => console.log("View Receipt clicked")}
                      style={{
                        display:
                          cmdData[0].state === "partially" ||
                          cmdData[0].state === "processed"
                            ? "block"
                            : "none",
                      }}
                    >
                      View Receipt
                    </button>
                  </Link>
                </div>
              </div>
              <div className="EPC">
                <table className="table1">
                  <thead>
                    <tr>
                      <td className="Esp-res">
                        Espace réservé au <br /> Service du contrôle
                        <br /> financier
                        <br />
                      </td>
                      <td>
                        <th className="bar-re">
                          REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE
                          <br /> MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA
                          RECHERCHE SCIENTIFIQUE <br /> <br /> BON DE COMMANDE{" "}
                          <br /> N° {cmdData[0].numCmd} date:{cmdData[0].date}
                        </th>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="LEFT">
                        A……………………… <br />
                        Le………………………
                      </td>
                      <th className="RIGHT" colSpan={tableService[0].length}>
                        Identification du service contractant
                      </th>

                      {tableService.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              className="info-service"
                              colSpan="2"
                              key={cellIndex}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tr>
                    <tr>
                      <td></td>
                      <th className="RIGHT" colSpan="2">
                        Identification du prestataire
                      </th>

                      <tr>
                        <td className="info-service" colSpan="2">
                          Nom ou raison sociale (mentionner la forme juridique):{" "}
                          {cmdData[0].supplier}
                        </td>{" "}
                      </tr>
                      <tr>
                        <td className="info-service" colSpan="2">
                          Adresse:{" "}
                          {fournisseurInfo ? fournisseurInfo.adresse : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="info-service" colSpan="2">
                          Téléphone et Fax:{" "}
                          {fournisseurInfo ? fournisseurInfo.telephone : "N/A"}{" "}
                          / {fournisseurInfo ? fournisseurInfo.fax : "N/A"}
                        </td>{" "}
                      </tr>
                      <tr>
                        <td className="info-service" colSpan="2">
                          {" "}
                          N° R.C: {fournisseurInfo
                            ? fournisseurInfo.rc
                            : "N/A"}{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp; numéro d'identification discale (NIF):{" "}
                          {fournisseurInfo ? fournisseurInfo.nif : "N/A"}
                        </td>{" "}
                      </tr>
                      <tr>
                        <td className="info-service" colSpan="2">
                          RIB (ou RIP):{" "}
                          {fournisseurInfo ? fournisseurInfo.rib : "N/A"}
                        </td>
                      </tr>
                    </tr>
                  </tbody>
                </table>
                <table className="table2">
                  <thead>
                    <tr>
                      <th className="RIGHT">
                        Caractéristiques de la commande{" "}
                      </th>
                      <tr className="obj-cmd">
                        <td className="LEFT">
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
                          <br />
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
                          <br />
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
                        <td className="RIGHT-CARA">
                          objet de la commande (Article) :
                          <br />
                          <strong>{cmdData[0].supplier} </strong>
                        </td>
                      </tr>
                    </tr>
                  </thead>
                  <tbody></tbody>
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
                    {cmdData[0] &&
                      cmdData[0].products &&
                      cmdData[0].products.map((product, index) => {
                        // Find the product in fournisseurInfo.produitsFournis
                        const fournisseurProduct =
                          fournisseurInfo.produitsFournis.find(
                            (item) => item.id === product.idp
                          );
                        // Get the prixUnitaire if the product is found
                        const prixUnitaire = fournisseurProduct
                          ? fournisseurProduct.prixUnitaire
                          : "N/A";

                        return (
                          <tr key={index}>
                            <td>{product.idp}</td> {/* N° = idp */}
                            <td>{product.nommP}</td> {/* Désignation = nommP */}
                            <td>{product.quantite}</td>{" "}
                            {/* Quantité = quantite */}
                            <td>{prixUnitaire}</td> {/* prixUnitaire */}
                            <td>
                              {calculateMontant(product.quantite, prixUnitaire)}
                            </td>{" "}
                            {/* Calculate Montant */}
                          </tr>
                        );
                      })}
                    <tr>
                      <td colSpan="2" className="vide"></td>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        TOTAL HT:
                      </td>
                      <td>{totalAmount.toLocaleString("en-US")}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="vide"></td>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        TVA 19%:
                      </td>
                      <td>{tva.toLocaleString("en-US")}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="vide"></td>

                      <td colSpan="2" style={{ textAlign: "center" }}>
                        TOTAL TTC:
                      </td>
                      <td>{totalTTC.toLocaleString("en-US")}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="montant">
                  <p>
                    {" "}
                    Arrêté le présent bon de commande à la somme de (en
                    lettres):
                  </p>
                  <strong> {totalTTCWords}</strong>
                </div>
                <div className="footer">
                  <p>
                    - Le prestataire s'engage à exécuter la présente commande
                    selon les conditions arrêtées.
                  </p>
                  <p>
                    - La source de financement : le budget de fonctionnement de
                    l’école de l’exercice 2024
                  </p>
                  <p>
                    - Le délai de livraison ou d'exécution est estimé à 60 jours
                    à compter de la date de signature du présent bon de
                    commande.
                  </p>
                </div>
                <strong className="directeur">LE DIRECTEUR</strong>
              </div>

              <div className="contner1">
                <div className="buttns1">
                  <button
                    className="edit1"
                    onClick={() => (window.location.href = "/edit-page")}
                  >
                    Edit
                  </button>
                  <button className="delete1" onClick={handleDelete}>
                    Delete
                  </button>
                  <button className="print" onClick={handlePrintClick}>
                    Print
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BonDeComande;
