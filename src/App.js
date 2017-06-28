import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            txt: 'this is the default state for text attribute',
            cat: 0,
            currentEvent: '---',
            componentA: ''
        }
    }

    updateCurrentEvent(e) {
        this.setState({currentEvent: e.type})
    }

    update( e ) {
        this.setState({txt: e.target.value})
    }

    add() {
        this.setState({cat: this.state.cat + 1})
    }

    updateComponent( ) {
        this.setState(
            {
                //componentA: ReactDOM.findDOMNode(this.componentA).value,
                componentA: this.componentA.refs.input.value,
                b: this.refs.b.value
            }
        )
    }

    render() {
        let txt = this.props.txt
        let cat = this.props.cat
        return (
            <div>
                <Title text="Wake up Neo"/>
                <h2>{this.state.cat} - {this.state.txt} </h2>
                <Widget update={this.update.bind(this)} />
                <Widget update={this.update.bind(this)} />
                <Widget update={this.update.bind(this)} />
                <button onClick={this.add.bind(this)}>+1</button>
                <br/>
                <b>{txt} with number {cat}</b><br/>
                <Button>I <Heart/> React</Button>
                <br/>
                <textarea
                    onKeyPress={this.updateCurrentEvent.bind(this)}
                    onCopy={this.updateCurrentEvent.bind(this)}
                    onCut={this.updateCurrentEvent.bind(this)}
                    onPaste={this.updateCurrentEvent.bind(this)}
                    onFocus={this.updateCurrentEvent.bind(this)}
                    onBlur={this.updateCurrentEvent.bind(this)}
                    onTouchStart={this.updateCurrentEvent.bind(this)}
                    onTouchMove={this.updateCurrentEvent.bind(this)}
                    onTouchEnd={this.updateCurrentEvent.bind(this)}
                    cols="30"
                    rows="10"
                />
                <span>Event: {this.state.currentEvent}</span>
                <br/>
                <MyInput
                    ref={ component => this.componentA = component}
                    update={this.updateComponent.bind(this)}
                /> {this.state.componentA}
                <hr />
                <input
                    ref="b"
                    type="text"
                    onChange={this.updateComponent.bind(this)}
                /> {this.state.b}
            </div>
        )
    }
}

class MyInput extends React.Component
{
    render() {
        return <div><input ref="input" type="text" onChange={this.props.update}/></div>
    }
}

//Class props definition typing
App.propTypes = {
    txt: React.PropTypes.string,
    cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
    txt: "This is default text"
}

const Title = (props) => <h1>Title: {props.text}</h1>

Title.propTypes = {
    text(props, propName, component){
        if (!(propName in props)) {
            return Error(`missing ${propName}`)
        }
        if (props[propName].length < 6) {
            return Error(`${propName} was to short!`)
        }
    }}


const Button = (props) => <button>{props.children}</button>

class Heart extends React.Component {
    render(){
        return <span>&hearts;</span>
    }
}

const Widget = (props) =>
    <input type="text" onChange={props.update} />


//const App = () => <h1>Hello stateless</h1>

export default App