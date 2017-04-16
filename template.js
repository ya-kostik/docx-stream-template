const Template = require('stream-text-variable-template');
const unzip = require('unzip');
const zip = require('zip-stream');

function docxTemplate(props, docx) {
  const archive = new zip({ zlib: { level: 1 } });
  docx.pipe(unzip.Parse()).
  on('entry', function (entry) {
    var fileName = entry.path;
    if (fileName === "word/document.xml") {
      const stream = entry.pipe(new Template(props));
      archive.entry(stream, { name: fileName });
    } else {
      archive.entry(entry, { name: fileName });
      if (fileName === '[Content_Types].xml') {
        archive.finalize();
      }
    }
  });
  archive.once('error', () => {
    docx.destroy();
  });
  return archive;
}

module.exports = docxTemplate;
