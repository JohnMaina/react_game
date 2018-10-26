import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square 
        value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)}
        />
        );
    }

    render() {

        return (
            <div>
       
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            historyCustom: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber:0,
        };
    }

    jumpTo(step) {
        this.setState{
            stepNumber:step,
            xIsNext:(stepNumber%2)===0,
        }
    }

    handleClick(i) {
        const historyCustom = this.state.historyCustom(0,this.state.stepNumber+1);
        const squares = historyCustom[historyCustom.length - 1].squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        } else {
            squares[i] = this.state.xIsNext ? 'X' : 'O';

            this.setState({
                historyCustom: historyCustom.concat([{
                    squares: squares,
                }]),
                stepNumber:historyCustom.length,
                xIsNext: !this.state.xIsNext,
            });
        }
    }

    render() {
        const historyCustom = this.state.historyCustom;
        const current = historyCustom[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = historyCustom.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        }
        return (
            <div className="game">
        <div className="game-board">
          <Board
          squares={current.squares}
            onClick={(i) => this.handleClick(i)}
           />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    let winner;
    let winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]


    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winner = squares[a];

        } else {

        }
    }
    return winner;
}