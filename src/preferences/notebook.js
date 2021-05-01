const Gtk = require('gi/Gtk')
const { Widget } = require('./widget')

var NotebookPage = class NotebookPage extends Widget {
  constructor (name) {
    super(
      new Gtk.Box({
        'margin-top': 10,
        // 'border-width': '2px',
        spacing: 5
      })
    )
    this.name = name
    this.parent.set_orientation(Gtk.Orientation.VERTICAL)
  }

  register (notebook) {
    const label = new Gtk.Label({ label: this.name })
    notebook.append_page(this.parent, label)
  }
}

module.exports = { NotebookPage }
