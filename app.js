//Carregando módulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    const app = express()
    const admin = require("./routers/admin")
    const path = require("path")
    const mongoose = require("mongoose")
    const session = require("express-session")
    const flash = require("connect-flash")
    require("./models/Ramal")
    const Ramal = mongoose.model("ramais")
    const Setores = mongoose.model('setores')

//Config
    //Session
        app.use(session({
            secret: "adminramal",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Middleware
        //Mensagem de aviso = enviado via connect flash
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main', runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
        }))
        app.set('view engine', 'handlebars')
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/contatos02').then(()=>{
            console.log("Conectado ao mongo")
        }).catch((err)=>{
            console.log("Erro ao se conectar - " + err)
        })

    //Public
        app.use(express.static(path.join(__dirname, "public")))

//Rotas
        app.get('/', async (req, res) => {            
            Ramal.find({}).sort({setor: 'desc', nome_func: 'asc'}).populate("setor").then((ramais) => {
                Setores.find().then((setores) => {
                    res.render("index", {ramais: ramais, setores: setores})
                    })
            }).catch((err) => {
                console.log(err)
                req.flash("error_msg", "Houve um erro ao carregar o formulário")
                res.render("index")
            })
        })
        app.use('/admin', admin)
//Outros
    const PORT = 8081
    app.listen(PORT, ()=>{
        console.log("UP")
    })