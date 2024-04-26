
const UserData = [
    { 
      id: '0', 
      username: 'hafsa aouaichia', 
      photo: '../../assets/logo.png', 
      password: '267517',    
      firstname: 'Hafsa', 
      lastname: 'Aouaichia', 
      address: 'El Matmar, Relizane', 
      phone: '+213 0553454437', 
      email: 'h.aouaichia@esi-sba.dz', 
      status: 'enable', 
      role : 'Administrator',
      roles: ['Director', 'Administrator', 'Storekeeper'],  
      permissions: 'create, delete', 
      service: 'Service A' 
    },
    { 
      id: '1', 
      username: 'john_doe', 
      firstname: 'John', 
      lastname: 'Doe', 
      password: '267517',    
      address: '123 Main St, Anytown', 
      phone: '+123 4567890', 
      email: 'john.doe@esi-sba.dz', 
      status: 'active', 
      roles: ['Purchasing Agent'], 
      service: 'Service B' 
    },
    { 
      id: '2', 
      username: 'jane_smith', 
      firstname: 'Jane', 
      lastname: 'Smith', 
      address: '456 Elm St, Anycity', 
      phone: '+987 6543210', 
      email: 'jane.smith@example.com', 
      status: 'active', 
      roles: ['Consumer', 'Head of department'], 
      service: 'Service C' 
    },
    { 
      id: '3', 
      username: 'alice_johnson', 
      firstname: 'Alice', 
      lastname: 'Johnson', 
      address: '789 Oak St, Anystate', 
      phone: '+345 6789012', 
      email: 'alice.johnson@example.com', 
      status: 'active', 
      roles: ['Director'], 
      service: 'Service D' 
    },
    { 
      id: '4', 
      username: 'bob_jones', 
      firstname: 'Bob', 
      lastname: 'Jones', 
      address: '101 Pine St, Anytown', 
      phone: '+567 8901234', 
      email: 'bob.jones@example.com', 
      status: 'inactive', 
      roles: ['Administrator', 'Purchasing Agent'], 
      service: 'Service E' 
    },
    { 
      id: '5', 
      username: 'emma_davis', 
      firstname: 'Emma', 
      lastname: 'Davis', 
      address: '321 Cedar St, Anycity', 
      phone: '+678 9012345', 
      email: 'emma.davis@example.com', 
      status: 'active', 
      roles: ['Storekeeper'], 
      service: 'Service F' 
    },
    { 
      id: '6', 
      username: 'william_taylor', 
      firstname: 'William', 
      lastname: 'Taylor', 
      address: '543 Maple St, Anystate', 
      phone: '+890 1234567', 
      email: 'william.taylor@example.com', 
      status: 'active', 
      roles: ['Consumer'], 
      service: 'Service G' 
    },
    { 
      id: '7', 
      username: 'olivia_thomas', 
      firstname: 'Olivia', 
      lastname: 'Thomas', 
      address: '876 Birch St, Anytown', 
      phone: '+987 6543210', 
      email: 'olivia.thomas@example.com', 
      status: 'inactive', 
      roles: ['Director', 'Administrator'], 
      service: 'Service H' 
    },
    { 
      id: '8', 
      username: 'liam_martin', 
      firstname: 'Liam', 
      lastname: 'Martin', 
      address: '234 Walnut St, Anycity', 
      phone: '+234 5678901', 
      email: 'liam.martin@example.com', 
      status: 'active', 
      roles: ['Head of department'], 
      service: 'Service I' 
    },
    { 
      id: '9', 
      username: 'ava_anderson', 
      firstname: 'Ava', 
      lastname: 'Anderson', 
      address: '567 Pine St, Anystate', 
      phone: '+543 2198765', 
      email: 'ava.anderson@example.com', 
      status: 'active', 
      roles: ['Purchasing Agent', 'Storekeeper'], 
      service: 'Service J' 
    },
    { 
      id: '10', 
      username: 'noah_miller', 
      firstname: 'Noah', 
      lastname: 'Miller', 
      address: '789 Cedar St, Anytown', 
      phone: '+123 4567890', 
      email: 'noah.miller@example.com', 
      status: 'active', 
      roles: ['General Secretary'], 
      service: 'Service K' 
    } ];
  
  export default UserData;
  