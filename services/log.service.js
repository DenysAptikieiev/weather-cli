import chalk from "chalk";
import dedent from "dedent-js";
import moment from "moment";

export const printError = (err) => {
  console.log(`${chalk.bgRed("Error")} ${err}`);
};

export const printSuccess = (message) => {
  console.log(`${chalk.bgGreen("Success")} ${message}`);
};

export const printHelp = () => {
  console.log(
    dedent`
		${chalk.bgCyan("Help")}
		Without params - weather enteryes
		-s [CITY] to set the city
		-h [HELP] to set the help
		-t [API_TOKEN] to save the token
		`
  );
};

export const printWeather = (
  cityName,
  main,
  wind,
  visibility,
  sys,
  weather
) => {
  const { temp, feels_like } = main;
  const { speed } = wind;
  const { sunrise, sunset } = sys;
  const { main: mainWeather, description} = weather[0];

  const sunriseTime = moment.unix(sunrise).format("HH:mm:ss");
  const sunsetTime = moment.unix(sunset).format("HH:mm:ss");

  console.log(
    dedent`
	${chalk.bgCyan("City")}: ${chalk.green(cityName)}
	${chalk.bgCyan("Visibility")}: ${chalk.green(visibility, "m")}
	${chalk.bgCyan("Temp")}: ${chalk.green(temp, "С°")}
	${chalk.bgCyan("Feels like")}: ${chalk.green(feels_like, "C°")}
	${chalk.bgCyan("Speed")}: ${chalk.green(speed, "km/h")} 
	${chalk.bgCyan("Sunrise")}: ${chalk.green(sunriseTime)} 
	${chalk.bgCyan("Sunset")}: ${chalk.green(sunsetTime)}
	${chalk.bgCyan("Sky")}: ${chalk.bgCyan(mainWeather)}
	${chalk.bgCyan("Sky view")}: ${chalk.bgCyan(description)}
		`
  );
};
