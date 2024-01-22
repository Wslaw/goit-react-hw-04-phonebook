import { Component, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './phonebook.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import BackImage from '../forest.jpg';

const Phonebook = () => {
  const [phonebookState, setPhonebookState] = useState({
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  });

  useEffect(() => {
    const storedContacts =
      JSON.parse(localStorage.getItem('my-contacts')) || [];
    setPhonebookState(prev => ({
      ...prev,
      contacts: storedContacts,
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'my-contacts',
      JSON.stringify(phonebookState.contacts)
    );
  }, [phonebookState.contacts]);

  const isDublicate = ({ name, number }) => {
    const { contacts } = phonebookState;
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      const normalizedCurrentNumber = item.number.toLowerCase();

      return (
        normalizedCurrentName === normalizedName &&
        normalizedCurrentNumber === normalizedNumber
      );
    });
    return Boolean(dublicate);
  };

  const addContact = data => {
    if (isDublicate(data)) {
      return alert(
        `This contact ${data.name}: ${data.number} is already in the book`
      );
    }

    setPhonebookState(prev => {
      const newContact = { id: nanoid(), ...data };

      return { ...prev, contacts: [...prev.contacts, newContact] };
    });
  };

  const deleteContact = id => {
    setPhonebookState(prev => ({
      ...prev,
      contacts: prev.contacts.filter(item => item.id !== id),
    }));
  };

  const changeFilter = ({ target }) => {
    setPhonebookState(prev => ({ ...prev, filter: target.value }));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = phonebookState.filter.toLocaleLowerCase();

    return phonebookState.contacts.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const normalizedNumber = number.toLowerCase();
      return (
        normalizedNumber.includes(normalizedFilter) ||
        normalizedName.includes(normalizedFilter)
      );
    });
  };

  const contacts = getFilteredContacts();

  return (
    <div
      className={styles.body}
      style={{ backgroundImage: `url(${BackImage})` }}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <div>
          <h2 className={styles.title}>Contacts</h2>
          <p className={styles.text}>Find contacts by name</p>
          <input
            onChange={changeFilter}
            name="filter"
            placeholder="Search"
            type="text"
          />
          <ContactList items={contacts} deleteContact={deleteContact} />
        </div>
      </div>
    </div>
  );
};

export default Phonebook;
