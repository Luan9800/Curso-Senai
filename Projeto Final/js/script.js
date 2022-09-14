let xhttp = new XMLHttpRequest(); // Parte de API que puxa os dados da Net.
let lsProduto = [];
function buscarProduto() {
    xhttp.open("GET","https://lcimports.herokuapp.com/produto/");
    xhttp.send();
    xhttp.onload = function () {
        lsProduto = this.response;
        lsProduto = JSON.parse(lsProduto);
        montarListaProdutosHtml(lsProduto);
        marcarProdutosSelecionadosLocalStorage();
    }
}

function montarListaProdutosHtml(lsProduto) { // Vou adicionar com o Gerenciador
    let listaProduto = ""; //Criando um varialvel lista iniciamente vazia
    let i = 0;
    // console.log(lsProduto);
    for (produto of lsProduto) {
        listaProduto += ` 
        <div class="embrulho" style="display:nome;">
               <div class="produto">
            <img src="${produto.imagem}" alt="">
            <p>${produto.nome}
                <span class="valor">${produto.valor.toFixed(2)}</span>
            </p>
            <i class="material-icons carrinho" onclick="addProdutoCarrinho(${i})" >&#xe8cc;</i>
        </div>
    </div>
</div>
        `;
        produto.carrinho = false;
        i++;
    }
    console.log(listaProduto);
    document.getElementById("listaProduto").innerHTML = listaProduto;
    document.getElementById("formulario").style.display = "none";
}

function marcarProdutosSelecionadosLocalStorage() {
    let lista = localStorage.getItem("listaProdutoLocalStorage");
    lista = JSON.parse(lista);
    for (i in lista) {
        if (lista[i].carrinho) {
            addProdutoCarrinho(i);
        }
    }

}

function addProdutoCarrinho(i) {
    let produto = lsProduto[i];
    // console.log(produto);
    if (produto.carrinho == false) {
        produto.carrinho = true;
        document.getElementsByClassName("carrinho")[i].style.color = "#e66b6b";
    } else {
        produto.carrinho = false;
        document.getElementsByClassName("carrinho")[i].style.color = "#0000007d";
    }
    localStorage.setItem("listaProdutoLocalStorage", JSON.stringify(lsProduto));
}

let verCarrinho = false;

function verListaProdutoSelecionado() {
    if (verCarrinho) {
        buscarProduto();
        verCarrinho = false;
    } else {
        verCarrinho = true;

    }
    let listaProduto = "";
    document.getElementById("listaProduto").innerHTML = "";
    let i = 0;
    let j = 0;
    for ( produto of lsProduto) {
        if(produto.carrinho){
            produto.quantidade = 1;
            listaProduto += `
            <div class="embrulho"">
                <div class="produto">
                    <img src="${produto.imagem}" alt="">
                    <p> ${produto.nome}
                        <span class="valor">${produto.valor.toFixed(2)}</span>
                    </p>
                    <span class="btMaisMenos">
                        <span class="btMais" onclick="add(1,${i},${j})" >+</span>
                        <span class="btMenos" onclick="add(-1,${i},${j})" >-</span>
                    </span>
                    <span class="quantidade">${produto.quantidade}</span>
                </div>
                
            </div>
            `;
            i++;
        }
        j++;
    }
    document.getElementById("listaProduto").innerHTML = listaProduto;
    document.getElementById("formulario").style.display = "grid";
}

function add(qt, i, j) {
    lsProduto[j].quantidade += qt;
    if (lsProduto[j].quantidade == 0) {
        lsProduto[j].quantidade = 1;
        return;

    }
    document.getElementsByClassName("quantidade")[i].innerHTML = lsProduto[j].quantidade;
}

function enviarPedido() {
    let pedido = '';
    let total = 0;
    for (produto of lsProduto) {
        if (produto.carrinho) {
            let subtotal = produto.quantidade * produto.valor;
            pedido += `${produto.nome} ${produto.quantidade} x ${produto.valor} = ${subtotal}\n`;
            total += subtotal;
        }
        let nome = document.getElementById('nome').value;
        let endereco = document.getElementById('endereco').value;
        let cep = document.getElementById('cep').value;
        let msg = `Olá gostaria de confirmar o pedido com os seguintes dados:\n${pedido} \nTotal ${total} \nNome:${nome} Endereço:\n${endereco} Cep:\n${cep}`;
        msg = encodeURI(msg);
        let fone = "5561998314452";
        link = `https://api.whatsapp.com/send?phone=${fone}&text=${msg}`;
        window.open(link, '_blank');

    }
}

buscarProduto();