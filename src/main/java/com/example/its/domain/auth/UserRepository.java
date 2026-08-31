package com.example.its.domain.auth;

import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserRepository {

    @Select("SELECT * FROM users WHERE username = #{username}")
    Optional<User> findByUsername(String username);

    @Select("SELECT * FROM users")
    List<User> findAll();

    @Insert("INSERT INTO users (username, password, authority) VALUES (#{username}, #{password}, #{authority})")
    void insert(@Param("username") String username, @Param("password") String password, @Param("authority") String authority);

    @Update("UPDATE users SET username = #{newUsername}, password = #{password}, authority = #{authority} WHERE username = #{targetUsername}")
    void update(@Param("targetUsername") String targetUsername, @Param("newUsername") String newUsername, @Param("password") String password, @Param("authority") String authority);

    @Delete("DELETE FROM users WHERE username = #{username}")
    void delete(String username);
}
