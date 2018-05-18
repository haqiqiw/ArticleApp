module.exports = {
  get Loading(){
    return require('./loading').default;
  },
  get ContentItem(){
    return require('./content-item').default;
  }
}