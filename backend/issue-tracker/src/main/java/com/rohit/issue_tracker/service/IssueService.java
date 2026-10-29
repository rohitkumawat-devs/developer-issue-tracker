package com.rohit.issue_tracker.service;

import com.rohit.issue_tracker.entity.Issue;
import com.rohit.issue_tracker.repository.IssueRepository;
import org.springframework.stereotype.Service;
import com.rohit.issue_tracker.exception.IssueNotFoundException;

import java.util.List;
import com.rohit.issue_tracker.dto.IssueRequestDto;
import com.rohit.issue_tracker.dto.IssueResponseDto;


@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    // Convert Entity to Response DTO
    private IssueResponseDto toResponseDto(Issue issue) {
        return new IssueResponseDto(
                issue.getId(),
                issue.getTitle(),
                issue.getDescription(),
                issue.getStatus(),
                issue.getPriority()
        );
    }

    // Create an issue
    public IssueResponseDto createIssue(IssueRequestDto dto) {
        Issue issue = new Issue();
        issue.setTitle(dto.getTitle());
        issue.setDescription(dto.getDescription());
        issue.setStatus(dto.getStatus());
        issue.setPriority(dto.getPriority());

        Issue savedIssue = issueRepository.save(issue);
        return toResponseDto(savedIssue);
    }

    // Get all issues
    public List<IssueResponseDto> getAllIssues() {
        return issueRepository.findAll()
                .stream()
                .map(this::toResponseDto)
                .toList();
    }

    // Get issue by ID
    public IssueResponseDto getIssueById(Long id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() ->
                        new IssueNotFoundException("Issue not found with id: " + id));

        return toResponseDto(issue);
    }

    // Update an issue
    public IssueResponseDto updateIssue(Long id, IssueRequestDto dto) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() ->
                        new IssueNotFoundException("Issue not found with id: " + id));

        issue.setTitle(dto.getTitle());
        issue.setDescription(dto.getDescription());
        issue.setStatus(dto.getStatus());
        issue.setPriority(dto.getPriority());

        Issue updatedIssue = issueRepository.save(issue);
        return toResponseDto(updatedIssue);
    }

    // Delete an issue
    public void deleteIssue(Long id) {
        if (!issueRepository.existsById(id)) {
            throw new IssueNotFoundException("Issue not found with id: " + id);
        }

        issueRepository.deleteById(id);
    }
}
