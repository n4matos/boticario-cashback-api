import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';


describe('cashback endpoint', function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });
  after(function (done) {
    done();
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