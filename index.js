
const app = require('./routes/app');
const emailRoutes = require('./routes/emailRoutes');
const logsRoutes = require('./routes/logsRoutes');

app.use('/email',emailRoutes);
app.use('/logs',logsRoutes);







