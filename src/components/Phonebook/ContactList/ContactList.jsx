import React from 'react';
import styles from './contactList.module.css';

const ContactList = ({ items, deleteContact }) => {
  const elements = items.map(({ id, name, number }) => (
    <li key={id}>{name}: {number} <button onClick={()=>deleteContact(id)} className={styles.btnDelete } type='button'>Delete</button></li>
  ));
  return (
    <div >      
      <ol className={styles.customList}>{elements}</ol>
    </div>
  );
};

export default ContactList;
