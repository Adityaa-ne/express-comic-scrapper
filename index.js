/* Module list */
const express = require('express');
const cors = require('cors');
const getMangaList = require('./Model/MangatoonMobi/GetList');
const getGenreList = require('./Model/MangatoonMobi/GetGenre');
const getDetailManga = require('./Model/MangatoonMobi/GetDetail');
const getReadManga = require('./Model/MangatoonMobi/GetRead');
/* End module list */
const app = express();
const port = process.env.PORT || 3000;

/* Express */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/* Router */
app.get('/api/lists', async (req, res) => {
  const current = req.query.page;
  const genre = req.query.genre;
  try {
    const data = await getMangaList(current, genre);
    res.send({
      success: true,
      status: 200,
      data: data,
    });
  } catch (error) {
    console.error('error');
  }
});
app.get('/api/genre', async (_, res) => {
  try {
    const data = await getGenreList();
    res.send({
      success: true,
      status: 200,
      data: data,
    });
  } catch (error) {
    console.error('error');
  }
});
app.get('/api/detail/:title', async (req, res) => {
  try {
    const data = await getDetailManga(req.params.title, req.query.content_id);
    res.send({
      success: true,
      status: 200,
      data: data,
    });
  } catch (error) {
    console.error('error');
  }
});
app.get('/api/read/:lang/:type/:id/:c_id', async (req, res) => {
  const { params } = req;
  try {
    const data = await getReadManga(
      params.lang,
      params.type,
      params.id,
      params.c_id
    );
    res.send({
      success: true,
      status: 200,
      data: data,
    });
  } catch (error) {
    res.send('error');
  }
});
/* Log app */
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
