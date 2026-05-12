import { http, HttpResponse } from "msw";

import { mockUsers } from "@tests/__mocks__/user.mock";

export const mockMswHandlers = [
  http.get("/users", () => HttpResponse.json(mockUsers)),
  http.get("/users/:id", ({ params }) => {
    const user = mockUsers.find((u) => u.id === Number(params.id));
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),
];
