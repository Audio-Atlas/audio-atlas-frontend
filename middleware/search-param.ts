export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/query") {
    return
  }

  const query = to.query.search;
  if (!query) {
    return navigateTo("/")
  }
  return
})
