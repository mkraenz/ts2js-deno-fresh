/** @jsx h */
import debounce from "lodash.debounce";
import { h } from "preact";
import { useState } from "preact/hooks";
import CopyToClipboardIcon from "../components/CopyToClipboardIcon.tsx";

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
    textTransform: "uppercase",
  },
  outputContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  copyButton: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "8px",
    padding: "8px",
    borderRadius: "16px",
    color: color.lightBlue,
    backgroundColor: color.black,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  icon: {
    paddingRight: "4px",
  },
  textarea: {
    margin: "16px",
    fontFamily: "monospace",
  },
  textareaContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
};

export default function Converter() {
  const [code, setCode] = useState("");
  const [transpiled, setTranspiled] = useState("");
  const [compilerOptions, setCompilerOptions] = useState<{ module?: number }>(
    {}
  );

  const convert = async () => {
    if (code.length === 0) return;
    const res = await fetch("/api/ts-to-js-converter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source: code, compilerOptions }),
    });
    const body = await res.json();
    setTranspiled(body.js);
  };
  const debouncedConvert = debounce(convert, 500, { leading: true });
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transpiled);
  };
  return (
    <main style={styles.container}>
      <select
        onChange={(e) => {
          console.log(e.currentTarget.value);
          return setCompilerOptions({
            ...compilerOptions,
            module: Number.parseInt(e.currentTarget.value, 10),
          });
        }}
      >
        <option value={1} selected={compilerOptions.module === 1}>
          CommonJS (aka. <code>require()</code>)
        </option>
        <option value={2} selected={compilerOptions.module === 2}>
          AMD
        </option>
        <option value={5} selected={compilerOptions.module === 5}>
          ES6 (aka ES2015)
        </option>
        <option value={7} selected={compilerOptions.module === 7}>
          ES2022
        </option>
      </select>
      <div style={styles.textareaContainer}>
        <textarea
          cols={80}
          rows={30}
          placeholder="Paste or type your TypeScript code here..."
          value={code}
          onChange={(e) => setCode(e.currentTarget.value)}
          style={styles.textarea}
        />
        <div style={styles.outputContainer}>
          <textarea
            cols={80}
            // the outputContainer needs to be at most as large as the input text area
            rows={26}
            placeholder="Result will be displayed here..."
            value={transpiled}
            style={styles.textarea}
          />
          <button style={styles.copyButton} onClick={copyToClipboard}>
            <CopyToClipboardIcon color={color.lightBlue} style={styles.icon} />
            Copy to clipboard
          </button>
        </div>
      </div>
      <button style={styles.button} onClick={debouncedConvert}>
        Convert
      </button>
    </main>
  );
}
