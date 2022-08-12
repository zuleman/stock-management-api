const request = require("supertest")
const baseURL = "http://localhost:3000"

let supplierId;

//Add New
describe("POST - Add New Supplier", () => {
  const newSupplier = {
    "name": "PT Sembako",
    "address": "Cicaheum",
    "phone": "08123456789",
    "pic": "Jojon"
  }
  let response = {};

  it("should return http code: 200", async () => {
    response = await request(baseURL).post("/supplier").send(newSupplier);
    supplierId = response.body.data.id;

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
describe("GET All Supplier", () => {
  let response = {};

  // beforeAll(async () => {
  //   // set up the todo
  //   const response = await request(baseURL).post("/supplier").send(newSupplier);
  //   supplierId = response.body.data.id;
  //   // console.log("Supplier ID:"+newSupplier.id);
  // })

  // afterAll(async () => {
  //   await request(baseURL).delete(`/supplier/${newSupplier.id}`)
  // })

  it("should return http code: 200", async () => {
    response = await request(baseURL).get("/supplier");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("should return array of suppliers", async () => {
    expect(response.body.data.suppliers.length >= 1).toBe(true);
  });

  it("has defined properties: data, suppliers", async () => {
    expect(response.body.hasOwnProperty('data')).toBe(true);
    expect(response.body.data.hasOwnProperty('suppliers')).toBe(true);
  });
});

describe("GET Supplier Detail with valid ID", () => {
  let response = {};

  it("should return http code: 200", async () => {
    response = await request(baseURL).get("/supplier/"+supplierId);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("should return object of supplier", async () => {
    const obj = response.body.data.supplier;
    expect(Object.keys(obj).length >= 1).toBe(true);
  });

  it("has defined properties: data, supplier", async () => {
    expect(response.body.hasOwnProperty('data')).toBe(true);
    expect(response.body.data.hasOwnProperty('supplier')).toBe(true);
  });
});

describe("GET Supplier Detail with invalid ID", () => {
  let response = {};

  it("should return http code: 404", async () => {
    response = await request(baseURL).get("/supplier/xxxxxxx");
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('Supplier is not exist.');
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
describe("PUT - Update Supplier", () => {
  const updateSupplier = {
    "name": "PT Sembako Sagalaya",
    "address": "Cicaheum - Endonezya",
    "phone": "08123456789",
    "pic": "Jojon Markijon"
  }
  let response = {};

  it("should return http code: 200", async () => {
    response = await request(baseURL).put("/supplier/"+supplierId).send(updateSupplier);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("has defined properties: status, message", async () => {
    expect(response.body.hasOwnProperty('status')).toBe(true);
    expect(response.body.hasOwnProperty('message')).toBe(true);

    expect(response.body.message).toBe('Supplier data has been updated');
  });
});

//Delete
describe("DELETE - Delete Supplier", () => {
  let response = {};

  it("should return http code: 200", async () => {
    response = await request(baseURL).delete("/supplier/"+supplierId);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("has defined properties: status, message", async () => {
    expect(response.body.hasOwnProperty('status')).toBe(true);
    expect(response.body.hasOwnProperty('message')).toBe(true);

    expect(response.body.message).toBe('Data berhasil dihapus');
  });
});