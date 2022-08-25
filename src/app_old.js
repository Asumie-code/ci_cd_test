import './App.css';
import {useRef} from 'react'; 
import React,  { Suspense, Profiler, useState, useEffect } from 'react'; // suspense and react import  
import PropTypes from 'prop-types'; 
import ReactDOM from 'react-dom'; 

// Fragments 

class Columns extends React.Component {
  render() {
    // a shorthand syntax of <React.Fragment></React.Fragment> is <></> (this syntax doesn't support keys or attributes unlike the first syntax )
    // key is the only attribute that can be passed to Fragment
    return (
      <React.Fragment>
        <td>hello</td>
        <td>world</td>
      </React.Fragment>


    );
  }
}


class Table extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {value: 0}; 
    this.handleClick = this.handleClick.bind(this); 
  }


  handleClick() {
    this.setState({ value: 1});
  }


  render() {
    return (
      <table onClick={this.handleClick}>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }

}




// import() code splitting 

import('./math.js').then(math => {
  console.log(math.add(2, 4));
});



// React.lazy code split 
// othercomponent is a lazy component, that should be rendered inside a 'Suspense' component 
// Suspense component allows us to show some fallback content while we are waiting for the lazy component to load 
// you import suspense compo from react 
// React.lazy only support default exports 
const OtherComponent = React.lazy(() => import('./component/OtherComponent'));


// context 
// context let us pass a value deep into the component tree without explicitly threading it through every component.


// create a context for the current them (with light as default) 
const ThemeContext = React.createContext('light');
// react doc for more exp on this example 







function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}


class ThemedButton extends React.Component {
  static contextType = ThemeContext; // using expermintal public class fields syntax (this line allows you to consume the nearest current value of  that context)
  render() {
    return <Button Theme={this.context} />;
  }
}
// ThemedButton.contextType = ThemeContext; // normal way of assign contextType (also allows you consume the context )
class Button extends React.Component {
  render() {
    return (<p> {this.props.Theme} button</p>);
  }
}


// Error boundaries 
// to make a class component an error boundary component define either (or both) of the lifecycle methods 'static getDerivedStateFromError()' or 'componentDidCatch()', use the first to render a fallback ui after an error has been thrown and the later to log error info



class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // update state so the next render will show the fallback ui 
    return { hasError: true }

  }


  componentDidCatch(error, errorInfo) {
    // you can also log the error to an error reporting service 
    console.log(error, errorInfo);
  }


  render() {
    if (this.state.hasError) {
      // you can render any custom fallback UI
      return <h1>something went wrong </h1>
    }

    // render the default ui 
    return this.props.children;

  }

  // then you can use it as a regular component 
  // only class compo can be error boundaries 
  // error boundaries only catch errors in the compos below then in the tree 
  // an error boundary can't catch an error within itself 
  // error boundary don't catch errors inside an event handler, use try/catch instead 
}



// refs and the dom (ref stand for reference for a dom node or a react class component)
// creating  refs and accessing it 

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // create ref using React.creatRef 
  }

  // when a ref is passed to an element in render, a reference to the node becomes accessible at the current attribute of the ref 
  componentDidMount() {
    const node = this.myRef.current;
    node.style.color = 'red';
  }


  // attach the ref to React elements via the 'ref' attribute 
  render() {
    return <div ref={this.myRef}><p>some text here</p></div>;
  }
}



// the value of ref differs depending on the type of the node 
// . on an html elem, the ref created in the constructor receives the underlying dom element as its 'current' property 
// . on a custom class compo, the ref object receives the mounted instance of the component as its 'current'
// you may not use the ref attribute on function components because they don't have instances 

// examples 

// . adding ref to a dom element 




class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput dom element 
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // explicitly focus the text input using the raw dom api 
    // note: we're accessing 'current' to ge the dom node 
    this.textInput.current.focus();
  }

  render() {
    // tell react that we want to associate the <input> ref with the 'textInput' that we created in the constructor 
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}


// adding ref to a class compo 

class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props); 
    this.textInput = React.createRef(); 
  }

  componentDidMount() {
    this.textInput.current.focusTextInput(); 

  }
  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}


// refs and fucntion compo
// by default you may not use the ref attribute on function component 
// you can however use the ref attribute inside a function compo  as long as you refer to a class compo or a dom element 


function CustomTextInput2(props) {
  // text input must be declared here so the ref can refer to it 
  const textInput = useRef(null); 

  function handleClick() {
    textInput.current.focus(); 
  }


  return (
    <div>
      <input
        type="text"
        ref={textInput} />      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}



// callback Refs 

class CustomTextInput3 extends React.Component {
  constructor(props) {
    super(props); 

    this.textInput = null; 

    this.setTextInputRef = element => { 
      this.textInput = element; 
    };

    this.focusTextInput = () => {
      // focus the text input using the raw dom api 
      if(this.textInput) this.textInput.focus(); 
    }
  }

  componentDidMount() {
    // autofocus the input on mount 
    this.focusTextInput(); 
  }


  render() {
    // use the 'ref' callback to store a reference to the text input dom 
    // element in an instance field (for ex, this.textInput).
    return (
     <div>
       <input
        type='text'
        ref={this.setTextInputRef}
       />
       <input 
        type='button'
        value={'focus the text input'}
        onClick={this.focusTextInput}
       />

     </div>
    );
  }

}




// forwarding refs 
// forwarding refs to dom components 
// ref forwordign is an opt-in feature that lets some components take a ref they receive, and pass it further down (in other words 'forward' it ) to a child 
// ex 

const FancyButton = React.forwardRef((props, ref) => ( // ref argument only exists when you define a compo with React.forwardRef call
  <button ref={ref} className='fancyButton'>
    {props.children}
  </button>
));


// you can now get a ref directly to the dom button: 
// in this caase ref.current will point to the <button> dom node
const ref  = React.createRef(); 


// forwarding refs  in higher-order components see: https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components



// Higer-order components
// hocs are pattern that emerges from react's compositional nature 
// a higher-order compo is a function that tekes a component and returns a new component 

// const EnhancedComponent = higherOrderComponent(WrappedComponent); 
// use hocs for cross-cutting concerns 
// ex 
// for better example read the doc: https://reactjs.org/docs/higher-order-components.html

function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('currnt props:', this.props); 
      console.log('previous props:', prevProps); 

    }

    render() {
      // wraps the input compo in a container without mutating it. good
      return <WrappedComponent {...this.props} />;
    }
  }
}


const LogTableProps = logProps(Table); 

// higher-order components things to note 
// a HOC composes the original compo by wrapping it in a container 
// a HOC is a pure function with no side-effects 
// you can add as many or as few arguments to hoc function 
// example 
// declare function HOC(WrappedComponent, data, props , (data , props) => {}): Component;
// the contract between HOC and WrappedComponent is entirely props-based, meaning you pass data to wrapped components through hoc component props 
// don'ts and conventions 
// don't mutate the original component, use composition 
// convention: pass unrelated props through to the wrappd component 
// convention: maximize composability 
// caveats 
// don't use hocs inside the render method
// static methods must be copied over 



// my example basic very primitive 

function addDiv(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (<div>
        <p>the next compo is wrapped in div</p>
        <WrappedComponent />
      </div>)
    }
  }
}

const DivTable = addDiv(Table); 

// performance


class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate() { // should component in action 
    return false; 
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}


class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This section is bad style and causes a bug
    // const newwords = this.state.words;
    // newwords.push('marklar');
    // this.setState({words: newwords});

    // solution dont' use array mutating methods like push 
    // this.setState(state => ({
    //   words: state.words.concat(['marklar'])
    // }));

    // or using spread syntax also does not mutate the array 
    this.setState(state => ({
      words: [...state.words, 'marklar']
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}



// portals 
// allows you to render children into dom node that exists outside the dom hierarchy of the parent component 

// ReactDom.createPortal(child, container)
//  child shoudl be any element, string, or fragment, container should always be a DOM element 
// mutiple profiler can be used to measure different parts 
// profilers can also be nested 












// profiler API 
// measures how often a react application render and what the cost of rendering is 
// A Profilerr is a compo that can be added anywhere in react tree to measure cost of rendering that part of the tree requires two props id(string)  onRender(callback)



// Render Props 
// render props refers to technique for sharing code between react components using a prop whose value is a function 
// compoo with a render props takes a function taht returns a react element and calls it instead of implementing its own render logic 

// <DataProvider render={data => (<h1>Hello {data.target}</h1>)}/>
// use render props for cross-cutting concerns 

class Image extends React.Component {
  render (){
    const mouse  = this.props.mouse;
    return (
      <img src='./photo.jpg' style={{position: 'absolute', left: mouse.x, top: mouse.y, width: 50}}/>
    ); 
  }
}



class Mouse extends React.Component {
   constructor(props) {
     super(props); 
     this.handleMouseMove = this.handleMouseMove.bind(this); 
     this.state = {x: 0, y: 0};
   }

   handleMouseMove(event) {
     this.setState({
       x: event.clientX,
       y: event.clientY
     });
   }

   render() {
     return (
       <div style={{ height: '100vh'}} onMouseOver={this.handleMouseMove} >
          {/* 
            instead of providing a static representation of what <Mouse> renders, 
            use the 'render' prop to dynamically determine what to render
          */}
          {this.props.render(this.state)}
       </div>
     );
   }

}


class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1> Move the mouse around </h1>
        <Mouse render={ mouse => (<Image mouse={mouse} />) } />
      </div>
    );
  }
}

// a render prop is a function prop that a component uses to know what to render 
// render props is a pattern you could have other names for this.props.render ex: this.props.somethign


// StrickMode 
// is a tool for highlighting potential problems in an application. like fragment, StrictMode does not render any visible UI, It activates additional checks and warnings for its descendants 
// you can enable strict mode for any part of your app by <React.StrictMode> <Compo/> </React.StrictMode>
// stricts mode helps with 
// identifying components with unsafe lifecycles 
// warning about legazy string ref API usage
// warrning about deprecated findDOMNode usage
// detecting unexpected side effects 
// detecting legacy context API
// detectign unsafe effects 


// typeching with PropTypes 
// react has built-in typechecking abillities 
// first you need to import PropTypes from 'prop-types'

class Greeting extends React.Component {
  render() {
    return (
      <h1>hello, {this.props.name}, {this.props.age}</h1>
    );
  }
}

// this is also aplicable to function component or component created with React.memo or React.forwardRef
Greeting.propTypes = {
  name: PropTypes.string, // this will issue a warning whenever there's a value other than string (optional)
  age: PropTypes.number.isRequired
};

// default prop values 

Greeting.defaultProps = {
  name: 'stranger',
  age: 25
};

// Uncontrolled Components 
// in unc data is not handled by react (component state) instead is handled by the dom itself 
// to write an unc you use a ref to get form values from the dom 
// ex 

class NameForm extends React.Component {
  constructor(props) {
    super(props); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.input = React.createRef(); 
  }

  handleSubmit(event) {
    alert(`A name was submitted: ${this.input.current.value}`); 
    event.preventDefault(); 
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name: 
          <input type='text' ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    ); 
  }


}

// Hooks 
// overview 

// State Hook 

// first you need to import {useState}


function Example() {
  // declare new state variable , which we'll call 'count'
  // you can declare multiple state variables 
  const [count, setCount] = useState(0); 


  // similar to componentDidMount and componentDidUpdate
  useEffect(
    () => {
      // update the document title using  the browser API 
      document.title = `you clicked ${count} times`; 
    }
  );

  return (
    <div>
      <p>HOOk: you clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me 
      </button>
    </div>
  ); 
}


// Effect Hook (basically lifecycles methods hook )
// first you need to import {useEffect}
// see the previous example 

// rules of hooks 
// . only call hooks at the top level. don't call hooks inside loops, conditions, or nested functions
// . only call hooks from react function component. Don't call hooks from  regular javascript functions
// . you can call hooks from your own custom hooks. 


// building your own hooks 
// this method allows you to reuse some stateful logic between components, equivelent to this method in term of react class is higgher-order component and  render props 

// example useFriendStatus is custom hook see https://reactjs.org/docs/hooks-overview.html#building-your-own-hooks
// custom hooks are more like convention, if a component name starts with 'use' and calls other hooks  then it's a custom hooks for example useFriendStatus or useSomething

// other hooks 
// useContext
// useReducer







function App() {
  return (
    <div className="App">
      <Table />
      <Suspense fallback={<div>loading...</div>}>
        <OtherComponent />
      </Suspense>
      <ThemeContext.Provider value='red'>
        <Toolbar />
      </ThemeContext.Provider>
      <ErrorBoundary>
        <Table />
      </ErrorBoundary>
      <MyComponent />
      <CustomTextInput />
      <CustomTextInput2 />
      <CustomTextInput3 />
      <FancyButton ref={ref} >Click me!</FancyButton>
      <LogTableProps />
      {/* profiler for div table  */}
      <Profiler id='divtable' onRender={(id, phase,actualDuration,baseDuration,startTime,commitTime,interactions) => {
          console.log(id);
          console.log(phase); 
          console.log(actualDuration);
          console.log(baseDuration);
          console.log(startTime);
          console.log(commitTime);
      }}>
      <DivTable />
      </Profiler>
      {/* profiler for coutner button  */}
      <Profiler id='coutnerbutton' onRender={(id) => { console.log(id)}}>
      <CounterButton />
      </Profiler>
      {/* strict mode  */}
      <React.StrictMode>
      <MouseTracker />

      </React.StrictMode>
      <NameForm />
      <Greeting  age={2}/>
      <Example />
    </div>
  );
}

export default App;
