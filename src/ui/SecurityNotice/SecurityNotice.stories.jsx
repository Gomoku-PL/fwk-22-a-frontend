import React from "react";
import SecurityNotice from "./SecurityNotice";
export default {
  title: "UI / SecurityNotice",
  components: SecurityNotice,
};

export const Secure = () => (
  <SecurityNotice
    https={true}
    encryption={true}
    auth={true}
    docsLink="https://example.com/security"
  />
);

export const PartiallySecure = () => (
  <SecurityNotice
    https={true}
    encryption={false}
    auth={true}
    docsLink="https://example.com/security"
  />
);

export const Insecure = () => (
  <SecurityNotice
    https={false}
    encryption={false}
    auth={false}
    docsLink="https://example.com/security"
  />
);
