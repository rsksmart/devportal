/**
 * Wraps the plugin's default MDX generator and adjusts the output for the
 * JSON-RPC method pages: uses operationId as the H1 and sidebar/title, shows
 * the summary as a subtitle, removes the "Request" heading, and passes the
 * method's positional-parameter names into RequestSchema.
 */
const { createApiPageMD } = require("docusaurus-plugin-openapi-docs/lib/markdown");

function customCreateApiPageMD(item) {
  let md = createApiPageMD(item);
  const api = item.api ?? {};
  const opId = api.operationId ?? item.title;
  const summary = api.summary ?? item.title ?? "";

  md = md.replace(/^sidebar_label: .*$/m, `sidebar_label: ${JSON.stringify(opId)}`);
  md = md.replace(/^title: .*$/m, `title: ${JSON.stringify(opId)}`);

  md = md.replace(
    /(<Heading[\s\S]{0,120}?as=\{"h1"\}[\s\S]{0,120}?children=\{)"(?:[^"\\]|\\.)*"(\})/,
    (_, pre, post) => `${pre}${JSON.stringify(opId)}${post}`
  );

  if (summary && summary !== opId) {
    md = md.replace(
      "</Heading>",
      `</Heading>\n\n<p className={"openapi__method-summary"}>{${JSON.stringify(summary)}}</p>`
    );
  }

  md = md.replace(/<Heading\s+id=\{"request"\}[\s\S]*?<\/Heading>\s*/, "");

  const xjp = api["x-jsonrpc-params"];
  if (xjp) {
    md = md.replace(
      "<RequestSchema",
      `<RequestSchema\n  jsonrpcParams={${JSON.stringify(xjp)}}`
    );
  }

  return md;
}

module.exports = { customCreateApiPageMD };
