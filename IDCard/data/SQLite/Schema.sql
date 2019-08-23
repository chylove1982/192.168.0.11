
-- ----------------------------
-- IDCARD
-- ----------------------------
CREATE TABLE `IDCARD`  (
 "Id" UNIQUEIDENTIFIER NOT NULL PRIMARY KEY ,
 "ProjectId" text NOT NULL  ,
 "Name" text NOT NULL  ,
 "Sex" text NOT NULL  ,
 "Minzu" text NOT NULL  ,
 "BarthDay" text NOT NULL  ,
 "Address" text NOT NULL  ,
 "CardNum" text NOT NULL  ,
 "Govement" text NOT NULL  ,
 "ExplaintS" text NOT NULL  ,
 "ExplaintE" text NOT NULL  ,
 "Photo" text NOT NULL  ,
 "CreatedBy" UNIQUEIDENTIFIER NOT NULL  ,
 "CreatedTime" text NOT NULL  ,
 "ModifiedBy" UNIQUEIDENTIFIER NOT NULL  ,
 "ModifiedTime" text NOT NULL  
);

