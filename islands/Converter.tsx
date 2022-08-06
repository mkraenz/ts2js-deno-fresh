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
  return (
    <div style={styles.container}>
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
      <div
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <textarea
          cols={80}
          rows={30}
          placeholder="Paste your TypeScript code here..."
          value={code}
          onChange={(e) => setCode(e.currentTarget.value)}
          style={{ margin: "16px" }}
        />
        <textarea
          cols={80}
          rows={30}
          placeholder="Result will be displayed here..."
          value={transpiled}
          style={{ margin: "16px" }}
          onChange={() => {}}
        />
      </div>
      <button style={styles.button} onClick={debouncedConvert}>
        Convert!
      </button>
    </div>
  );
}
