import { createRequire } from "module";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";
const mySchema = importAsString("./schema/schema.graphql");
const require = createRequire(import.meta.url);
import pkg from "../package.json";

function myStartup(context) {
  context.simpleSchemas.ProductVariant.extend({
    color: {
      type: String,
      optional: true,
    },
    size: {
      type: String,
      optional: true,
    },
  });

  context.simpleSchemas.CatalogProductVariant.extend({
    color: {
      type: String,
      optional: true,
    },
    size: {
      type: String,
      optional: true,
    },
  });
}

function myPublishProductToCatalog(
  catalogProduct,
  { context, product, shop, variants }
) {
  catalogProduct.variants &&
    catalogProduct.variants.map((catalogVariant) => {
      const productVariant = variants.find(
        (variant) => variant._id === catalogVariant.variantId
      );
      catalogVariant.color = productVariant.color || null;
      catalogVariant.size = productVariant.size || null;
    });
}
async function register(app) {
  await app.registerPlugin({
    label: pkg.label,
    name: pkg.name,
    version: pkg.version,
    functionsByType: {
      startup: [myStartup],
      publishProductToCatalog: [myPublishProductToCatalog],
    },
    graphQL: {
      schemas: [mySchema],
    },
  });
}
export default register;
