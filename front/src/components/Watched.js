import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import StarRatings from 'react-star-ratings';
import "../styles/Episodes.css";
import checkmark from "../assets/checked.png";
import doubleCheckmark from "../assets/double-checked.png";
import commentLogo from "../assets/chat-box.png";

function Watched({ message, setMessage }) {
  const navigation = useNavigate();
  const [episodes, setEpisodes] = useState(false);


  useEffect(() => {
      fetch("http://localhost:5000/unrated", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(async (r) => await r.json())
        .then((res) => {
          if (res === 401) {
            navigation("/login");
          } else {
            setEpisodes(res.episodes);
            setMessage(false);
          }
        })
        .catch((err) => console.log(err));
  }, [navigation, message]);

  const markAsNotSeen = (id, bulk = true) => {
    fetch("http://localhost:5000/unmarkWatched?id=" + id, {
      method: "GET",
      mode: "cors"
    })
      .then(async (r) => await r.json())
      .then((res) => {
        setMessage(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {(episodes !== false && typeof episodes !== "undefined" && episodes.length > 0) ?(
        <section className="text-gray-400 body-font bg-gray-900">
          <div className="container px-5 py-24 mx-auto">
          <h1 id="home-title" className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Watched episodes</h1>
            
            <div className="flex flex-wrap">
              { episodes.map((episode) => {
                  return (
                    <div
                      key={episode.id}
                      className="episode-cards xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800"
                    >
                      <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                        {episode.show.title}
                      </h2>
                      <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                        {episode.code + " - " + episode.title}
                      </h2>
                      <p className="leading-relaxed text-base mb-4">
                        {episode.description}
                      </p>
                      <div className="episodes-button-div">
                        <button onClick={() => markAsNotSeen(episode.id)} className="unwatche-btn" title="Mark as not seen"></button>
                        <Link
                          to={`/episode/${episode.id}/${encodeURIComponent(episode.show.poster)}`}
                          className="text-indigo-400 inline-flex items-center"
                        >
                          Details
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      ) : (
        <h1 id="no-episodes" className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            You haven't watched any episode yet !
        </h1>
      )}
    </>
  );
}

export default Watched;
