// CreateCmd.js
import React, { useState, useEffect } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import CmdData from "../data/CmdData";
import ProduitData from "../data/Produit";
import { Link } from "react-router-dom";
import CmdComp from "./cmdComp";
import { MdNavigateNext } from "react-icons/md";
function CreateRec() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [cmdDataList, setCmdDataList] = useState([]); //cmdDataList contient table de produit ajoute

  const [Products, setProducts] = useState([]);
  const [priU, setPriU] = useState("");
  const [command, setCommand] = useState({
    id: "0",
    numCmd: "1",
    chapitre: "Chapitre 1",
    Article: "Article 1",
    supplier: "Sarl PC STORE",
    date: "04-03-2024",
    state: "initialized",
    products: [
      { idp: 0, nommP: "Produit 1", quantite: "100" },
      { idp: 1, nommP: "Produit 2", quantite: "100" },
      { idp: 2, nommP: "Produit 3", quantite: "100" },
      { idp: 3, nommP: "Produit 4", quantite: "100" },
      { idp: 4, nommP: "Produit 5", quantite: "100" },
    ],
  });
  const [filteredProducts, setFilteredProducts] = useState(command.products);

  const handleRemoveCmd = (id) => {
    setCmdDataList(cmdDataList.filter((cmdData) => cmdData.id !== id));
    const removedCmd = cmdDataList.find((cmdData) => cmdData.id === id);
    if (removedCmd) {
      setFilteredProducts([
        ...filteredProducts,
        { nommP: removedCmd.selectedPro },
      ]);
    }
    console.log("removedCmd", removedCmd);
    console.log("filteredProducts remove", filteredProducts);
  };

  console.log("cmdDataList", cmdDataList);

  const handleAddCmd = (cmdData) => {
    setCmdDataList([...cmdDataList, cmdData]);
    console.log(cmdData);
    setFilteredProducts(
      filteredProducts.filter(
        (product) => product.nommP !== cmdData.selectedPro
      )
    );
    console.log("filteredProducts add", filteredProducts);
  };
  console.log("filteredProducts", filteredProducts);
  const handleConfirmCommand = () => {
    const confirm = window.confirm(
      "Are you sure you want to Confirm the Receipt?"
    );
    if (confirm) {
      if (cmdDataList.length > 0) {
        const date = new Date().toLocaleDateString("fr-FR");
        const ReceipInfo = {
          id: CmdData.length,
          numRecipt: CmdData.length + 1,
          numCommand: command.numCmd,
          date: date,
          products: cmdDataList.map((cmd) => ({
            idp: cmd.id,
            nommP: cmd.selectedPro,
            quantité: cmd.quantity,
          })),
        };
        console.log("ReceipInfo:", ReceipInfo);
        //   window.location.href = '/Command';
      } else {
        alert("fill in at least one product ");
      }
    }
  };

  const handleCancel = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel the command?"
    );
    if (confirm) {
      setSelectedChapter(null);
      setSelectedArticle(null);
      setSelectedSupplier(null);
      setCmdDataList([]);
      setFilteredProducts([]);
      setProducts([]);
      setPriU("");
    }
  };

  const handleCmdList = () => {
    const confirm = window.confirm(
      "Are you sure you want to Leave this form ?"
    );
    if (confirm) {
      setSelectedChapter(null);
      setSelectedArticle(null);
      setSelectedSupplier(null);
      setCmdDataList([]);
      setFilteredProducts([]);
      setProducts([]);
      setPriU("");
      window.location.href = "/Command";
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const today = new Date().toLocaleDateString("fr-FR");
  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnusers">
        <Side style={{ marginTop: "90px" }} link="commands" />
        <div
          style={{
            marginTop: "8vh",
            marginLeft: " 60px",
            width: "100%",
            height: "92vh",
            padding: "60px",
          }}
        >
          <div
            className="crcmd1"
            style={{
              display: "flex ",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "300px",
              marginBottom: "40px",
            }}
          >
            <div style={{ display: "flex ", gap: "20px" }}>
              <div
                className="titre11"
                style={{ color: "#5B548E", fontSize: "20px" }}
              >
                {" "}
                Create Receipt N°{" "}
              </div>
              <div
                className="num-cmd-1"
                style={{
                  borderRadius: "20px",
                  height: "30px",
                  width: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                  color: "#616262",
                }}
              >
                {CmdData.length + 1}
              </div>
              <div
                className="num-cmd-1"
                style={{
                  borderRadius: "20px",
                  height: "30px",
                  width: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                  color: "#616262",
                }}
              >
                {today}
              </div>
            </div>
            <Link
              onClick={handleCmdList}
              style={{
                borderRadius: "20px",
                height: "30px",
                width: "200px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                textDecoration: "none",
                backgroundColor: "#100B39",
                color: "white",
              }}
            >
              {" "}
              Commands List <MdNavigateNext />{" "}
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "3%",
              marginBottom: "3%",
              gap: "5%",
              width: "95%",
              height: "140px",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
            }}
          >
            <div className="su130" style={{ width: "45%" }}>
              <p
                htmlFor=""
                style={{
                  color: "#5B548E",
                  marginLeft: "60px",
                  marginTop: "10px",
                }}
              >
                Supplier
              </p>
              <input
                type="text"
                name=""
                id=""
                className="suppname30"
                style={{
                  width: "100%",
                  height: "50px",
                  marginLeft: "5%",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  border: "none",
                }}
                value={command.supplier}
              />
              {/* Remplir le champ avec le nom du fournisseur de la commande sélectionnée */}
            </div>

            <div className="su230" style={{ width: "20%" }}>
              <p
                htmlFor=""
                style={{
                  color: "#5B548E",
                  marginLeft: "60px",
                  marginTop: "10px",
                }}
              >
                N° Command
              </p>
              <input
                type="text"
                className="nCom30"
                style={{
                  width: "100%",
                  height: "50px",
                  marginLeft: "5%",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  border: "none",
                }}
                value={command.numCmd}
              />{" "}
              {/* Remplir le champ avec le numéro de la commande sélectionnée */}
            </div>
            <div className="su330">
              <p
                htmlFor=""
                style={{
                  color: "#5B548E",
                  marginLeft: "60px",
                  marginTop: "10px",
                }}
              >
                Date
              </p>
              <input
                type="text"
                className="date30"
                style={{
                  width: "100%",
                  height: "50px",
                  marginLeft: "5%",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  border: "none",
                }}
                value={command.date}
              />
              {/* Remplir le champ avec la date de la commande sélectionnée */}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "3%",
              gap: "5%",
              width: "95%",
              overflowY: "100% auto",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
              position: "relative",
            }}
          >
            <div
              style={{
                color: "#5B548E",
                fontSize: "20px",
                marginLeft: "60px",
                marginTop: "20px",
              }}
            >
              Designations :
            </div>

            {/* La liste des composants de commande */}
            {cmdDataList.map((cmdData) => (
              <div
                key={cmdData.id}
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "35%",
                    marginLeft: "7%",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      color: "#5B548E",
                      fontSize: "20px",
                      marginLeft: "60px",
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    {" "}
                    Product:{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      margin: "0px",
                    }}
                  >
                    <button
                      onClick={() => handleRemoveCmd(cmdData.id)}
                      style={{
                        fontSize: "30px",
                        color: "red",
                        border: "none",
                        backgroundColor: "white",
                      }}
                    >
                      -
                    </button>
                    <div
                      style={{
                        color: "#666666",
                        borderRadius: "20px",
                        height: "45px",
                        width: "500px",
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                        border: "none",
                        paddingLeft: "20px",
                      }}
                    >
                      {cmdData.selectedPro}{" "}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      color: "#5B548E",
                      fontSize: "20px",
                      marginLeft: "10px",
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    {" "}
                    Quantité:{" "}
                  </div>
                  <div
                    style={{
                      color: "#666666",
                      borderRadius: "20px",
                      height: "45px",

                      width: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  >
                    {" "}
                    {cmdData.quantity}{" "}
                  </div>
                </div>
              </div>
            ))}
            <CmdComp
              filteredProducts={filteredProducts}
              onAddCmd={(cmdData) => {
                handleAddCmd(cmdData);
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
              marginBottom: "40px",
              height: "100px",
            }}
          >
            <button
              style={{
                borderRadius: "20px",
                height: "35px",
                width: "120px",
                paddingRight: "10px",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                backgroundColor: "white",
                justifyContent: "center",
                color: "#17BF6B",
                border: "1.5px solid #17BF6B",
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              style={{
                borderRadius: "20px",
                height: "35px",
                width: "120px",
                paddingRight: "10px",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                backgroundColor: "#17BF6B",
                justifyContent: "center",
                color: "white",
                border: "none",
              }}
              onClick={handleConfirmCommand}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRec;
