import React, {useState, useEffect } from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"; 
import {uuid} from "uuidv4";
import api from "../api/contacts";
import "./App.css";
import 'semantic-ui-css/semantic.min.css';

import Header from './Header';
import AddContact from './AddContact';
import EditContact from "./EditContact";
import ContactList from './ContactList';
import ContactDetail from "./ContactDetail";

function App() {
  const LOC_STORE_KEY="contacts"; 

  const [contacts, setContacts]=useState([]);
  const [searchTerm, setSearchTerm]=useState("");
  const [searchResult, setSearchResult]=useState([]);


  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;

  }

  const AddContactHandler= async (contact)=>{
    console.log(contact);
    const request = {
      id : uuid(),
      ...contact,
    }
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const UpdateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, className, email}= response.data;
    setContacts(
      contacts.map((contact)=>{
        return contact.id===id ? {...response.data} : contact;
      })
    );

  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactlist=contacts.filter((contact) =>{
      return contact.id != id;
    });
    setContacts(newContactlist);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactlist= contacts.filter((contact)=>{
        return Object.values(contact) 
        .join("")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactlist);
    } else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
   // const retriveContacts=JSON.parse(localStorage.getItem(LOC_STORE_KEY));
   //if (retriveContacts) setContacts(retriveContacts);

   const getAllContacts = async () =>{
     const allContacts = await retrieveContacts();
     if(allContacts) setContacts(allContacts);

   };
   getAllContacts();
    
  }, []);

  useEffect(() => {
   // localStorage.setItem(LOC_STORE_KEY, JSON.stringify(contacts));
    
  }, [contacts]);

 

 return (

    <div className="ui container">
      <Router>
       <Header/> 
        <Switch>
          <Route path="/" 
            exact 
            render={(props)=>(
            <ContactList 
              {...props} 
              contacts={searchTerm.length <1 ? contacts : searchResult } 
              getContactId={removeContactHandler}
              term = {searchTerm}
              searchKeyWord={searchHandler}
              />

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

          <Route  
            path="/edit" 
            render={(props) => (
              <EditContact
              {...props}
               UpdateContactHandler= {UpdateContactHandler} />

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
