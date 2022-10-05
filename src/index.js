import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    render() {
        return (
            <button
                className="square"
                onClick={() => {
                    this.setState({ value: "X" });
                }}
            >
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />;
    }

    render() {
        const status = 'Next player: X';

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