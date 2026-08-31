package com.example.its.domain.issue;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class IssueDTO {

    private long id;
    private String summary;
    private String description;
    private String status;

    public static IssueDTO toDTO(IssueEntity entity) {
        return new IssueDTO(
                entity.getId(),
                entity.getSummary(),
                entity.getDescription(),
                entity.getStatus()
        );
    }
}