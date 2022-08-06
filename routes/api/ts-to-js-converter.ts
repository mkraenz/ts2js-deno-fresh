import { HandlerContext } from "$fresh/server.ts";
import * as ts from "https://esm.sh/typescript@4.7.4";

export default function tsToJsConverter(source: string): string {
  const result = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  console.log(result.outputText);
  return result.outputText;
}

// const source = "let x: string  = 'hello world'";
// tsToJsConverter(source);

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const value = await _req.json();
  const transpiled = tsToJsConverter(value.source);
  return new Response(JSON.stringify({ js: transpiled }));
};
