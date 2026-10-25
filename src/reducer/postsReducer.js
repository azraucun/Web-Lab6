export const initialState = {
  posts: [],      // henüz post yok
  loading: false, // şu an yüklenmiyor
  error: null,    // hata yok
};

export function postsReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, posts: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      // Tanınmayan işlem: state'i olduğu gibi bırak
      return state;
  }
}