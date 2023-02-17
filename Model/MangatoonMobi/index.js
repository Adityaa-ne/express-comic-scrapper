const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://mangatoon.mobi/id/genre/novel';
async function getComicList() {
  let list = [];
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    const HTML = $('#page-content > div.genre-content > div.items > a > div');
    HTML.each((a, b) => {
      let obj = { id: '', title: '', cover: '' };
      obj.id = a + 1;
      obj.title = $(b).find('div.content-title').text();
      obj.cover = $(b).find('img.lazyload').attr('data-src');
      list.push(obj);
    });
  } catch (error) {
    console.log('Error occured');
  }
  return list;
}

module.exports = getComicList;
