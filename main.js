const matchContainers = document.querySelector(".all-matches")
const addMatchBtn =  document.querySelector(".lws-addMatch")
const resetMatchBtn =  document.querySelector(".lws-reset")

//Action Identifiers
const INCREMENT = "increment"
const DECREMENT = "decrement"
const RESET = "reset"
const ADD_MATCH = "add"
const DELETE_MATCH = "delete"

//Action Creators

const increment =(payload)=>{
    return {
        type: INCREMENT,
        payload,
    }
}
const decrement =(payload)=>{
    return {
        type: DECREMENT,
        payload,
    }
}
const reset =()=>{
    return {
        type:RESET,
    }
}
const addMatch =()=>{
    return {
        type:ADD_MATCH,
    }
}
const deleteMatch =(mId)=>{
    return {
        type:DELETE_MATCH,
        payload: mId
    }
}

//Initial State 

const initialState = [
    {
        id:1,
        score:0,
    },
]

//Max Id Generator Function
const nextMatchId = (matches)=>{
    const maxId = matches.reduce((maxId,match)=> Math.max(match.id,maxId),-1)
    return maxId +1;
}

//Reducer Function 
function matchReducer(state= initialState ,action){
    if(action.type === INCREMENT){
        
    }
}