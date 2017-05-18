const Template = require('stream-text-variable-template');
const unzip = require('unzip');
const zip = require('zip-stream');

function docxTemplate(props, docx) {
  const archive = new zip({ zlib: { level: 0 } });
  const rs = docx.pipe(unzip.Parse());
  rs.on('entry', function (entry) {
    var fileName = entry.path;
    if (fileName === "word/document.xml") {
      const stream = entry.pipe(new Template(props));
      process.nextTick(() => archive.entry(stream, { name: fileName }));
    } else {
      process.nextTick(() => archive.entry(entry, { name: fileName }));
    }
  });

  rs.once('close', () => {
    archive.finalize();
  });

  rs.once('error', () => {
    archive.removeAllListeners();
    if (archive.destroy) archive.destroy();
    docx.destroy();
  });

  archive.once('error', () => {
    rs.removeAllListeners();
    docx.destroy();
  });
  return archive;
}

module.exports = docxTemplate;
