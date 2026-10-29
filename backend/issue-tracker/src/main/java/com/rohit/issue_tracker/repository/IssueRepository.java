package com.rohit.issue_tracker.repository;

import com.rohit.issue_tracker.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, Long> {

}
