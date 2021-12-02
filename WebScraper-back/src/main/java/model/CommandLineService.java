package model;

import org.springframework.stereotype.Service;

@Service
public class CommandLineService {
// runs a bash command on a new thread given the bash command string as cmdStr
    public boolean runOnCommandLine(String cmdStr){
        try{
            System.out.println("executing the command: "+ cmdStr);
            Runtime rt = Runtime.getRuntime();
            Process pr = rt.exec(cmdStr);
            int exitVal = pr.waitFor(); //TODO: find a way to terminate this process via POSTRequest
            System.out.println("Command execution exited with code " + exitVal);
            return (exitVal == 0) ? true : false;
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
}
