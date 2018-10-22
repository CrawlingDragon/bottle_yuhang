import axios from 'axios';

export function getData(city) {
  let url = `http://tv.114nz.com/Home/Datav/GetDataVindex?Area=${city}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
