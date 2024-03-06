import React from "react";
import Header from "../../components/Header";

export default function MainLayout({ children }) {
  return (
    <>
      <div style={{ height: "5rem" }}>
        <Header />
      </div>
      {children}
    </>
  );
}
