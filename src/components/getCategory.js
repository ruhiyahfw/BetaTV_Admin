import axios from "axios";

export function getCategory(token) {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/Category`, config)
      .then((res) => resolve(res.data.data.categories))
      .catch((err) => reject(err));
  });
}
