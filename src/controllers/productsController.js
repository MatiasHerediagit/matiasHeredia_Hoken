const express = require('express');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override'); 

const app = express();
const puerto = 3000;
const rutaArchivoProductos = path.join(__dirname, 'data/productos.json');

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

function obtenerProductos() {
    const datosProductos = fs.readFileSync(rutaArchivoProductos);
    return JSON.parse(datosProductos);
}

function guardarProductos(productos) {
    fs.writeFileSync(rutaArchivoProductos, JSON.stringify(productos, null, 2));
}


app.get('/products', (req, res) => {
    const productos = obtenerProductos();
    res.render('products/index', { title: 'Productos', productos });
});

app.get('/products/create', (req, res) => {
    res.render('products/create', { title: 'Crear Producto' });
});

app.get('/products/:id', (req, res) => {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (producto) {
        res.render('products/detail', { title: 'Detalle del Producto', producto });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.post('/products', (req, res) => {
    const productos = obtenerProductos();
    const nuevoProducto = {
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
        ...req.body
    };
    productos.push(nuevoProducto);
    guardarProductos(productos);
    res.redirect('/products');
});

app.get('/products/:id/edit', (req, res) => {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (producto) {
        res.render('products/edit', { title: 'Editar Producto', producto });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.put('/products/:id', (req, res) => {
    const productos = obtenerProductos();
    const indiceProducto = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (indiceProducto !== -1) {
        productos[indiceProducto] = { id: parseInt(req.params.id), ...req.body };
        guardarProductos(productos);
        res.redirect('/products');
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.delete('/products/:id', (req, res) => {
    const productos = obtenerProductos();
    const nuevosProductos = productos.filter(p => p.id !== parseInt(req.params.id));
    if (productos.length !== nuevosProductos.length) {
        guardarProductos(nuevosProductos);
        res.redirect('/products');
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.listen(puerto, () => {
    console.log(`Hoken Indumentaria corriendo en el servidor http://localhost:${puerto}`);
});
