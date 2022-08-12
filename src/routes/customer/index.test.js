const request = require("supertest")
const baseURL = "http://localhost:3000"

let customerId;

//Add New
describe("POST - Add New Customer", () => {
  const newCustomer = {
    "name": "QA Tester",
    "email": "tester@example.com"
  }
  let response = {};

  it("should return http code: 200", async () => {
    response = await request(baseURL).post("/customer").send(newCustomer);
    customerId = response.body.data.id;

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("has defined properties: status, data.id", async () => {
    expect(response.body.hasOwnProperty('status')).toBe(true);
    expect(response.body.hasOwnProperty('data')).toBe(true);
    expect(response.body.data.hasOwnProperty('id')).toBe(true);
  });

  it("should return value of data.id > 0", async () => {
    expect(response.body.data.id > 0).toBe(true);
  });

});

//Display Data
describe("GET All Customer", () => {
  let response = {};

  // beforeAll(async () => {
  //   // set up the todo
  //   const response = await request(baseURL).post("/customer").send(newCustomer);
  //   customerId = response.body.data.id;
  //   // console.log("Customer ID:"+newCustomer.id);
  // })

  // afterAll(async () => {
  //   await request(baseURL).delete(`/customer/${newCustomer.id}`)
  // })

  it("should return http code: 200", async () => {
    response = await request(baseURL).get("/customer");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("should return array of customers", async () => {
    expect(response.body.data.customers.length >= 1).toBe(true);
  });

  it("has defined properties: data, customers", async () => {
    expect(response.body.hasOwnProperty('data')).toBe(true);
    expect(response.body.data.hasOwnProperty('customers')).toBe(true);
  });
});

describe("GET Customer Detail with valid ID", () => {
  let response = {};

  it("should return http code: 200", async () => {
    response = await request(baseURL).get("/customer/"+customerId);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("should return object of customer", async () => {
    const obj = response.body.data.customer;
    expect(Object.keys(obj).length >= 1).toBe(true);
  });

  it("has defined properties: data, customer", async () => {
    expect(response.body.hasOwnProperty('data')).toBe(true);
    expect(response.body.data.hasOwnProperty('customer')).toBe(true);
  });
});

describe("GET Customer Detail with invalid ID", () => {
  let response = {};

  it("should return http code: 404", async () => {
    response = await request(baseURL).get("/customer/xxxxxxx");
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('Customer is not exist.');
  });

  it("should return object", async () => {
    const obj = response.body;
    expect(Object.keys(obj).length >= 1).toBe(true);
  });

  it("has defined properties: status, message", async () => {
    expect(response.body.hasOwnProperty('status')).toBe(true);
    expect(response.body.hasOwnProperty('message')).toBe(true);
  });
});

//Update
describe("PUT - Update Customer", () => {
  const updateCustomer = {
    "name": "PT Sembako Sagalaya",
    "address": "Cicaheum - Endonezya",
    "phone": "08123456789",
    "pic": "Jojon Markijon"
  }
  let response = {};

  it("should return http code: 200", async () => {
    response = await request(baseURL).put("/customer/"+customerId).send(updateCustomer);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("has defined properties: status, message", async () => {
    expect(response.body.hasOwnProperty('status')).toBe(true);
    expect(response.body.hasOwnProperty('message')).toBe(true);

    expect(response.body.message).toBe('Customer data has been updated');
  });
});

//Delete
describe("DELETE - Delete Customer", () => {
  let response = {};

  it("should return http code: 200", async () => {
    response = await request(baseURL).delete("/customer/"+customerId);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("has defined properties: status, message", async () => {
    expect(response.body.hasOwnProperty('status')).toBe(true);
    expect(response.body.hasOwnProperty('message')).toBe(true);

    expect(response.body.message).toBe('Data berhasil dihapus');
  });
});