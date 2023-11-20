const validate = (value, type) => {
  value = value.trim()
  let message = ''

  if (value === '') {
    message = 'Không để trống dữ liệu'
  } else {
    if (type === 'email') {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        message = 'Email sai định dạng'
      }
    } else if (type === 'password') {
      if (!/\d/.test(value)) {
        message = 'Pass phải chứa ít nhất một chữ số'
      }
    }
  }

  return {
    type,
    message,
  }
}

export default validate
