package org.zhxie.imageviewer;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@RestController
public class Application {

  @RequestMapping("/")
  public String greeting() {
    return "Hello World!";
  }

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurerAdapter() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/getDetailsImage").allowedOrigins("http://localhost:8000");
      }
    };
  }

  @RequestMapping("/getDetailsImage")
  public void getDetailsImage(@RequestParam(value = "x", required = true) double xVal,
      @RequestParam(value = "y", required = true) double yVal,
      @RequestParam(value ="delta", required = true) int delta, HttpServletRequest request,
      HttpServletResponse response) throws IOException {

    Resource resource = new ClassPathResource("static/g.jpg");
    File file = resource.getFile();
    //判断文件是否存在如果不存在就返回默认图标
    if(!(file.exists() && file.canRead())) {
      file = new File(request.getSession().getServletContext().getRealPath("/")
          + "g.jpg");
    }

    FileInputStream inputStream = new FileInputStream(file);
    byte[] data = new byte[(int)file.length()];
    int length = inputStream.read(data);
    inputStream.close();

    response.setContentType("image/png");

    OutputStream stream = response.getOutputStream();
    stream.write(data);
    stream.flush();
    stream.close();
  }

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}