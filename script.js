 Variáveis globais
let saldo = 1000000; // Saldo inicial
let times = []; // Lista de times
let jogadoresDisponiveis = gerarJogadores(1000); // Jogadores disponíveis para compra

// Funções para gerar jogadores aleatórios
function gerarNomeJogador() {
  const nomes = ['Neymar', 'Messi', 'Mbappé', 'Cristiano Ronaldo', 'Pogba', 'Salah', 'Lewandowski', 'Suárez', 'Benzema', 'Kante'];
  return nomes[Math.floor(Math.random() * nomes.length)];
}

function gerarIdade() {
  return Math.floor(Math.random() * (40 - 18 + 1)) + 18;
}

function gerarHabilidade() {
  return Math.floor(Math.random() * (99 - 60 + 1)) + 60;
}

function gerarValor() {
  return Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
}

function gerarJogadores(numJogadores) {
  let jogadoresGerados = [];
  for (let i = 0; i < numJogadores; i++) {
    const nome = gerarNomeJogador();
    const idade = gerarIdade();
    const habilidade = gerarHabilidade();
    const valor = gerarValor();
    jogadoresGerados.push({ nome, idade, habilidade, valor, salario: 0, salarioMinimo: 50000, temporadaRestante: 5 });
  }
  return jogadoresGerados;
}

// Funções para criar times e adicionar jogadores aos times
function criarTime(nome) {
  const novoTime = { nome, jogadores: [], saldo: 0 };
  times.push(novoTime);
  alert(`Time ${nome} criado com sucesso!`);
}

function adicionarJogadorAoTime(nomeTime, jogador) {
  const time = times.find(time => time.nome === nomeTime);
  if (time) {
    time.jogadores.push(jogador);
    alert(`${jogador.nome} foi adicionado ao time ${nomeTime}.`);
  }
}

// Função para atualizar o saldo exibido
function atualizarSaldo() {
  document.getElementById('saldo').innerText = saldo;
}

// Função para negociar salário de jogador
function negociarSalario(jogador) {
  let salarioOferecido = prompt(`Qual salário você oferece para ${jogador.nome}?`);

  if (salarioOferecido < jogador.salarioMinimo) {
    alert(`${jogador.nome} recusou a oferta por salário baixo!`);
    return false;
  } else {
    jogador.salario = salarioOferecido;
    alert(`${jogador.nome} aceitou a oferta de salário de ${salarioOferecido}!`);
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

  const aceitouContrato = negociarSalario(jogador);
  if (!aceitouContrato) return;

  if (saldo >= jogador.valor) {
    saldo -= jogador.valor;
    jogadoresDisponiveis = jogadoresDisponiveis.filter(jog => jog.nome !== nome);
    alert(`Você comprou ${jogador.nome} por ${jogador.valor} créditos!`);
    listarJogadoresDisponiveisComPaginacao();
  } else {
    alert("Saldo insuficiente para comprar este jogador!");
  }
}

// Função para listar jogadores do time
function listarJogadores(nomeTime) {
  const time = times.find(time => time.nome === nomeTime);
  if (time) {
    const listaJogadores = document.getElementById('listaJogadores');
    listaJogadores.innerHTML = time.jogadores.map(jogador =>
      `<li>${jogador.nome} - Valor: ${jogador.valor} - Habilidade: ${jogador.habilidade} - Idade: ${jogador.idade} - Salário: ${jogador.salario}</li>`
    ).join('');
  }
}

// Função para listar jogadores disponíveis com paginação
let paginaAtual = 1;
const jogadoresPorPagina = 20;

function listarJogadoresDisponiveisComPaginacao() {
  const listaDisponiveis = document.getElementById('listaJogadoresDisponiveis');
  const inicio = (paginaAtual - 1) * jogadoresPorPagina;
  const fim = paginaAtual * jogadoresPorPagina;
  const jogadoresParaExibir = jogadoresDisponiveis.slice(inicio, fim);

  if (jogadoresParaExibir.length > 0) {
    listaDisponiveis.innerHTML = jogadoresParaExibir.map(jogador =>
      `<li>${jogador.nome} - Valor: ${jogador.valor} - Habilidade: ${jogador.habilidade} - Idade: ${jogador.idade}
      <button onclick="comprarJogador('${jogador.nome}')">Comprar</button></li>`
    ).join('');
  } else {
    listaDisponiveis.innerHTML = '<li>Não há jogadores disponíveis.</li>';
  }

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

// Função para simular o final de uma temporada
function simularTemporada() {
  const evento = Math.random();
  if (evento < 0.3) {
    alert("Um dos seus jogadores sofreu uma lesão e ficará fora por algumas semanas!");
  } else if (evento < 0.6) {
    alert("Seu time ganhou um campeonato e você recebeu um prêmio em dinheiro!");
    saldo += 500000; // Adiciona dinheiro ao saldo
    atualizarSaldo();
  } else {
    alert("O time teve um desempenho ruim na temporada.");
  }
}

// Função para finalizar a temporada
function finalizarTemporada() {
  simularTemporada();
  // Atualizar os contratos dos jogadores, verificar contratos expirados, etc.
  verificarContratos();
}

// Função para verificar contratos expirando
function verificarContratos() {
  jogadoresNoTime.forEach(jogador => {
    if (jogador.temporadaRestante <= 0) {
      alert(`${jogador.nome} tem contrato expirando! Hora de renovar.`);
    } else {
      jogador.temporadaRestante--; // Decrementa a temporada do contrato
    }
  });
}

// Função para avançar para o próximo mês
function avancarMes() {
  verificarContratos();
  // Deduzir salários, etc...
}

// Carregar a página inicial com os jogadores
window.onload = function() {
  listarJogadoresDisponiveisComPaginacao();
};
