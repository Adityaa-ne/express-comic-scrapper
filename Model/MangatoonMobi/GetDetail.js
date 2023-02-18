const axios = require('axios');
const cheerio = require('cheerio');

async function getDetailManga(title, id) {
  let url = `https://mangatoon.mobi/id/${title}?content_id=${id}`;
  let obj = {
    name: '',
    cover: '',
    status: '',
    genre: '',
    author: '',
    episode: [],
  };
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $(
      '#page-content > div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-title-bg > span'
    );
    const img = $(
      '#page-content > div.detail-wrap > div.detail-top-info > div.detail-img > img'
    );
    const status = $(
      '#page-content > div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-title-bg > div'
    );
    const genre = $(
      '#page-content > div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-tags-info.select-text'
    );
    const author = $(
      '#page-content > div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-author-name.select-text > span'
    );
    const list_eps = $(
      '#page-content > div.episode-content.episode-content-asc > div > div > a'
    );
    list_eps.each((a, b) => {
      let structure = { id: '', episode: '', link: '' };
      structure.id = a + 1;
      structure.episode = $(b)
        .find('div.episode-title-new:nth-child(2)')
        .text()
        .trim();
      structure.link = $(b).attr('href');
      obj.episode.push(structure);
    });
    obj.name = title.text();
    obj.cover = img.attr('src');
    obj.status = status.text().trim();
    obj.genre = genre.text();
    obj.author = author.text().replace('Nama Author: ', '');
  } catch (error) {
    console.error(error);
  }
  return obj;
}

module.exports = getDetailManga;
