import xml2js from 'xml2js';

export const handleResponse = async (res, serviceFunction, params) => {
  try {
    const result = await serviceFunction(...params);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const xmlToJson = async (xml) => {
  const parser = new xml2js.Parser();
  try {
    const json = await parser.parseStringPromise(xml);
    return json;
  } catch (error) {
    throw Error('Error parsing xml');
  }
};

export const jsonToGame = (json) => {
  const result = json.items.item[0];
  const name = result.name[0].$.value;
  const releaseYear = result.yearpublished[0].$.value;
  const description = result.description[0];
  const minPlayers = result.minplayers[0].$.value;
  const maxPlayers = result.maxplayers[0].$.value;
  const imageUrl = result.image[0];

  return {
    name,
    releaseYear,
    description,
    minPlayers,
    maxPlayers,
    imageUrl,
  };
};

export const getDistanceBetweenUsers = (user1, user2) => {
  const lat1 = user1.latitude;
  const lat2 = user2.latitude;
  const lon1 = user1.longitude;
  const lon2 = user2.longitude;

  const deg2Rad = (deg) => deg * (Math.PI / 180);

  const R = 6371;
  const dLat = deg2Rad(lat2 - lat1);
  const dLon = deg2Rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2Rad(lat1)) *
      Math.cos(deg2Rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};
