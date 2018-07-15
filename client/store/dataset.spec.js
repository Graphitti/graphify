import { expect } from 'chai'
import { setData } from './dataset'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('dataset thunk creators', () => {
    let store

    const initialState = {
        dataset: [],
        columnObj: {},
        name: ''
    }

    beforeEach(() => {
        store = mockStore(initialState)
    })

    afterEach(() => {
        store.clearActions()
    })

    describe('upload data', () => {
        it('adds the correct number of rows to dataset', () => {
            const fakeData = [
                {Owner: 'Nancy', Cats: 5, Dogs: 3, Hamsters: 2},
                {Owner: 'Raplph', Cats: 1, Dogs: 2, Hamsters: 1}
            ];
            const fakeFileName = 'Animal Count';
            const fakeColumnObj = {
                Owner: 'text', Cats: 'number', Dogs: 'number', Hamsters: 'number'
            }
            const fakeDataset = {
                dataset: fakeData, columnObj: fakeColumnObj, name: fakeFileName
            }
            store.dispatch(setData(fakeDataset))
            const actions = store.getActions();
            expect(actions[0].type).to.be.equal('SET_DATA');
            expect(actions[0].data.dataset).to.be.deep.equal(fakeData);
        })
    })
})