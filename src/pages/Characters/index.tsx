import React, { useState, useEffect, useCallback } from 'react';

import api from '../../services/api';
import {
  View,
  Button,
  Text,
  FlatList,
  StyleSheet,
  Image
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

      return (
        <FlatList
          style={styles.list}
          data={characters}
          renderItem={({item}) => 
              <View style={styles.listItem}>
                <Text style={{fontSize:20}}>{item.name}</Text>
                <Image 
                style={styles.image}
                source={{
                  uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                }}/>
              </View>
            }
          keyExtractor={item => item.id}
          onEndReached={handleMore}
        />
      )
};

const styles = StyleSheet.create({
  image: {
    margin:15,
    width: 250,
    height:200,
    borderRadius:5
  },
  list: {
    padding: 20,
    backgroundColor:'WhiteSmoke',
  },
  listItem: {
    backgroundColor:'white',
    margin:5,
    padding:10,
    borderRadius:5,
    alignItems:'center'
  },
});

export default Characters;