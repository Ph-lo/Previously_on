import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../styles/Details.css";
import avatar from "../assets/penguin(1).png";

function Episode({ message, setMessage }) {
  const navigation = useNavigate();
  const [details, setDetails] = useState(false);
  const [archived, setArchived] = useState();
  const [comments, setComments] = useState(false);
  const [comText, setComText] = useState("");
//   const [message, setMessage] = useState(false);
  const { id, url } = useParams();

  useEffect(() => {

    if (id !== "undefined" && typeof id !== "undefined") {
      fetch("http://localhost:5000/episodeDetails?id=" + id, {
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
            setDetails(res.episode);
            setMessage(false);
          }
        })
        .catch((err) => console.log(err));

      fetch("http://localhost:5000/comments?id=" + id, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(async (r) => await r.json())
        .then((res) => {
          setComText("");
          setComments(res.comments);
        })
        .catch((err) => console.log(err));
    } else {
      navigation("/");
    }
  }, [id, navigation, message]);

  const clearInput = () => {
    setComText("");
  };

  const postComment = (id) => {
      clearInput();
      if (comText !== "") {
        fetch("http://localhost:5000/postComments", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            text: comText
        })
      })
        .then(async (r) => await r.json())
        .then((res) => {
            setMessage("Comment posted !");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      {details && (
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
              <img
                className="object-cover object-center rounded"
                alt={details.resource_url}
                src={url}
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                {details.title}
              </h1>
              {/* <p className="mb-8 leading-relaxed">{displayGenres(details.genres)}</p> */}
              <div id="details-card-head">
                <p className="mb-8 leading-relaxed">
                  Season {details.season} episode {details.episode}
                </p>
              </div>
              <p className="mb-8 leading-relaxed">Date : {details.date}</p>
              {/* <p className="mb-8 leading-relaxed p-head">Runtime : {details.length} mins</p> */}
              <div id="rating-div">
                <StarRatings
                  starRatedColor="#ebcb4a"
                  rating={details.note.mean}
                  starDimension="30px"
                  starSpacing="2px" /* Available Props */
                />
              </div>
              {/* <p className="mb-8 leading-relaxed">{details.platforms !== null && details.platforms.svods.length >= 2 ? 'Platforms : ' : 'Platform : '}{details.platforms !== null && displayPlatforms(details.platforms.svods)}</p> */}
              {/* <p className="mb-8 leading-relaxed p-head">Showrunner : {details.showrunner !== null && details.showrunner.name}</p> */}
              <p className="mb-8 leading-relaxed">{details.description}</p>
              <div className="flex justify-center">
                {/* {details.user.remaining > 0 ? <Link id="episodes-link" to={`/episodes/${details.id}/${encodeURIComponent(details.images.banner)}`}>Episodes list</Link> : <button onClick={() => handleButtons("http://localhost:5000/addShow?id=", details.id)} className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Add to my shows</button>} */}

                {/* <button onClick={() => archived ? handleButtons("http://localhost:5000/unarchiveShow?id=", details.id) : handleButtons("http://localhost:5000/archiveShow?id=", details.id)} className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">{archived ? 'Unarchive' : 'Archive'}</button> */}
              </div>
            </div>
          </div>
          
          <div id="comment-container">
            <div id="comments">
              {(comments && typeof comments !== "undefined" && comments.length > 0) ? (
                comments.map((comment) => {
                  return (
                    <div key={comment.id} className="container-comments">
                      <div className="flex flex-wrap -mx-4 -my-8">
                        <div className="py-8 px-4 ">
                          <div className="h-full flex items-start">
                            <img
                              alt="blog"
                              src={
                                comment.avatar === null
                                  ? avatar
                                  : comment.avatar
                              }
                              className="w-20 h-20 rounded-full flex-shrink-0 object-cover object-center"
                            />

                            <div className="flex-grow pl-6">
                              <Link to={"/profile/"+comment.user_id} className="title-font text-xl font-medium text-white mb-3">
                                {comment.login}
                              </Link>
                              <p className="leading-relaxed mb-5">
                                {comment.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1>Be the first to comment this episode</h1>
              )}
            </div>
            <div id="comment-form-container">
              <div class="container  flex">
                <div id="form-card" class="bg-gray-900  rounded-lg p-8 flex flex-col  relative z-10">
                  <h2 class="text-white text-lg mb-1 font-medium title-font">
                    Leave a comment
                  </h2>
                  <p class="leading-relaxed mb-5">
                    Let others know what you thought of this episode
                  </p>
                  <div class="relative mb-4">
                    <label
                      for="message"
                      class="leading-7 text-sm text-gray-400"
                    >
                      Message
                    </label>
                    <textarea
                      onChange={(e) => setComText(e.target.value)}
                      id="message"
                      name="message"
                      value={comText}
                      class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                  <button onClick={() => postComment(details.id)} class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Send
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Episode;
