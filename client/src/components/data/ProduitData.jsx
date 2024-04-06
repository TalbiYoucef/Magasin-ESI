const produitData = [
    {
      chapitre: 'Chapitre 1',
      articles: [
        {
          nom: 'Article 1',
          fournisseurs: [
            {
              nom:   "Sarl PC STORE",
              formeJuridique: 'Sarl',
              adresse: 'N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes',
              telephone: '048-74-14-52',
              fax: '048-74-14-52',
              nif: '00062200230774',
              rc: '22/00 - 0087099 C05',
              rib: '773 0568 301 587 12 BNA SBA',
              produitsFournis: [
                {
                  id: 0,
                  nom: 'Produit 2A',
                  description: 'Description du Produit 2A',
                  prixUnitaire: 20000.00
                },
                 {
                  id: 1,
                  nom: 'Produit 2A',
                  description: 'Description du Produit 2A',
                  prixUnitaire: 10000.00
                },
                {
                  id: 2,
                  nom: 'Produit 2A',
                  description: 'Description du Produit 2A',
                  prixUnitaire: 3500.00
                }
              ]
            },
            {
              nom: 'EURL Tech Solutions 1',
              formeJuridique: 'EURL',
              adresse: 'N° 10 Rue des Fleurs, Quartier des Roses, Alger',
              totalHT: 1500,
              telephone: '021-45-67-89',
              fax: '021-45-67-89',
              nif: '00071100234567',
              rc: '11/00 - 0123456 B07',
              rib: '786 1234 567 890 11 CPA ALG',
              produitsFournis: [
                {
                  id: 3,
                  nom: 'Produit 1B',
                  description: 'Description du Produit 1B',
                  prixUnitaire: 80
                },
                {
                  id: 4,
                  nom: 'Produit 2B',
                  description: 'Description du Produit 2B',
                  prixUnitaire: 120
                }
              ]
            }
          ]
        },
        {
          nom: 'Article 2',
          fournisseurs: [
            {
              nom: 'Sarl PC STORE 2',
              formeJuridique: 'Sarl',
              adresse: 'N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes',
              totalHT: 1000,
              telephone: '048-74-14-52',
              fax: '048-74-14-52',
              nif: '00062200230774',
              rc: '22/00 - 0087099 C05',
              rib: '773 0568 301 587 12 BNA SBA',
              produitsFournis: [
                {
                  id: 5,
                  nom: 'Produit 3A',
                  description: 'Description du Produit 3A',
                  prixUnitaire: 70
                },
                {
                  id: 6,
                  nom: 'Produit 4A',
                  description: 'Description du Produit 4A',
                  prixUnitaire: 90
                }
              ]
            },
            {
              nom: 'EURL Tech Solutions 2',
              formeJuridique: 'EURL',
              adresse: 'N° 10 Rue des Fleurs, Quartier des Roses, Alger',
              totalHT: 1500,
              telephone: '021-45-67-89',
              fax: '021-45-67-89',
              nif: '00071100234567',
              rc: '11/00 - 0123456 B07',
              rib: '786 1234 567 890 11 CPA ALG',
              produitsFournis: [
                {
                  id: 7,
                  nom: 'Produit 3B',
                  description: 'Description du Produit 3B',
                  prixUnitaire: 110
                },
                {
                  id: 8,
                  nom: 'Produit 4B',
                  description: 'Description du Produit 4B',
                  prixUnitaire: 130
                }
              ]
            }
          ]
        }
      ]
    },
    {
        chapitre: 'Chapitre 2',
        articles: [
          {
            nom: 'Article 3',
            fournisseurs: [
              {
                nom: 'Sarl PC STORE 3',
                formeJuridique: 'Sarl',
                adresse: 'N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes',
                telephone: '048-74-14-52',
                fax: '048-74-14-52',
                nif: '00062200230774',
                rc: '22/00 - 0087099 C05',
                rib: '773 0568 301 587 12 BNA SBA',
                produitsFournis: [
                   
                  {
                    id: 2,
                    nom: 'Produit 2A',
                    description: 'Description du Produit 2A',
                    prixUnitaire: 100
                  }
                ]
              },
              {
                nom: 'EURL Tech Solutions3 ',
                formeJuridique: 'EURL',
                adresse: 'N° 10 Rue des Fleurs, Quartier des Roses, Alger',
                totalHT: 1500,
                telephone: '021-45-67-89',
                fax: '021-45-67-89',
                nif: '00071100234567',
                rc: '11/00 - 0123456 B07',
                rib: '786 1234 567 890 11 CPA ALG',
                produitsFournis: [
                  {
                    id: 3,
                    nom: 'Produit 1B',
                    description: 'Description du Produit 1B',
                    prixUnitaire: 80
                  },
                  {
                    id: 4,
                    nom: 'Produit 2B',
                    description: 'Description du Produit 2B',
                    prixUnitaire: 120
                  }
                ]
              }
            ]
          },
          {
            nom: 'Article 4',
            fournisseurs: [
              {
                nom: 'Sarl PC STORE 4',
                formeJuridique: 'Sarl',
                adresse: 'N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes',
                totalHT: 1000,
                telephone: '048-74-14-52',
                fax: '048-74-14-52',
                nif: '00062200230774',
                rc: '22/00 - 0087099 C05',
                rib: '773 0568 301 587 12 BNA SBA',
                produitsFournis: [
                  {
                    id: 5,
                    nom: 'Produit 3A',
                    description: 'Description du Produit 3A',
                    prixUnitaire: 70
                  },
                  {
                    id: 6,
                    nom: 'Produit 4A',
                    description: 'Description du Produit 4A',
                    prixUnitaire: 90
                  }
                ]
              },
              {
                nom: 'EURL Tech Solutions 4',
                formeJuridique: 'EURL',
                adresse: 'N° 10 Rue des Fleurs, Quartier des Roses, Alger',
                totalHT: 1500,
                telephone: '021-45-67-89',
                fax: '021-45-67-89',
                nif: '00071100234567',
                rc: '11/00 - 0123456 B07',
                rib: '786 1234 567 890 11 CPA ALG',
                produitsFournis: [
                  {
                    id: 7,
                    nom: 'Produit 3B',
                    description: 'Description du Produit 3B',
                    prixUnitaire: 110
                  },
                  {
                    id: 8,
                    nom: 'Produit 4B',
                    description: 'Description du Produit 4B',
                    prixUnitaire: 130
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        chapitre: 'Chapitre 5',
        articles: [
            {
                nom: 'Article 5',
                fournisseurs: [
                  {
                    nom:'Sarl XYZ',
                    formeJuridique: 'Sarl',
                    adresse: 'N° 04 Cité 30 Logt EPLF Rue Capitaine Abdelhadi-Sidi Bel Abbes',
                    totalHT: 1000,
                    telephone: '048-74-14-52',
                    fax: '048-74-14-52',
                    nif: '00062200230774',
                    rc: '22/00 - 0087099 C05',
                    rib: '773 0568 301 587 12 BNA SBA',
                produitsFournis: [
                    {
                        id: 9,
                        nom: "Produit 7",
                        description: 'Description du Produit 3B',
                        prixUnitaire: 1300
                    },
                    {
                        id: 10,
                        nom: "Produit 8",
                        description: 'Description du Produit 3B',
                        prixUnitaire: 1600
                    },
                    {
                        id: 11,
                        nom: "Produit 9",
                        description: 'Description du Produit 3B',
                        prixUnitaire: 1600
                    }
                ]
            }
        ]
    }

  ]
}];
  
  export default produitData;
  