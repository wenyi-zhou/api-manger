export const activityMenu = (state) => {
  function findMenu (menuList, path) {
    for (var i in menuList) {
      var menu = menuList[i]
      if (menu.index === path) {
        return menu
      }
    }
  }

  const menuList = state.home.menu_list
  const shortPaths = state.route.path.split('/')
  shortPaths.shift()
  const routeMenus = []

  var _index = ''
  for (var i = 0, len = shortPaths.length; i < len; i++) {
    var list = []
    if (i === 0) {
      list = menuList
    } else {
      var subMenu = routeMenus[routeMenus.length - 1].sub_menu
      if (subMenu) {
        list = subMenu
      } else {
        break
      }
    }

    _index = _index + '/' + shortPaths[i]
    var menu = findMenu(list, _index)
    if (!menu) {
      break
    }
    routeMenus.push(menu)
  }
  if (routeMenus.length > 0) {
    return routeMenus[routeMenus.length - 1].index
  } else {
    return ''
  }
}

export const counts = (state) => {
  const data = state.notifications.counts
  return data
}
