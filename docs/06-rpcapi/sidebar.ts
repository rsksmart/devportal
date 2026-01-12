import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "rpcapi/rsk-rpc-methods-v-0-9-0-with-apikey",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "rpcapi/eth-accounts",
          label: "eth_accounts",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
