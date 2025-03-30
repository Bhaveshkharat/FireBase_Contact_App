import React from 'react'
import Model from './Model'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { db } from '../config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const contactSchemaValidation = yup.object().shape({
    name: yup.string().required("Name is required *"),
    email: yup.string().email("Email is not valid").required("Email is required *")
})

const AddAndUpdateContact = ({isOpen,onClose, isUpdate, contact}) => {
   
    const addContact = async (contact) => {
        try{
            const contactRef = collection(db,"contacts");
            await addDoc(contactRef,contact);
            onClose();
            toast.success("Contact Added Successfully")
            
        }catch(error){
            console.log(error);
        }
    }

    const updateContact = async (contact, id) => {
        try{
            const contactRef = doc(db,"contacts" , id);
            await updateDoc(contactRef,contact);
            onClose();
            toast.success("Contact Updated Successfully")
        }catch(error){
            console.log(error);
        }
    }



  return (
    <div>
       <Model isOpen={isOpen} onClose={onClose}>
       <Formik
       validationSchema={contactSchemaValidation}
       initialValues={isUpdate ? {
        name: contact.name,
        email: contact.email
       } : {
        name: "",
        email: ""
       }}
       onSubmit={(values) => {
        console.log(values);
        isUpdate ? updateContact(values, contact.id) :  
        addContact(values);
       }}
       >
        <Form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name</label>
            <Field name="name" className="h-10 border rounded-lg"/>
            <div className='text-red-500 text-sm'>
                <ErrorMessage name="name"/>
            </div>
            </div>
            <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email Address</label>
            <Field name="email" className="h-10 border rounded-lg"/>
            <div className='text-red-500 text-sm'>
                <ErrorMessage name="email"/>
            </div>
            </div>

            <button  className='bg-orange px-3 py-1.5 border self-end rounded-lg'>{isUpdate ? "Update" : "Add"} contact</button>
        </Form>
       </Formik>
       </Model>
    </div>
  )
}

export default AddAndUpdateContact
