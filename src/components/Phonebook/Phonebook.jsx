import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './phonebook.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import WallImage from "../wall.jpg"

class Phonebook extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("my-contacts"));
    // if (contacts && contacts.length)
    if (contacts?.length)  //*нова форма запису
    
    {this.setState({
      contacts,
    })}
  }

  componentDidUpdate(prevProps, prevState) {
    
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(this.state.contacts));
      
    }
    
  }


  isDublicate({ name, number }) {
    const { contacts } = this.state;
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
  }
  addContact = data => {
    if (this.isDublicate(data)) {
      return alert(
        `This contact ${data.name}: ${data.number} is already in the book`
      );
    }

    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return { contacts: [...contacts, newContact] };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(item => item.id !== id);

      return {
        contacts: newContact,
      };
    });
  };

  changeFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFlteredContacts() {
    const { filter, contacts } = this.state;

    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();

    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedNumber = number.toLocaleLowerCase();

      return (
        normalizedNumber.includes(normalizedFilter) ||
        normalizedName.includes(normalizedFilter)
      );
    });

    return filteredContacts;
  }

  render() {
    console.log("Render!")
    const { addContact, deleteContact, changeFilter } = this;
    const contacts = this.getFlteredContacts();

    return (
      <div
        className={styles.body}
        style={{ backgroundImage: `url(${WallImage})` }}
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
  }
}
export default Phonebook;
