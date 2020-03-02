const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.routes');
const linkRoute = require('./routes/link.routes');

const app = express();
const PORT = config.get('port') || 5000;
const mongoUri = config.get('mongoUri');

app.use(express.json({ extended: true }));
app.use('/api/auth', authRoute);//роут авторизации
app.use('/api/link', linkRoute);//роут ссылок

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

