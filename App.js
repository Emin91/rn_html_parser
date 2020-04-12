import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import cheerio from 'react-native-cheerio';

const App = () => {
  const [news, setNews] = useState([]);

  const getHtml = async () => {
    const searchUrl = `http://www.xachmaz-ih.gov.az/news.html`;
    const response = await fetch(searchUrl);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const newsList = [];

    $('.news-list li').each((index, node) => {
      const title = $(node)
        .find('.news-title a')
        .text();
      const date = $(node)
        .find('.news-date')
        .text();
      const description = $(node)
        .find('.news-short-content')
        .text();
      const thumbnailURL = $(node)
        .find('.news-thumb')
        .attr('src');
      const href = $(node)
        .find('a.thumb')
        .attr('href');

      newsList.push({
        title,
        date,
        description,
        thumbnailURL,
        href,
      });
    });
    setNews(newsList);
  };

  useEffect(() => {
    getHtml();
  }, []);

  const fullUrl = 'http://www.xachmaz-ih.gov.az';
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {news.slice(0, 5).map(({title, thumbnailURL}) => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 80,
                marginBottom: 10,
                backgroundColor: '#458969',
                flexDirection: 'row',
              }}>
              <View style={{flex: 0.2, backgroundColor: 'red'}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: `${fullUrl}` + thumbnailURL}}
                />
              </View>
              <View style={{flex: 0.8, backgroundColor: 'blue'}}>
                <Text>{title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default App;
