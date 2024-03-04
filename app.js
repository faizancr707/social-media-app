const express = require('express');

const cors = require('cors');
const sequelize = require('./util/database');

const socialRouter = require('./routes/social');
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use('/social', socialRouter);


app.use('', async (request, response) => {
    response.redirect('http://localhost:9090/social');
});


async function initiate() {
    try {
        await sequelize.sync();
        app.listen(9090, () => {
            console.log("Server is running at 9090");
        });
    } catch (error) {
        console.error(error);
    }
}

initiate();