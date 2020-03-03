const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.routes');
const linkRoute = require('./routes/link.routes');
const redirectRoute = require('./routes/redirect.routes');

const app = express();
const PORT = config.get('port') || 5000;
const mongoUri = config.get('mongoUri');

app.use(express.json({ extended: true }));
app.use('/api/auth', authRoute);//роуты авторизации
app.use('/api/link', linkRoute);//роуты ссылок
app.use('/t', redirectRoute);//роуты для редиректа сокращенных ссылок

async function start () {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log(`Server error`, e.message);
        process.exit(1);// выйти из процесса
    }
}

start();

