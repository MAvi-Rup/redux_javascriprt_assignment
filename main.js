const matchContainers = document.querySelector(".all-matches")
const addMatchBtn = document.querySelector(".lws-addMatch")
const resetMatchBtn = document.querySelector(".lws-reset")
//const deleteMatchBtn = document.querySelector(".lws-delete")
//Action Identifiers
const INCREMENT = "increment"
const DECREMENT = "decrement"
const RESET = "reset"
const ADD_MATCH = "add"
const DELETE_MATCH = "delete"

//Action Creators

const increment = (payload) => {
    return {
        type: INCREMENT,
        payload,
    }
}
const decrement = (payload) => {
    return {
        type: DECREMENT,
        payload,
    }
}
const reset = () => {
    return {
        type: RESET,
    }
}
const addMatch = () => {
    return {
        type: ADD_MATCH,
    }
}
const deleteMatch = (mId) => {
    return {
        type: DELETE_MATCH,
        payload: mId
    }
}

//Initial State 

const initialState = [
    {
        id: 1,
        score: 0,
    },
]

//Max Id Generator Function
const nextMatchId = (matches) => {
    const maxId = matches.reduce((maxId, match) => Math.max(match.id, maxId), -1)
    return maxId + 1;
}

//Reducer Function 
function matchReducer(state = initialState, action) {
    if (action.type === INCREMENT) {
        const newMatches = state.map((item) => {
            if (item.id === action.payload.id) {
                return { ...item, score: item.score + Number(action.payload.value) }
            } else {
                return item;
            }
        });
        return newMatches;
    } else if (action.type === DECREMENT) {
        const newMatches = state.map((item) => {
            if (item.id === action.payload.id) {
                const newScore = item.score - Number(action.payload.value)
                return {
                    ...item, score: newScore > 0 ? newScore : 0
                }
            } else {
                return item;
            }

        })
        return newMatches;
    } else if (action.type === ADD_MATCH) {
        const id = nextMatchId(state)
        return [...state, { id, score: 0 }]
    } else if (action.type === RESET) {
        const refreshMatch = state.map(item => ({ ...item, score: 0 }));


        return refreshMatch;

    } else if (action.type === DELETE_MATCH) {
        const newMatch = state.filter((item) => item.id != action.payload)
        console.log(newMatch)
        return newMatch;


    }
    else {
        return state;
    }
}

const store = Redux.createStore(matchReducer);

//Increment Handler

const incrementHandler = (id, formEl) => {
    const input = formEl.querySelector(".lws-increment")

    const value = Number(input.value)
    if (value > 0) {
        store.dispatch(increment({ id, value }))
    }
}
const decrementHandler = (id, formEl) => {
    const input = formEl.querySelector(".lws-decrement")

    const value = Number(input.value)
    if (value > 0) {
        store.dispatch(decrement({ id, value }))
    }
}

addMatchBtn.addEventListener('click', () => {
    store.dispatch(addMatch())
    //console.log("Hi")
})

resetMatchBtn.addEventListener('click', () => {
    store.dispatch(reset())
    //console.log("Bye")
})

const handleMatchDelete = (id) => {

    store.dispatch(deleteMatch(id))


}



const render = () => {
    const state = store.getState();
    const matchView = state.map((item) => {
        return `
        <div class="match">
                    <div class="wrapper">
                        <button class="lws-delete" onclick="handleMatchDelete(${item.id})">
                            <img src="./image/delete.svg" alt="" />
                        </button>
                        <h3 class="lws-matchName">Match ${item.id}</h3>
                    </div>
                    <div class="inc-dec">
                        <form class="incrementForm" onsubmit="event.preventDefault(); incrementHandler(${item.id},this)">
                            <h4>Increment</h4>
                            <input
                                type="number"
                                name="increment"
                                class="lws-increment"
                            />
                        </form>
                        <form class="decrementForm" onsubmit="event.preventDefault(); decrementHandler(${item.id},this)">
                            <h4>Decrement</h4>
                            <input
                                type="number"
                                name="decrement"
                                class="lws-decrement"
                            />
                        </form>
                    </div>
                    <div class="numbers">
                        <h2 class="lws-singleResult">${item.score}</h2>
                    </div>
                </div>
        `
    }).join("");
    matchContainers.innerHTML = matchView;
}



render()
store.subscribe(render);