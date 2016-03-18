<?php
/**
 * Plugin Name: PMC TinyMCE Extensions
 * Description: Extends WordPress's TinyMCE editor with the ability to mark up hidden text which is visible within the editor but not displayed to readers, and swap italics for quotes and vise-versa.
 * Author: Luke Woodward / 10up, PMC
 * Author URI: http://pmc.com
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */
class PMC_TinyMCE_Extensions {
	public static function init() {
		add_shortcode( 'pmc_hidden_text', '__return_null' );
		add_filter('mce_external_plugins', array( __CLASS__ , 'tinyMCE_plugins' ) );
		add_filter('mce_buttons', array( __CLASS__, 'mce_buttons' ) );
		add_action( 'admin_init', array( __CLASS__, 'style' ) );
		add_filter( 'mce_css', array( __CLASS__, 'mce_style' ) );
	}
	public static function tinyMCE_plugins( $plugins ) {
		$plugins['pmcHiddenText'] = plugins_url( 'pmc-tinymce-extensions/js/editor_plugin.js', __DIR__ );
		$plugins['pmcItalics'] = plugins_url( 'pmc-tinymce-extensions/js/italics_plugin.js', __DIR__ );
		$plugins['pmcQuotes'] = plugins_url( 'pmc-tinymce-extensions/js/quotes_plugin.js', __DIR__ );
		return $plugins;
	}
	public static function mce_buttons( $buttons ) {
		$buttons[] = 'pmc-hidden-text';
		$buttons[] = 'pmc-italics';
		$buttons[] = 'pmc-quotes';
		return $buttons;
	}
	public static function style() {
		wp_enqueue_style( 'pmc-hidden-text', plugins_url( 'pmc-tinymce-extensions/css/pmc-tinymce-extensions.css', __DIR__ ) );
	}
	public static function mce_style( $mce_css ) {
		if ( ! empty( $mce_css ) )
			$mce_css .= ',';

		$mce_css .= plugins_url( '/css/pmc-tinymce-editor.css', __FILE__ );

		return $mce_css;
	}
}
add_action( 'init', array( 'PMC_TinyMCE_Extensions', 'init' ) );