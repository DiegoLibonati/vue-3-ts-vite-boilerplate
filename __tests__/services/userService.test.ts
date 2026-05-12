import { http, HttpResponse } from "msw";

import userService from "@/services/userService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockUser, mockUsers } from "@tests/__mocks__/user.mock";

describe("userService", () => {
  describe("getAll", () => {
    it("should return the list of users on a successful response", async () => {
      mockMswServer.use(http.get("/users", () => HttpResponse.json(mockUsers)));

      const result = await userService.getAll();

      expect(result).toEqual(mockUsers);
    });

    it("should return an empty array when the API returns no users", async () => {
      mockMswServer.use(http.get("/users", () => HttpResponse.json([])));

      const result = await userService.getAll();

      expect(result).toEqual([]);
    });

    it("should throw an error when the response is 500", async () => {
      mockMswServer.use(http.get("/users", () => new HttpResponse(null, { status: 500 })));

      await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 500");
    });

    it("should throw an error when the response is 404", async () => {
      mockMswServer.use(http.get("/users", () => new HttpResponse(null, { status: 404 })));

      await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw when a network error occurs", async () => {
      mockMswServer.use(http.get("/users", () => HttpResponse.error()));

      await expect(userService.getAll()).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return the user with the given id on a successful response", async () => {
      mockMswServer.use(http.get("/users/1", () => HttpResponse.json(mockUser)));

      const result = await userService.getById(1);

      expect(result).toEqual(mockUser);
    });

    it("should throw an error when the response is 404", async () => {
      mockMswServer.use(http.get("/users/99", () => new HttpResponse(null, { status: 404 })));

      await expect(userService.getById(99)).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw an error when the response is 500", async () => {
      mockMswServer.use(http.get("/users/1", () => new HttpResponse(null, { status: 500 })));

      await expect(userService.getById(1)).rejects.toThrow("HTTP error! status: 500");
    });

    it("should throw when a network error occurs", async () => {
      mockMswServer.use(http.get("/users/1", () => HttpResponse.error()));

      await expect(userService.getById(1)).rejects.toThrow();
    });
  });
});
