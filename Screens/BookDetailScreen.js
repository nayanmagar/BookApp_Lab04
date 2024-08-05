import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useBorrow } from '../components/BorrowContext';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;
  const { borrowedBooks, borrowBook } = useBorrow();

  const handleBorrow = async () => {
    try {
      await borrowBook(book);
      Alert.alert('Success', `You've borrowed "${book.title}"`);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while borrowing the book.');
    }
  };

  const isBookBorrowed = borrowedBooks.some(b => b.id === book.id);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}/5</Text>
      <Text style={styles.summary}>{book.summary}</Text>
      <TouchableOpacity 
        style={[styles.borrowButton, isBookBorrowed && styles.disabledButton]} 
        onPress={handleBorrow}
        disabled={isBookBorrowed}
      >
        <Text style={styles.borrowButtonText}>
          {isBookBorrowed ? 'Already Borrowed' : 'Borrow Book'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  summary: {
    fontSize: 14,
    marginBottom: 20,
  },
  borrowButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  borrowButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default BookDetailScreen;