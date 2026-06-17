// Seleciona onde vamos injetar os cards e onde vamos colocar o total
const divLista = document.getElementById('lista-itens-carrinho');
const spanTotal = document.getElementById('valor-total');

let valorTotal = 0;

// --- 1. Função para renderizar os produtos na tela ---
function carregarCarrinho() {
  // Puxamos a memória AQUI DENTRO para sempre pegar a versão mais atualizada!
  const itensCarrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

  // Se o carrinho estiver vazio
  if (itensCarrinho.length === 0) {
    divLista.innerHTML = `<p class="text-muted text-center mt-4">Seu carrinho está vazio. Volte ao cardápio e escolha um lanche!</p>`;
    spanTotal.innerText = 'R$ 0,00';
    return;
  }

  let htmlGerado = '';
  valorTotal = 0;

  // Adicionamos o "index" aqui. Ele é a posição do lanche na fila (0, 1, 2...)
  itensCarrinho.forEach((item, index) => {
    const subtotal = item.preco * item.qtd;
    valorTotal += subtotal;

    // Adicionamos o botão "Remover" na div do preço, passando o 'index' para ele
    htmlGerado += `
        <div class="card mb-3 border-0 shadow-sm bg-light">
          <div class="row g-0 align-items-center">
            <div class="col-md-3">
              <img src="${item.img}" class="img-fluid rounded-start object-fit-cover h-100" alt="${item.nome}" style="max-height: 120px; width: 100%;">
            </div>
            <div class="col-md-9">
              <div class="card-body d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
                <div class="mb-3 mb-sm-0">
                  <h5 class="card-title fw-bold text-dark mb-1">${item.nome}</h5>
                  <p class="card-text mb-0 text-muted">Quantidade: <strong>${item.qtd}x</strong></p>
                </div>
                <div class="d-flex justify-content-between align-items-center flex-sm-column text-sm-end">
                  <span class="fs-5 fw-bold text-success mb-0 mb-sm-2">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                  <button class="btn btn-sm btn-outline-danger fw-bold" onclick="removerItem(${index})">🗑️ Remover</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
  });

  divLista.innerHTML = htmlGerado;
  spanTotal.innerText = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
}

// --- 2. Função para remover um item específico ---
function removerItem(index) {
  // 1. Abre a gaveta do carrinho
  let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

  // 2. Remove exatamente 1 item da fila, na posição 'index'
  carrinho.splice(index, 1);

  // 3. Guarda o carrinho atualizado de volta na gaveta
  localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));

  // 4. Chama a função de desenhar a tela de novo para o lanche sumir na mesma hora!
  carregarCarrinho();
}

// --- 3. Função para o botão "Pagar Agora" ---
function finalizarCompra() {
  const itensCarrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

  if (itensCarrinho.length === 0) {
    alert('Você não tem nada no carrinho para pagar!');
    return;
  }

  alert(`Compra de R$ ${valorTotal.toFixed(2).replace('.', ',')} finalizada com sucesso!!`);

  localStorage.removeItem('meuCarrinho');
  window.location.reload();
}

// Roda a função principal assim que a página abre
carregarCarrinho();
