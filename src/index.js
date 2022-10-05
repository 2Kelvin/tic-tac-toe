import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
        <button className='square' onClick={props.squareOnClick}>
            {props.value}
        </button>
    )
}

function X() {
    return <span className='symbolX'>X</span>
}

function O() {
    return <span className='symbolO'>O</span>;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(""),
            xIsNext: true //alternating between player X and player O
        };
    }

    handleSquareClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? <X /> : <O />;
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext // if player X just played, flip to palyer O
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                squareOnClick={() => this.handleSquareClick(i)}
            />
        );
    }

    render() {
        const status = `Next player: ${this.state.xIsNext ? "X" : "O"} `;

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

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