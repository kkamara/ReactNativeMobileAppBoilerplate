import ButtonOpacity from '@/components/ButtonOpacity';
import Loading from '@/components/Loading';
import { Text, View, } from '@/components/Themed';
import { useHelloFromServer, } from '@/providers/HelloFromServerProvider';
import { useMessage, } from '@/providers/MessageProvider';
import { isCustomErrorResponse, } from '@/typeHandlers';
import { Link, } from 'expo-router';
import { useEffect, useState, } from 'react';
import { StyleSheet, } from 'react-native';

export default function TabOneScreen() {
  const { helloWorld, } = useMessage();
  const {
    helloFromServer,
    loading,
    getHelloFromServer,
  } = useHelloFromServer();
  const [error, setError] = useState("");

  const loadData = async () => {
    getHelloFromServer();
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (helloFromServer && isCustomErrorResponse(helloFromServer)) {
      setError(helloFromServer?.error || "An error occurred.");
    }
  }, [helloFromServer]);

  const renderHelloFromServer = () => {
    if (helloFromServer && true === isCustomErrorResponse(helloFromServer)) {
      return null;
    }
    return helloFromServer.message;
  };

  const renderMessage = () => {
    return helloWorld();
  };

  if (loading) {
    return <View style={styles.container}>
      <Loading />
    </View>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Screen 1</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.innerContainer}>
        {error && <Text style={[styles.text, styles.errorText]}>{error}</Text>}
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Welcome to Custom Screen 1.
        </Text>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Click
          <Link href="/customScreen2" asChild>
            <ButtonOpacity text="here" />
          </Link>
          for Custom Screen 2.
        </Text>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Message from provider: {renderMessage()}
        </Text>
        <Text
          style={[styles.text, styles.serverMessage]}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Message from server:&nbsp;
          <Text style={styles.serverMessageText}>
            {renderHelloFromServer()}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 74,
  },
  innerContainer: {
    alignItems: "center",
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    fontSize: 17,
  },
  serverMessage: {
    width: 300,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  serverMessageText: {
    color: 'red',
  },
});
