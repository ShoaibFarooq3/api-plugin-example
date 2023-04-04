export default function myStartup(context) {
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
