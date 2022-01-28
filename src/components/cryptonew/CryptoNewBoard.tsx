import { Box } from '@chakra-ui/react';
import React from 'react';
import {Async} from '../line/Async'

type Props = {};

export const CryptoNewBoard = (props: Props) => {
    return <Box p={4} display={{ md: 'flex' }}>
                <Async/ >
            </Box>      
};
