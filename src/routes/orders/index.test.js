const request = require("supertest")
const baseURL = "http://localhost:3000"

let orderId;

//Add New
describe("POST - Add New Order", () => {
  const newOrder = {
    "customerId": 10, 
    "orderDate": 1661143414,
    "amount": 0,
    "orderDetails": [
      {
        "productId": 100,
        "qty": 3,
        "price": 100
      },
      {
        "productId": 300,
        "qty": 4,
        "price": 200
      },
      {
        "productId": 300,
        "qty": 5,
        "price": 300
      }
    ]
  }

  let response = {};
  it("should return http code: 200", async () => {
    response = await request(baseURL).post("/orders").send(newOrder);
    orderId = response.body.data.id;

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
describe("GET All Order", () => {
  let response = {};

  it("should return http code: 200", async () => {
    response = await request(baseURL).get("/orders");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it("should return array of orders", async () => {
    expect(response.body.data.orders.length >= 1).toBe(true);
  });

  it("has defined properties: data, orders", async () => {
    expect(response.body.hasOwnProperty('data')).toBe(true);
    expect(response.body.data.hasOwnProperty('orders')).toBe(true);
  });
});

// describe("GET Order Detail with valid ID", () => {
//   let response = {};

//   it("should return http code: 200", async () => {
//     response = await request(baseURL).get("/orders/"+orderId);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe('success');
//   });

//   it("should return object of order", async () => {
//     const obj = response.body.data.order;
//     expect(Object.keys(obj).length >= 1).toBe(true);
//   });

//   it("has defined properties: data, order", async () => {
//     expect(response.body.hasOwnProperty('data')).toBe(true);
//     expect(response.body.data.hasOwnProperty('order')).toBe(true);
//   });
// });

// describe("GET Order Detail with invalid ID", () => {
//   let response = {};

//   it("should return http code: 404", async () => {
//     response = await request(baseURL).get("/orders/xxxxxxx");
//     expect(response.statusCode).toBe(404);
//     expect(response.body.status).toBe('fail');
//     expect(response.body.message).toBe('Order is not exist.');
//   });

//   it("should return object", async () => {
//     const obj = response.body;
//     expect(Object.keys(obj).length >= 1).toBe(true);
//   });

//   it("has defined properties: status, message", async () => {
//     expect(response.body.hasOwnProperty('status')).toBe(true);
//     expect(response.body.hasOwnProperty('message')).toBe(true);
//   });
// });

// //Update
// describe("PUT - Update Order", () => {
//   const updateOrder = {
//     "customerId": 10, 
//     "orderDate": 1661143314,
//     "amount": 123456
//   }
//   let response = {};

//   it("should return http code: 200", async () => {
//     response = await request(baseURL).put("/orders/"+orderId).send(updateOrder);
    
//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe('success');
//   });

//   it("has defined properties: status, message", async () => {
//     expect(response.body.hasOwnProperty('status')).toBe(true);
//     expect(response.body.hasOwnProperty('message')).toBe(true);

//     expect(response.body.message).toBe('Order data has been updated');
//   });
// });

// //Delete
// describe("DELETE - Delete Order", () => {
//   let response = {};

//   it("should return http code: 200", async () => {
//     response = await request(baseURL).delete("/orders/"+orderId);
    
//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe('success');
//   });

//   it("has defined properties: status, message", async () => {
//     expect(response.body.hasOwnProperty('status')).toBe(true);
//     expect(response.body.hasOwnProperty('message')).toBe(true);

//     expect(response.body.message).toBe('Data berhasil dihapus');
//   });
// });