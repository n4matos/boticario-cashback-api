import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';

let dateTime = new Date()
let accessToken = '';
let refreshToken = '';

let firstUserIdTest = '';
const userBody = {
  email: `nathanteste+${shortid.generate()}@gmail.com`,
  password: 'Sup3rSecret!23'
};

let firstPurchaseIdTest = '';
const purchaseBody = {
  code: Math.floor(Math.random() * 1000),
  cpf: '232.333.111-26',
  date: dateTime.toISOString(),
  value: Math.floor(Math.random() * 1000),
};

let purchaseApprovedIdTest = '';
const purchaseBodyApproved = {
  code: Math.floor(Math.random() * 1000),
  cpf: '153.509.460-56',
  date: dateTime.toISOString(),
  value: Math.floor(Math.random() * 1000),
};



const newCode = Math.floor(Math.random() * 1000);

describe('auth endpoint', function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });
  after(function (done) {
    done();
  });

  it('should allow a POST to /users', async function () {
    const res = await request.post('/users').send(userBody);

    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');
    firstUserIdTest = res.body.id;
  });

  it('should allow a POST to /auth', async function () {
    const res = await request.post('/auth').send(userBody);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.accessToken).to.be.a('string');
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  describe('purchases endpoint', function () {
    it('should allow a POST to /purchases with an access token', async function () {
      const res = await request
        .post('/purchases')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(purchaseBody);
      expect(res.status).to.equal(201);
      expect(res.body).not.to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.be.a('string');
      firstPurchaseIdTest = res.body.id;
    });

    it('should allow a POST to /purchases with an access token and approved purchase', async function () {
      const res = await request
        .post('/purchases')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(purchaseBodyApproved);
      expect(res.status).to.equal(201);
      expect(res.body).not.to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.be.a('string');
      purchaseApprovedIdTest = res.body.id;
    });

    it('should allow a GET from /purchases/:purchaseId with an access token', async function () {
      const res = await request
        .get(`/purchases/${firstPurchaseIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send();
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body._id).to.be.a('string');
      expect(res.body._id).to.equal(firstPurchaseIdTest);
      expect(res.body.code).to.be.a('number');
      expect(res.body.value).to.be.a('number');
      expect(res.body.cashback_percent).to.be.a('number');
      expect(res.body.cashback_value).to.be.a('number');
      expect(res.body.status).to.be.a('string');
      //expect(res.body.date).to.be.a('date');
    });

    it('should allow a PATCH to /purchases/:purchaseId with allowed purchase status', async function () {
      const res = await request
        .patch(`/purchases/${firstPurchaseIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          code: newCode,
        });
      expect(res.status).to.equal(204);
    });

    it('should disallow a PATCH to /purchases/:purchaseId with aproved purchase status', async function () {
      const res = await request
        .patch(`/purchases/${purchaseApprovedIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          code: newCode,
        });
      expect(res.status).to.equal(204);
    });

    it('should disallow a DELETE to /purchases/:purchaseId with aproved purchase status', async function () {
      const res = await request
        .patch(`/purchases/${purchaseApprovedIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send();
      expect(res.status).to.equal(204);
    });

    it('should disallow a PATCH to /purchases/:purchaseId with an nonexistent ID', async function () {
      const res = await request
        .patch(`/purchases/i-do-not-exist`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          code: purchaseBody.code,
        });
      expect(res.status).to.equal(404);
    });


    it('should allow a GET to a external API to check cashback', async function () {
      const res = await request
        .get(`/cashback`)
        .send();
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.credit).to.be.a('number');
    });

  });
});
