// Variáveis globais
let saldo = 1000000; // Saldo inicial
let jogadoresNoTime = []; // Lista de jogadores do time

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

// Gerando 1000 jogadores para o mercado
let jogadoresDisponiveis = gerarJogadores(1000);

// Função para atualizar o saldo exibido
function atualizarSaldo() {
  document.getElementById('saldo').innerText = saldo;
}

// Função para negociar salário de jogador
function negociarSalario(jogador) {
  let salarioOferecido = prompt(`Qual salário você oferece para ${jogador.nome}?`);

  // Se o salário oferecido for menor que o mínimo aceitável, ele recusa
  if (salarioOferecido < jogador.salarioMinimo) {
    alert(`${jogador.nome} recusou a oferta por salário baixo!`);
    return false;
  } else {
    jogador.salario = salarioOferecido; // Jogador aceita o salário
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

  // Negociar salário antes de comprar
  const aceitouContrato = negociarSalario(jogador);
  if (!aceitouContrato) return; // Se o contrato for recusado, não compra o jogador

  // Verificar se o saldo é suficiente
  if (saldo >= jogador.valor) {
    saldo -= jogador.valor; // Deduz o valor da compra
    jogadoresNoTime.push(jogador); // Adiciona o jogador ao time
    atualizarSaldo();
    alert(`Você comprou ${jogador.nome} por ${jogador.valor} créditos!`);
    listarJogadores(); // Atualiza a lista do time
    listarJogadoresDisponiveisComPaginacao(); // Atualiza os jogadores disponíveis
  } else {
    alert("Saldo insuficiente para comprar este jogador!");
  }
}

// Função para listar jogadores do time
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
  listarJogadores();
};
// Criar times com jogadores aleatórios
function criarTime(nomeTime, numJogadores) {
  let jogadoresTime = gerarJogadores(numJogadores);
  return { nome: nomeTime, jogadores: jogadoresTime };
}

// Função para criar campeonatos
function criarCampeonato(nomeCampeonato, times) {
  return { nome: nomeCampeonato, times: times };
}

// Simular um campeonato com sorteio de vencedores
function simularCampeonato(campeonato) {
  const times = campeonato.times;
  const vencedor = times[Math.floor(Math.random() * times.length)];
  alert(`O vencedor do campeonato ${campeonato.nome} é ${vencedor.nome}!`);
  // Exemplo de premiar vencedor
  saldo += 1000000; // Adiciona dinheiro ao saldo
  atualizarSaldo();
}

// Exemplo de criação de times e campeonato ao iniciar a página
window.onload = function() {
  // Criar times aleatórios
  const time1 = criarTime('Time A', 11);
  const time2 = criarTime('Time B', 11);
  const time3 = criarTime('Time C', 11);
  
  // Criar campeonato com os times
  const campeonato = criarCampeonato('Campeonato Nacional', [time1, time2, time3]);

  // Simular o campeonato
  simularCampeonato(campeonato);

  // Carregar jogadores existentes
  listarJogadoresDisponiveisComPaginacao();
  listarJogadores();
};
