package com.example.its.web.issue;

import com.example.its.domain.issue.IssueEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class IssueForm {

    private Long id;

    @NotBlank
    @Size(max = 256)
    private String summary;

    @NotBlank
    @Size(max = 256)
    private String description;

    @NotBlank
    @Pattern(regexp = "TODO|DOING|DONE", message = "Todo, Doing, Doneのいずれかである必要があります")
    private String status;

    public static IssueForm fromEntity(IssueEntity issueEntity) {
        var form = new IssueForm();
        form.setId(issueEntity.getId());
        form.setSummary(issueEntity.getSummary());
        form.setDescription(issueEntity.getDescription());
        form.setStatus(issueEntity.getStatus());
        return form;
    }
}
