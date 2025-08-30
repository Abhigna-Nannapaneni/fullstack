package com.klu;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; 

@RestController
@CrossOrigin
public class AppController {
    
    @Autowired
    Service s;

    // ✅ Insert product
    @PostMapping("/insert")
    public ResponseEntity<Map<String, String>> insert(@RequestBody Product p) {
        String result = s.insertData(p);
        return ResponseEntity.ok(Map.of("message", result));
    }

    // ✅ Display all products
    @GetMapping("/display")
    public ResponseEntity<List<Product>> display() {
        return ResponseEntity.ok(s.displayData());
    }

    // ✅ Update product
    @PutMapping("/update")
    public ResponseEntity<Map<String, String>> update(@RequestBody Product p) {
        String result = s.updateData(p);
        return ResponseEntity.ok(Map.of("message", result));
    }

    /*
    // ✅ Delete product by ID (uncomment when needed)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable int id) {
        String result = s.deleteData(id);
        return ResponseEntity.ok(Map.of("message", result));
    }
    */
}
