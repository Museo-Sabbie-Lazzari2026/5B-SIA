import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Museo delle Sabbie" },
      { name: "description", content: "Sand Studio — Museo delle Sabbie" },
    ],
  }),
});

function Index() {
  useEffect(() => {
    window.location.replace("/museo/index.html");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAF6F1",
        fontFamily: "Inter, sans-serif",
        color: "#5a4a32",
      }}
    >
      <p>Reindirizzamento al Museo delle Sabbie…</p>
    </div>
  );
}
