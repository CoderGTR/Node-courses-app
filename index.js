const express = require('express');
const app = express();
const path = require('path');
const expHbs = require('express-handlebars');
const homeRoutes = require('./routes/home')
const cartRoutes = require('./routes/cart')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const hbs = expHbs.create({
    defaultLayout : 'main',
    extname : 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use( '/' , homeRoutes)
app.use('/add' , addRoutes)
app.use( '/courses' , coursesRoutes)
app.use('/cart', cartRoutes)


const password = '7zgOJzQzT3bINBTe';
const url = `mongodb+srv://Vladyslav:7zgOJzQzT3bINBTe@cluster0.zwct3.mongodb.net/test?retryWrites=true&w=majority`

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})