import React from 'react';
import Board from './components/board';
import './reset.css';
import './style.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  // Обработка клика по клетке
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // Если игра закончена или клетка заполнена, то ничего не делаем
    if (checkGameStatus(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  // Переход к определенному ходу
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkGameStatus(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Перейти к ходу #' + move : 'К началу игры';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    // Логика, определяющая статус игры
    let status;
    if (winner) {
      if (winner === 'draw') status = 'Ничья';
      else {
        status = 'Выиграл ' + winner;
      }
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

// Вычисляет победивший символ
function checkGameStatus(squares) {
  // Массив со всеми вариациями победного ряда
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Если в ряду одинаковые знаки, возвращает победивший знак
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Если не все клетки заполнены
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) return null;
  }
  // Если все клетки заполнены, но нет победителя, возвращает "ничью"
  return 'draw';
}
