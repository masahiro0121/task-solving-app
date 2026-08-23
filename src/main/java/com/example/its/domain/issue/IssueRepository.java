package com.example.its.domain.issue;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface IssueRepository {

    @Select("SELECT * FROM issues")
    List<IssueEntity> findAll();

    @Insert("INSERT INTO issues (summary, description) VALUES (#{summary}, #{description})")
    void insert(String summary, String description);

    @Select("SELECT * FROM issues WHERE id = #{issueId}")
    IssueEntity findById(long issueId);
}
