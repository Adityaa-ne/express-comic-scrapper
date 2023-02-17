/* Module list */
const express = require('express');
const cors = require('cors');
const getMangaList = require('./Model/MangatoonMobi/index');
/* End module list */
const app = express();
const port = process.env.PORT || 3170;

/* Express */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/* Router */
app.get('/api/list-comics', async (_, res) => {
  try {
    const data = await getMangaList();
    res.send({
      success: true,
      status: 200,
      data: data,
    });
  } catch (error) {
    console.error('error');
  }
});
/* Log app */
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
