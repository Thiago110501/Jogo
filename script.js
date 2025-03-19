/ Variáveis globais
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
    const salarioMinimo = Math.floor(valor * 0.05); // Salário mínimo baseado no valor do jogador
    jogadoresGerados.push({ nome, idade, habilidade, valor, salario: 0, salarioMinimo, temporadaRestante: 5 });
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
    if (time.saldo >= jogador.salario) {
      time.jogadores.push(jogador);
      time.saldo -= jogador.salario;
      alert(`${jogador.nome} foi adicionado ao time ${nomeTime}.`);
    } else {
      alert("Saldo insuficiente para adicionar o jogador ao time.");
    }
  }
}

// Função para atualizar o saldo exibido
function atualizarSaldo() {
  document.getElementById('saldo').innerText = saldo;
}

// Função para negociar salário de jogador
function negociarSalario(jogador) {
  let salarioOferecido = parseFloat(prompt(`Qual salário você oferece para ${jogador.nome}?`));

  if (isNaN(salarioOferecido)) {
    alert("Por favor, insira um valor numérico válido.");
    return false;
  }

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
    atualizarSaldo(); // Atualiza o saldo exibido
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

  const totalPaginas = Math.ceil(jogadoresDisponiveis.length / jogadoresPorPagina);
  document.getElementById('paginas').innerHTML = `
    <button onclick="mudarPagina('anterior')" ${paginaAtual === 1 ? 'disabled' : ''}>Anterior</button>
    <span>Página ${paginaAtual} de ${totalPaginas}</span>
    <button onclick="mudarPagina('proxima')" ${paginaAtual === totalPaginas ? 'disabled' : ''}>Próxima</button>
  `;
}

function mudarPagina(direcao) {
  const totalPaginas = Math.ceil(jogadoresDisponiveis.length / jogadoresPorPagina);

  if (direcao === 'anterior' && paginaAtual > 1) {
    paginaAtual--;
  } else if (direcao === 'proxima' && paginaAtual < totalPaginas) {
    paginaAtual++;
  }
  listarJogadoresDisponiveisComPaginacao();
}

// Função para simular o final de uma temporada
function simularTemporada(nomeTime) {
  const time = times.find(time => time.nome === nomeTime);
  if (time) {
    const evento = Math.random();
    if (evento < 0.3) {
      alert("Um dos seus jogadores sofreu uma lesão e ficará fora por algumas semanas!");
    } else if (evento < 0.6) {
      alert("Seu time ganhou um campeonato e você recebeu um prêmio em dinheiro!");
      time.saldo += 500000; // Adiciona dinheiro ao saldo do time
    } else {
      alert("O time teve um desempenho ruim na temporada.");
    }
  }
}

// Função para finalizar a temporada
function finalizarTemporada(nomeTime) {
  simularTemporada(nomeTime);
  verificarContratos();
}

// Função para verificar contratos expirando
function verificarContratos() {
  times.forEach(time => {
    time.jogadores = time.jogadores.filter(jogador => {
      if (jogador.temporadaRestante <= 0) {
        alert(`${jogador.nome} teve o contrato expirado e foi removido do time.`);
        return false;
      } else {
        jogador.temporadaRestante--;
        return true;
      }
    });
  });
}

// Função para avançar para o próximo mês
function avancarMes() {
  times.forEach(time => {
    const totalSalarios = time.jogadores.reduce((total, jogador) => total + jogador.salario, 0);
    time.saldo -= totalSalarios;
    if (time.saldo < 0) {
      alert(`O time ${time.nome} está com saldo negativo!`);
    }
  });
  verificarContratos();
}

// Função para renovar contrato de um jogador
function renovarContrato(nomeTime, nomeJogador) {
  const time = times.find(time => time.nome === nomeTime);
  if (time) {
    const jogador = time.jogadores.find(jogador => jogador.nome === nomeJogador);
    if (jogador) {
      const salarioOferecido = parseFloat(prompt(`Qual salário você oferece para renovar o contrato de ${jogador.nome}?`));

      if (isNaN(salarioOferecido)) {
        alert("Por favor, insira um valor numérico válido.");
        return;
      }

      if (salarioOferecido < jogador.salarioMinimo) {
        alert(`${jogador.nome} recusou a oferta por salário baixo!`);
        return;
      }

      jogador.salario = salarioOferecido;
      jogador.temporadaRestante = 5; // Renova o contrato por mais 5 temporadas
      alert(`Contrato de ${jogador.nome} renovado com sucesso por ${salarioOferecido} créditos por temporada!`);
    } else {
      alert("Jogador não encontrado no time!");
    }
  } else {
    alert("Time não encontrado!");
  }
}

// Função para vender um jogador
function venderJogador(nomeTime, nomeJogador) {
  const time = times.find(time => time.nome === nomeTime);
  if (time) {
    const jogador = time.jogadores.find(jogador => jogador.nome === nomeJogador);
    if (jogador) {
      const valorVenda = jogador.valor * 0.8; // O jogador é vendido por 80% do seu valor
      time.saldo += valorVenda;
      time.jogadores = time.jogadores.filter(jog => jog.nome !== nomeJogador);
      jogadoresDisponiveis.push(jogador); // Adiciona o jogador de volta à lista de disponíveis
      alert(`${jogador.nome} foi vendido por ${valorVenda} créditos!`);
      listarJogadores(nomeTime); // Atualiza a lista de jogadores do time
    } else {
      alert("Jogador não encontrado no time!");
    }
  } else {
    alert("Time não encontrado!");
  }
}

// Função para adicionar saldo a um time
function adicionarSaldoTime(nomeTime, valor) {
  const time = times.find(time => time.nome === nomeTime);
  if (time) {
    time.saldo += valor;
    alert(`Saldo de ${valor} créditos adicionado ao time ${nomeTime}.`);
    exibirDetalhesTime(nomeTime); // Atualiza os detalhes do time
  } else {
    alert("Time não encontrado!");
  }
}

// Função para listar todos os times
function listarTimes() {
  const listaTimes = document.getElementById('listaTimes');
  listaTimes.innerHTML = times.map(time => `
    <li>
      ${time.nome} - Saldo: ${time.saldo} créditos
      <button onclick="exibirDetalhesTime('${time.nome}')">Detalhes</button>
    </li>
  `).join('');
}

// Função para adicionar um novo time
function adicionarTime() {
  const nomeTime = prompt("Digite o nome do novo time:");
  if (nomeTime) {
    criarTime(nomeTime);
    listarTimes(); // Atualiza a lista de times
  }
}

// Função para inicializar a interface
function inicializarInterface() {
  listarJogadoresDisponiveisComPaginacao();
  listarTimes();
}

// Carregar a página inicial com os jogadores e times
window.onload = function() {
  inicializarInterface();
};
