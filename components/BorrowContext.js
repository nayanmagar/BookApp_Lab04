import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebaseconfig';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';

const BorrowContext = createContext();

export const BorrowProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const userRef = doc(db, 'users', 'currentUser');
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setBorrowedBooks(doc.data().borrowedBooks || []);
      } else {
        setDoc(userRef, { borrowedBooks: [] });
      }
    });

    return () => unsubscribe();
  }, []);

  const borrowBook = async (book) => {
    const userRef = doc(db, 'users', 'currentUser');
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, { borrowedBooks: [book] });
      return;
    }

    const currentBorrowedBooks = userDoc.data().borrowedBooks || [];
    if (currentBorrowedBooks.length >= 3) {
      throw new Error('Borrow limit reached');
    }
    if (currentBorrowedBooks.some(b => b.id === book.id)) {
      throw new Error('Already borrowed');
    }
    await updateDoc(userRef, {
      borrowedBooks: [...currentBorrowedBooks, book]
    });
  };

  const returnBook = async (bookId) => {
    const userRef = doc(db, 'users', 'currentUser');
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const currentBorrowedBooks = userDoc.data().borrowedBooks || [];
      await updateDoc(userRef, {
        borrowedBooks: currentBorrowedBooks.filter(book => book.id !== bookId)
      });
    }
  };

  return (
    <BorrowContext.Provider value={{ borrowedBooks, borrowBook, returnBook }}>
      {children}
    </BorrowContext.Provider>
  );
};

export const useBorrow = () => useContext(BorrowContext);