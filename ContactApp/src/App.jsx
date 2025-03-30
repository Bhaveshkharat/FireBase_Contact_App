import React from 'react'
import Navbar from './components/Navbar'
import { IoSearch } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { useState,useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from './components/ContactCard';
import Model from './components/Model';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import UseDisclouse from './hooks/UseDisclouse';
import { onSnapshot } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import NotFoundContact from './components/NotFoundContact';
const App = () => {

const [contacts, setContacts] = useState([]);
const {isOpen, onClose, onOpen} = UseDisclouse();

useEffect(() => {
  const getContacts = async () => {
  try {
    const contactsRef = collection(db,"contacts")
    

    onSnapshot(contactsRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => 
        {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        setContacts(contactsList);
        return contactsList;
    })
    
  }catch (error) {
    console.log(error);
  }
};
getContacts();
}, [])

const filterContacts = (e) => {
  const value = e.target.value;

  const contactsRef = collection(db,"contacts")

  onSnapshot(contactsRef, (snapshot) => {
    const contactsList = snapshot.docs.map((doc) => 
      {
        return {
          id: doc.id,
          ...doc.data()
        }
      });

      const filterContacts = contactsList.filter(contact => 
        contact.name.toLowerCase().includes(value.toLowerCase()) 
      )
      setContacts(filterContacts);
      return filterContacts;
  })

}


  return (
    <>
    <div className='mx-auto max-w-[370px]'>
      <Navbar />
      <div className='flex gap-2'>
      <div className='flex flex-grow relative items-center'>
      <IoSearch className='text-white text-3xl absolute ml-1'/>
    
        <input type="text"
        onChange={filterContacts}
        className='h-10 flex-grow bg-transparent border border-white rounded-md text-white pl-9' />
      </div>
      <div>
      <CiCirclePlus onClick={onOpen} className='text-5xl text-white'/>
      </div>
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        {contacts.length <= 0 ? (<NotFoundContact />) :(
        contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        )))}
      </div>
    </div>
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
    <ToastContainer position='bottom-center' />
   </> 
  )
}

export default App
