/**
 * Register the copy path component by inserting the copy icon
 */
export const registerCopyPath = (item, el, labelButtonCopyPath, copyRelativePath, alertCopyPath, server) => {
    const info = el.querySelector('.filepond--file-info-main');
    const copyIcon = getCopyIcon(labelButtonCopyPath);

    info.prepend(copyIcon);
    copyIcon.addEventListener("click", () => copyPath(item, copyRelativePath, alertCopyPath, server));
}

export const getCopyIcon = (labelCopyPath) => {
    let icon = document.createElement('span');
    icon.className = 'filepond--copypath-icon';
    icon.title = labelCopyPath;
    return icon;
}

/**
 * Triggered when icon clicked. Copy uploaded file path at clipboard
 */
export const copyPath = (item, copyRelativePath, alertCopyPath, server) => {
    let urlBase = server.url;
    let path = server.load.url;
    let url = "";

    if (!urlBase || !path){
        return;
    }

    if (copyRelativePath){
        url = path + item.serverId;
    }
    else{ // copy full path
        url = urlBase + path + item.serverId;
    }

    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    if (alertCopyPath){
       alert("Copy file path at clipboard.")
    }
}
