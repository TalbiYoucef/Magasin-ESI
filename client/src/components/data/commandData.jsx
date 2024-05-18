const CmdData = [
    {
      id: '0',
      numCmd: '1',
      chapitre: 'Chapitre 1',
      Article: 'Article 1',
      supplier: 'Sarl PC STORE',
      date: '04-03-2024',
      state: 'initialized',
      products: [
        { idp: 0, nommP: 'Produit 1',quantite:'100' },
        { idp: 1, nommP: 'Produit 2' ,quantite:'100'},
        { idp: 2, nommP: 'Produit 3',quantite:'100' }
      ]
    },
    {
      id: '1',
      numCmd: '2',
      chapitre: 'Chapitre 2',
      Article: 'Article 2',
      supplier: 'EURL Tech Solutions',
      date: '05-03-2024',
      state: 'processed',
      products: [
        { idp: 3, nommP: 'Produit 4',quantite:'100' },
        { idp: 4, nommP: 'Produit 5',quantite:'100' }
      ]
    },
    {
      id: '2',
      numCmd: '3',
      chapitre: 'Chapitre 3',
      Article: 'Article 3',
      supplier: 'Société ABC',
      date: '06-03-2024',
      state: 'validated',
      products: [
        { idp: 5, nommP: 'Produit 6',quantite:'100' }
      ]
    },
    {
      id: '3',
      numCmd: '4',
      chapitre: 'Chapitre 4',
      Article: 'Article 4',
      supplier: 'Sarl XYZ',
      date: '07-03-2024',
      state: 'initialized',
      products: [
        { idp: 6, nommP: 'Produit 7',quantite:'100' },
        { idp: 7, nommP: 'Produit 8' ,quantite:'100'},
        { idp: 8, nommP: 'Produit 9',quantite:'100' }
      ]
    },
    {
      id: '4',
      numCmd: '5',
      chapitre: 'Chapitre 5',
      Article: 'Article 5',
      supplier: 'Sarl XYZ',
      date: '07-03-2024',
      state: 'partially',
      products: [
        { idp: 9, nommP: 'Produit 7' ,quantite:'100'},
        { idp: 10, nommP: 'Produit 8' ,quantite:'100'},
        { idp: 11, nommP: 'Produit 9' ,quantite:'100'}
      ]
    },
    {
      id: '5',
      numCmd: '6',
      chapitre: 'Chapitre 6',
      Article: 'Article 6',
      supplier: 'Sarl XYZ',
      date: '07-03-2024',
      state: 'cancelled',
      products: [
        { idp: 12, nommP: 'Produit 7' ,quantite:'100'},
        { idp: 13, nommP: 'Produit 8',quantite:'100' },
        { idp: 14, nommP: 'Produit 9',quantite:'100' }
      ]
    }
    
  ];
  
  export default CmdData;