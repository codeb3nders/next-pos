export async function GET(request: Request) {
  console.log({ request });
  return new Response("LIST, Next.js!");
}
