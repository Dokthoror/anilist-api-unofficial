const dotenv = require('dotenv');

dotenv.config();

const query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
  Viewer {
    name
    about
    avatar {
      large
      medium
    }
    bannerImage
    siteUrl 
  }
}
`;

const variables = {
  id: 15125,
};

const url = 'https://graphql.anilist.co';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.ANILIST_TOKEN}`,
  },
  body: JSON.stringify({
    query,
    variables,
  }),
};

(async () => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      console.log(json.data);
    } else {
      const error = json.errors[0];
      throw new Error(`Response status ${error.status}: ${error.message}`);
    }
  } catch (error) {
    console.log(error.message);
  }
})();
