package com.webscraper.WebScraperback.Service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class CommandLineService {
// runs a bash command on a new thread given the bash command string as cmdStr
    public boolean runOnCommandLine(String cmdStr){
        try{
            String line;
            System.out.println("executing the command: "+ cmdStr);
            Runtime rt = Runtime.getRuntime();
            Process pr = rt.exec("cmd /c\""+cmdStr+"\"");
            BufferedReader input = new BufferedReader(new InputStreamReader(pr.getInputStream()));
            while ((line = input.readLine()) != null) {
                System.out.println(line);
            }
            input.close();
            int exitVal = pr.waitFor(); //TODO: find a way to terminate this process via POSTRequest
            System.out.println("Command execution exited with code " + exitVal);
            return (exitVal == 0) ? true : false;
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
}
