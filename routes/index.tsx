/** @jsx h */
import { h } from "preact";
import Converter from "../islands/Converter.tsx";

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

const color = {
  lightBlue: "#00C0FA",
  black: "#000000",
  grey: "#272727",
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: color.grey,
  },
  heading: {
    color: color.lightBlue,
    fontSize: "4em",
    margin: 0,
  },
  subheading: {
    fontSize: "2em",
    color: color.lightBlue,
  },
};

export default function Home() {
  return (
    <div style={styles.container}>
      <Head />
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <header style={styles.heading}>ts2js</header>
      <p style={styles.subheading}>Convert TypeScript to JavaScript Online</p>
      <Converter />
    </div>
  );
}
