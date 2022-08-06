/** @jsx h */
import debounce from "lodash.debounce";
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
    width: "100%",
    backgroundColor: color.grey,
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

export default function Converter() {
  const [code, setCode] = useState("");
  const convert = async () => {
    if (code.length === 0) return;
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
  const debouncedConvert = debounce(convert, 500, { leading: true });
  return (
    <div style={styles.container}>
      <textarea
        type="text"
        cols={120}
        rows={30}
        placeholder="Paste your TypeScript code here..."
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
      />
      <button style={styles.button} onClick={debouncedConvert}>
        Convert!
      </button>
    </div>
  );
}
