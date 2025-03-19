// Variáveis globais
let saldo = 1000000; // Saldo inicial
let jogadoresNoTime = []; // Lista de jogadores do time

// Função para gerar um nome aleatório para jogadores
function gerarNomeJogador() {
  const nomes = ['Neymar', 'Messi', 'Mbappé', 'Cristiano Ronaldo', 'Pogba', 'Salah', 'Lewandowski', 'Suárez', 'Benzema', 'Kante'];
  return nomes[Math.floor(Math.random() * nomes.length)];
}

// Função para gerar idade aleatória (entre 18 e 40)
function gerarIdade() {
  return Math.floor(Math.random() * (40 - 18 + 1)) + 18;
}

// Função para gerar habilidade aleatória (entre 60 e 99)
function gerarHabilidade() {
  return Math.floor(Math.random() * (99 - 60 + 1)) + 60;
}

// Função para gerar o valor do jogador (entre 100000 e 1000000)
function gerarValor() {
  return Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
}

// Função para gerar jogadores aleatórios
function gerarJogadores(numJogadores) {
  let jogadoresGerados = [];
  for (let i = 0; i < numJogadores; i++) {
    const nome = gerarNomeJogador();
    const idade = gerarIdade();
    const habilidade = gerarHabilidade();
    const valor = gerarValor();
    jogadoresGerados.push({ nome, idade, habilidade, valor });
  }
  return jogadoresGerados;
}

// Gerando 1000 jogadores para o mercado
const jogadoresDisponiveis = gerarJogadores(1000);

// Função para atualizar o saldo exibido
function atualizarSaldo() {
  document.getElementById('saldo').innerText = saldo;
}

// Função para negociar salário
function negociarSalario(jogador) {
  let salarioOferecido = prompt(`Qual salário você oferece para ${jogador.nome}?`);

  // Se o salário oferecido for menor que o mínimo aceitável do jogador, ele pode recusar
  if (salarioOferecido < 50000) { // Supondo que o salário mínimo para negociação é 50.000
    alert(`${jogador.nome} recusou a oferta por salário baixo!`);
    return false; // Recusa a contratação
  } else {
    jogador.salario = salarioOferecido; // Aceita o salário oferecido
    alert(`${jogador.nome} aceitou a oferta de ${salarioOferecido}!`);
    return true;
  }
}

// Função para comprar um jogador
function comprarJogador(nome) {
  const jogador = jogadoresDisponiveis.find(jogador => jogador.nome === nome);

  if (!jogador) {
    alert('Jogador não encontrado!');
    return;
  }

  // Negociar o salário antes de confirmar a compra
  const aceitouContrato = negociarSalario(jogador);
  if (aceitouContrato) {
    // Se o jogador aceitar o salário, procede com a compra
    if (saldo >= jogador.valor) {
      saldo -= jogador.valor; // Deduzir o valor da compra
      jogadoresNoTime.push(jogador); // Adicionar o jogador ao time
      atualizarSaldo();
      alert(`Você comprou ${jogador.nome} por ${jogador.valor} créditos!`);
      listarJogadores(); // Atualiza a lista de jogadores do time
      listarJogadoresDisponiveis(); // Atualiza a lista de jogadores disponíveis
    } else {
      alert("Saldo insuficiente para comprar este jogador!");
    }
  } else {
    alert("O jogador recusou o salário oferecido.");
  }
}

// Função para listar os jogadores do time
function listarJogadores() {
  const listaJogadores = document.getElementById('listaJogadores');
  if (jogadoresNoTime.length > 0) {
    listaJogadores.innerHTML = jogadoresNoTime.map(jogador => 
      `<li>${jogador.nome} - Valor: ${jogador.valor} - Habilidade: ${jogador.habilidade} - Idade: ${jogador.idade} - Salário: ${jogador.salario}</li>`
    ).join('');
  } else {
    listaJogadores.innerHTML = '<li>Nenhum jogador no time</li>';
  }
}

// Função para listar os jogadores disponíveis com paginação
let paginaAtual = 1;
const jogadoresPorPagina = 20;

function listarJogadoresDisponiveis() {
  const listaDisponiveis = document.getElementById('listaJogadoresDisponiveis');
  
  // Calcular o índice de início e fim para a página atual
  const inicio = (paginaAtual - 1) * jogadoresPorPagina;
  const fim = paginaAtual * jogadoresPorPagina;

  // Limitar a exibição aos jogadores da página atual
  const jogadoresParaExibir = jogadoresDisponiveis.slice(inicio, fim);

  if (jogadoresParaExibir.length > 0) {
    listaDisponiveis.innerHTML = jogadoresParaExibir.map(jogador => 
      `<li>${jogador.nome} - Valor: ${jogador.valor} - Habilidade: ${jogador.habilidade} - Idade: ${jogador.idade} 
      <button onclick="comprarJogador('${jogador.nome}')">Comprar</button></li>`
    ).join('');
  } else {
    listaDisponiveis.innerHTML = '<li>Não há jogadores disponíveis.</li>';
  }
  
  // Exibir botões de navegação
  document.getElementById('paginas').innerHTML = `
    <button onclick="mudarPagina('anterior')">Anterior</button>
    <span>Página ${paginaAtual}</span>
    <button onclick="mudarPagina('proxima')">Próxima</button>
  `;
}

function mudarPagina(direcao) {
  if (direcao === 'anterior' && paginaAtual > 1) {
    paginaAtual--;
  } else if (direcao === 'proxima' && paginaAtual * jogadoresPorPagina < jogadoresDisponiveis.length) {
    paginaAtual++;
  }
  listarJogadoresDisponiveis();
}

// Carregar os jogadores ao carregar a página
window.onload = function() {
  listarJogadoresDisponiveis();
  listarJogadores();
};
