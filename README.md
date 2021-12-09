
# github-action-json-property

Get a specified property of a json file.

## Usage

Use the action inside your workflow yaml file like this:
https://lodash.com/docs/4.17.15#get

```yaml
...
- name: get version
    id: version
    uses: kekedaine/github-action-json-property-by-lodash@0.2.0
    with:
        path: 'package.json'
        prop_path: 'keywords[0]' # version | scripts.build
        prop_path2: 'version' # version | scripts.build
- run: echo ${{steps.version.outputs.prop}}
...

```
