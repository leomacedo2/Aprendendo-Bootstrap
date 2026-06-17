// --- Lógica do Filtro de Categorias ---

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
      b.classList.add('btn-outline-secondary'); // Atualizado aqui
    });
    this.classList.remove('btn-outline-secondary'); // Atualizado aqui
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

// --- Lógica do Carrinho de Compras ---
const botoesAdicionar = document.querySelectorAll('.add-btn');

botoesAdicionar.forEach((botao) => {
  botao.addEventListener('click', function (event) {
    const card = event.target.closest('.card');

    // Captura os dados do card
    const nomeProduto = card.querySelector('.card-title').innerText;
    const imagemSrc = card.querySelector('.card-img-top').src;

    // Pega o texto "R$ 25,90", limpa e converte para um número de verdade (25.90) para podermos somar depois
    const precoTexto = card.querySelector('.fs-5').innerText;
    const precoNumero = parseFloat(precoTexto.replace('R$ ', '').replace(',', '.'));

    // Pergunta a quantidade
    let quantidade = prompt(`Quantos "${nomeProduto}" você deseja adicionar ao carrinho?`, '1');

    // Se o usuário digitou um número válido e não cancelou
    if (quantidade !== null && quantidade > 0) {
      quantidade = parseInt(quantidade);

      // Monta o "pacote" do produto
      const item = {
        nome: nomeProduto,
        preco: precoNumero,
        img: imagemSrc,
        qtd: quantidade,
      };

    // Busca o carrinho na memória (ou cria um vazio se não existir)
      let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

      // Verifica se o lanche já existe no carrinho
      // O findIndex vai procurar um produto que tenha o mesmo nome do lanche que estamos tentando adicionar
      const indexExistente = carrinho.findIndex(produto => produto.nome === nomeProduto);

      // Se o findIndex achar, ele devolve a posição (0, 1, 2...). Se NÃO achar, ele devolve -1.
      if (indexExistente !== -1) {
        // O lanche já existe! Vamos apenas somar a nova quantidade com a quantidade que já estava lá.
        carrinho[indexExistente].qtd += quantidade;
      } else {
        // O lanche não existe no carrinho. Vamos montar o pacote e jogar lá dentro (push).
        const item = {
          nome: nomeProduto,
          preco: precoNumero,
          img: imagemSrc,
          qtd: quantidade,
        };
        carrinho.push(item);
      }

      // Salva de volta na memória
      localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));

      // Se estiver usando o SweetAlert2, o aviso continua igual
      alert(`Feito! ${quantidade}x ${nomeProduto} adicionado(s) ao carrinho! 🛒`);
    }
  });
});
