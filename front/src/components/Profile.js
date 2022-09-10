import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avatar from "../assets/penguin(1).png";
import "../styles/Profile.css";

function Profile({ message, setMessage }) {
  const [profile, setProfile] = useState(false);
  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    const tmpId = id ? "?id=" + id : "";
    fetch("http://localhost:5000/getProfile" + tmpId, {
      method: "GET",
    })
      .then(async (r) => await r.json())
      .then((res) => {
        if (res === 401) {
          navigation("/login");
        } else {
          setProfile(res.member);
          setMessage(false);
        }
      })
      .catch((err) => console.log(err));
  }, [message]);

  const addFriend = () => {
    fetch("http://localhost:5000/acceptInvite?id="+profile.id, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (r) => await r.json())
      .then((res) => {
        alert('Friend request sent to ' + profile.login);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {profile && typeof profile !== "undefined" ? (
        <section class="text-gray-400 bg-gray-900 body-font">
          <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div
              id="profile-avatar"
              class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10"
            >
              <img
                class="object-cover object-center rounded"
                alt="hero"
                src={profile.avatar === null ? avatar : profile.avatar}
              />
            </div>
            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                {profile.login}
              </h1>
              <p class="mb-4 leading-relaxed">
                Country {profile.options.country}
              </p>
              <div id="profile-infos">
              <p class="mb-4 leading-relaxed">
                {profile.stats.friends} {profile.stats.friends > 1 ? ' friends' : ' friend'}
              </p>
              <p class="mb-4 leading-relaxed">
                {profile.stats.badges} {profile.stats.badges > 1 ? ' badges' : ' badge'}
              </p>
              </div>
              <div id="profile-stats">
              <p class="mb-4 leading-relaxed">
                {profile.stats.shows} {profile.stats.shows > 1 ? ' shows' : ' show'}
              </p>
              <p class="mb-4 leading-relaxed">
                {profile.stats.seasons} {profile.stats.seasons > 1 ? ' seasons' : ' season'}
              </p>
              <p class="mb-4 leading-relaxed">
                {profile.stats.episodes} {profile.stats.episodes > 1 ? ' episodes' : ' episode'}
              </p>
              <p class="mb-4 leading-relaxed">
                {profile.stats.comments} {profile.stats.comments > 1 ? ' comments' : ' comment'}
              </p>
              </div>
              <div class="flex justify-center">
                <button onClick={() => addFriend()} class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Add friend
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1
          id="no-user-found"
          className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white"
        >
          No user profile found !
        </h1>
      )}
    </>
  );
}

export default Profile;
