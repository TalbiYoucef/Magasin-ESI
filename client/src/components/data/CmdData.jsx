const CmdData = [
    {
      id: '0',
      numCmd: '1',
      chapitre:'Chapitre1',
      article:'Article1',
      supplier: 'Sarl PC STORE',
      date: '04-03-2024',
      state: 'initialized',
      products: [
        { idp: 0, nommP: 'Produit 1',quantite:2 },
        { idp: 1, nommP: 'Produit 2' ,quantite:1},
        { idp: 2, nommP: 'Produit 3' ,quantite:2}
      ]
    },
    {
      id: '1',
      numCmd: '2',
      chapitre:'Chapitre2',
      article:'Article2',
      supplier: 'EURL Tech Solutions',
      date: '05-03-2024',
      state: 'in_progress',
      products: [
        { idp: 3, nommP: 'Produit 4',quantite:3 },
        { idp: 4, nommP: 'Produit 5',quantite:2 }
      ]
    },
    {
      id: '2',
      numCmd: '3',
      chapitre:'Chapitre3',
      article:'Article3',
      supplier: 'Société ABC',
      date: '06-03-2024',
      state: 'completed',
      products: [
        { idp: 5, nommP: 'Produit 6',quantite:1 }
      ]
    },
   
  ];
  
  localStorage.setItem("BonDeComande", JSON.stringify(CmdData));
