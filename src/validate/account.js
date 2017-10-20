export function userNameFormat(str = '') {
  let errMsg = ''
  if (!str) {
    errMsg = 'Username is required !'
  } else if (!/^[a-z]{1}[a-z\d]{3,11}$/.test(str)) {
    errMsg = 'Username format error !'
    // Please enter 4-12 bit string consisting of numbers and lowercase letters, and beginning with a lowercase letter
  }

  return errMsg
}

export function emailFormat(str = '') {
  let errMsg = ''
  if (!str) {
    errMsg = 'Email is required !'
  } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)) {
    errMsg = 'Email format error !'
  }

  return errMsg
}

export function passwordFormat(str = '') {
  let errMsg = ''
  if (!str) {
    errMsg = 'Password is required !'
  } else if (!/^\S{8,20}$/.test(str)) {
    errMsg = 'Password format error !'
  }

  return errMsg
}
