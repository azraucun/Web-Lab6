import { useReducer, useEffect, useState } from "react";
import { fetchPosts } from "./api/postsApi";
import { postsReducer, initialState } from "./reducer/postsReducer";
import PostList from "./components/PostList";
import FilterForm from "./components/FilterForm";

function App() {
  // state: posts, loading, error ,dispatch: reducer'a işlem gönderen fonksiyon
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const [filter, setFilter] = useState("");

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
  }, []); // sadece ilk açılışta bir kez çalış

  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  let content;

  if (state.loading) {
    content = <p>Loading posts...</p>;
  } else if (state.error) {
    content = <p>Error: {state.error}</p>;
  } else if (filteredPosts.length === 0) {
    content = <p>No posts found.</p>;
  } else {
    content = <PostList posts={filteredPosts} />; // filtrelenmiş postları listele
  }

  return (
    <div>
      <h1>Post Dashboard</h1>
      <FilterForm value={filter} onFilterChange={setFilter} />
      {content}
    </div>
  );
}

export default App;