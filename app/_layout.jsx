import { Stack } from 'expo-router'
import { FontProvider } from '../components/FontContext'
import { StripeProvider } from '@stripe/stripe-react-native'
import { useEffect, useState } from 'react'
import ApiService from '../lib/ApiService.js'
import FlashMessage from "react-native-flash-message";
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

const navigationIntegration = Sentry.reactNavigationIntegration(); // Or any other navigation integration

Sentry.init({
  dsn: 'https://6d2e9609fb84380ba3f892b688de55b8@o4508368886366208.ingest.us.sentry.io/4508396874629120',
  tracesSampleRate: 1.0,
  debug: true,
  release: Constants.expoConfig?.version,  // Usa la versión de tu app
  integrations: [navigationIntegration],
});

const RootLayout = () => {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    try {
      const response = await ApiService.getInstance().fetchData(`stripe-key`);
      console.log("Stripe Publishable Key:", response.publishableKey);
      setPublishableKey(response.publishableKey);
    } catch (error) {
      console.error("Error fetching Stripe key:", error);
    }
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);


  if (!publishableKey) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
      </Stack>
    ) // Mostrar una pantalla de carga mientras se obtiene la clave
  }

  return (
    <StripeProvider publishableKey={publishableKey}>
      <FontProvider>
        <FlashMessage position="top" />
        <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="registro" options={{ headerShown: false }} />
            <Stack.Screen name="recuperarContrasena" options={{ headerShown: false }} />
            <Stack.Screen name="carrito" options={{
              headerShown: true,
              headerTitle: 'Carrito de compras',
              headerBackTitle: 'Atrás',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#2587eb',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'Poppins',
              },
            }}
            />
            <Stack.Screen name="categorias"
              options={{
                headerShown: true,
                headerTitle: 'Categorías',
                headerBackTitle: 'Atrás',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#2587eb',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontFamily: 'PoppinsBold',
                },
              }}
            />

            <Stack.Screen name="avisos_de_privacidad"
              options={{
                headerShown: true,
                headerTitle: 'Avisos de privacidad',
                headerBackTitle: 'Atrás',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#81309b',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontFamily: 'PoppinsBold',
                },
              }}
            />

            <Stack.Screen name="terminos_y_condiciones"
              options={{
                headerShown: true,
                headerTitle: 'Términos y Condiciones',
                headerBackTitle: 'Atrás',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#ffc700',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontFamily: 'PoppinsBold',
                },
              }}
            />

            <Stack.Screen name="quienes_somos"
              options={{
                headerShown: true,
                headerTitle: '¿Quiénes Somos?',
                headerBackTitle: 'Atrás',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#27787a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontFamily: 'PoppinsBold',
                },
              }}
            />

            <Stack.Screen name="perfil"
              options={{
                headerShown: true,
                headerTitle: 'Perfil',
                headerBackTitle: 'Atrás',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#2587eb',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontFamily: 'PoppinsBold',
                },
              }}
            />
        </Stack>
      </FontProvider>
    </StripeProvider>
  )
}

export default Sentry.wrap(RootLayout,{
  touchEventBoundaryProps: { onPress: () => true },
});

