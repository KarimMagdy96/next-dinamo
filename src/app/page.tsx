import HomeClient from "./Components/HomeClient";
import { Post } from "./types/types";

// Fetch posts on the server
export default async function HomePage() {
  let posts: Post[] = [];

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store", // Ensures fresh data is fetched on each request
    });
    if (!res.ok) throw new Error("Failed to fetch posts");
    posts = await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="p-4 container w-11/12 m-auto">
      <HomeClient initialPosts={posts} />
    </div>
  );
}
