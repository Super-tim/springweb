package com.example.demo2.Controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {

    @GetMapping("/main")
    public String mainPage() {
        System.out.println("-----------1");
        return "main2";
    }

    @PostMapping("/submit")
    public String submitForm(@RequestParam("year") int year, @RequestParam("text") String text, Model model) throws InterruptedException {
        // 模拟调用其他接口的逻辑
        // TODO: 调用其他接口的逻辑
        boolean success = callOtherApi(year, text); // 假设这里是调用其他接口的逻辑
        Thread.sleep(1);
        // 根据结果返回不同的页面
        if (success) {
            model.addAttribute("message", "成功");
            return "success";
        } else {
            model.addAttribute("message", "失败或超时");
            return "fail";
        }
    }

    // 模拟调用其他接口的方法
    private boolean callOtherApi(int year, String text) {
        // 这里可以是真实的调用其他接口的逻辑，返回一个成功或失败的状态
        // 这里简单地模拟一下
        return year % 2 == 0; // 假设年份为偶数时调用成功，奇数时调用失败
    }

    @GetMapping("/error")
    public String handleError() {
        // 返回自定义的错误页面或错误信息
        return "error"; // 这里假设有一个名为 error.html 的错误页面
    }

    @GetMapping("/main2")
    public String main2(Model model) {
        // Call /api/getTaskList to populate taskList
        List<String> taskList = new ArrayList<>();
        taskList.add("v1.json");
        taskList.add("v2.json");
        model.addAttribute("taskList", taskList);
        model.addAttribute("taskList", taskList);
        return "main2";
    }
    @PostMapping("/api/upload")
    @ResponseBody
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        // Implement file upload logic and return success/failure response
        String fileName = file.getOriginalFilename();
        return ResponseEntity.ok().body("File uploaded successfully: " + fileName);
    }
    private static final String FILE_DIRECTORY = "/path/to/your/json/files/";
    @GetMapping("/api/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam("selectedFile") String selectedFile) throws IOException {
        // Implement file download logic based on taskId

        String jsonContent = "{\"name\": \"John Doe\", \"age\": 30, \"city\": \"New York\"}";
        byte[] data = jsonContent.getBytes();
        ByteArrayResource resource = new ByteArrayResource(data);

        // Determine content type dynamically
        String contentType = "application/json";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + selectedFile + "\"")
                .body(resource);
    }
//
//    @GetMapping("/api/generateReport")
//    public ResponseEntity<Resource> generateReport(@RequestParam("taskId") Long taskId) {
//        // Implement report generation logic based on taskId
//    }
//

    public static class TaskRequest {
        private String parameter;

        public String getParameter() {
            return parameter;
        }

        public void setParameter(String parameter) {
            this.parameter = parameter;
        }
    }
    @PostMapping("/api/executor")
    @ResponseBody
    public ResponseEntity<String> executeTask(@RequestBody TaskRequest taskRequest) {
        // Implement task execution logic based on taskId
        // Return success/failure response
        System.out.println("11111111111111");
        System.out.println(taskRequest);
        return ResponseEntity.ok().body("executor successfully: ");
    }
}
