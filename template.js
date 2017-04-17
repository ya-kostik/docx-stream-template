const Template = require('stream-text-variable-template');
const unzip = require('unzip');
const zip = require('zip-stream');

function docxTemplate(props, docx) {
  const archive = new zip({ zlib: { level: 0 } });
  docx.pipe(unzip.Parse()).
  on('entry', function (entry) {
    var fileName = entry.path;
    if (fileName === "word/document.xml") {
      const stream = entry.pipe(new Template(props));
      process.nextTick(() => archive.entry(stream, { name: fileName }));
    } else {
      if (fileName === '[Content_Types].xml') {
        process.nextTick(() => {
          archive.entry(entry, { name: fileName })
          archive.finalize();
        });
      } else {
        process.nextTick(() => archive.entry(entry, { name: fileName }));
      }
    }
  });
  archive.once('error', () => {
    docx.destroy();
  });
  return archive;
}

module.exports = docxTemplate;
