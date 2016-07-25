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
    return;
    let words = nodejieba.cut(rawDocument);
    
    words.reduce((res, word) => {
      res[word] = res[word] || 0;
      res[word]++;
      return res;
    }, {});
    
    Object.keys(words).forEach(word => {
      this.keymap[word] = this.keymap[word] || [];
      this.keymap[word].push({id: documentInfo.id, count: words[word]});
    });
    
    this.documentInfoSet[documentInfo.id] = documentInfo;
    
    cb && cb();
  }

  after() {
    
  }
  
  
}
