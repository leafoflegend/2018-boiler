import React from 'react';
import { History, createBrowserHistory } from 'history';

const initialHistory = createBrowserHistory();

const HistoryProvider = React.createContext<History>(initialHistory);

export default HistoryProvider;
