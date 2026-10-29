package com.rohit.issue_tracker.controller;

import com.rohit.issue_tracker.dto.IssueRequestDto;
import com.rohit.issue_tracker.dto.IssueResponseDto;
import com.rohit.issue_tracker.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    // Create issue
    @PostMapping
    public IssueResponseDto createIssue(
            @Valid @RequestBody IssueRequestDto dto) {
        return issueService.createIssue(dto);
    }

    // Get all issues
    @GetMapping
    public List<IssueResponseDto> getAllIssues() {
        return issueService.getAllIssues();
    }

    // Get issue by ID
    @GetMapping("/{id}")
    public IssueResponseDto getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id);
    }

    // Update issue
    @PutMapping("/{id}")
    public IssueResponseDto updateIssue(
            @PathVariable Long id,
            @Valid @RequestBody IssueRequestDto dto) {
        return issueService.updateIssue(id, dto);
    }

    // Delete issue
    @DeleteMapping("/{id}")
    public void deleteIssue(@PathVariable Long id) {
        issueService.deleteIssue(id);
    }
}
