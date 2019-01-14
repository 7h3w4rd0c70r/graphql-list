
import { Request } from 'express'
import { GraphQLObjectType } from 'graphql'

export interface PageInfo {
    hasPreviousPage: boolean
    hasNextPage: boolean
    previousPageCursor: string
    nextPageCursor: string
}

export interface GraphQLListTypeConfig {
    name: string
    type: GraphQLObjectType
}

declare module 'graphql-list' {
    export class GraphQLListType extends GraphQLObjectType {
        constructor(config: GraphQLListTypeConfig)
    }

    export interface List<T> {
        edges: T[]
        previousPageCursor: string
        nextPageCursor: string
        totalCount: number
    }

    export interface GraphQLListResolver<Edge = any> {
        type: GraphQLListType
        resolve(source?: any, args?: any, ctx?: any, info?: any): List<Edge>|Promise<List<Edge>>
    }
}
