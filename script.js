let jogador1 = "";
let jogador2 = "";
let jogador1Vit = 0;
let jogador2Vit = 0;
let jogadorVencedor = "";
let vez = 1;
let sJogadorDaVez = document.getElementById("sJogadorDaVez");
let vencedor = document.getElementById("winner");
let casa = document.getElementsByClassName("column");
let btn = document.getElementsByTagName("button");
let ganhou = false;
let tempoInicioJogo = "";
let tempoFinalJogo = "";
let tempoPartida = 0;
let duracao = document.getElementById("duracao-partida");
let melhorTempo = 99999999;
let recorde = document.getElementById("melhor-tempo");
let nomeJ1Placar = document.getElementById("nomeJ1Placar");
let pontJ1Placar = document.getElementById("pontJ1Placar");
let nomeJ2Placar = document.getElementById("nomeJ2Placar");
let pontJ2Placar = document.getElementById("pontJ2Placar");
/* Inicia o jogo */
function ticTacToe() {
  jogador1 = prompt("Jogador 1:");
  jogador2 = prompt("Jogador 2:");
  tempoInicioJogo = new Date();
  sJogadorDaVez.innerText = `${jogador1} - (O)`;
  jogador1Vit = 0;
  jogador2Vit = 0;
  btn[1].setAttribute("onclick", "reset()");
  for(let i = 0; i < 9; i++) {
      casa[i].classList.add("interacao");
    }
  placar();
  reset();
}
/* Animação em verde quando há vitória */
function animacao(index1, index2, index3) {
  casa[index1].classList.add("piscaPis");
  casa[index2].classList.add("piscaPis");
  casa[index3].classList.add("piscaPis");
}
/* Placar de pontuação dos jogadores */
function placar() {
  nomeJ1Placar.innerText = `${jogador1} - `;
  pontJ1Placar.innerText = `${jogador1Vit}`;
  nomeJ2Placar.innerText = `${jogador2} - `;
  pontJ2Placar.innerText = `${jogador2Vit}`;
}
/* Escrever o resultado no HTML quando for velha */
function velhaJogo() {
  if(!ganhou) {
    sJogadorDaVez.innerText = "Jogue Novamente";
    vencedor.innerText = "Hmm.. Deu velha. Não há vencedor!";
    for(let i = 0; i < 9; i++) {
      casa[i].classList.remove("interacao");
    }
  }
}
/* Determina o vencedor (X ou Círculo) */
function quemGanhou(index1) {
  if(casa[index1].title == "circle" && !ganhou) {
      vencedor.innerText = `Vencedor: ${jogador1}!`;
      if((vez / 2) <= 4) /* se o jogador vencer em ate 4 jogadas, ele ganha 3 pontos */
        jogador1Vit += 3; /* pontuação do jogador 1 */
      else
        jogador1Vit++; /* se o jogador não vencer em ate 4 jogadas, ele ganha 1 ponto */
    } else if(casa[index1].title == "x") {
      vencedor.innerText = `Vencedor: ${jogador2}!`;
      if((vez / 2) <= 4.5) /* se o jogador vencer em ate 4 jogadas, ele ganha 3 pontos */
        jogador2Vit += 3; /* pontuação do jogador 2 */
      else
        jogador2Vit++; /* se o jogador não vencer em ate 4 jogadas, ele ganha 1 ponto */
    }
}
/* Responsável por verificar vitória e chamar função que determina quem venceu (X ou Círculo) */
function ganhouJogo(index1, index2, index3) {
  if(((casa[index1].title == "circle") && (casa[index2].title == "circle") && (casa[index3].title == "circle")) || ((casa[index1].title == "x") && (casa[index2].title == "x") && (casa[index3].title == "x"))) {
    jogadorVencedor = `${casa[index1].title}`;
    quemGanhou(index1);
    casa[index1].style.backgroundColor = 'green';
    casa[index2].style.backgroundColor = 'green';
    casa[index3].style.backgroundColor = 'green';
    sJogadorDaVez.innerText = "Jogue Novamente";
    ganhou = true;
    for(let i = 0; i < 9; i++) {
      casa[i].removeAttribute("onclick");
      casa[i].classList.remove("interacao");
    }
    animacao(index1, index2, index3);
  }
}
/* Reinicia o jogo */
function reset() {
  ganhou = false;
  for(let i =0; i < 9; i++) {
    casa[i].setAttribute("onclick", `select(event, ${i})`);
    casa[i].classList.remove("piscaPis");
    casa[i].classList.add("interacao");
    casa[i].title = "";
    casa[i].style.backgroundImage = '';
    casa[i].style.background = '';
  }
  sJogadorDaVez.innerText = `${jogador1} - (O)`;
  vencedor.innerText = 'Vencedor:';
  vez = 1;
  tempoInicioJogo = new Date();
  duracao.innerText = "";
}
/* Calcula a duração da partida */
function duracaoPartida(inicio, final) {
  tempoPartida = final.getTime() - inicio.getTime();
  tempoPartida = tempoPartida / 1000; /* converte para segundos */
  duracao.innerText = `${tempoPartida.toFixed(2)} segundos`;
  if(Number(tempoPartida.toFixed(2)) < melhorTempo && ganhou) {
    melhorTempo = tempoPartida.toFixed(2); /* Atribui o melhor tempo */
    if(jogadorVencedor == "x") {
      recorde.innerText = `${melhorTempo} segundos - ${jogador2}`;
    }
    else if(jogadorVencedor == "circle") {
      recorde.innerText = `${melhorTempo} segundos - ${jogador1}`;
    }
  }
}
/* Verifica a linha */
function verificaLinha() {
  ganhouJogo(0, 1, 2);
  ganhouJogo(3, 4, 5);
  ganhouJogo(6, 7, 8);
}
/* Verifica a coluna */
function verificaColuna() {
  ganhouJogo(0, 3, 6);
  ganhouJogo(1, 4, 7);
  ganhouJogo(2, 5, 8);
}
/* Verifica a diagonal */
function verificaDiagonal() {
  ganhouJogo(0, 4, 8);
  ganhouJogo(2, 4, 6);
}
/* Finaliza a duração da partida e chama função que exibe o placar */
function verificaGanhou() {
  verificaLinha();
  verificaColuna();
  verificaDiagonal();
  if(ganhou) { /* se houver vencedor */
    tempoFinalJogo = new Date();
    duracaoPartida(tempoInicioJogo, tempoFinalJogo);
    placar();
  }
  if(!ganhou && vez == 10) { /* se nao houver vencedor => velha */
    tempoFinalJogo = new Date();
    duracaoPartida(tempoInicioJogo, tempoFinalJogo);
    velhaJogo();
  }
}
/* Seleciona as casas */
function select(event, nCasa) {
  let jogada = event.target;
  if(vez %2 != 0) {
    jogada.style.backgroundImage = 'url("img/circle.svg")';
    jogada.title = "circle";
    casa[nCasa].removeAttribute("onclick");
    sJogadorDaVez.innerText = `${jogador2} - (X)`;
  }
  else {
    jogada.style.backgroundImage = 'url("img/x.svg")';
    jogada.title = "x";
    casa[nCasa].removeAttribute("onclick");
    sJogadorDaVez.innerText = `${jogador1} - (O)`;
  }
  vez++;
  verificaGanhou();
}