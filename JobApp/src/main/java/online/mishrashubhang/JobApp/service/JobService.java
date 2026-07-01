package online.mishrashubhang.JobApp.service;

import online.mishrashubhang.JobApp.model.JobPost;
import online.mishrashubhang.JobApp.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepo repo;

    public List<JobPost> getAllJobs() {
        return repo.findAll();
    }

    public Optional<JobPost> getJobById(int id) {
        return repo.findById(id);
    }

    public JobPost addJob(JobPost jobPost) {
        return repo.save(jobPost);
    }

    public Optional<JobPost> updateJob(int id, JobPost jobPost) {
        return repo.findById(id).map(existing -> {
            existing.setPostProfile(jobPost.getPostProfile());
            existing.setPostDesc(jobPost.getPostDesc());
            existing.setReqExperience(jobPost.getReqExperience());
            existing.setPostTechStack(jobPost.getPostTechStack());
            return repo.save(existing);
        });
    }

    public boolean deleteJob(int id) {
        if (!repo.existsById(id)) {
            return false;
        }
        repo.deleteById(id);
        return true;
    }

}