import { expect } from 'chai'
import { createStore } from 'redux'
import reducer, { SET_DATA, setData } from './dataset'


describe('setData action creator', () => {
  it('return proper data', () => {
    const mockData = {
      id: 2,
      name: 'test',
      email: 'test@gmail.com'
    }
    expect(setData(mockData)).to.be.deep.equal({
      type: SET_DATA,
      data: {
        id: 2,
        name: 'test',
        email: 'test@gmail.com'
      }
    })
  })
})

describe('Reducer', () => {
  let testStore,
      mockData = {
        dataset:[{
          id: 1,
          name: 'John',
          email: 'John@gmail.com'
        }, {
          id: 2,
          name: 'Alice',
          email: 'Alice@gmail.com'
        }],
        columnObj: {
          0: 'id',
          1: 'name',
          2: 'email'
        },
        name: 'test'
      }

  beforeEach('mock store', ()=> {
    testStore = createStore(reducer)
  })

  it('has correct initial state', () => {
    expect(testStore.getState()).to.be.deep.equal({
      dataset: [],
      columnObj: {},
      name: ''
    })
  })

  it('sets data from action', () => {
    testStore.dispatch(setData(mockData))
    expect(testStore.getState()).to.be.deep.equal({
      dataset:[{
        id: 1,
        name: 'John',
        email: 'John@gmail.com'
      }, {
        id: 2,
        name: 'Alice',
        email: 'Alice@gmail.com'
      }],
      columnObj: {
        0: 'id',
        1: 'name',
        2: 'email'
      },
      name: 'test'
    })
  })
})
