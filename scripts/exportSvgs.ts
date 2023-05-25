import { readline, fs } from "../_shared/libs";
import type { Document } from "../_shared/types";
import {
  fetchFileImage,
  fetchFileNodes,
  fetchImageRawSource,
} from "../_shared/apis/figma";

require("dotenv").config();

(async () => {
  try {
    const fileId = await readline.readLineAsync("Enter Figma FILE ID: ");
    const nodeId = await readline.readLineAsync("Enter Figma NODE ID: ");

    // * Fetch all child nodes that belong to the parent node in the file.
    console.info(
      "➡️ Fetching all child nodes that belong to the parent node in the file..."
    );

    const { data: fileNodes } = await fetchFileNodes(fileId, nodeId);

    // * Filter only the COMPONENT type nodes among the child nodes.
    console.info(
      "➡️ Filtering only the COMPONENT type nodes among the child nodes..."
    );

    const simplifiedComponentNodes = (
      fileNodes.nodes[Object.keys(fileNodes.nodes)[0]].document as Document
    ).children
      .filter((child) => child.type === "COMPONENT")
      .map(({ name, id }) => ({
        name,
        id,
      }));

    // * Fetch svg image URLs of the COMPONENT type child nodes.
    console.info(
      "➡️ Fetching svg image URLs of the COMPONENT type child nodes..."
    );

    const componentNodeImages = [];

    for (let { id } of simplifiedComponentNodes) {
      const componentNodeImage = await fetchFileImage(fileId, id);
      componentNodeImages.push(componentNodeImage);

      console.info(
        `✔️ Fetch ${
          Object.keys(componentNodeImage.data.images)[0]
        } node completed!`
      );
    }

    // * Fetch svg image raw source codes of the COMPONENT type child nodes.
    console.info(
      "➡️ Fetching svg image raw source codes of the COMPONENT type child nodes..."
    );

    const svgImages = [];

    for (let { data } of componentNodeImages) {
      const svgImage = await fetchImageRawSource(
        data.images[Object.keys(data.images)[0]]
      );
      svgImages.push(svgImage);

      console.info(
        `✔️ Fetch ${Object.keys(data.images)[0]} svg image completed!`
      );
    }

    // * Create svg image files of the COMPONENT type child nodes.
    console.info(
      "➡️ Creating svg image files of the COMPONENT type child nodes..."
    );
    fs.mkdirSyncRecursive("./assets");

    svgImages.forEach((svgImage, index) => {
      fs.writeFileSyncRecursive(
        `./assets/${simplifiedComponentNodes[index].name}.svg`,
        svgImage.data
      );
    });
  } catch (error) {
    console.error(error);
  } finally {
    readline.close();
  }
})();
