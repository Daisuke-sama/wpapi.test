<?php
/*
Plugin name: REST Post Editor
Author name: Daisuke-sama
Domain path: /langs
Text domain: rest-post-editor
 */

function attach_scripts() {
    $js_path = plugin_dir_url(__FILE__) . 'js/';
    wp_enqueue_script('attach_scripts', $js_path . 'jsRestEdit.js', false, '1.0', true);

}

add_action('wp_enqueue_scripts', 'attach_scripts');