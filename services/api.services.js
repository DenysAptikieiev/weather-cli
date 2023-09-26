import axios from "axios";

import { TOKEN_DICTIONARY, getKey } from "./storage.service.js";

const getGeocoding = async (city, token) => {
  try {
    return await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
      params: {
        q: city,
        appid: token,
      },
    });
  } catch (e) {
    return e;
  }
};

const getWeather = async (city) => {
  const token = await getKey(TOKEN_DICTIONARY.token);
  city = (await getKey(TOKEN_DICTIONARY.city)) || "";
  if (!token) {
    throw new Error("Don't have api key, use the command -t [API_KEY]");
    return;
  }

  if (!city) {
    throw new Error("Don't have city, use the command -s [CITY]");
  }

  return getGeocoding(city, token)
    .then(async (res) => {
      const { data: geoData } = res;
      if (geoData) {
        if (!!geoData[0]?.lat && !!geoData[0]?.lon) {
          const res = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
              params: {
                q: city,
                appid: token,
                lang: "ru",
                units: "metric",
                lat: geoData[0]?.lat,
                lon: geoData[0]?.lon,
              },
            }
          );
          return await res.data;
        } else {
          throw new Error("City hasn't been find");
        }
      }
    })
    .catch((e) => {
      return e;
    });
};

export { getWeather };
