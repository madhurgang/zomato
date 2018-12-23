export const checkUserExist = (user, list) => {
  if (list.find(item => item.name === user.name && item.password === user.password))
    return true
  else
    return false

}