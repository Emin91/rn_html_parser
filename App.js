import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import cheerio from 'react-native-cheerio';
import HTML from 'react-native-render-html';

const states = {
  initial: 'INITIAL',
  pending: 'PENDING',
  completed: 'COMPLETED',
  error: 'ERROR',
};

const DOMAIN = 'http://www.xachmaz-ih.gov.az';

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

const App = () => {
  const [pageContent, setPageContent] = useState('');
  const [status, setStatus] = useState(states.initial);
  // console.log('pageContent', pageContent);

  useEffect(() => {
    const fetchNews = async () => {
      setStatus(states.pending);
      try {
        const searchUrl = `http://www.xachmaz-ih.gov.az/news/364.html`;
        const response = await fetch(searchUrl);
        const htmlString = await response.text();
        const $ = cheerio.load(htmlString);

        const html = $('.content_info')
          .html()
          .replace(/\/userfiles\/*/gi, `${DOMAIN}/userfiles/`);

        setPageContent(html);
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
        <Text>Loading...</Text>
      </View>
    );
  }

  if (status === states.error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {/* <Image
        resizeMode="center"
        style={{width: '100%', height: '100%'}}
        source={{uri: DOMAIN + '/files/news' + news[0].imgId}}
        // source={{uri: DOMAIN + '/files/news/small' + news[0].imgId}}
      /> */}
      <ScrollView style={{flex: 1}}>
        <HTML
          html={pageContent}
          renderers={{
            // p: props => {
            //   return <Text>jgjh</Text>;
            // },
            img: ({src}) => {
              return (
                <Image
                  resizeMode="contain"
                  source={{uri: src}}
                  style={{width: '100%', height: 150}}
                />
              );
            },
          }}
          // imagesMaxWidth={300}
          // tagsStyles={{
          //   img: {
          //     width: 300,
          //   },
          // }}
        />
      </ScrollView>
      <Text>sdsd</Text>

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
