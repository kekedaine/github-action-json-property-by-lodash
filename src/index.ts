import * as core from '@actions/core';
import fs from 'fs';
import util from 'util';
import {get} from 'lodash';

const readFileAsync = util.promisify(fs.readFile);

async function run() {
  const path: string = core.getInput('path');
  const exitOnError: boolean = core.getInput('exit_on_error') === 'true';
  const prop: string = core.getInput('prop_path');
  try {
    const buffer = await readFileAsync(path);
    const json = JSON.parse(buffer.toString());
    const nestedProp = get(json, prop);
    if (nestedProp) {
      core.setOutput('prop', nestedProp);
    } else {
      if (exitOnError == true)
        return core.setFailed(new Error('prod not found'));

      core.setFailed('');
    }
  } catch (error: any) {
    if (exitOnError == true) return core.setFailed(error.message);

    core.setFailed('');
  }
}

run();
