import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import cheerio from 'react-native-cheerio';

const states = {
  initial: 'INITIAL',
  pending: 'PENDING',
  completed: 'COMPLETED',
  error: 'ERROR',
};

const DOMAIN = 'http://www.xachmaz-ih.gov.az';

const App = () => {
  const [news, setNews] = useState([]);
  const [status, setStatus] = useState(states.initial);

  useEffect(() => {
    const fetchNews = async () => {
      setStatus(states.pending);
      try {
        const searchUrl = `http://www.xachmaz-ih.gov.az/news.html`;
        const response = await fetch(searchUrl);
        const htmlString = await response.text();
        const $ = cheerio.load(htmlString);

        const newsList = [];

        $('.news-list li').each((index, node) => {
          const titleNode = $(node).find('.news-title a');
          const title = titleNode.text();
          const url = titleNode.attr('href');
          const date = $(node)
            .find('.news-date')
            .text();
          const description = $(node)
            .find('.news-short-content')
            .text();
          const thumbnailURL = $(node)
            .find('.news-thumb')
            .attr('src');
          const imgId = thumbnailURL.slice(thumbnailURL.lastIndexOf('/'));

          newsList.push({
            title,
            date,
            description,
            imgId,
            url,
          });
        });
        setNews(newsList);
        setStatus(states.completed);
      } catch (e) {
        console.log('e', e);
        setStatus(states.error);
      }
    };
    fetchNews();
  }, []);

  if (status === states.pending || status === states.initial) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (status === states.error || !news.length) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Image
        resizeMode="center"
        style={{width: '100%', height: '100%'}}
        source={{uri: DOMAIN + '/files/news' + news[0].imgId}}
        // source={{uri: DOMAIN + '/files/news/small' + news[0].imgId}}
      />
      {/* <ScrollView style={{flex: 1}}>
        {news.slice(0, 5).map(({title, thumbnailURL, url, date}) => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 80,
                marginBottom: 10,
                backgroundColor: '#458969',
                flexDirection: 'row',
              }}
              onPress={() => Linking.openURL(DOMAIN + url)}>
              <View style={{flex: 0.2}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: DOMAIN + thumbnailURL}}
                />
              </View>
              <View style={{flex: 0.8, backgroundColor: 'blue'}}>
                <Text numberOfLines={1}>{title}</Text>
                <Text numberOfLines={3}>{date}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}
    </View>
  );
};

export default App;
