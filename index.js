/* Module list */
const express = require('express');
const cors = require('cors');
const getMangaList = require('./Model/MangatoonMobi/index');
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
  try {
    const data = await getMangaList(current);
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
