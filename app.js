const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const methodOverride = require('method-override'); 

const productsController = require('./src/controllers/productsController'); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 

app.get('/', (req, res) => {
    res.render('index', { title: 'Hoken Indumentaria' });
});

app.get('/selecciones', (req, res) => {
    res.render('products/selecciones', { title: 'Selecciones' });
});

app.get('/login', (req, res) => {
    res.render('users/login', { title: 'Iniciar Sesión' });
});

app.get('/register', (req, res) => {
    res.render('users/register', { title: 'Registrarse' });
});
//sprint 4 rutas para los productos
app.get('/products', productsController.list); 
app.get('/products/create', productsController.createForm); 
app.get('/products/:id', productsController.detail); 
app.post('/products', productsController.create); 
app.get('/products/:id/edit', productsController.editForm);
app.put('/products/:id', productsController.update); 
app.delete('/products/:id', productsController.delete);

app.listen(port, () => {
    console.log(`Hoken Indumentaria corriendo en el servidor http://localhost:${port}`);
});
