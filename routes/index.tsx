/** @jsx h */
import { h } from "preact";
import LandingPage from "../islands/LandingPage.tsx";

/** workaround to avoid weird escaping of curlies */
const globalStyle = `
body,html {
  margin: 0;
  padding: 0;
}`;

export const Head = () => (
  <head>
    <title>ts2js</title>
    <style>{globalStyle}</style>
  </head>
);

export default function Home() {
  return (
    <div>
      <Head />
      <LandingPage />
    </div>
  );
}
