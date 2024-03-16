//API
export const FETCH_START = 'fetch_start';
export const FETCH_SUCCESS = 'fetch_success';
export const FETCH_ERROR = 'fetch_error';
export const SHOW_MESSAGE = 'show_message';
export const HIDE_MESSAGE = 'hide_message';
export const TOGGLE_APP_DRAWER = 'toggle_app_drawer';
export const UPDATING_CONTENT = 'updating_content';

//APP SETTING
export const TOGGLE_NAV_COLLAPSED = 'toggle_nav_collapsed';
export const SET_INITIAL_PATH = 'set_initial_path';

//JWT_AUTH
export const UPDATE_JWT_AUTH_USER = 'update_jwt_auth_user';
export const SET_JWT_USER_DATA = 'set_jwt_user_data';
export const SIGNOUT_JWT_USER_SUCCESS = 'signout_jwt_user_success';
export const SET_JWT_TOKEN_SET = 'set_jwt_token_set';

//FIREBASE_AUTH
export const UPDATE_FIREBASE_USER = 'update_firebase_user';

//AWS_COGNITO_AUTH
export const UPDATE_COGNITO_USER = 'update_cognito_user';

//AUTH0
export const UPDATE_AUTH0_USER = 'update_auth0_user';
export const SET_AUTH0_TOKEN_SET = 'set_auth0_token_set';
export const SIGNOUT_AUTH0_SUCCESS = 'signout_auth0_success';

//ANALYTICS-DASHBOARD
export const GET_ANALYTICS_DATA = 'get_analytics_data';

//ECOMMERCE-DASHBOARD
export const GET_ECOMMERCE_DATA = 'get_ecommerce_data';

//CRM-DASHBOARD
export const GET_CRM_DATA = 'get_crm_data';

//CRYPTO-DASHBOARD
export const GET_CRYPTO_DATA = 'get_crypto_data';

//METRICS-DASHBOARD
export const GET_METRICS_DATA = 'get_metrics_data';

//WIDGETS_DASHBOARD
export const GET_WIDGETS_DATA = 'get_widgets_data';

//MAIL-APP
export const GET_MAIL_LIST = 'get_mail_list';
export const GET_FOLDER_LIST = 'get_folder_list';
export const GET_LABEL_LIST = 'get_label_list';
export const TOGGLE_MAIL_DRAWER = 'toggle_mail_drawer';
export const COMPOSE_MAIL = 'compose_mail';
export const GET_MAIL_DETAIL = 'get_mail_detail';
export const UPDATE_MAIL_FOLDER = 'update_mail_folders';
export const UPDATE_MAIL_LABEL = 'update_mail_label';
export const UPDATE_STARRED_STATUS = 'update_starred_status';
export const UPDATED_MAIL_DETAIL = 'updated_mail_detail';
export const CHANGE_READ_STATUS = 'change_read_status';
export const GET_CONNECTION_LIST = 'get_connection_list';
export const NULLIFY_MAIL = 'nullify_mail';

//TODO-APP
export const GET_TASK_LIST = 'get_task_list';
export const CREATE_NEW_TASK = 'create_new_task';
export const TOGGLE_TODO_DRAWER = 'toggle_todo_drawer';
export const GET_TODO_FOLDER_LIST = 'GET_TODO_FOLDER_LIST';
export const GET_TODO_LABEL_LIST = 'GET_TODO_LABEL_LIST';
export const GET_TODO_STATUS_LIST = 'GET_TODO_STATUS_LIST';
export const GET_TODO_PRIORITY_LIST = 'GET_TODO_PRIORITY_LIST';
export const UPDATE_TASK_FOLDER = 'UPDATE_TASK_FOLDER';
export const UPDATE_TASK_LABEL = 'UPDATE_TASK_LABEL';
export const UPDATE_TASK_STARRED_STATUS = 'UPDATE_TASK_STARRED_STATUS';
export const GET_TASK_DETAIL = 'GET_TASK_DETAIL';
export const UPDATE_TASK_DETAIL = 'UPDATE_TASK_DETAIL';
export const GET_TODO_STAFF_LIST = 'GET_TODO_STAFF_LIST';

//CONTACT_APP
export const GET_CONTACT_LIST = 'GET_CONTACT_LIST';
export const GET_CONTACT_FOLDER_LIST = 'GET_CONTACT_FOLDER_LIST';
export const GET_CONTACT_LABEL_LIST = 'GET_CONTACT_LABEL_LIST';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const UPDATE_CONTACT_LABEL = 'UPDATE_CONTACT_LABEL';
export const UPDATE_CONTACT_STARRED_STATUS = 'UPDATE_CONTACT_STARRED_STATUS';
export const GET_CONTACT_DETAIL = 'GET_CONTACT_DETAIL';
export const TOGGLE_CONTACT_DRAWER = 'TOGGLE_CONTACT_DRAWER';
export const UPDATE_CONTACT_DETAIL = 'UPDATE_CONTACT_DETAIL';
export const CREATE_NEW_CONTACT = 'CREATE_NEW_CONTACT';

//SCRUMBOARD_APP
export const GET_MEMBER_LIST = 'GET_MEMBER_LIST';
export const GET_SCRUM_LABEL_LIST = 'GET_SCRUM_LABEL_LIST';
export const GET_BOARDS = 'GET_BOARDS';
export const GET_BOARD_DETAIL = 'GET_BOARD_DETAIL';
export const ADD_BOARD_LIST = 'ADD_BOARD_LIST';
export const ADD_LIST_CARD = 'ADD_LIST_CARD';
export const EDIT_LIST_CARD = 'EDIT_LIST_CARD';
export const DELETE_LIST_CARD = 'DELETE_LIST_CARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const ADD_NEW_BOARD = 'ADD_NEW_BOARD';
export const DELETE_LIST = 'DELETE_LIST';
export const EDIT_BOARD_DETAIL = 'EDIT_BOARD_DETAIL';
export const EDIT_BOARD_LIST = 'EDIT_BOARD_LIST';

//CHAT_APP
export const GET_CONNECTIONS_LIST = 'get_connections_list';
export const GET_USER_MESSAGES = 'get_user_messages';
export const ADD_NEW_MESSAGE = 'add_new_message';
export const EDIT_MESSAGE = 'edit_message';
export const DELETE_MESSAGE = 'delete_message';
export const DELETE_USER_MESSAGES = 'delete_user_messages';
export const TOGGLE_CHAT_DRAWER = 'toggle_chat_drawer';
export const SELECT_USER = 'select_user';

//USER_LIST
export const GET_USER_LIST = 'GET_USER_LIST';

//ECOMMERCE_LIST
export const GET_ECOMMERCE_LIST = 'get_ecommerce_list';
export const SET_PRODUCT_VIEW_TYPE = 'set_product_view_type';
export const SET_FILTER_DATA = 'set_filter_data';
export const SET_PRODUCT_DATA = 'set_product_data';
export const GET_RECENT_ORDER = 'get_recent_order';
export const GET_CUSTOMERS = 'get_customers';
export const ADD_CART_ITEM = 'add_cart_item';
export const REMOVE_CART_ITEM = 'remove_cart_item';
export const UPDATE_CART_ITEM = 'update_cart_item';
export const SET_CART_ITEMS = 'set_cart_items';

//CK-EDITOR
export const GET_BALLOON_BLOCK_DATA = 'get_balloon_block_data';
export const UPDATE_BALLOON_BLOCK_DATA = 'update_balloon_block_data';
export const GET_BALLOON_DATA = 'get_balloon_data';
export const UPDATE_BALLOON_DATA = 'update_balloon_data';
export const GET_CLASSIC_DATA = 'get_classic_data';
export const UPDATE_CLASSIC_DATA = 'update_classic_data';
export const GET_INLINE_DATA = 'get_inline_data';
export const UPDATE_INLINE_DATA = 'update_inline_data';
export const GET_DOCUMENT_DATA = 'get_document_data';
export const UPDATE_DOCUMENT_DATA = 'update_document_data';
export const GET_CUSTOM_DATA = 'get_custom_data';
export const UPDATE_CUSTOM_DATA = 'update_custom_data';

//GALLERY
export const GET_GALLERY_PHOTO = 'get_gallery_photo';
