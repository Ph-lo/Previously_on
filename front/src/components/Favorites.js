// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Favorites.css";

function Favorites({ message, setMessage }) {
  const navigation = useNavigate();
  const [favorites, setFavorites] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/favorites", {
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
          setFavorites(res.shows);
          setMessage(false);
        }
      })
      .catch((err) => console.log(err));
  }, [navigation, message]);

  const removeFavorite = (id) => {
    fetch("http://localhost:5000/removeShow?id=" + id, {
      method: "GET",
      mode: "cors"
    })
      .then(async (r) => await r.json())
      .then((res) => {
        if (res === 401) {
          navigation("/login");
        } else {
          setMessage(res);
        }
      })
      .catch((err) => console.log(err));
  }

  const goToShow = (id) => {
    navigation(`/details/${id}`);
  };

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

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
      <h1 id="home-title" className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Your shows</h1>
      <Link class="watched-episode-link hover:text-white" to="/watched">Watched episodes</Link> 
        <div className="flex flex-wrap -m-4">
          {favorites &&
            favorites.map((elem) => {
              return (
                <div
                  key={elem.id}
                  className="p-4 lg:w-1/2"
                >
                  <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                    <img
                      onClick={() => goToShow(elem.id)}
                      alt={`${elem.title} poster`}
                      className="pointer lex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                      src={elem.images.poster}
                    />
                    <div className="flex-grow sm:pl-8 remove-favorite-container">
                      <button
                        onClick={() => removeFavorite(elem.id)}
                        id="remove-favorite-btn"
                        title="Remove from favorites"
                      >
                        <span>x</span>
                      </button>

                      <h2 onClick={() => goToShow(elem.id)} className="pointer title-font font-medium text-lg text-white">
                        {elem.title}
                      </h2>
                      <h3 className="text-gray-500 mb-3">
                        {displayGenres(elem.genres)}
                      </h3>
                      <h3 className="text-gray-500 mb-3">
                        {elem.episodes} episodes
                      </h3>
                      <p className="mb-4 show-descriptions">
                        {elem.description}
                      </p>
                      {/* <p className="show-descriptions-dots">...</p> */}
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

export default Favorites;
