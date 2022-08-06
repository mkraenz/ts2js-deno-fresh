import { HandlerContext } from "$fresh/server.ts";
import * as ts from "typescript";

export default function tsToJsConverter(
  source: string,
  compilerOptions: ts.TranspileOptions["compilerOptions"]
): string {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      ...compilerOptions,
      module: compilerOptions?.module ?? ts.ModuleKind.ES2022,
    },
  });
  return result.outputText;
}

// test
// const source = "let x: string  = 'hello world'";
// const result = tsToJsConverter(source, {});
// console.log(result);

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const value = await _req.json();
  const transpiled = tsToJsConverter(value.source, value.compilerOptions);
  return new Response(JSON.stringify({ js: transpiled }));
};
