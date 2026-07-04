package online.mishrashubhang.JobApp.repo;

import online.mishrashubhang.JobApp.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "jobs", collectionResourceRel = "jobs")
public interface JobRepo extends JpaRepository<JobPost, Integer> {
}
