## 启动和停止

- redis-server [/path/to/redis.conf] [--port 6380]
- redis-cli [-h 127.0.0.1] [-p 6379]
- redis-cli shutdown
- redis-cli ping

## 基础操作

- keys pattern
- exists key
- del key [key ...]
- type key

## 字符串

- set key value
- get key
- incr key
- incrby key increment
- decr key
- decrby key decrement
- increbyfloat key increment
- append key value
- strlen key
- mget key [key ...]
- mset key value [key value ...]

## 位操作

略

## 哈希表

- hset key field value
- hget key field
- hmset key field value [field value ...]
- hmget key field [field ...]
- hgetall key
- hexists key field
- hsetnx key field value (当字段不存在时赋值)
- hincrby key field increment
- hdel key field [field ...]
- hkeys key
- hvals key
- hlen key

## 列表

- lpush key value [value ...] (左侧插入)
- rpush key value [value ...]
- lpop key
- rpop key
- llen key
- lrange key start stop (获取片段，负数表示倒数)
- lrem key count value (删除前 count 个 value，当 count 大于 0 从左侧开始删除，当 count 小于 0 从右侧开始删除，当 count 等于 0 时会删除所有值为 value 的元素)
- lindex key index (获取 index 索引的值)
- lset key index value (设置 index 索引的值)
- ltrim key start end (删除范围外的值)
- linsert key BEFORE|AFTER pivot value (查找值为 pivot 的元素，在前面或者后面插入 value)
- rpoplpush source destination (在 source 的右侧弹出，插入到 destination 的左侧)

## 集合

- sadd key member [member ...]
- srem key memeber [member ...]
- smembers key (返回集合中所有元素)
- sismember key member
- sdiff key [key ...]
- sinter key [key ...]
- sunion key [key ...]
- scard key (返回集合元素个数)
- sdiffstore destination key [key ...] (将结果储存)
- sinterstore destination key [key ...]
- sunionstore destination key [key ...]
- srandmember key [count] (随机获取元素，count 为正数则获取 count 个不重复，count 为负数则获取 |count| 个可能重复)
- spop key (随机弹出一个)

## 有序集合 (根据 score 排序)

- zadd key score member [score member ...]
- zscore key member (获取分数)
- zrange key start stop [WITHSCORES] (获取范围，可以包含分数)
- zrevrange key start stop [WITHSCORES]
- zrangebyscore key min max [WITHSCORES] [LIMIT offset count] (-inf 和 + inf 表示无穷大，(100 表示不包含 100)
- zincrby key increment member
- zcard key
- zcount key min max (范围内的数量)
- zrem key member [member ...]
- zremrangebyrank key start stop (删除排名范围内的元素)
- zremrangebyscore key min max
- zrank key member (获取排名)
- zrevrank key member
- zinterstore destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
- zunionstore destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]

## 事务
