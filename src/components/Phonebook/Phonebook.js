import { useState, useEffect } from "react";
import  shortid   from 'shortid'
import ContactForm from 'components/ContactForm/ContactForm'
import Filter from 'components/Filter/Filter'
import ContactList from "components/ContactList/ContactList";
const Phonebook = () => {
    const [contacts, setContacts] = useState([])
    const [filter, setFilter] = useState('')

    const onSubmitHandler = (data) => {
      const alreadyInContacts =  contacts.map(contact => {
          if (contact.name.toLowerCase() === data.name.toLowerCase()) {
              alert(`${contact.name} is already in contacts.`)
              return "yes"
          }
          return 'no'
      })
        
        if (alreadyInContacts.includes("yes")) return
        else {
            setContacts(state => {
                const contact = { id: shortid.generate(), name: data.name, number: data.number }
                return  [...(state), contact]   
            })
        }
    }
    
    const onClickContactRemove = (e) => {
        setContacts(state => {
            const newContacts = state.filter(contact => contact.id !== e.target.id)
            return newContacts
        })
    }

    const filterChanger = (e) => { 
        setFilter(e.target.value)
    }


    const filterByName = () => {
        return (
        contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
       )
    }

    useEffect(() => {
        if (localStorage.getItem('contacts') !== null) {
            setContacts(JSON.parse(localStorage.getItem('contacts')) )
        }
    },[])
    
    
    useEffect(() => {
        // console.log(state)
        //         if (state !== contacts) {
            localStorage.setItem('contacts', JSON.stringify(contacts))
        // }
    },[contacts])


        return (
            <>  
                <h1 >Phonebook</h1>
                <ContactForm submit={onSubmitHandler} />
                <h2 >Contact</h2>
                <Filter value={filter} onChange={filterChanger} name={'filter'} />
                <ContactList filter={filter} contacts={contacts} filterByName={filterByName} onClickBtn={onClickContactRemove} />



            </>
        )
    
}

export default Phonebook