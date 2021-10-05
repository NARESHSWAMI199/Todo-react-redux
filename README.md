## App.js


```
import React from 'react';
import Todo from './components/Todo';

function App() {
  return (
    <Todo/>
  );
}

export default App;

```

## Todo.js    
* The main view of project


```
import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {AddTodo,RemoveTodo,DeleteTodo} from "../actions/index"

function Todo() {

    
    const [inputData, setInputData] = useState('')
    const list = useSelector((state)=> state.todoReducer.list );
    const dispatch = useDispatch();
    return (
        <>
            <div className="container mt-5">
                <div className="col-6 offset-3 shadow-sm mt-5 p-5 text-center">
                    <figure>
                        <figcaption className='mt-5'>
                            Add your list here ✌
                        </figcaption>
                    </figure>
                    <div className="addItems">
                        <input className="form-control" type="text" 
                         placeholder="✍ Add items" 

                         value={inputData}
                            onChange={(event) => setInputData(event.target.value) }
                         />
                        <button type="button" className="btn btn-secondary mt-2 w-100" onClick={()=> dispatch(AddTodo(inputData) , setInputData(''))} > Add </button>

                        <div className="mt-5 p-3 shadow-sm  rounded">
                            { list.map((elem) =>{
                                return  <p className="border border-1" key={elem.key}> {elem.data} <i className="fa d-flex justify-content-end mx-2 my-2 fa-trash" onClick={()=>dispatch(DeleteTodo(elem.id))}> </i> </p> 
                            })}

                        { list.length !==0 &&    
                        <button type="button" className="btn btn-secondary mt-2 w-100" onClick={()=> dispatch(RemoveTodo())} >Remove All</button>
                        }
                        </div>
                     

                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;

```

## reducer/redcer.js
* logic here

```


const initialState = {
    list : []
}

const todoReducer = (state=initialState, action) =>{
    switch (action.type) {
        case "ADD_TODO":
            const {id ,data} = action.payload;
            return {
                ...state , 
                list : [
                    ...state.list,
                    {
                        id : id,
                        data : data
                    }
                ]
            }

            case "REMOVE_TODO":
                return {
                    list : []
                }

            case "DELETE_TODO":

                const newList = state.list.filter( (elem) => elem.id !== action.id )
                return {
                    ...state , 
                    list : newList
                    
                }


            default :return state;
    }
}


export default todoReducer;
```

## reducer/index.js


```

import todoReducer from "./reducer";
import { combineReducers } from "redux";


const rootReducer =  combineReducers(
    {
        todoReducer
    }
)
export default rootReducer;
```

## store.js

```



import { createStore } from "redux";
import rootReducer from "./reducer";


const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;

```


## index.js



```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


```


