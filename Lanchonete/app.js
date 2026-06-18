// Lógica do Filtro de Categorias

// 1. Seleciona todos os botões de filtro e todos os cards de produto
const botoesFiltro = document.querySelectorAll('.btn-filtro');
const cardsProdutos = document.querySelectorAll('.card-produto');

// 2. Adiciona o evento de clique para cada botão de filtro
botoesFiltro.forEach((botao) => {
  botao.addEventListener('click', function () {
    // Pega o valor do filtro clicado (ex: "lanches", "bebidas", "todos")
    const filtroSelecionado = this.getAttribute('data-filtro');

    // Efeito visual: Pinta o botão clicado de amarelo e os outros de contorno cinza
    botoesFiltro.forEach((b) => {
      b.classList.remove('btn-warning');
      b.classList.add('btn-outline-secondary');
    });
    this.classList.remove('btn-outline-secondary');
    this.classList.add('btn-warning');

    // 3. Verifica cada card para mostrar ou esconder
    cardsProdutos.forEach((card) => {
      const categoriaCard = card.getAttribute('data-categoria');

      // Se o filtro for "todos" OU a categoria do card for igual ao filtro, mostre o card
      if (filtroSelecionado === 'todos' || filtroSelecionado === categoriaCard) {
        card.style.display = 'block'; // Mostra o card
      } else {
        card.style.display = 'none'; // Esconde o card
      }
    });
  });
});

// Lógica dos botões de + e - na tela inicial
function mudarQtdIndex(botao, mudanca) {
  // Acha o input que está do lado do botão clicado
  const divInput = botao.closest('.input-group');
  const input = divInput.querySelector('.qtd-produto');
  
  let qtd = parseInt(input.value) + mudanca;
  
  // Impede que a quantidade fique menor que 1 (não dá pra adicionar 0 lanches)
  if (qtd >= 1) {
    input.value = qtd;
  }
}

// Lógica do Carrinho de Compras
const botoesAdicionar = document.querySelectorAll('.add-btn');

botoesAdicionar.forEach((botao) => {
  botao.addEventListener('click', function (event) {
    const card = event.target.closest('.card');

    // Captura os dados do card
    const nomeProduto = card.querySelector('.card-title').innerText;
    const imagemSrc = card.querySelector('.card-img-top').src;

    // Pega o texto "R$ 25,90", limpa e converte para um número de verdade (25.90)
    const precoTexto = card.querySelector('.fs-5').innerText;
    const precoNumero = parseFloat(precoTexto.replace('R$ ', '').replace(',', '.'));

    // Lê a quantidade direto da caixinha do HTML em vez de usar o prompt()
    const inputQtd = card.querySelector('.qtd-produto');
    let quantidade = parseInt(inputQtd.value);

    // 1. Monta o "pacote" do produto
    const item = {
      nome: nomeProduto,
      preco: precoNumero,
      img: imagemSrc,
      qtd: quantidade,
    };

    // 2. Busca o carrinho na memória
    let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

    // 3. Verifica se o lanche já existe
    const indexExistente = carrinho.findIndex(produto => produto.nome === nomeProduto);

    if (indexExistente !== -1) {
      // O lanche já existe! Só soma a nova quantidade.
      carrinho[indexExistente].qtd += quantidade;
    } else {
      // O lanche NÃO existe! Adiciona o novo pacote ao carrinho.
      carrinho.push(item);
    }

    // 4. Salva de volta na memória
    localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));

    // O alert confirmando o pedido!
    alert(`Feito! ${quantidade}x ${nomeProduto} adicionado(s) ao carrinho! 🛒`);

    // Reseta a caixinha de quantidade de volta para 1 após o usuário adicionar
    inputQtd.value = 1; 
  });
});