/*!
 * FilePondPluginCopyPath 1.0.0
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://github.com/jnkn6/filepond-plugin-copy-path#readme for details.
 */
/* eslint-disable */

/**
 * Register the copy path component by inserting the copy icon
 */
const registerCopyPath = (
  item,
  el,
  labelButtonCopyPath,
  copyRelativePath,
  alertCopyPath,
  server
) => {
  const info = el.querySelector('.filepond--file-info-main');
  const copyIcon = getCopyIcon(labelButtonCopyPath);

  info.prepend(copyIcon);
  copyIcon.addEventListener('click', () =>
    copyPath(item, copyRelativePath, alertCopyPath, server)
  );
};

const getCopyIcon = (labelCopyPath) => {
  let icon = document.createElement('span');
  icon.className = 'filepond--copypath-icon';
  icon.title = labelCopyPath;
  return icon;
};

/**
 * Triggered when icon clicked. Copy uploaded file path at clipboard
 */
const copyPath = (item, copyRelativePath, alertCopyPath, server) => {
  let urlBase = server.url;
  let path = server.load.url;
  let url = '';

  if (!urlBase || !path) {
    return;
  }

  if (copyRelativePath) {
    url = path + item.serverId;
  } else {
    // copy full path
    url = urlBase + path + item.serverId;
  }

  let dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = url;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  if (alertCopyPath) {
    alert('Copy file path at clipboard.');
  }
};

/**
 * Copy Path Plugin
 */
const plugin = (fpAPI) => {
  const { addFilter, utils } = fpAPI;
  const { Type, createRoute } = utils;

  // called for each view that is created right after the 'create' method
  addFilter('CREATE_VIEW', (viewAPI) => {
    // get reference to created view
    const { is, view, query } = viewAPI;

    // only hook up to item view
    if (!is('file')) {
      return;
    }

    // create the get file plugin
    const didLoadItem = ({ root, props }) => {
      const { id } = props;
      const item = query('GET_ITEM', id);

      if (!item || item.archived) {
        return;
      }

      const labelButtonCopyPath = root.query('GET_LABEL_BUTTON_COPY_PATH');
      const copyRelativePath = root.query('GET_COPY_RELATIVE_PATH');
      const alertCopyPath = root.query('GET_ALERT_COPY_PATH');
      const server = root.query('GET_SERVER');

      registerCopyPath(
        item,
        root.element,
        labelButtonCopyPath,
        copyRelativePath,
        alertCopyPath,
        server
      );
    };

    // start writing
    view.registerWriter(
      createRoute({ DID_LOAD_ITEM: didLoadItem }, ({ root }) => {
        // don't do anything while hidden
        if (root.rect.element.hidden) return;
      })
    );
  });

  // expose plugin
  return {
    options: {
      labelButtonCopyPath: ['Copy uploaded file path', Type.STRING],
      copyRelativePath: [false, Type.BOOLEAN],
      alertCopyPath: [true, Type.BOOLEAN],
    },
  };
};

// fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser) {
  document.dispatchEvent(
    new CustomEvent('FilePond:pluginloaded', { detail: plugin })
  );
}

export default plugin;
