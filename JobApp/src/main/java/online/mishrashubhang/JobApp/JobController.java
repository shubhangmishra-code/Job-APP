package online.mishrashubhang.JobApp;

import online.mishrashubhang.JobApp.model.JobPost;
import online.mishrashubhang.JobApp.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService service;

    @GetMapping
    public List<JobPost> getAllJobs() {
        return service.getAllJobs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPost> getJobById(@PathVariable int id) {
        return service.getJobById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<JobPost> createJob(@RequestBody JobPost jobPost) {
        JobPost saved = service.addJob(jobPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobPost> updateJob(@PathVariable int id, @RequestBody JobPost jobPost) {
        return service.updateJob(id, jobPost)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable int id) {
        return service.deleteJob(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}