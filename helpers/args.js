import yargs from "yargs";
import {hideBin} from 'yargs/helpers'

export const getArgs = (args) => yargs(hideBin(process.argv)).argv;
