import React, {
 useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView,useWindowDimensions } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonPress = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'CE') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  const renderButtons = () => {
    const buttonLayout = [
      ['7', '8', '9', '/'],
      ['4', '5', '6', '*'],
      ['1', '2', '3', '-'],
      ['0', '.', '=', '+'],
      ['C',], // Include "C" button in this row
    ];

    return buttonLayout.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.buttonRow}>
        {row.map((buttonText, columnIndex) => (
          <TouchableOpacity
            key={columnIndex}
            style={[
              styles.button,
              buttonText === 'C' && styles.cButton,
            ]}
            onPress={() => handleButtonPress(buttonText)}
          >
            <Text style={[styles.buttonText, buttonText === 'C' && styles.cButtonText]}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Calculator App</Text>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{input}</Text>
          <TouchableOpacity
            style={styles.ceButton}
            onPress={() => handleButtonPress('CE')}
          >
            <Text style={styles.buttonText}>CE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{result}</Text>
        </View>
        <View style={styles.buttonContainer}>{renderButtons()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row', // Arrange input and CE button horizontally
    alignItems: 'center', // Align vertically centered
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1, // Allow input to expand
    fontSize: 24,
    textAlign: 'right',
  },
  ceButton: {
    paddingHorizontal: 12,
    marginLeft: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  cButton: {
    marginLeft: 'auto', // Push "C" button to the right edge
    paddingHorizontal: 12,
    backgroundColor: 'orange',
    color:'black', // Changed background color
    borderRadius: 5,
    width:100
  },
  cButtonText: {
    color: 'black', // Text color for "C" button
  },
  resultContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  result: {
    fontSize: 36,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 24,
  },
});
