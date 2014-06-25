
-- USERS

user_info
INSERT INTO app_beyondwechattest.user_info
(subscribe, openid, nickname, sex, language, city, province, country, headimgurl, subscribe_time) 
VALUES ('0', 'openid2', 'nicknameB', 1, 'zh_CN', '武汉', '湖北', '中国', 'headimgurl2', 1382695957);


-- SCORES

INSERT INTO app_beyondwechattest.user_score
(userId, score, trial, createtime) 
VALUES (1, 97, 1, now());

INSERT INTO app_beyondwechattest.user_score
(userId, score, trial, createtime) 
VALUES (2, 107, 3, now());

UPDATE app_beyondwechattest.user_info 
SET nickname = 'nicknameB'
WHERE id = 2
;


SELECT id, subscribe, openid, nickname, sex, language, city, province, country, user_score, subscribe_time, createtime 
FROM app_beyondwechattest.user_info limit 2;

update app_beyondwechattest.user_info set headimgurl = 
"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46";

INSERT INTO user_info (score, subscribe, openid, nickname, sex, language, city, province, country, headimgurl, subscribe_time)
               VALUES (11, '$subscribe', '$openid', '$nickname', 1, '$language', '$city', '$province', '$country', '$headimgurl', 1382695957);
