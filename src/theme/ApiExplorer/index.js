/**
 * Same as the theme's ApiExplorer, with two additions: code samples are read
 * under either key spelling (x-codeSamples or x-code-samples), and the servers
 * list is passed to CodeSnippets for the network switch.
 */
import React from "react";
import CodeSnippets from "@theme/ApiExplorer/CodeSnippets";
import Request from "@theme/ApiExplorer/Request";
import Response from "@theme/ApiExplorer/Response";
import SecuritySchemes from "@theme/ApiExplorer/SecuritySchemes";
import * as sdk from "postman-collection";

function ApiExplorer({ item, infoPath }) {
  const postman = new sdk.Request(
    item.postman
      ? sdk.Request.isRequest(item.postman)
        ? item.postman.toJSON()
        : item.postman
      : {}
  );

  const codeSamples = item["x-codeSamples"] ?? item["x-code-samples"] ?? [];

  return (
    <>
      <SecuritySchemes infoPath={infoPath} />
      {item.method !== "event" && (
        <CodeSnippets
          postman={postman}
          codeSamples={codeSamples}
          servers={item.servers}
        />
      )}
      <Request item={item} />
      <Response item={item} />
    </>
  );
}

export default ApiExplorer;
