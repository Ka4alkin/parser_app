import { Posts } from '../../api/posts/postsModel';

const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');

const axios = require('axios');
const getRssXML = async () => {
  return axios.get('https://lifehacker.com/rss');
};

const parseXML = (xmlData: string) => {
  const options:any = {
    attrPrefix: '@_',
    textNodeName: '#text',
    ignoreNonTextNodeAttr: true,
    ignoreTextNodeAttr: true,
    ignoreNameSpace: true,
    ignoreRootElement: false,
    textNodeConversion: true,
    textAttrConversion: false,
  };
  if (XMLValidator.validate(xmlData) === true) {
    const parser = new XMLParser();
    const jsonObj = parser.parse(xmlData, options);
    return jsonObj;
  }
  return null;
};
module.exports = () => {
  getRssXML().then(response => {
    const parser = new XMLParser();
    let jObj = parser.parse(response.data);
    const builder = new XMLBuilder();
    const xmlContent = builder.build(jObj);
    let postsFromRss = parseXML(xmlContent).rss.channel.item;

    Posts.find().toArray().then(allPostFromDB=>{
      let idsMap = new Map();

      if (allPostFromDB.length)  {
        allPostFromDB.forEach(item => idsMap.set(item.guid, item.guid));
      }

      if (postsFromRss.length && idsMap.size) {
        postsFromRss = postsFromRss.filter((item:any) => !idsMap.has(item.guid));
      }

      if (postsFromRss.length) {
        Posts.insertMany(postsFromRss);
      }

    });
  });
};
