export default {
  post(id) {
    return {
      path: `/food-list.json`,
      resolve: (response, mappers) => {
        let { title, content, meta } = response.results[0]
        content = '<p>' + content.split('\n\n').join('</p><p>') + '</p>'
        return mappers.merge({ title, content, ...meta })
      }
    }
  }
}
