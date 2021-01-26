import { registerCopyPath } from './copypath'

/**
 * Copy Path Plugin
 */
const plugin = fpAPI => {

    const { addFilter, utils } = fpAPI;
    const { Type, createRoute } = utils;

    // called for each view that is created right after the 'create' method
    addFilter('CREATE_VIEW', viewAPI => {

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
            const alertCopyPath = root.query('GET_ALERT_COPY_PATH')
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
            createRoute(
                { DID_LOAD_ITEM: didLoadItem },
                ({ root }) => {
                    // don't do anything while hidden
                    if (root.rect.element.hidden)
                        return;
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
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser) {
    document.dispatchEvent(new CustomEvent('FilePond:pluginloaded', { detail: plugin }));
}

export default plugin;
