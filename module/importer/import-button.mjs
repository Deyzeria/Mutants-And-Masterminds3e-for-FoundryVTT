import HeroLabParser from "./import-herolab.mjs";

export async function importFromXmlDialog() {
  new Dialog({
    title: `Import HeroLab XML`,
    content: await renderTemplate("module/importer/import-menu.hbs"),
    buttons: {
      import: {
        icon: '<i class="fas fa-file-import"></i>',
        label: "Import",
        callback: html => {
          const form = html.find("form")[0];
          if (!form.data.files.length) return ui.notifications.error("You did not upload a data file!");
          readTextFromFile(form.data.files[0]).then(xml => ParserAccess(xml));
        }
      },
      no: {
        icon: '<i class="fas fa-times"></i>',
        label: "Cancel"
      }
    },
    default: "import"
  }, {
    width: 400
  }).render(true);
}

async function ParserAccess(xmlFile) {
  const domParser = new DOMParser();
  const xmlDoc = domParser.parseFromString(xmlfile, 'text/xml');
  const parsed = xmlToJson(xmlDoc);
  HeroLabParser(parsed);
}

/**
 * @param {XMLDocument} xml 
 * @returns {import("./hero-lab-documentation.mjs").hlparsed}
 */
function xmlToJson(xml) {
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj[attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj["text"] = xml.nodeValue.trim();
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof (obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}
