import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import {
  Button,
  Text,
  View,
  StyleSheet,
} from 'react-native';

interface ResponseData{
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

function Characters(): JSX.Element {

  const [characters, setCharacters] = useState<ResponseData[]>([]);

  useEffect(() => {
    api
      .get('/characters')
      .then((res) => {
        setCharacters(res.data.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMore = useCallback(async () => {
    try{
      const offset = characters.length;
      const response = await api.get('characters', {
        params: {
          offset,
        },
      });

      setCharacters([...characters, ...response.data.data.results])
    } catch(err) {
      console.log(err);
    }
    },[characters]);

      return <>
      <View style={styles.sectionContainer}>
      {  
        characters.map((character) => (
          <>
            <Text>{character.name}</Text>
          </>
        ))
        
      }
      <Button title='Button1' onPress={handleMore}/>
      </View>
      </>
  
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Characters;