//Deno 프로젝트 샘플 참고 URL https://deno.land/
import { serve } from "https://deno.land/std@0.62.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}