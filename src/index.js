'use strict';

const nodejieba = require("nodejieba");

export default class NobbbPluginSearch {
  constructor() {
    this.name = 'search';
    this.type = 'render';

    nodejieba.load();

    //Inverted index
    this.keymap = {};
    this.documentInfoSet = {};
  }

  getName() {
    return this.name;
  }
  
  getType() {
    return this.type;
  }

  eachArticle(rawDocument, documentInfo, cb) {
    //console.log(rawDocument);

    let words = nodejieba.cut(rawDocument);
    
    words = words.reduce((res, word) => {
      res[word] = res[word] || 0;
      res[word]++;
      return res;
    }, {});
    
    Object.keys(words).forEach(word => {
      let word = word.toLowerCase();
      this.keymap[word] = this.keymap[word] || [];
      this.keymap[word].push({id: documentInfo.id, count: words[word]});
    });

    // TODO 只生成标题和 url 就好了
    this.documentInfoSet[documentInfo.id] = documentInfo;
    
    cb && cb();
    
  }

  after() {
  }
  
  
}
