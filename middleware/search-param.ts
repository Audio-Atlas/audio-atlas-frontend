export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/query") {
    return
  }

  const query = to.query.search;
  console.log(query);
  if (!query) {
    return navigateTo("/")
  }
  return
})
