# figma-api-usage-examples

## Usage

**You must create a .env file for the script environment variables and add the following values.**

```text
FIGMA_API_BASE_URL = https://api.figma.com/v1
FIGMA_API_TOKEN = figd_..._
```


### 1. export-svgs

- Exports the svg image files for all child nodes of the 'COMPONENT' type that belong to the parent node.
- The file ID and the parent node ID are required, and the target nodes that you want to download must be set to the 'COMPONENT' type.

```shell
~$ yarn download-images
> Enter Figma FILE ID: ...
> Enter Figma NODE ID: ...
```
