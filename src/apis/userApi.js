import axios from 'axios'

const loginApi = async (getFormValue) => {
  try {
    const res = await axios.get(
      'https://65557c9884b36e3a431dc9f5.mockapi.io/users'
    )
    const { email, password } = getFormValue
    const user = res.data
    const userIndex = user.findIndex((index) => index.email === email)

    if (userIndex !== -1 && user[userIndex].password === password) {
      alert('Đăng nhập thành công')
    } else {
      alert('Email hoặc mật khẩu không chính xác')
    }
  } catch (err) {
    return { error: 'Kết nối API thất bại' }
  }
}
const registerApi = async (getFormValue) => {
  try {
    const { email, password, rePassword, fullName } = getFormValue

    let data = {
      email,
      full_name: fullName,
      password,
      avatar: null,
    }
    const res = await axios.post(
      'https://65557c9884b36e3a431dc9f5.mockapi.io/users',
      data
    )
    alert('Đăng ký tài khoản thành công')
  } catch (err) {
    alert('Đăng ký tài khoản thất bại')
  }
}

const getListUserApi = async () => {
  try {
    const res = await axios.get(
      'https://65557c9884b36e3a431dc9f5.mockapi.io/users'
    )
    const data = res.data.map((user) => {
      const { password, ...userNotPassword } = user
      return userNotPassword
    })
    return data
  } catch (err) {
    return { error: 'Kết nối API thất bại' }
  }
}

const getListUserById = async (user) => {
  const { id } = user
  try {
    const res = await axios.get(
      `https://65557c9884b36e3a431dc9f5.mockapi.io/users/${id}`
    )
    return res.data
  } catch (err) {
    return { error: 'Kết nối API thất bại' }
  }
}
const updateUserApi = async (user) => {
  const { id, full_name, email } = user
  let data = {
    full_name,
    email,
  }
  try {
    const res = await axios.put(
      `https://65557c9884b36e3a431dc9f5.mockapi.io/users/${id}`,
      data
    )
    alert('Cập nhật tài khoản thành công')
    return true
  } catch (err) {
    alert('Cập nhật tài khoản thất bại')
    return false
  }
}
const deleteUserApi = async (id) => {
  try {
    const res = await axios.delete(
      `https://65557c9884b36e3a431dc9f5.mockapi.io/users/${id}`
    )
    alert('Xóa tài khoản thành công')
    return true
  } catch (err) {
    alert('Xóa tài khoản thất bại')
    return false
  }
}
export {
  loginApi,
  registerApi,
  getListUserApi,
  getListUserById,
  updateUserApi,
  deleteUserApi,
}
