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
  if (jogadoresNoTime.length > 0) {
    listaJogadores.innerHTML = jogadoresNoTime.map(jogador => 
      `<li>${jogador.nome} - Valor: ${jogador.valor} - Habilidade: ${jogador.habilidade} - Idade: ${jogador.idade}</li>`
    ).join('');
  } else {
    listaJogadores.innerHTML = '<li>Nenhum jogador no time</li>';
  }
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

// Carregar os jogadores ao carregar a página
window.onload = function() {
  listarJogadoresDisponiveisComPaginacao();
  listarJogadores();
};
// Novos Jogadores com informações adicionais
let jogadoresDisponiveis = [
    { nome: 'Neymar', idade: 29, habilidade: 92, valor: 150000000 },
    { nome: 'Messi', idade: 34, habilidade: 98, valor: 200000000 },
    { nome: 'Mbappé', idade: 22, habilidade: 90, valor: 120000000 },
    { nome: 'Cristiano Ronaldo', idade: 36, habilidade: 93, valor: 150000000 },
    { nome: 'Pogba', idade: 28, habilidade: 85, valor: 85000000 },
    // Adicione mais jogadores aqui
];

let saldo = 1000000;  // O saldo inicial
let jogadoresNoTime = []; // Jogadores no time

// Função para atualizar a exibição do saldo
function atualizarSaldo() {
  document.getElementById('saldo').innerText = saldo;
}

// Função para comprar um jogador
function comprarJogador(nome) {
  const jogador = jogadoresDisponiveis.find(j => j.nome === nome);

  if (!jogador) {
    alert("Jogador não encontrado!");
    return;
  }

  // Verificar se o jogador tem saldo suficiente
  if (saldo >= jogador.valor) {
    saldo -= jogador.valor; // Deduzir o valor da compra
    jogadoresNoTime.push(jogador); // Adicionar o jogador ao time
    atualizarSaldo();
    alert(`Você comprou ${jogador.nome} por ${jogador.valor} créditos!`);
    listarJogadores(); // Atualiza a lista de jogadores do time
    listarJogadoresDisponiveis(); // Atualiza a lista de jogadores disponíveis
  } else {
    alert("Saldo insuficiente!");
  }
}

// Função para listar os jogadores disponíveis
function listarJogadoresDisponiveis() {
  const listaJogadoresDisponiveis = document.getElementById('listaJogadoresDisponiveis');
  listaJogadoresDisponiveis.innerHTML = jogadoresDisponiveis.map(jogador => `
    <li>${jogador.nome} - Valor: ${jogador.valor} - Habilidade: ${jogador.habilidade}
    <button onclick="comprarJogador('${jogador.nome}')">Comprar</button></li>
  `).join('');
}

// Função para listar os jogadores no time
function listarJogadores() {
  const listaJogadores = document.getElementById('listaJogadores');
  listaJogadores.innerHTML = jogadoresNoTime.map(jogador => `
    <li>${jogador.nome} - Habilidade: ${jogador.habilidade} - Idade: ${jogador.idade}</li>
  `).join('');
}

// Inicializando a página
window.onload = function() {
  listarJogadoresDisponiveis();
  listarJogadores();
};
// Função para simular o final de uma temporada
function simularTemporada() {
  // Gerar eventos aleatórios como lesões, transferências, etc.
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

// Chamar a função ao final de cada temporada
function finalizarTemporada() {
  simularTemporada();
  // Outros ajustes, como atualizar salários dos jogadores ou ganhar novos contratos.
}
function negociarSalario(jogador) {
  let salarioOferecido = prompt(`Qual salário você oferece para ${jogador.nome}?`);

  // Se o salário oferecido for menor que o mínimo aceitável do jogador, ele pode recusar
  if (salarioOferecido < jogador.salarioMinimo) {
    alert(`${jogador.nome} recusou a oferta por salário baixo!`);
    return false; // Recusa a contratação
  } else {
    jogador.salario = salarioOferecido; // Aceita o salário oferecido
    alert(`${jogador.nome} aceitou a oferta de ${salarioOferecido}!`);
    return true;
  }
}
// Função para verificar contratos expirando
function verificarContratos() {
  jogadoresNoTime.forEach(jogador => {
    if (jogador.temporadaRestante <= 0) {
      alert(`${jogador.nome} tem contrato expirando. Hora de renovação!`);
    } else {
      jogador.temporadaRestante--; // Decrementa o tempo do contrato
    }
  });
}

// Chamar a função ao final de cada "mês"
function avancarMes() {
  verificarContratos();
  // Deduz os salários, etc...
}
