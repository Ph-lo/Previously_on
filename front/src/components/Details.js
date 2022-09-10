import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import "../styles/Details.css";

function Details() {
  const navigation = useNavigate();
  const [details, setDetails] = useState(false);
  const [archived, setArchived] = useState();
  const [message, setMessage] = useState(false);
  const { id } = useParams();

  
  useEffect(() => {
    
    if (id !== "undefined" && typeof id !== "undefined") {

    fetch("http://localhost:5000/showDetails?id=" + id, {
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
          setDetails(res.show);
        }
      })
      .catch((err) => console.log(err));
    } else {
        navigation("/");
    }
  }, [id, navigation, message]);

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

  const displayPlatforms = (object) => {
    const array = Object.values(object);
    return array.map((elem, i) => {
      if (i + 1 === array.length) {
        return <span key={i}>{elem.name} </span>;
      } else {
        return <span key={i}>{elem.name}, </span>;
      }
    });
  };

  function toggleArchive() {
    setArchived(current => !current);
  }

  const handleButtons = (url, id) => {
    if (url !== "http://localhost:5000/addShow?id=") {
      toggleArchive();
    } 
    fetch(url + id, {
      method: "GET",
      mode: "cors"
    })
      .then(async (r) => await r.json())
      .then((res) => {
        if (res === 401) {
          navigation("/login");
        } else {
          if (url === "http://localhost:5000/addShow?id=") {
            setMessage(res);
          }
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
    {details && (
        <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                <img className="object-cover object-center rounded" alt="show poster" src={details.images.poster} />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">{details.title}</h1>
                    <p className="mb-8 leading-relaxed">{displayGenres(details.genres)}</p>
                <div id="details-card-head">
                    <p className="mb-8 leading-relaxed">{details.seasons} {details.seasons >= 2 ? 'seasons' : 'season'}</p>
                    <p className="mb-8 leading-relaxed">{details.episodes} {details.episodes >= 2 ? 'episodes' : 'episode'}</p>
                </div>
                <p className="mb-8 leading-relaxed p-head">Runtime : {details.length} mins</p>
                <div id="rating-div">
                    <StarRatings starRatedColor="#ebcb4a" rating={details.notes.mean} starDimension="30px" starSpacing="2px"/* Available Props */ />
                </div>
                <p className="mb-8 leading-relaxed">{details.platforms !== null && details.platforms.svods.length >= 2 ? 'Platforms : ' : 'Platform : '}{details.platforms !== null && displayPlatforms(details.platforms.svods)}</p>
                <p className="mb-8 leading-relaxed p-head">Showrunner : {details.showrunner !== null && details.showrunner.name}</p>
                <p className="mb-8 leading-relaxed">{details.description}</p>
                <div className="flex justify-center">
                {details.user.remaining > 0 ? <Link id="episodes-link" to={`/episodes/${details.id}/${encodeURIComponent(details.images.banner)}`}>Episodes list</Link> : <button onClick={() => handleButtons("http://localhost:5000/addShow?id=", details.id)} className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Add to my shows</button>}

                    
                    <button onClick={() => archived ? handleButtons("http://localhost:5000/unarchiveShow?id=", details.id) : handleButtons("http://localhost:5000/archiveShow?id=", details.id)} className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">{archived ? 'Unarchive' : 'Archive'}</button>
                </div>
                </div>
            </div>
        </section>
    )}
    </>
  );
}

export default Details;
