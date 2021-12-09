import * as core from '@actions/core';
import fs from 'fs';
import util from 'util';
import {get} from 'lodash';

const readFileAsync = util.promisify(fs.readFile);

async function run() {
  const path: string = core.getInput('path');
  const exitOnError: boolean = core.getInput('exit_on_error') === 'true';
  const prop: string = core.getInput('prop_path');
  const prop2: string = core.getInput('prop_path2');
  try {
    const buffer = await readFileAsync(path);
    const json = JSON.parse(buffer.toString());
    const nestedProp = get(json, prop);
    if(prop2 && prop2 !== prop) {
      const nestedProp2 = get(json, prop2);
      if (nestedProp2) {
        core.setOutput('prop2', nestedProp2);
      } else {
        if (exitOnError == true)
          return core.setFailed(new Error('prod2 not found'));

        core.setFailed('');
      }
    }
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
