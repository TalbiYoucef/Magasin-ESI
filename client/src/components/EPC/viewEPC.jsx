import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./viewepc.css";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const BonDeComande = () => {
  const { id } = useParams();
  const [order,setOrder]=useState({})
  const [user, setUser] = useState({});
  const [supplier, setSupplier] = useState({});
  const [article, setArticle] = useState({});
  const [products, setProducts] = useState([]);
  const [allProducts,setAllProducts]=useState([])

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        try {
          const resp = await axios.get(
            `http://localhost:3036/commands/${id}/products`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          console.log(resp.data)
          setProducts(resp.data);
        } catch (error) {
          alert(error.response.data.message);
          navigate("/commands");
          console.log(error);
        }
        try {
          const pro = await axios.get(
            `http://localhost:3036/products`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setAllProducts(pro.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(
            `http://localhost:3036/commands/${id}/purchasing-order`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setOrder(resp.data.order)
          console.log(resp.data.order)
          try {
            const article = await axios.get(
              `http://localhost:3036/branches/${resp.data.order.branch_id}/`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
            console.log(article.data)
            setArticle(article.data);
          } catch (error) {
            console.log(error);
          }

          try {
            const supplier = await axios.get(
              `http://localhost:3036/suppliers/${resp.data.order.supplier_id}/`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
            // setCmdDataList(resp.data);
            console.log(supplier.data.supplier)
            setSupplier(supplier.data.supplier);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          alert(error.response.data.message);
          navigate("/commands");
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
  const getproduct = (id)=>{
      const product = allProducts.find(pro => pro.product_id === id);
      if (product) {
         return product        
      }
      return '';
  }
  const [selectedOption, setSelectedOption] = useState(null);
  const frameRef = useRef(null);
  //data of bon de commande
  const cmdData = [
    {
      id: "0",
      numCmd: "1",
      chapitre: "Chapitre 1",
      article: "Article 1",
      supplier: "Sarl PC STORE",
      date: "04-03-2024",
      state: "partially",
      products: [
        { idp: 0, nommP: "Produit 1", quantite: 2 },
        { idp: 1, nommP: "Produit 2", quantite: 1 },
        { idp: 2, nommP: "Produit 3", quantite: 2 },
      ],
    },
  ];
 
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      navigate(-1); // Use navigate function to go back
    }
  };
  const handleDownloadClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const buttons = document.querySelectorAll(".buttns1");
    buttons.forEach((button) => (button.style.display = "none"));

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Define the width and height of the frame (adjust as needed)
    const FRAME_WIDTH = 220; // in mm

    // Add margin at the top (adjust this value as needed)
    const TOP_MARGIN = 20;

    html2canvas(frameRef.current, { scrollY: -window.scrollY })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Add margin at the top of the PDF
        pdf.addImage(
          imgData,
          "PNG",
          0,
          TOP_MARGIN,
          FRAME_WIDTH,
          (canvas.height * FRAME_WIDTH) / canvas.width
        );

        // Save the PDF
        pdf.save("bon_de_commande.pdf");

        buttons.forEach((button) => (button.style.display = "block"));
      })
      .catch((error) => {
        console.error("Error during canvas creation:", error);
      });
  };
  const numberToWords = (number) => {
    if (typeof number !== "string") {
      number = String(number);
    }
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
        const chunk = num % 1000; // Add this line for debugging
        if (chunk > 0) {
          let chunkStr = "";

          // Hundreds
          const hundreds = Math.floor(chunk / 100);// Add this line for debugging
          if (hundreds > 0) {
            chunkStr += units[hundreds] + " cent ";
          }

          // Tens and Units
          const tensUnits = chunk % 100; // Add this line for debugging
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
  const totalAmount = order.total_price;
  const tva = totalAmount * 0.19;
 
  // Calculate the Total TTC
  const totalTTC = totalAmount + tva;
  // Convert the total TTC amount to words
  const totalTTCWords = numberToWords(totalTTC);
  return (
    <>
      <div>
        <nav>
          {" "}
          <Nav username={user.username} />{" "}
        </nav>
        <div className="row">
          <section>
            <div>
              {" "}
              <Side />{" "}
            </div>
            <div className="pageEpc">
              <div className="top-Epc">
                <h3 className="num-command">Command N°: {order.order_id}</h3>
                <div className="right-buttons">
                  <Link to="/commands-list" className="commands-list-link">
                    <button
                      className="commands-list"
                      onClick={() => navigate(-1)}
                    >
                      Commands List
                    </button>
                  </Link>
                  <Link to={`/order/${order.order_id}/create-bon-reception`} className="create-receipt-link">
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
                  <Link to={`/bonsdereception/${order.order_id}`} className="view-receipt-link">
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
              <div ref={frameRef} style={{ margin: "auto" }}>
                <div className="EPC">
                  <table className="table1">
                    <thead>
                      <tr>
                        <td className="Esp-reserve">
                          Espace réservé au <br /> Service du contrôle
                          <br /> financier
                          <br />
                        </td>
                        <td>
                          <th className="republic-alg">
                            REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE
                            <br /> MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE
                            LA RECHERCHE SCIENTIFIQUE <br /> <br /> BON DE
                            COMMANDE <br /> N° {order.order_id} date:
                            {String(order.createdAt).split('T')[0]}
                          </th>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="left-col">
                          A……………………… <br />
                          Le………………………
                        </td>
                        <th
                          className="right-col"
                          colSpan={tableService[0].length}
                        >
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
                        <th className="right-col" colSpan="2">
                          Identification du prestataire
                        </th>
                        <tr>
                          <td className="info-service" colSpan="2">
                            Nom ou raison sociale (mentionner la forme
                            juridique): {supplier.name}
                          </td>{" "}
                        </tr>
                        <tr>
                          <td className="info-service" colSpan="2">
                            Adresse:{" "}
                            {supplier.address}
                             </td>
                        </tr>
                        <tr>
                          <td className="info-service" colSpan="2">
                            Téléphone et Fax:{" "}
                            {supplier.phone_num}
                            </td>{" "}
                        </tr>
                        <tr>
                          <td className="info-service" colSpan="2">
                            {" "}
                            N° R.C:{" "}
                            {supplier.registre_c}
                             </td>{" "}
                        </tr>
                        <tr>
                          <td className="info-service" colSpan="2">
                            RIB (ou RIP):{" "}
                            {supplier.RIB}
                             </td>
                        </tr>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table2">
                    <thead>
                      <tr>
                        <th className="right-col">
                          Caractéristiques de la commande{" "}
                        </th>
                        <tr className="obj-cmd">
                          <td className="left">
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
                            <strong>{article.name} </strong>
                          </td>
                        </tr>
                      </tr>
                    </thead>
                    <tbody></tbody>
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
                      {products.map((product, index) => {
                        const prixUnitaire = product.unit_price;
                        const quantity = product.quantity;
                        const montant = calculateMontant(
                          quantity,
                          prixUnitaire
                        );
                        
                          return (
                            <tr key={index}>
                              <td>{index+1}</td> {/* N° = idp */}
                              <td>
                                {getproduct(product.product_id).name} {getproduct(product.product_id).description}
                              </td>{" "}
                              {/* Désignation = description */}
                              <td>{quantity}</td>{" "}
                              {/* Quantité = quantite */}
                              <td>{prixUnitaire}</td> {/* Prix unitaire */}
                              <td>{montant}</td> {/* Montant */}
                            </tr>
                          );
                        
                      })}
                      <tr>
                        <td colSpan="2" className="td-table"></td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          TOTAL HT:
                        </td>
                        <td>{totalAmount}</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="td-table"></td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          TVA 19%:
                        </td>
                        <td>{tva.toLocaleString("en-US")}</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="td-table"></td>
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
                      - La source de financement : le budget de fonctionnement
                      de l’école de l’exercice 2024
                    </p>
                    <p>
                      - Le délai de livraison ou d'exécution est estimé à 60
                      jours à compter de la date de signature du présent bon de
                      commande.
                    </p>
                  </div>
                  <strong className="directeur">LE DIRECTEUR</strong>
                </div>
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
                  <button className="download1" onClick={handleDownloadClick}>
                    Download
                  </button>{" "}
                  {/* Replace Print button with Download */}
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
