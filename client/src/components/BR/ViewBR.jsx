import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./viewBR.css";
import Nav from "../nav/nav";
import Side from "../side/side";
import logoesi from "../../assets/logo.png";
const BonDeReception = () => {
  //data of bon de commande
  const cmdData = [
    {
      id: "0",
      numCmd: "1",
      chapitre: "Chapitre1",
      article: "Article1",
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
  //data of bon de commande
  const brData = [
    {
      id: "2",
      date: "09-03-2024",
      cmdid: "1",
      commnt: "",
      type: "",
    },
  ];

  const handlePrint = () => {
    window.print();
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
        <Nav />
        <div>
          <Side />
        </div>

        <div className="row">
          <section className="col-md-12 bordureBleue">
            <div className="barr"></div>
            <div className="bnrespt">
              <h4 className="BR">BON DE RECEPTION N° : {brData[0].id}</h4>
              <div className="buttons-right-rs">
                <Link to="/commands-list">
                  <button className="commands-ls" onClick={() => navigate(-2)}>
                    Commands List
                  </button>
                </Link>
                <Link
                  to={`/bondecommand/${cmdData[0].numCmd}`}
                  className="view-cmd-link"
                >
                  <button
                    className="view-cmd"
                    onClick={() => console.log("View cmd clicked")}
                  >
                    View Command
                  </button>
                </Link>
              </div>
            </div>
            <div className="frame1">
              <div className="cont" style={{ maxWidth: "800px" }}>
                <div>
                  <img className="logoesi-img" src={logoesi} alt="My Image" />
                </div>
                <div className="bon-r">
                  <h4>BON DE RECEPTION</h4>
                  <div className="info-br">
                    <h4>N° :{brData[0].id}</h4>&nbsp;&nbsp;
                    <h4>Date :{brData[0].date}</h4>
                  </div>
                </div>
                <div className="info1">
                  <p>Fournisseur: {cmdData[0].supplier}</p>
                  <div className="info-br2">
                    <p>N° du Bon de commande : {cmdData[0].numCmd}</p>{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                        <td className="info-product info-designation">
                          {product.nommP}
                        </td>
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
