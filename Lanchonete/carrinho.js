// Busca os itens salvos na memória do navegador
const itensCarrinho = JSON.parse(localStorage.getItem("meuCarrinho")) || [];

// Seleciona onde vamos injetar os cards e onde vamos colocar o total
const divLista = document.getElementById("lista-itens-carrinho");
const spanTotal = document.getElementById("valor-total");

let valorTotal = 0;

// Função para renderizar os produtos na tela
function carregarCarrinho() {
  // Se o carrinho estiver vazio
  if (itensCarrinho.length === 0) {
    divLista.innerHTML = `<p class="text-muted">Seu carrinho está vazio. Volte ao cardápio e escolha um lanche!</p>`;
    spanTotal.innerText = "R$ 0,00";
    return;
  }

  let htmlGerado = "";
  valorTotal = 0;

  // Passa por cada produto salvo
  itensCarrinho.forEach((item) => {
    // Calcula o subtotal (Preço x Quantidade)
    const subtotal = item.preco * item.qtd;
    valorTotal += subtotal; // Soma no total geral

    // Cria o card horizontal do Bootstrap misturado com os dados do lanche
    htmlGerado += `
        <div class="card mb-3 border-0 shadow-sm bg-light">
          <div class="row g-0 align-items-center">
            <div class="col-md-3">
              <img src="${item.img}" class="img-fluid rounded-start object-fit-cover h-100" alt="${item.nome}" style="max-height: 120px; width: 100%;">
            </div>
            <div class="col-md-9">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title fw-bold text-dark mb-1">${item.nome}</h5>
                    <p class="card-text mb-0 text-muted">Quantidade: <strong>${item.qtd}x</strong></p>
                </div>
                <div>
                    <span class="fs-5 fw-bold text-success">R$ ${subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
  });

  // Joga o HTML gerado na tela
  divLista.innerHTML = htmlGerado;
  // Atualiza o texto do valor total
  spanTotal.innerText = `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
}

// Função para o botão "Pagar Agora"
function finalizarCompra() {
  if (itensCarrinho.length === 0) {
    alert("Você não tem nada no carrinho para pagar!");
    return;
  }

  alert(
    `Compra de R$ ${valorTotal.toFixed(2).replace(".", ",")} finalizada com sucesso! A entrega está correndo na velocidade do som até você!`,
  );

  // Limpa a memória e recarrega a página
  localStorage.removeItem("meuCarrinho");
  window.location.reload();
}

// Roda a função principal assim que a página abre
carregarCarrinho();
