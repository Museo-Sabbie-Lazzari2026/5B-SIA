import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Museo Digitale delle Sabbie del Mondo" },
      {
        name: "description",
        content:
          "Esplora una collezione unica di oltre 800 campioni di sabbia da tutto il mondo.",
      },
    ],
  }),
});

function Index() {
  return (
    <iframe
      src="/museo/index.html"
      title="Museo delle Sabbie"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
      }}
    />
  );
}
