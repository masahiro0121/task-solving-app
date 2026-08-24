package com.example.its.web.issue;

import com.example.its.domain.issue.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @GetMapping
    public String showList(Model model) {
        model.addAttribute("issueList", issueService.findAll());
        return "issues/list";
    }

    @GetMapping("/creationForm")
    public String showCreationForm(@ModelAttribute("issueForm") IssueForm form) {
        return "issues/creationForm";
    }

    @PostMapping
    public String create(@Validated @ModelAttribute("issueForm") IssueForm form,
                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "issues/creationForm";
        }
        issueService.create(form.getSummary(), form.getDescription(), form.getStatus());
        return "redirect:/issues";
    }

    @GetMapping("/{issueId}")
    public String showDetail(@PathVariable("issueId") long issueId, Model model) {
        var issue = issueService.findById(issueId)
                .orElseThrow(IssueNotFoundException::new);
        model.addAttribute("issue", issue);
        return "issues/detail";
    }

    @GetMapping("/{issueId}/editForm")
    public String showEditForm(@PathVariable("issueId") long issueId, Model model) {
        var form = issueService.findById(issueId)
                .map(IssueForm::fromEntity)
                .orElseThrow(IssueNotFoundException::new);
        model.addAttribute("issueForm", form);
        return "issues/creationForm";
    }

    @PutMapping("/{issueId}")
    public String update(@PathVariable("issueId") long issueId,
                         @Validated @ModelAttribute("issueForm") IssueForm form,
                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "issues/creationForm";
        }
        issueService.update(issueId, form.getSummary(), form.getDescription(), form.getStatus());
        return "redirect:/issues/" + issueId;
    }

    @DeleteMapping("/{issueId}")
    public String delete(@PathVariable("issueId") long issueId) {
        issueService.delete(issueId);
        return "redirect:/issues";
    }
}
