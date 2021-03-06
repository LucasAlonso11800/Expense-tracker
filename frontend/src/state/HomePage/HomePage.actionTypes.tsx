export enum HomePageActionTypes {
    FETCH_MOVEMENTS_BEGIN = 'HOME_PAGE_FETCH_MOVEMENTS_BEGIN',
    FETCH_MOVEMENTS_SUCCESS = 'HOME_PAGE_FETCH_MOVEMENTS_SUCCESS',
    FETCH_MOVEMENTS_FAILED = 'HOME_PAGE_FETCH_MOVEMENTS_FAILED',
    FETCH_CATEGORIES_BEGIN = 'HOME_PAGE_FETCH_CATEGORIES_BEGIN',
    FETCH_CATEGORIES_SUCCESS = 'HOME_PAGE_FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED = 'HOME_PAGE_FETCH_CATEGORIES_FAILED',
    FETCH_ACCOUNTS_BEGIN = 'HOME_PAGE_FETCH_ACCOUNTS_BEGIN',
    FETCH_ACCOUNTS_SUCCESS = 'HOME_PAGE_FETCH_ACCOUNTS_SUCCESS',
    FETCH_ACCOUNTS_FAILED = 'HOME_PAGE_FETCH_ACCOUNTS_FAILED',
    MUTATE_BEGIN = 'HOME_PAGE_MUTATE_BEGIN',
    MUTATE_MOVEMENT_SUCCESS = 'HOME_PAGE_MUTATE_MOVEMENT_SUCCESS',
    MUTATE_CATEGORY_SUCCESS = 'HOME_PAGE_MUTATE_CATEGORY_SUCCESS',
    MUTATE_ACCOUNT_SUCCESS = 'HOME_PAGE_MUTATE_ACCOUNT_SUCCESS',
    MUTATE_FAILED = 'HOME_PAGE_MUTATE_FAILED',
    SELECT_ROW = 'HOME_PAGE_SELECT_ROW',
    SELECT_CATEGORY = 'HOME_PAGE_SELECT_CATEGORY',
    SELECT_ACCOUNT = 'HOME_PAGE_SELECT_ACCOUNT',
    OPEN_MODAL = 'HOME_PAGE_OPEN_MODAL',
    CLOSE_MODAL = 'HOME_PAGE_CLOSE_MODAL',
    CHANGE_SELECTED_ACCOUNT = 'HOME_PAGE_CHANGE_SELECTED_ACCOUNT'
};