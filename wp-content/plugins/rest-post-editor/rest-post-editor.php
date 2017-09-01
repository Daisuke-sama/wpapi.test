<?php
/*
Plugin name: REST Post Editor
Author name: Daisuke-sama
Domain path: /langs
Text domain: rest-post-editor
 */

function attach_scripts() {
	$js_path = plugin_dir_url( __FILE__ ) . 'js/';

	if ( ! is_admin() && is_single() ) {

		if ( is_user_logged_in() && current_user_can( 'edit_others_posts' ) ) {
			wp_enqueue_script( 'attach_scripts', $js_path . 'jsRestEdit.js', false, '1.0', true );
			wp_localize_script( 'attach_scripts', 'postRest',
				[
					'rootUrl' => esc_url_raw( rest_url() ),
					'nonce'   => wp_create_nonce( 'wp_rest' ),
					'postID'  => get_the_ID(),
				] );
		}
	}
}

add_action( 'wp_enqueue_scripts', 'attach_scripts' );