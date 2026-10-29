package com.rohit.issue_tracker.dto;

public class IssueResponseDto {

    private Long id;
    private String title;
    private String description;
    private String status;
    private String priority;

    public IssueResponseDto() {
    }

    public IssueResponseDto(
            Long id,
            String title,
            String description,
            String status,
            String priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public String getPriority() {
        return priority;
    }
}