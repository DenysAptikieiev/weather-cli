#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.services.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import { TOKEN_DICTIONARY, saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (typeof token === "boolean") {
    printError(`Token has'n been gave`);
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token has been saved!");
  } catch (e) {
    printError(`Token has'n been saved: ${e}`);
  }
};

const saveCity = async (city) => {
  if (typeof city === "boolean") {
    printError(`City has'n been gave`);
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("City has been saved!");
  } catch (e) {
    printError(`City has'n been saved: ${e}`);
  }
};

const getForcast = async (city) => {
  try {
    const weather = await getWeather(city);
    if (weather?.cod !== 200) {
      return printError("City hasn't been find");
    }
    // console.log("weather: ", weather);
    const { name, main, wind, visibility, sys, weather: mainWeather } = weather;
    printWeather(name, main, wind, visibility, sys, mainWeather);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("City has been wrong");
    } else if (e?.response?.status == 401) {
      printError("Token has been wrong");
    } else {
      printError(e?.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    saveCity(args.s);
    return getForcast(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForcast(args.s);
};

initCLI();
