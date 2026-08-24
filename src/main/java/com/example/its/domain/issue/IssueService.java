package com.example.its.domain.issue;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

   private final IssueRepository issueRepository;

   public List<IssueEntity> findAll() {
        return issueRepository.findAll();
    }

    @Transactional
    public void create(String summary, String description, String status) {
        issueRepository.insert(summary, description, status == null ? "TODO" : status);
    }

    @Transactional
    public void update(long issueId, String summary, String description, String status) {
        issueRepository.update(issueId, summary, description, status);
    }

    public java.util.Optional<IssueEntity> findById(long issueId) {
        return java.util.Optional.ofNullable(issueRepository.findById(issueId));
    }

    @Transactional
    public void delete(long issueId) {
        issueRepository.delete(issueId);
    }
}
