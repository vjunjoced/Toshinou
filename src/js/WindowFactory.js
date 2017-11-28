/*
 Created by Freshek on 07.10.2017
 */

const HEADER_HEIGHT = 40;

class WindowFactory {
    static createWindow(params) {

        const pane = jQuery('<div>', {
            width: params.width || 400,
            height: (params.height + HEADER_HEIGHT) || '',
            'class': 'window',
            css: {
                backgroundColor: 'transparent',
            },
        }).appendTo(params.isMain ? 'body' : this.mainFrame());

        const headerCol = ColorConverter.hexToRgb(window.globalSettings.headerColor);
        const header = jQuery('<h4>', {
            text: params.text || 'Untitled',
            'class': 'header',
            css: {
                backgroundColor: ColorConverter.combine(headerCol.r, headerCol.g, headerCol.b, window.globalSettings.headerOpacity),
            },
        }).appendTo(pane);

        // TODO: Custom scrollbar
        const contentColor = ColorConverter.hexToRgb(window.globalSettings.windowColor);
        const content = jQuery('<div>', {
            'class': `content${params.isMain ? '' : ' minimized'}`,
            css: {
                maxHeight: params.maxHeight || '',
                backgroundColor: ColorConverter.combine(contentColor.r, contentColor.g, contentColor.b, window.globalSettings.windowOpacity),
            },
        }).appendTo(pane);

        const minimizeBtn = jQuery('<span>', {
            text: '_',
            'class': 'minimize-btn',
        }).appendTo(header);

        let dragAndDrop = new DragAndDrop(header[0], params.isMain);

        dragAndDrop.isMainFrame = params.isMain ? true : false;

        minimizeBtn.click(() => {
            if (content.hasClass('minimized')) {
                content.removeClass('minimized');
                dragAndDrop.on();
            } else {
                content.addClass('minimized');
                if (!params.isMain) {
                    dragAndDrop.off();
                }
            }
        });

        return content;
    }

    static mainFrame() {
        if (!window.mainFrameWindow) {
            window.mainFrameWindow = this.createWindow({text: "Windows", isMain: true})[0];
        }

        return window.mainFrameWindow;
    }

}
