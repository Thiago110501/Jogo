// Variáveis globais
let saldo = 1000000; 
let jogadoresNoTime = []; 
let times = []; 
let campeonatos = []; 

// Função para criar jogadores com atributos variados
function gerarJogadores(numJogadores) {
  let jogadoresGerados = [];
  for (let i = 0; i < numJogadores; i++) {
    const nome = gerarNomeJogador();
    const idade = Math.floor(Math.random() * (40 - 18 + 1)) + 18;
    const habilidade = Math.floor(Math.random() * (99 - 60 + 1)) + 60;
    const valor = Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
    jogadoresGerados.push({ nome, idade, habilidade, valor, salario: 0, salarioMinimo: 50000, temporadaRestante: 5 });
  }
  return jogadoresGerados;
}

// Função para gerar nome aleatório de jogador
function gerarNomeJogador() {
  const nomes = ['Neymar', 'Messi', 'Mbappé', 'Cristiano Ronaldo', 'Pogba', 'Salah', 'Lewandowski', 'Suárez', 'Benzema', 'Kante', 'De Bruyne', 'Ramos', 'Bale', 'Kane', 'Lukaku', 'Salah', 'Van Dijk', 'Modric', 'Son', 'Haaland'];
  return nomes[Math.floor(Math.random() * nomes.length)];
}

// Função para criar times
function criarTime(nomeTime) {
  const jogadoresTime = gerarJogadores(11); // Criar 11 jogadores
  const time = { nome: nomeTime, jogadores: jogadoresTime, pontos: 0 };
  times.push(time);
  return time;
}

// Função para criar campeonatos
function criarCampeonato(nome) {
  const campeonato = { nome, times: times, vencedor: null };
  campeonatos.push(campeonato);
  return campeonato;
}

// Função para simular campeonato
function simularCampeonato(campeonato) {
  const vencedor = campeonato.times[Math.floor(Math.random() * campeonato.times.length)];
  campeonato.vencedor = vencedor;
  vencedor.pontos += 3; // O vencedor ganha 3 pontos
  alert(`${vencedor.nome} venceu o campeonato ${campeonato.nome}!`);
}

// Função para finalizar a temporada
function finalizarTemporada() {
  simularTemporada();
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

// Função para listar jogadores do time
function listarJogadores() {
  const listaJogadores = document.getElementById('listaJogadores');
  listaJogadores.innerHTML = jogadoresNoTime.map(jogador => `
    <li>${jogador.nome} - Habilidade: ${jogador.habilidade} - Idade: ${jogador.idade}</li>
  `).join('');
}

// Função para listar jogadores disponíveis
function listarJogadoresDisponiveis() {
  const listaJogadoresDisponiveis = document.getElementById('listaJogadoresDisponiveis');
  listaJogadoresDisponiveis.innerHTML = jogadoresDisponiveis.map(jogador => `
    <li>${jogador.nome} - Valor: ${jogador.valor} - Habilidade: ${jogador.habilidade}
    <button onclick="comprarJogador('${jogador.nome}')">Comprar</button></li>
  `).join('');
}

// Função para carregar a página inicial com jogadores e times
window.onload = function() {
  // Criar alguns times e campeonatos para testar
  criarTime('Time A');
  criarTime('Time B');
  criarCampeonato('Campeonato Nacional');
  listarJogadoresDisponiveis();
  listarJogadores();
};
