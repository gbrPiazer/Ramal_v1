const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Setor")
const Setor = mongoose.model("setores")
require("../models/Ramal")
const Ramal = mongoose.model("ramais")

    //Rota página inicial ADM
        router.get('/', (req, res) => {
            Ramal.find().sort({setor: 'asc', nome_func: 'asc'}).populate("setor").then((ramais) => {
                res.render("admin/index", {ramais: ramais})
            }).catch((err) => {
                console.log(err)
                req.flash("error_msg", "Houve um erro ao carregar o formulário")
                res.render("admin/index")
            })
        })
        
    //Rotas ramais    
        router.get("/add-ramal", (req, res) => {
            Setor.find().then((setores) => {
                res.render("admin/add-ramal", {setores: setores})
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao carregar o formulário")
                res.redirect("admin/add-ramal")
            })
        })

        router.post("/ramais/novo", (req, res) => {
            var erros = []

            if(req.body.setor == "0" || req.body.setor == null || req.body.setor == undefined){
                erros.push({texto: "Setor inválido, registre uma categoria"})
            }

            if(erros.length > 0){
                res.render("admin/add-ramal", {erros: erros})
            }else{
                const novoRamal = {
                    nome_func: req.body.nome,
                    ramal: req.body.ramal,
                    email: req.body.email,
                    setor: req.body.setor
                }

                new Ramal(novoRamal).save().then(() => {
                    req.flash("success_msg", "Ramal cadastrado com sucesso")
                    res.redirect("/admin")
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao salvar a categoria")
                    res.redirect("/admin/add-ramal")
                })
            }
        })

        router.get("/ramal/edit/:id", (req, res) => {

            Ramal.findOne({_id: req.params.id}).then((ramais) => {                
                Setor.find().then((setores) => {
                    res.render("admin/edit-ramal", {ramais: ramais, setores: setores})
                }).catch((err) => {
                    console.log((err))
                    req.flash("error_msg", "Erro ao carregar categorias")
                    res.redirect("/admin")
                })

            }).catch((err) => {
                console.log(err)
                req.flash("error_msg", "Funcionário inexistente")
                res.redirect("/admin")
            })
        })
        
        router.post("/ramal/edit", (req, res) => {
            
            Ramal.findOne({_id: req.body.id}).then((ramais) => {
                
                ramais.nome_func = req.body.nome_func
                ramais.ramal = req.body.ramal
                ramais.email = req.body.email 
                ramais.setor = req.body.setor         
                
                ramais.save().then(() => {
                    req.flash("success_msg", "Funcionário editado com sucesso")
                    res.redirect("/admin")
                }).catch((err) => {
                    console.log(err)
                    req.flash("error_msg", "Erro ao editar funcionário")
                    res.redirect("/admin")
                })
            }).catch((err) => {
                console.log(err)
                req.flash("error_msg", "Erro ao editar funcionário")
                res.redirect("/admin")
            }) 

        })

        router.post("/ramal/deletar", (req, res) =>{
            Ramal.deleteMany({_id:req.body.id}).then(()=>{
                req.flash("success_msg", "Ramal deletado com sucesso")
                res.redirect("/admin")
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao deletar a categoria")
                console.log(err)
                res.redirect("/admin")
            })
        })

    //Rotas Setores
        router.get("/setores", (req, res) => {
            Setor.find().then((setores) => {
                res.render("admin/setores", {setores: setores})
                req.flash("success_msg")
            }).catch((err)=>{
                req.flash("error-msg", "Houve um erro nos setores ")
                res.redirect("/admin/setores")
            })
        })

        router.get("/add-setor", (req, res) => {
            res.render("admin/add-setor")
        })        

        router.post("/setores/novo", (req, res) => {
            var erros = [];

            if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
                erros.push({texto: "Nome inválido"})
            }
            if(erros.length > 0){
                res.render("admin/add-setor", {erros: erros})
            }else{
                const novoSetor = {
                    nome: req.body.nome
                }
                new Setor(novoSetor).save().then(()=> {
                    req.flash("success_msg", "Setor criada com sucesso.")
                    res.redirect("/admin/setores")
                    
                }).catch((err)=>{
                    console.log("Erro ao salvar categoria!" + err)
                    res.redirect("/admin/setores")
                    req.flash("error_msg", "Houve um erro ao salvar a categoria")
                })
            }
        })
        
        router.post("/setores/edit", (req,res) => {
            Setor.findOne({_id: req.body.id}).then((setor) => {
                
                setor.nome = req.body.nome

                setor.save().then(()=>{
                    req.flash("success_msg", "Categoria editada com sucesso")
                    res.redirect("/admin/setores")
                }).catch((err)=>{
                    req.flash("error_msg", "Houve um erro ao salvar categoria")
                    res.redirect("/admin/setores")
                })
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao editar a categoria")
                res.redirect("/admin/setores")
            })
        })
        
        router.post("/setores/deletar", (req,res) => {
            Setor.deleteMany({_id: req.body.id}).then(()=>{
                req.flash("success_msg", "Categoria deletada com sucesso")
                res.redirect("/admin/setores")
            }).catch((err) =>{
                req.flash("error_msg", "Houve um erro ao deletar a categoria")
                console.log(err)
                res.redirect("/admin/setores")
            })
        })

        router.get("/setores/edit/:id", (req, res) => {
            Setor.findOne({_id:req.params.id}).then((setor) => {
                res.render("admin/edit-setor", {setor: setor})
            }).catch((err)=>{
                req.flash("error_msg", "Setor inexistente")
                res.redirect("/admin/setores")
            })
            
        })

        

module.exports = router