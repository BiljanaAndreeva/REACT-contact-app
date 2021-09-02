import React, {useState, useEffect } from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"; 
import {uuid} from "uuidv4";
import './App.css';

import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from "./ContactDetail";

function App() {
  const [contacts, setContacts]=useState([]);

  const LOC_STORE_KEY="contacts";

  const AddContactHandler=(contact)=>{
    console.log(contact);
    setContacts([...contacts, {id:uuid(),...contact}]);
  };

  const removeContactHandler = (id) => {
    const newContactlist=contacts.filter((contact) =>{
      return contact.id != id;
    });
    setContacts(newContactlist);
  };

  useEffect(() => {
    const retriveContacts=JSON.parse(localStorage.getItem(LOC_STORE_KEY));
   if (retriveContacts) setContacts(retriveContacts);
    
  }, []);

  useEffect(() => {
    localStorage.setItem(LOC_STORE_KEY, JSON.stringify(contacts));
    
  }, [contacts]);

 

 return (

    <div className="ui container">
      <Router>
    {/*   <Header /> */}
        <Switch>
          <Route path="/" 
            exact 
            render={(props)=>(
            <ContactList 
              {...props} 
              contacts={contacts} 
              getContactId={removeContactHandler}/>

            )}
            />
          <Route 
            path="/add" 
            render={(props) => (
              <AddContact
              {...props}
               AddContactHandler= {AddContactHandler} />

            )}
          />
          <Route path="/contact/:id" component={ContactDetail}/>
        
        </Switch>
        {/*<AddContact AddContactHandler= {AddContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler}/>  */}

      </Router>
      
    </div>
  );
}

export default App;
