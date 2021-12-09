
# github-action-json-property

Get a specified property of a json file.

## Usage

Use the action inside your workflow yaml file like this:
https://lodash.com/docs/4.17.15#get

```yaml
...
- name: get version
    id: version
    uses: kekedaine/github-action-json-property-by-lodash@0.1.5
    with:
        path: 'package.json'
        prop_path: 'keywords[0]' # version| scripts.build
- run: echo ${{steps.version.outputs.prop}}
...

```
