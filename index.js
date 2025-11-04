const express = require('express');
const app = express();
const db = require('./models');
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, async () => {
    console.log('Server started on port 3000');
});

db.sequelize.sync()
.then(() => {
app.listen(port, () => {
    console.log('Server started');
    });
})
.catch((err) => {
    console.log(err);
});

app.post('/film', async (req, res) => {
    const data = req.body;
    try {
        const film = await db.Film.create(data);
        res.send(film);
    } catch (err) {
        res.send(err);
    }
});

app.get('/film', async (req, res) => {
    try {
        const film = await db.Film.findAll();
        res.send(film);
    } catch (err) {
        res.send(err);
    }
});

app.put('/film/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const film = await db.Film.findByPk(id);
        if (!film) {
            return res.status(404).send({ message: 'Film tidak ditemukan' });
        }

        await film.update(data);
        res.send({ message: 'Film berhasil diupdate', film });
    } catch (err) {
        res.status(500).send(err);
    }
});