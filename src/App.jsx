import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/postSlice";
import Spinner from "./components/Spinner";

function App() {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  const fruits = ["mango", "mango", "mango", "mango", "mango", "mango"];

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isError) {
    console.log(message);
  }
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <p>All posts</p>
      <div className="grid gap-3 grid-cols-3">
        {posts.map((a) => (
          <div className="">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
