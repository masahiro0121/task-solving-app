package com.example.its.domain.issue;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface IssueRepository {

    @Select("SELECT * FROM issues")
    List<IssueEntity> findAll();

    @Insert("INSERT INTO issues (summary, description, status) VALUES (#{summary}, #{description}, #{status})")
    void insert(String summary, String description, String status);

    @Update("UPDATE issues SET summary = #{summary}, description = #{description}, status = #{status} WHERE id = #{issueId}")
    void update(long issueId, String summary, String description, String status);

    @Select("SELECT * FROM issues WHERE id = #{issueId}")
    IssueEntity findById(long issueId);

    @Delete("DELETE FROM issues WHERE id = #{issueId}")
    void delete(long issueId);
}
