import Templates from './templates'

export default function Route (url, method = 'GET') {
  return Templates[url]
}
