package com.soltel.elex.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import io.swagger.v3.oas.annotations.Hidden;

@Controller
public class inicio {

    @Hidden
    @GetMapping("/inicio")
    @ResponseBody
    public String welcome() {
        return "<h1>Bienvenidos</h1>";
    }
}
