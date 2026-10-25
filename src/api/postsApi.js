// signal: isteği iptal edebilmek için (App.jsx'ten gelecek)
export async function fetchPosts(signal) {
  // Sunucudan postları iste, cevap gelene kadar bekle
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  // Gelen cevabı JavaScript listesine çevir ve döndür
  const data = await response.json();
  return data;
}