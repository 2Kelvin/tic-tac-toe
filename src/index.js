import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
        <button className='square' onClick={props.squareOnClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                squareOnClick={() => this.props.onClick(i)}
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
            history: [
                { squares: Array(9).fill(null) }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    handleSquareClick(i) {
        const gameHistory = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = gameHistory[gameHistory.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: gameHistory.concat([
                { squares: squares }
            ]),
            stepNumber: gameHistory.length,
            xIsNext: !this.state.xIsNext // if player X just played, flip to palyer O
        });
    }

    render() {
        const gameHistory = this.state.history;
        const current = gameHistory[this.state.stepNumber];
        const gameWinner = calculateWinner(current.squares);

        const moves = gameHistory.map((step, move) => {
            const desc = move ? `Go to move #${move}` : `Go to game start`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if (gameWinner) {
            status = `Winner: ${gameWinner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleSquareClick(i)}
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

// function X() {
//     return <span className='symbolX'>X</span>;
// }

// function O() {
//     return <span className='symbolO'>O</span>;
// }


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squaresArray) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squaresArray[a] && squaresArray[a] === squaresArray[b] && squaresArray[a] === squaresArray[c]) {
            return squaresArray[a];
        }
    }
    return null;
}

// NOTES
// a component takes in parameters, called props (short for “properties”) --> between its opening & closing tags
// ... and returns a hierarchy of views to display via the render method.
// The render method returns a description of what you want to see on the screen. 
// React takes the description and displays the result.
// In particular, render returns a React element -> a description of what to render.
// Each React component is encapsulated and can operate independently
// ... this allows you to build complex UIs from simple components
// Passing props is how information flows in React apps, from parents to children.
// To “remember” things, components use state
// React components can have state by setting this.state in their constructors
// this.state is private to a React component that it’s defined in
// All React component classes that have a constructor should start with a super(props) call
// In JavaScript classes, you need to always call super when defining the constructor of a subclass
// By calling this.setState from an onClick handler in the Square’s render method, 
// ...we tell React to re-render that Square whenever its < button > is clicked
// When you call setState in a component, React automatically updates the child components inside of it too
// setState updates the value of state, stors it and displays it on the page
// To collect data from multiple children, or to have two child components communicate with each other, 
// ...declare the shared state in their parent component instead.
// ...The parent component can pass the state back down to the children by using props
// ...this keeps the child components in sync with each other and with the parent component.
// array.slice() method creates a new copy array for use to avoid modifying the existing array
//  in handleClick, we call .slice() to create a copy of the squares array to modify instead of modifying the existing array

// The main benefit of immutability is that it helps you build pure components in React
// through immutability, determining if changes have been made is easier 
// ...hence determining if and when a component requires to rerender

// unlike the array.push(), array.concat() does not mutate the original array; 
// ...it creates a new copy of the array to work with