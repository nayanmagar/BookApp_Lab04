import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useBorrow } from './BorrowContext';

const BorrowedScreen = () => {
  const { borrowedBooks, returnBook } = useBorrow();

  const handleReturn = async (bookId) => {
    try {
      await returnBook(bookId);
      Alert.alert('Success', 'Book returned successfully');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while returning the book.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <TouchableOpacity 
        style={styles.returnButton} 
        onPress={() => handleReturn(item.id)}
      >
        <Text style={styles.returnButtonText}>Return</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      {borrowedBooks.length === 0 ? (
        <Text style={styles.emptyMessage}>You haven't borrowed any books yet.</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  returnButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  returnButtonText: {
    color: 'white',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default BorrowedScreen;