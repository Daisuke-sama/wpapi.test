<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wpapidb');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '74DFYlO[uu)e$@6`&Jf9?G5Mc@_4zgb($,3_Agt4Wf1p<[hbmS6qM>O&84A*TqBF');
define('SECURE_AUTH_KEY',  'oT0P:<bT#FS{e<IG=W@zz[?.4oh%Rz.jT)(/l5q0=&8TZ.syvZBCOAZ[YaeRNnQK');
define('LOGGED_IN_KEY',    '//yy2<fzPn/oq$YmnaWsHnMX8JK t@=6~jfo+/_G3k7]un{b.d/`{&`qV{P9VW&t');
define('NONCE_KEY',        '}:ED_qK7n<NG:S^``O{sw&E.9|Q6| OTQ`En{BSy>H5blynR+4p_s{N/78u{v>i<');
define('AUTH_SALT',        'XW%5/?gy>1>h7|Sn.?LiB*!lBK8(zXUT*A(4A,R!suxCl0w?;Hw:X?a{iE#^MPes');
define('SECURE_AUTH_SALT', 'yC_m3L3~J*:<E .#JvEY{J6)FXVK-Rqau+&UnX%m>MK2lKY~p7*L+}LcbvuxKe<U');
define('LOGGED_IN_SALT',   'dX51(hY[T?-?FQ8:7BcmIN/`/.rf<U`7cb#?bY7IJqequrHpxd|M_X}cK+#6s{fR');
define('NONCE_SALT',       '%|K@al5$ovkwRzwJStPof65^)5f-sMfeH}dT9%TE2`<=?b<<zyu,F5UH-6_l>H>4');

/** JWT Settings */
define('JWT_AUTH_SECRET_KEY', 'ue/!,*op#Q37/)qCA+u:zSY5S%wQT*~jw[|NiR%7%+;?zf:Z/D,42DpY.Y0)S;}P');
define('JWT_AUTH_CORS_ENABLE', true);
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
