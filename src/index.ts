import { Elysia, error } from "elysia";
import { getBooks, getBook, createBook, getUserByUsername } from "./model";
import { jwt } from "@elysiajs/jwt";
import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = "sadsdasddgfdsfsdafdsfdsfdsfefsd";

const app = new Elysia();

app.get("/", () => ({
  message: "Hello Elysia",
}));

app.get("/books", () => {
  return getBooks();
});

app.get("/books/:id", ({ params }) => {
  return getBook(parseInt(params.id));
});

app.post("/books", ({ body, set }) => {
  set.status;
  createBook(body);
  return { success: "created succesfully" };
});

app.post(
  "/login",
  async ({ body }: { body: { username: string; password: string } }) => {
    const user: { username: string } | null = getUserByUsername(
      body?.username
    ) as { username: string } | null;
    if (!user) {
      return { error: `Invalid` };
    }
    const token = sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token };
  }
);

app.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
