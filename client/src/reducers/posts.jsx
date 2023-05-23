//reducers take current state and action to be performed and return a new state as output
const reducers = (state = {isLoading:true, posts:[] } , action) => {
    switch(action.type) {

        case 'START_LOADING':
            return { ...state, isLoading: true }

        case 'END_LOADING':
            return { ...state, isLoading: false }

        case 'FETCH_ALL' :
            return {
                ...state,
                posts: action.payload.data, //an array of posts fetched from an API
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };

        case 'FETCH_BY_SEARCH':
            return { 
                ...state,
                posts: action.payload.data //an array of posts fetched based on a search query
             };

        case 'FETCH_POST':
            return {
                 ...state, 
                post: action.payload, //a single post fetched by ID
            };
        case 'LIKE':
            return {
                ...state,
                    posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) //the post that was liked/unliked
                };

        case 'CREATE':
            return { 
                ...state, 
                posts: [...state.posts, action.payload] //it spreads the posts array and append new post from action.payload to posts array
            };

        case 'UPDATE':
            return { 
                ...state, 
                posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))  //the post that was updated
            };
    
        
        case 'DELETE':
            return { 
                ...state, 
                posts: state.posts.filter((post) => post._id !== action.payload) //it excludes the post that was deleted.
            };
            
        default:
            return state; //returns the current state
    }
};
export default reducers;    
