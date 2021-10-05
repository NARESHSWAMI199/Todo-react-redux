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