import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/penguin(1).png";
import checkmark from "../assets/checked.png";
import "../styles/Friends.css";

function Friends({ message, setMessage }) {
  const [friends, setFriends] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [invites, setInvites] = useState(false);
  const [tab, setTab] = useState(true);

  const navigation = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/getFriends", {
      method: "GET",
    })
      .then(async (r) => await r.json())
      .then((res) => {
        if (res === 401) {
          navigation("/login");
        } else {
          setFriends(res.users);
          setMessage(false);
        }
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/getBlocked", {
      method: "GET",
    })
      .then(async (r) => await r.json())
      .then((res) => {
        setBlocked(res.users);
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/getInvites", {
      method: "GET",
    })
      .then(async (r) => await r.json())
      .then((res) => {
        setInvites(res.users);
      })
      .catch((err) => console.log(err));
  }, [message, tab]);

  const tabToggle = () => {
    setTab((current) => !current);
  };

  const blockFriend = (id) => {
    fetch("http://localhost:5000/blockFriend?id="+id, {
      method: "GET",
      mode: "cors"
    })
      .then(async (r) => await r.json())
      .then((res) => {
        setMessage(res);
      })
      .catch((err) => console.log(err));
  };

  const unblockFriend = (id) => {
    fetch("http://localhost:5000/unblockFriend?id="+id, {
      method: "GET",
      mode: "cors"
    })
      .then(async (r) => await r.json())
      .then((res) => {
        setMessage(res);
      })
      .catch((err) => console.log(err));
  };

  const unfriend = (id) => {
    fetch("http://localhost:5000/unfriend?id="+id, {
      method: "GET",
      mode: "cors"
    })
      .then(async (r) => await r.json())
      .then((res) => {
        setMessage(res);
        alert(res.member.login + " has been removed from friends !");
      })
      .catch((err) => console.log(err));
  };

  const acceptInvite = (id) => {
    fetch("http://localhost:5000/acceptInvite?id="+id, {
      method: "GET",
      mode: "cors"
    })
      .then(async (r) => await r.json())
      .then((res) => {
        setMessage(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div id="invitation-reveived" class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border border-gray-700 border-opacity-75 p-6 rounded-lg">
          <h2 class="text-lg text-white font-medium title-font mb-2">
            Received invitations
          </h2>
          {invites && invites.length !== 0 ? (
            <>
              {invites.map((invite) => {
                return (
                  <div className="invites-div">
                    <p key={invite.id} class="leading-relaxed text-base">
                      {invite.login}
                    </p>
                    <img className="requests-img-btn" onClick={() => acceptInvite(invite.id)} src={checkmark} alt="check mark" />
                  </div>
                );
              })}
            </>
          ) : (
            <p class="leading-relaxed text-base">No invitation received</p>
          )}
        </div>
      </div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Friends
          </h1>
          <p
            onClick={() => tabToggle()}
            id="blocked-friend-link"
            className="hover:text-white hover:underline"
          >
            {tab ? "See blocked friends" : "See friends"}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2 arrow-friends"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </p>
        </div>
        <div></div>
        {tab ? (
          <>
            {friends && friends.length !== 0 ? (
              <div className="flex flex-wrap -m-2">
                {friends.map((friend) => {
                  return (
                    <div
                      key={friend.id}
                      className="p-2 lg:w-1/3 md:w-1/2 w-full"
                    >
                      <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                        <img
                          alt="team"
                          className="w-12 h-12 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                          src={avatar}
                        />
                        <div className="flex-grow">
                          <h2 className="text-white title-font font-medium">
                            {friend.login}
                          </h2>
                          <div className="flex container-friends">
                            <p onClick={() => blockFriend(friend.id)} className="hover:underline text-gray-600">block</p>
                            <p onClick={() => unfriend(friend.id)} className="hover:underline text-gray-600">unfriend</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h2
                id="no-friend-title"
                className="title-font font-medium text-lg text-white"
              >
                You have no friend on the platform yet.
              </h2>
            )}
          </>
        ) : (
          <>
            {blocked && blocked.length !== 0 ? (
              <div className="flex flex-wrap -m-2">
                {blocked.map((friend) => {
                  return (
                    <div
                      key={friend.id}
                      className="p-2 lg:w-1/3 md:w-1/2 w-full"
                    >
                      <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                        <img
                          alt="team"
                          className="w-12 h-12 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                          src={avatar}
                        />
                        <div className="flex-grow">
                          <h2 className="text-white title-font font-medium">
                            {friend.login}
                          </h2>
                          <div className="flex container-friends">
                            <p onClick={() => unblockFriend(friend.id)} className="hover:underline text-gray-600">unblock</p>
                            <p onClick={() => unfriend(friend.id)} className="hover:underline text-gray-600">unfriend</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h2
                id="no-friend-title"
                className="title-font font-medium text-lg text-white"
              >
                You have no blocked friend.
              </h2>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Friends;
