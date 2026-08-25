package com.example.its.web.issue;

import com.example.its.domain.issue.IssueDTO;
import com.example.its.domain.issue.IssueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public List<IssueDTO> showList() {
        return issueService.findAll().stream()
                .map(IssueDTO::toDTO)
                .toList();
    }

    // React改修で不要になる
    @GetMapping("/creationForm")
    public String showCreationForm(@ModelAttribute("issueForm") IssueForm form) {
        return "issues/creationForm";
    }

    @PostMapping
    public ResponseEntity<?> create(@Validated @RequestBody IssueForm form,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        issueService.create(form.getSummary(), form.getDescription(), form.getStatus());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{issueId}")
    public IssueDTO showDetail(@PathVariable("issueId") long issueId) {
        var issue = issueService.findById(issueId)
                .orElseThrow(IssueNotFoundException::new);
        return IssueDTO.toDTO(issue);
    }

    // React改修で不要になる
    @GetMapping("/{issueId}/editForm")
    public String showEditForm(@PathVariable("issueId") long issueId, Model model) {
        var form = issueService.findById(issueId)
                .map(IssueForm::fromEntity)
                .orElseThrow(IssueNotFoundException::new);
        model.addAttribute("issueForm", form);
        return "issues/creationForm";
    }

    @PutMapping("/{issueId}")
    public ResponseEntity<?> update(@PathVariable("issueId") long issueId,
                                    @Validated @RequestBody IssueForm form,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        issueService.update(issueId, form.getSummary(), form.getDescription(), form.getStatus());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<Void> delete(@PathVariable("issueId") long issueId) {
        issueService.delete(issueId);
        return ResponseEntity.noContent().build();
    }
}
