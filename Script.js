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

// Função para comprar um jogador
function comprarJogador(nome) {
  const jogador = jogadoresDisponiveis.find(jogador => jogador.nome === nome);
  
  if (!jogador) {
    alert('Jogador não encontrado!');
    return;
  }

  // Verificar se o jogador tem saldo suficiente
  if (saldo >= jogador.valor) {
    saldo -= jogador.valor; // Deduzir o valor da compra
    jogadoresNoTime.push(jogador); // Adicionar o jogador ao time
    atualizarSaldo();
    alert(`Você comprou ${jogador.nome} por ${jogador.valor} créditos!`);
    listarJogadores(); // Atualiza a lista de jogadores do time
    listarJogadoresDisponiveisComPaginacao(); // Atualiza a lista de jogadores disponíveis
  } else {
    alert("Saldo insuficiente para comprar este jogador!");
  }
}

// Função para listar os jogadores do time
function listarJogadores() {
  const listaJogadores = document.getElementById('listaJogadores');
  listaJogadores.innerHTML = jogadoresNoTime.length > 0 ? jogadoresNoTime.map(jogador => 
    `<li>${jogador.nome} - Valor: ${jogador.valor} - Habilidade: ${jogador.habilidade} - Idade: ${jogador.idade}</li>`
  ).join('') : '<li>Nenhum jogador no time</li>';
}

// Função para listar os jogadores disponíveis com paginação
let paginaAtual = 1;
const jogadoresPorPagina = 20;

function listarJogadoresDisponiveisComPaginacao() {
  const listaDisponiveis = document.getElementById('listaJogadoresDisponiveis');
  
  // Calcular o índice de início e fim para a página atual
  const inicio = (paginaAtual - 1) * jogadoresPorPagina;
  const fim = paginaAtual * jogadoresPorPagina;

  // Limitar a exibição aos jogadores da página atual
  const jogadoresParaExibir = jogadoresDisponiveis.slice(inicio, fim);

  listaDisponiveis.innerHTML = jogadoresParaExibir.length > 0 ? jogadoresParaExibir.map(jogador => 
    `<li>${jogador.nome} - Valor: ${jogador.valor} - Habilidade: ${jogador.habilidade} - Idade: ${jogador.idade} 
    <button onclick="comprarJogador('${jogador.nome}')">Comprar</button></li>`
  ).join('') : '<li>Não há jogadores disponíveis.</li>';
  
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
  listarJogadoresDisponiveisComPaginacao();
}

// Carregar os jogadores ao carregar a página
listarJogadoresDisponiveisComPaginacao();
listarJogadores();
