import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const billStore = createSlice({
  name: 'billStore',
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    },
    addBillItem(state, action) {
      state.billList.push(action.payload)
    },
  },
})
const { setBillList, addBillItem } = billStore.actions
const getBillList = () => {
  return async dispatch => {
    const res = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(res.data))
  }
}
const postBillItem = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:8888/ka', data)
    dispatch(addBillItem(res.data))
  }
}
const reducer = billStore.reducer
export { getBillList, postBillItem }
export default reducer
