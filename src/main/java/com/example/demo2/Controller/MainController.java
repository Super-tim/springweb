package com.example.demo2.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

    @GetMapping("/")
    public String mainPage() {
        System.out.println("-----------1");
        return "main";
    }

    @PostMapping("/submit")
    public String submitForm(@RequestParam("year") int year, @RequestParam("text") String text, Model model) {
        // 这里可以调用其他接口，传递参数 year 和 text
        // TODO: 调用其他接口的逻辑

        // 返回结果给页面
        model.addAttribute("year", year);
        model.addAttribute("text", text);
        return "result";
    }

    @GetMapping("/error")
    public String handleError() {
        // 返回自定义的错误页面或错误信息
        return "error"; // 这里假设有一个名为 error.html 的错误页面
    }
}
