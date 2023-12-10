import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Podval from '../../../Components/Podval';

export default createBoard({
    name: 'Podval',
    Board: () => <Podval />,
    isSnippet: true,
});
