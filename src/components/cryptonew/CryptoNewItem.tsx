import { Badge, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { CryptoNew } from '../../types';
// import { FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa'
// import { Icon } from '@chakra-ui/react'

type CryptoNewSearch = {
    id: CryptoNew['id']
    kind: CryptoNew['kind']
    domain: CryptoNew['domain']
    sentiment: CryptoNew['sentiment']
    title: CryptoNew['title']
    sourceUrl: CryptoNew['sourceUrl']
}

interface Props {
    cryptoNew: CryptoNewSearch;
}

export const CryptoNewItem = ({ cryptoNew }: Props) => {
    return (
        <>
            <Flex boxShadow={['sm', 'md', 'lg', 'xl']} p={3} borderRadius={['sm', 'md', 'lg', 'xl']} maxWidth="100%" >
                <Flex flexDirection="column">
                    {/* <Flex direction={{ base: 'column-reverse', md: 'row' }}> */}
                    <Flex flexDirection="row">
                        <Badge bg="yellow" borderRadius="full">
                            <Text>{cryptoNew.kind}</Text>
                        </Badge>
                        <Badge bg="orange" borderRadius="full">
                            <Text fontWeight="bold">{cryptoNew.domain}</Text>
                        </Badge>
                        <Badge bg="cyan" borderRadius="full">
                            {cryptoNew.sentiment}
                        </Badge>
                    </Flex>

                    <Link href={cryptoNew.sourceUrl}>{cryptoNew.title}</Link>

                    {/* <Text w={[1, 1, 1, 6]} paddingX={5}>{cryptoNew.positive}</Text><Icon as={FaThumbsUp} w={[2, 2, 2, 6]} h={6} color='green.500' />
                    <Text w={[1, 1, 1, 6]} paddingX={5}>{cryptoNew.negative}</Text><Icon as={FaThumbsDown}  w={[2, 2, 2, 6]} h={6} color='red.500' />
                    <Text w={[1, 1, 1, 6]} paddingX={5}>{cryptoNew.comments}</Text><Icon as={FaComment} w={[2, 2, 2, 6]} h={6} color='gray.500' /> */}
                    {/* <Text>{cryptoNew.id}</Text> */}

                    {/* <Icon>{cryptoNew.positive}</Icon> */}
                    {/* <Flex flexDirection="row"> */}

                    {/* </Flex> */}
                </Flex>
            </Flex>
        </>
    );
};
