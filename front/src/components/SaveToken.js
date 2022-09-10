import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function SaveToken() {
    const navigation = useNavigate();
    useEffect(() => {
    fetch("http://localhost:5000/", {
      method: "GET",
      mode: 'cors',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(async r => await r.json())
      .then((res) => {
        if (res === 401) {
          navigation('/login');
        } else {
          console.log(res);
          sessionStorage.setItem('bearer', res);
          navigation('/');
        }
      })
      .catch((err) => console.log(err));
  }, [navigation]);

  return (
    <div>

    </div>
  );
}

export default SaveToken;
