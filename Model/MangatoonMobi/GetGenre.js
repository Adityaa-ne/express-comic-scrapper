const axios = require('axios');
const cheerio = require('cheerio');

async function getGenreList() {
  let url = `https://mangatoon.mobi/id/genre/comic`;
  let list = [];
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const HTML = $(
      '#page-content > div.genre-top > div > div > div.type-items > a'
    );
    HTML.each((a, b) => {
      let obj = { id: '', name: '', link: '' };
      obj.id = a + 1;
      obj.name = $(b).find('span').text().trim();
      obj.link = $(b).attr('href');
      list.push(obj);
    });
    return list;
  } catch (error) {
    console.error('Error');
  }
}

module.exports = getGenreList;
