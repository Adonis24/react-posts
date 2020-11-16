import {Platform, Alert} from 'react-native'
import React, { useState,useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View, Image, Button } from "react-native";

export const PhotoPicker = ({onPick}) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Доступ к галереи не были предоставлены!');
        }
      }
    })();
  }, []);
  
  const takePhoto = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
            setImage(result.uri)
            onPick(result.uri)
        } 
  };
  return (
    <View style={styles.wrapper}>
      <Button title="Сделать фото" onPress={takePhoto} />
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
      width:'100%',
      height: 200,
      marginTop: 10
  },
});
