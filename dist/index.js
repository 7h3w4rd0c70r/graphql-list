"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var _ = require("lodash");
exports.PageInfoType = new graphql_1.GraphQLObjectType({
    name: 'PageInfo',
    fields: {
        hasPreviousPage: {
            type: graphql_1.GraphQLBoolean,
        },
        hasNextPage: {
            type: graphql_1.GraphQLBoolean,
        },
        previousPageCursor: {
            type: graphql_1.GraphQLString,
        },
        nextPageCursor: {
            type: graphql_1.GraphQLString,
        },
    },
});
var GraphQLListType = (function (_super) {
    __extends(GraphQLListType, _super);
    function GraphQLListType(config) {
        return _super.call(this, {
            name: config.name,
            fields: {
                edges: {
                    type: new graphql_1.GraphQLList(config.type),
                    resolve: function (list) { return _.isArray(list.edges) ? list.edges : []; },
                },
                pageInfo: {
                    type: exports.PageInfoType,
                    resolve: function (list) {
                        var pageInfo = {
                            hasPreviousPage: false,
                            hasNextPage: false,
                            previousPageCursor: null,
                            nextPageCursor: null,
                        };
                        if (typeof list.previousPageCursor === 'string') {
                            pageInfo.hasPreviousPage = true;
                            pageInfo.previousPageCursor = list.previousPageCursor;
                        }
                        if (typeof list.nextPageCursor === 'string') {
                            pageInfo.hasNextPage = true;
                            pageInfo.nextPageCursor = list.nextPageCursor;
                        }
                        return pageInfo;
                    },
                },
                totalCount: {
                    type: graphql_1.GraphQLInt,
                    resolve: function (list) { return typeof list.totalCount === 'number' ? list.totalCount : null; },
                },
            },
        }) || this;
    }
    return GraphQLListType;
}(graphql_1.GraphQLObjectType));
exports.GraphQLListType = GraphQLListType;
//# sourceMappingURL=index.js.map