
const getPermissionName = (n: number) => {
  switch (n) {
    case 5:
      return 'Admin'

    case 4:
      return 'Moderator'

    case 3:
      return 'VIP'

    case 2:
      return 'Even better user'

    case 1:
      return 'Slightly better user'
  
    default:
      return 'Normal user'
  }
}

export default getPermissionName;