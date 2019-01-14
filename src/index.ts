
import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
} from 'graphql'
import * as _ from 'lodash'

import {
    GraphQLListTypeConfig,
    PageInfo,
} from '../index.d'

export const PageInfoType = new GraphQLObjectType({
    name: 'PageInfo',
    fields: {
        hasPreviousPage: {
            type: GraphQLBoolean,
        },
        hasNextPage: {
            type: GraphQLBoolean,
        },
        previousPageCursor: {
            type: GraphQLString,
        },
        nextPageCursor: {
            type: GraphQLString,
        },
    },
})

export class GraphQLListType extends GraphQLObjectType {
    constructor(config: GraphQLListTypeConfig) {
        super({
            name: config.name,
            fields: {
                edges: {
                    type: new GraphQLList(config.type),
                    resolve: list => _.isArray(list.edges) ? list.edges : [],
                },
                pageInfo: {
                    type: PageInfoType,
                    resolve: list => {
                        const pageInfo: PageInfo = {
                            hasPreviousPage: false,
                            hasNextPage: false,
                            previousPageCursor: null,
                            nextPageCursor: null,
                        }
    
                        if (typeof list.previousPageCursor === 'string') {
                            pageInfo.hasPreviousPage = true
                            pageInfo.previousPageCursor = list.previousPageCursor
                        }
    
                        if (typeof list.nextPageCursor === 'string') {
                            pageInfo.hasNextPage = true
                            pageInfo.nextPageCursor = list.nextPageCursor
                        }
    
                        return pageInfo
                    },
                },
                totalCount: {
                    type: GraphQLInt,
                    resolve: list => typeof list.totalCount === 'number' ? list.totalCount : null,
                },
            },
        })
    }
}
