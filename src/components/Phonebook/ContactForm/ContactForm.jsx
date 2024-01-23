import { useState } from 'react';
import styles from './contactForm.module.css';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
    // setState(prev => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    // Коли відбувається handleSubmit нам треба витягти дані з форми
    // const { elements } = e.currentTarget;
    reset();
  };
  const reset = () => {
    setState({ ...INITIAL_STATE });
  };

  const nameId = nanoid();
  const numberId = nanoid();

  const { name, number } = state;

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.wrapper}>
          <label htmlFor={nameId} className={styles.formLabel}>
            Name
          </label>
          <input
            value={name}
            onChange={handleChange}
            id={nameId}
            className={styles.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter your Name."
          />
          <label htmlFor={numberId} className={styles.formLabel}>
            Number
          </label>
          <input
            value={number}
            onChange={handleChange}
            id={numberId}
            className={styles.input}
            type="tel"
            name="number"
            pattern="[0-9\+\-]*"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter your contact"
          />
          <button type="submit" className={styles.btn}>
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
