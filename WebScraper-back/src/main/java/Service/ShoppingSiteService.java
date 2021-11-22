package Service;

import com.fasterxml.jackson.annotation.JsonProperty;
import model.ShoppingSiteModel;
import org.springframework.stereotype.Service;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Service
public class ShoppingSiteService {


    public ShoppingSiteModel scrapeShopping(String websiteType, String url) {

        String data = "";
        JSONObject shoppingSiteJSON = new JSONObject();
        try {
            /*
                //TODO: call node.js script to scrape url
            Process process = new ProcessBuilder("C:\\Program Files\\nodejs\\node.exe", "hello.js --url:" + url).start();
            InputStream is = process.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader br = new BufferedReader(isr);
            String line;

            while ((line = br.readLine()) != null) {
                data += line;
            }
            */
            //convert String to JSONObject
            JSONParser parser = new JSONParser();
            shoppingSiteJSON = (JSONObject) parser.parse(data);

        } catch (Exception e) {
            e.printStackTrace();
        }

        /* Sample POST request
        {"title": "annen",
        "seller": "mini",
        "ratings": 2,
        "price": 42.00,
        "review": "lolsaf",
        "question": "mrb",
        "product_info": "lolll",
        "product_specs" : "siksok",
        "product_desc":"productDeskimloo1",
        "options": "optionslooo1",
        "main_photo":null,
        "photo":null

        }
*/

        ObjectMapper mapper = new ObjectMapper();
        ShoppingSiteModel shoppingSiteModel = null;

        try {
            String title = mapper.readValue(shoppingSiteJSON.get("title").toString(), String.class);
            String seller = mapper.readValue(shoppingSiteJSON.get("seller").toString(), String.class);
            int ratings = mapper.readValue(shoppingSiteJSON.get("ratings").toString(), int.class);
            double price = mapper.readValue(shoppingSiteJSON.get("price").toString(), double.class);
            String review = mapper.readValue(shoppingSiteJSON.get("review").toString(), String.class);
            String question = mapper.readValue(shoppingSiteJSON.get("question").toString(), String.class);
            String product_info = mapper.readValue(shoppingSiteJSON.get("product_info").toString(), String.class);
            String product_specs = mapper.readValue(shoppingSiteJSON.get("product_specs").toString(), String.class);
            BufferedImage[] photo = mapper.readValue(shoppingSiteJSON.get("photo").toString(), BufferedImage[].class);
            BufferedImage main_photo = mapper.readValue(shoppingSiteJSON.get("main_photo").toString(), BufferedImage.class);
            String options = mapper.readValue(shoppingSiteJSON.get("options").toString(), String.class);
            String product_desc = mapper.readValue(shoppingSiteJSON.get("product_desc").toString(), String.class);
            shoppingSiteModel = new ShoppingSiteModel(title, seller, ratings, price, review, question, product_info, product_specs, photo, main_photo, options, product_desc);

        } catch (IOException e) {
            e.printStackTrace();
        }


        return shoppingSiteModel;


    }
}
