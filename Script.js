let saldo = 1000000;
let jogadores = [];

function atualizarSaldo() {
  document.getElementById('saldo').innerText = saldo;
}

function comprarJogador(nome, valor) {
  if (saldo >= valor) {
    saldo -= valor;
    jogadores.push(nome);
    atualizarSaldo();
    alert(`Você comprou ${nome} por ${valor} créditos!`);
  } else {
    alert("Saldo insuficiente para comprar esse jogador!");
  }
}

function venderJogador(nome, valor) {
  const index = jogadores.indexOf(nome);
  if (index !== -1) {
    jogadores.splice(index, 1);
    saldo += valor;
    atualizarSaldo();
    alert(`Você vendeu ${nome} por ${valor} créditos!`);
  } else {
    alert(`${nome} não está no seu time.`);
  }
}

function mostrarJogadores() {
  const lista = document.getElementById('listaJogadores');
  lista.innerHTML = jogadores.length > 0 ? jogadores.map(jogador => `<li>${jogador}</li>`).join('') : '<li>Nenhum jogador no time</li>';
}
