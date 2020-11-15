import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { articles } from './articles.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { courses } from './courses.reducer';
import { categories } from './categories.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    articles,
    registration,
    users,
    courses,
    categories,
    alert
});

export default rootReducer;
