/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";

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
    overflowY: "hidden",
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
  button: {
    margin: "16px",
    padding: "16px",
    borderRadius: "16px",
    color: color.lightBlue,
    backgroundColor: color.black,
    fontSize: "2em",
    fontWeight: "bold",
  },
};

export default function LandingPage() {
  const [code, setCode] = useState("");
  const convert = async () => {
    const res = await fetch("/api/ts-to-js-converter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source: code }),
    });
    const body = await res.json();
    setCode(body.js);
  };
  return (
    <div style={styles.container}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p style={styles.heading}>ts2js</p>
      <p style={styles.subheading}>Convert TypeScript to JavaScript Online</p>
      <textarea
        type="text"
        cols={120}
        rows={30}
        placeholder="Paste your TypeScript code here..."
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
      />
      <button style={styles.button} onClick={convert}>
        Convert!
      </button>
    </div>
  );
}
