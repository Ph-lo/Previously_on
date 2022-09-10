import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home({ setIsCo, message, setMessage }) {
  const navigation = useNavigate();
  const [news, setNews] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/", {
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
          setIsCo(true);
          setNews(res.shows);
          setMessage(false);
        }
      })
      .catch((err) => console.log(err));
  }, [setIsCo, navigation, message]);

  const displayGenres = (object) => {
    const array = Object.values(object);
    return array.map((elem, i) => {
      if (i + 1 === array.length) {
        return <span key={elem}>{elem} </span>;
      } else {
        return <span key={elem}>{elem}, </span>;
      }
    });
  };

  const goToShow = (id) => {
    navigation(`/details/${id}`);
  };

  const handleAdd = (id) => {
    console.log(id)
    fetch("http://localhost:5000/addShow?id=" + id, {
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
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
      <h1 id="home-title" className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Discover the latest popular shows</h1>
        <div className="flex flex-wrap -m-4">
          {news && news.map((elem) => {
            return (
              <div key={elem.id} className="p-4 lg:w-1/2">
                <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                  <img
                    onClick={() => goToShow(elem.id)}
                    alt="team"
                    className="pointer lex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                    src={elem.images.poster}
                  />
                  <div className="flex-grow sm:pl-8">
                    <h2 onClick={() => goToShow(elem.id)} className="pointer title-font font-medium text-lg text-white">
                      {elem.title}
                    </h2>
                    <h3 className="text-gray-500 mb-3">
                      {displayGenres(elem.genres)}
                    </h3>
                    <h3 className="text-gray-500 mb-3">
                      {elem.episodes} episodes
                    </h3>
                    <p className="mb-4 show-descriptions">{elem.description}</p>
                    <span className="inline-flex">
                      <button onClick={() => handleAdd(elem.id)} title="Add to favorites" className="ml-2 text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          class="w-5 h-5 add-favorite"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Home;
