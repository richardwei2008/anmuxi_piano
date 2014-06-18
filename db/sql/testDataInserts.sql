
-- USERS

INSERT INTO app_beyondwechattest.user_info
(subscribe, openid, nickname, sex, language, city, province, country, headimgurl, subscribe_time) 
VALUES ('1', 'openid1', 'nicknameA', 1, 'zh_CN', '上海', '上海', '中国', 'headimgurl1', 1382694957);

INSERT INTO app_beyondwechattest.user_info
(subscribe, openid, nickname, sex, language, city, province, country, headimgurl, subscribe_time) 
VALUES ('0', 'openid2', 'nicknameA', 1, 'zh_CN', '武汉', '湖北', '中国', 'headimgurl2', 1382695957);


-- SCORES

INSERT INTO app_beyondwechattest.user_score
(userId, score, trial, createtime) 
VALUES (1, 97, 1, now());

INSERT INTO app_beyondwechattest.user_score
(userId, score, trial, createtime) 
VALUES (2, 107, 3, now());