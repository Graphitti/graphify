/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Graph = db.model('graph')
const User = db.model('user')

describe('Graph routes', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('put to /api/graphs/:graphId', () => {
        const fakeGraph = {
            xAxis: 'Name',
            yAxis: ['Age'],
            title: 'Fake Title',
            graphType: 'Bar',
            datasetName: 'Dataset Name',
            xAxisLabel: 'Name Label',
            yAxisLabel: 'Age Label',
            description: 'Fake graph',
            awsId: 't8e2h4jfd8fd',
            graphId: '123123123'
        }
        const fakeUser = {
            email: 'email@email.com',
            password: '123',
            id: 1
        }
        const newFakeGraph = Object.assign({}, fakeGraph);
        newFakeGraph.graphType = 'Line';

        beforeEach(() => {
            return Promise.all([Graph.create(fakeGraph), User.create(fakeUser)])
            .then(([graph,user]) => {
                console.log('user',user)
                graph.setUser(user)})
        })
        .catch(console.error)

        it('put from /api/graphs/:graphId', async () => {
            const res = await request(app)
                .put(`/api/graphs/${fakeGraph.graphId}`)
                .user({id: 1})
                .expect(200)
                .catch(console.error)
            console.log('the res',res.body)
            expect(res.body).to.be.an('array')
            expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
})
