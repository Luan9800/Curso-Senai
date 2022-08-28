let xhttp = new XMLHttpRequest();
let listaProduto = [];

function buscarProduto() {
    xhttp.open("GET", "https://pascoa-chiquinha.herokuapp.com/produto/");
    xhttp.send();
    xhttp.onload = function () {
        lsProduto = this.response;
        lsProduto = JSON.parse(lsProduto);
        montarListaProdutosHtml(lsProduto);
    }
}

localStorage.setItem("")

function montarListaProdutosHtml(lsProduto) {
    let listaProduto = "";
    let i = 0;
    for (produto of lsProduto) {
        listaProduto +=
    `<div class="embrulho"">
        <div class="produto">
            <img src= "${produto.imagem}" alt="">
            <p> ${produto.nome}
                <span class="valor">${produto.valor.toFixed(2)}</span>
            </p>
            <i class="material-icons carrinho" onclick="addProdutoCarrinho(${i})">&#xe8cc;</i>
        </div>
    </div>
          `;
        produto.carrinho = false;
        i++;
    }
    document.getElementById("listaProduto").innerHTML = listaProduto;
}

function addProdutoCarrinho(i) {
    let produto = lsProduto[i];
    if (produto.carrinho == undefined || produto.carrinho == false) {
        produto.carrinho = true;
        document.getElementsByName("carrinho")[i].style.color = "#e66b6b";
    } else {
        produto.carrinho = false;
        document.getElementsByClassName("carrinho")[i].style.color = "#0000007d";

    }
}

function verListaProdutoSelecionado() {
    for (produto of lsProduto) {
        if (produto.carrinho) {
            console.log(produto)

        }
    }
}
buscarProduto();

