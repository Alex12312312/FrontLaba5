import React from 'react';
import { createBoard } from '@wixc3/react-board';
import RegPage from '../../../Components/RegPage';

export default createBoard({
    name: 'RegPage',
    Board: () => <RegPage />,
    isSnippet: true,
});
