import createUserservice, { Iuser } from "../createUser.service";
import listUserservice from "../listAllUsers.service";
import request from "supertest";
import app from "../../app";

describe("Create an user", () => {
  test("Should insert the information of the new user in the Array", async () => {
    const email = "christian@email.com";
    const name = "Christian Gall";
    const password = "123456";

    const userData: Iuser = { name, email, password };

    const newUser = createUserservice(userData);
    expect(newUser).toEqual(expect.objectContaining({ name, email, password }));

    const allUser: Iuser = listUserservice()[0];

    expect(allUser).toEqual(expect.objectContaining(newUser));

    const result = await request(app).post("/users").send(newUser);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message");
  });
});
