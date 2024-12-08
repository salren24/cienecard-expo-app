import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  ImageBackground, 
  Image, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const API_URL = 'https://apps.municieneguilla.gob.pe/node/api/login';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      setMessageType('');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: username, clave: password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Respuesta:', data);

      if (data.ok) {
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.data));
        
        setMessageType('success');
        setMessage(data.message);
        navigation.navigate('Home');
      } else {
        setMessageType('error');
        setMessage(data.message || 'Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      setMessageType('error');
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient 
      colors={['#000000', '#000000', '#000000']} 
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={require('../utils/assets/logo_blanco.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            required
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            required
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          )}
        </TouchableOpacity>

        {message ? (
          <View
            style={[
              styles.messageContainer,
              messageType === 'error' ? styles.errorMessage : styles.successMessage,
            ]}
          >
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.3,
  },
  loginContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2D68B0',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  errorMessage: {
    backgroundColor: '#FF6B6B',
  },
  successMessage: {
    backgroundColor: '#4ECB71',
  },
  messageText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginScreen;