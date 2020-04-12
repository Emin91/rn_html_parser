import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import cheerio from 'react-native-cheerio';
// import {DOMParser} from 'xmldom';
import DOMParser from 'react-native-html-parser';

const App = () => {
  const getHtml = async () => {
    const searchUrl = `https://example.com`;
    const response = await fetch(searchUrl);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    console.log('response', $.html());
  };

  useEffect(() => {
    getHtml();
  }, []);

  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

export default App;
