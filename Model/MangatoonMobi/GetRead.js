const axios = require('axios');
const cheerio = require('cheerio');

async function getRead(lang, type, id, c_id) {
  let url = `https://mangatoon.mobi/${lang}/${type}/${id}/${c_id}`;
  let list = [];
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const HTML = $('#page-content > div.watch-page > div.pictures > img');
    HTML.each((a, b) => {
      let structure = { num: '', panel: '' };
      structure.num = a + 1;
      structure.panel = $(b).attr('data-src');
      list.push(structure);
    });
  } catch (error) {
    return 'error';
  }
  return list;
}

module.exports = getRead;
