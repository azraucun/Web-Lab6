import { useReducer, useEffect } from "react";
import { fetchPosts } from "./api/postsApi";
import { postsReducer, initialState } from "./reducer/postsReducer";

function App() {
  // state: posts, loading, error   dispatch: reducer'a işlem gönderen fonksiyon
  const [state, dispatch] = useReducer(postsReducer, initialState);

  // Sayfa ilk açıldığında postları çek
  useEffect(() => {
    // İsteği iptal edebilmek için kumanda
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: "FETCH_START" }); // yükleme başladı

      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: data }); // veri geldi
      } catch (error) {
        // İsteği biz iptal ettiysek bu bir hata değil, görmezden gel
        if (error.name === "AbortError") return;
        dispatch({ type: "FETCH_ERROR", payload: error.message }); // hata oldu
      }
    }

    loadPosts();

    // Cleanup: component kapanırsa devam eden isteği iptal et
    return () => controller.abort();
  }, []); //sadece ilk açılışta bir kez çalış

  // Duruma göre ekranda ne gösterileceğine karar ver
  let content;

  if (state.loading) {
    content = <p>Loading posts...</p>;
  } else if (state.error) {
    content = <p>Error: {state.error}</p>;
  } else if (state.posts.length === 0) {
    content = <p>No posts found.</p>;
  } else {
    content = <p>Posts loaded: {state.posts.length}</p>; 
  }

  return (
    <div>
      <h1>Post Dashboard</h1>
      {content}
    </div>
  );
}

export default App;