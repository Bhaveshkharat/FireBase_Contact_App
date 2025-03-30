import React from 'react'
import { IoMdContact } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { db } from '../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import AddAndUpdateContact from './AddAndUpdateContact';
import UseDisclouse from '../hooks/UseDisclouse';
import { toast } from 'react-toastify';

const ContactCard = ({contact}) => {

  const {isOpen, onClose, onOpen} = UseDisclouse();
   
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully")
  }catch(error){
    console.log(error);
  }
}


  return (
    <>
    <div key={contact.id} className='bg-yellow flex justify-between items-center p-2 rounded-lg'>
                <div className='flex gap-3'>
                <IoMdContact className='text-4xl text-orange'/>
                <div>
                  <h1 className='text-black text-medium'>{contact.name}</h1>
                  <p className=' text-black text-sm text-gray-400'>{contact.email}</p>
                </div>
                </div>
                <div className='flex text-3xl gap-2'>
                  <RiEditCircleLine  onClick={onOpen} className='cursor-pointer'/>
                  <IoMdTrash onClick={()=> deleteContact(contact.id)} className='text-orange cursor-pointer'/>
                </div>
              </div>
              <AddAndUpdateContact isUpdate contact={contact} isOpen={isOpen} onClose={onClose}/>
              </>   
        
  )
}

export default ContactCard
