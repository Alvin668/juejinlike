import http from "./http";

export default {
    queryCategoryBriefs: function () {
        return http.get('/juejin/category')
    },
    getTodayStatus: function () {
        return http.get('/juejin/today-status')
    },
    checkIn: function () {
        return http.post('/juejin/checkin')
    },
    getMonth: function () {
        return http.get('/juejin/get-month')
    },
    getCount: function () {
        return http.get('/juejin/get-count')
    },
    getPoint: function () {
        return http.get('/juejin/get-point')
    },
    getSignCard: function () {
        return http.get('/juejin/get_cur_supp')
    },
    getCalendar: function () {
        return http.get('/juejin/get_calendar')
    },
    getRulesText: function () {
        return http.get('/juejin/get_rules_text')
    },
    getLuck: function () {
        return http.get('/juejin/get_luck')
    },
    getLuckRules: function () {
        return http.get('/juejin/get_luck_rules')
    },
    drawFree: function () {
        return http.post('/juejin/draw_free')
    },
    draw1: function () {
        return http.post('/juejin/draw_1')
    },
    tenDraw: function () {
        return http.post('/juejin/ten_draw')
    },
    myLuck: function () {
        return http.post('/juejin/my_luck')
    },
    globalBig: function (pageNo, pageSize) {
        return http.post('/juejin/global_big', {
            pageNo,
            pageSize
        })
    },
    globalSmall: function () {
        return http.post('/juejin/global_small')
    },
    recommendAllFeed: function (cursor, limit, sortType) {
        return http.post('/juejin/recommend_all_feed', {
            cursor: cursor,
            limit: limit,
            sortType: sortType
        })
    },
    recommend: function (limit, cate_id, cursor) {
        return http.post('/juejin/recommend', {
            limit: limit,
            cate_id: cate_id,
            cursor: cursor
        })
    },
    saveDigg: function (itemid, item_type) {
        return http.post('/juejin/save_digg', {
            itemid: itemid,
            item_type
        })
    },
    cancelDigg: function (itemid, item_type) {
        return http.post('/juejin/cancel_digg', {
            itemid: itemid,
            item_type
        })
    },
    follow: function (userId) {
        return http.post('/juejin/do', {
            userId: userId
        });
    },
    cancelFollow: function (id, type) {
        return http.post('/juejin/undo', {
            id,
            type
        });
    },
    listByRec: function () {
        return http.post('/juejin/list_by_rec');
    },
    recommendPins: function (cursor, limit, sortType) {
        return http.post('/juejin/recommend_pins', {
            cursor: cursor,
            limit: limit,
            sortType: sortType
        })
    },
    commentList: function (cursor, item_id, item_type, limit, sort) {
        return http.post('/juejin/comment_list', {
            cursor,
            item_id,
            item_type,
            limit,
            sort
        })
    },
    publish: function (comment_content, comment_pics, item_id) {
        return http.post('/juejin/publish', {
            comment_content,
            comment_pics,
            item_id
        })
    },
    profileIdGet: function () {
        return http.get('/juejin/profile_id');
    },
    delete: function (comment_id) {
        return http.post('/juejin/delete', {
            comment_id
        })
    },
    reply: function (reply_content, reply_pics, reply_to_comment_id, item_id) {
        return http.post('/juejin/reply', {
            reply_content,
            reply_pics,
            reply_to_comment_id,
            item_id
        })
    },
    detail: function (msg_id) {
        return http.post('/juejin/detail', {
            msg_id
        })
    },
    hotComment: function (msg_id) {
        return http.post('/juejin/comment_hots', {
            msg_id
        })
    },
    myTopics: function () {
        return http.post('/juejin/mytopics')
    },
    queryItemCategories: function () {
        return http.get('/juejin/query_item_categories');
    },
    listByRec: function () {
        return http.post('/juejin/list_by_rec')
    },
    listByCateCursor: function (cate_id, cursor, limit) {
        return http.post('/juejin/list_by_cate_cursor', {
            cate_id,
            cursor,
            limit
        })
    },
    listBySearchCursor: function (cursor, keyword, limit) {
        return http.post('/juejin/list_by_search_cursor', {
            cursor,
            keyword,
            limit
        })
    },
    queryTopicDetail: function (topic_id) {
        return http.post('/juejin/query_topic_detail', {
            topic_id
        })
    },
    topic: function (cursor, sort_type, topic_id) {
        return http.post('/juejin/topic', {
            cursor,
            sort_type,
            topic_id
        })
    },
    followerList: function (curosr, topic_id) {
        return http.post('/juejin/follower_list', {
            curosr,
            topic_id
        });
    },
    queryAdverts: function () {
        return http.post('/juejin/query_adverts');
    },
    queryTopicSquare: function (cursor) {
        return http.post('/juejin/list_by_hot', {
            cursor
        });
    },
    citys: function () {
        return http.get('/juejin/citys');
    },
    eventList: function (cursor, city) {
        return http.post('/juejin/event_list', {
            cursor,
            city
        });
    },
    courseList: function (cursor) {
        return http.post('/juejin/listbycategory', {
            cursor
        });
    },
    getUserinfo() {
        return http.get('/juejin/get_user_info');
    },
    card(datas) {
        return http.post('/juejin/card', {
            datas
        });
    },
    badgeList() {
        return http.post('/juejin/badgelist');
    },
    centerCount() {
        return http.post('/juejin/centercount');
    },
    trend() {
        return http.post('/juejin/trend');
    },
    bannerList() {
        return http.get('/juejin/banner_list')
    },
    dynamic() {
        return http.get('/juejin/dynamic')
    }



}