
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';

import usuariorouter from './routes/UsuarioRouters.js';





const app = express();
const port =process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/version', (req, res) =>{
 res.json({status: 'ok', version: '1.0.0'});
});

app.use('/usuario', usuariorouter);


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tudo certo chefe ✅');
    app.listen(port, () => {
      console.log(`Server ok port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Deu ruim:', error);
  });