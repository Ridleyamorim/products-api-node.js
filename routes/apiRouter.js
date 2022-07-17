const express = require("express");
const apiRouter = express.Router ();

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

apiRouter.get("/produtos", function (req, res){
    res.json(lista_produtos.produtos)
})

apiRouter.get("/produtos/:id", function (req, res){
    let id = converterTextoParaInt(req.params.id);
    let idx = getIdList(id);

    if (idx > -1) {
        res.json(lista_produtos.produtos[idx])
    } else {
        res.status (404)
        .json ({message: "Produto não encontrado"})
    }
})

apiRouter.post("/produtos/", express.json(), function (req, res){
    lista_produtos.produtos.push(req.body)
})

apiRouter.put("/produtos/:id", function (req, res) {
    let id = converterTextoParaInt(req.params.id);
    let idx = getIdList(id);

    if (idx > -1) {
        let produto = lista_produtos.produtos[idx]

        produto.id = id
        produto.descricao = req.body.descricao
        produto.valor = req.body.valor
        produto.marca = req.body.marca

        res.status(200)
            .json({
                message: "Produto atualizado com sucesso",
                product: res.status(200)
            });

    } else {
        res.status(404)
            .json ({message: "Produto não encontrado"})
    }
})

apiRouter.delete("/produtos/:id", function (req, res) {
    let id = converterTextoParaInt(req.params.id)
    let idx = getIdList(id)

    if (idx > -1) {
        const produtodeletado = lista_produtos.produtos.splice(idx, 1)

        res.status(200)
            .json({
                message: "Produto deletado com sucesso",
                product: produtodeletado
            });

    } else {
        res.status(404)
            .json ({
                message: "Produto não encontrado"
            })
    }
})

//helpers
function getIdList(id) {
    return lista_produtos.produtos.findIndex (elem => elem.id == id)
}

function converterTextoParaInt(txt) {
    return Number.parseInt(txt)
}

module.exports = apiRouter