import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import cheerio from 'react-native-cheerio';
import DOMParser from 'react-native-html-parser';
import {} from 'react-native-gesture-handler';

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

    // console.log('news', news);
    setNews(newsList);
  };

  useEffect(() => {
    getHtml();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {news.map(({title}) => {
          return (
            <View
              style={{width: '100%', height: 80, backgroundColor: '#458969'}}>
              <Text>{title}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default App;
