const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 


app.use(express.static(path.join(__dirname, '..', 'public'))); 

app.get('/', (req, res) => {
    res.render('index', { title: 'Hoken Indumentaria' });
});


app.get('/catalogo/adultos', (req, res) => {
    res.render('products/catalogo', { tipo: 'adultos', title: 'Catálogo Adultos' });
});


app.get('/catalogo/ninos', (req, res) => {
    res.render('products/catalogo', { tipo: 'ninos', title: 'Catálogo Niños' });
});

app.get('/register', (req, res) => {
    res.render('users/register');
});

app.get('/login', (req, res) => {
    res.render('users/login'); 
});
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

app.listen(port, () => {
    console.log(`Hoken Indumentaria corriendo en el servidor http://localhost:${port}`);
});
