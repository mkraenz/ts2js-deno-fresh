import { HandlerContext } from "$fresh/server.ts";
import * as ts from "typescript";

export default function tsToJsConverter(source: string): string {
  const result = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  return result.outputText;
}

// test:
// const source = "let x: string  = 'hello world'";
// const result = tsToJsConverter(source);
// console.log(result)

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const value = await _req.json();
  const transpiled = tsToJsConverter(value.source);
  return new Response(JSON.stringify({ js: transpiled }));
};
