// docsify-lightgallery.js
function lightGalleryPlugin(hook, vm) {
    hook.doneEach(function() {
        var lists = document.querySelectorAll('.markdown-section ul');

        lists.forEach(function(list) {
            var images = list.querySelectorAll('img');
            if (images.length > 0) {
                list.classList.add('lightgallery');

                images.forEach(function(img) {
                    var originalSrc = img.getAttribute('src');
                    var altText = img.getAttribute('alt') || 'Image';  // Use alt text or default to "Image" if none provided
                    img.setAttribute('data-src', originalSrc);
                    img.setAttribute('data-sub-html', `<div class='custom-html-subtitle'>${altText}</div>`);  // Setting custom HTML for subtitles
                });

                // Ensure to destroy old LightGallery instance if exists
                if (list.hasOwnProperty('lgData') && list.lgData) {
                    list.lgData.destroy(true);
                }

                // Initialize LightGallery without any plugins
                lightGallery(list, {
                    selector: 'img',
                    subHtmlSelectorRelative: true,
                    getThumbBoundsFn: false,
                    addClass: 'custom-lightgallery-class'  // Optional: for custom CSS styling
                });
            }
        });
    });
}

// Add the plugin to Docsify's plugin array
window.$docsify = window.$docsify || {};
window.$docsify.plugins = (window.$docsify.plugins || []).concat(lightGalleryPlugin);

