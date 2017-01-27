export default function getIconName (resource) {
  var iconMap = {
    file: 'file-text',
    link: 'bookmark', // alternatives are bookmark-o and book
    snippet: 'code',
    github: 'github' // alternatives are the various gits and code-fork
  }

  var icon = iconMap[resource.type];

  if(resource.type === 'link' && resource.url.includes('github')) {
    icon = iconMap['github'];
  }

  return icon;
}
