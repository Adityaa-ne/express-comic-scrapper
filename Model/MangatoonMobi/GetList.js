const axios = require('axios');
const cheerio = require('cheerio');

async function getComicList(num, genre) {
  const current = num ?? 0;
  let URL = genre
    ? `https://mangatoon.mobi/${genre}?page=${current}`
    : `https://mangatoon.mobi/id/genre/novel?page=${current}`;
  let list = [];
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    const HTML = $('#page-content > div.genre-content > div.items > a');
    HTML.each((a, b) => {
      let obj = {
        id: '',
        title: '',
        cover: '',
        slug: '',
        detail: '',
        likes: '',
      };
      obj.id = a + 1;
      obj.title = $(b).find('div.content-title').text();
      obj.cover = $(b).find('img.lazyload').attr('data-src');
      obj.slug = $(b)
        .find('div.content-title')
        .text()
        .toLowerCase()
        .replace(/\s/g, '-');
      obj.detail = $(b).attr('href');
      obj.likes = $(b).find('div.list-icon > span:nth-child(2)').text();
      list.push(obj);
    });
  } catch (error) {
    console.log('Error occured');
  }
  return list;
}

module.exports = getComicList;
