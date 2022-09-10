import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/Episodes.css";
import checkmark from "../assets/checked.png";
import doubleCheckmark from "../assets/double-checked.png";
import commentLogo from "../assets/chat-box.png";

function Episodes({ message, setMessage }) {
  const navigation = useNavigate();
  const [episodes, setEpisodes] = useState(false);
  const [response, setResponse] = useState(false);
  const { id, url } = useParams();

  useEffect(() => {

    if (
      id !== "undefined" &&
      typeof id !== "undefined" &&
      url !== "undefined" &&
      typeof url !== "undefined"
    ) {
      fetch("http://localhost:5000/episodes?id=" + id, {
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
            setEpisodes(res.shows[0]);
            setMessage(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      navigation("/");
    }
  }, [id, url, navigation, message]);

  const markAsSeen = (id, bulk = true) => {
    fetch("http://localhost:5000/watched?id=" + id + "&bulk=" + bulk, {
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
      {(episodes !== false && typeof episodes !== "undefined") ?(
        <section className="text-gray-400 body-font bg-gray-900">
          <div className="container px-5 py-24 mx-auto">
            {(url !== null &&  url !== "null") && (<img id="episode-banner" src={url} alt="Show banner" />)}
            <div
              id="episode-banner-text"
              // style={{backgroundImage: "url(" + url + ")"}}
              className="flex flex-col text-center w-full mb-20"
            >
              <h2 className="text-xs text-indigo-400 tracking-widest font-medium title-font mb-1">
                EPISODES LIST
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                {episodes.title}
              </h1>
              <h2 className="text-xs text-indigo-400 tracking-widest font-medium title-font mb-1">
                {episodes.remaining} unseen{" "}
                {episodes.remaining >= 2 ? "episodes" : "episode"}
              </h2>
            </div>
            <div className="flex flex-wrap">
              {episodes.unseen &&
                episodes.unseen.map((episode) => {
                  return (
                    <div
                      key={episode.id}
                      className="episode-cards xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800"
                    >
                      <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                        {episode.code + " - " + episode.title}
                      </h2>
                      <p className="leading-relaxed text-base mb-4">
                        {episode.description}
                      </p>
                      <div className="episodes-button-div">
                        <img onClick={() => markAsSeen(episode.id, false)} className="checkmark-btn" src={checkmark} alt="checked mark" title="Mark as seen" />
                        <img onClick={() => markAsSeen(episode.id)} className="checkmark-btn" src={doubleCheckmark} alt="checked mark" title="Mark all as seen until episode" />
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
            {/* <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Button
            </button> */}
          </div>
        </section>
      ) : (
        <h1 id="no-episodes" className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                You've seen them all !
              </h1>
      )}
    </>
  );
}

export default Episodes;
