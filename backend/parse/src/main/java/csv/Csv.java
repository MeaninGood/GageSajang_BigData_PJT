package csv;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Csv {
    public List<List<String>> readCSV(){
        List<List<String>> csvList = new ArrayList<List<String>>();

        File csvFile = new File("C:\\Users\\SSAFY\\Documents\\GitHub\\S07P31E205\\backend\\parse\\src\\main\\resources\\csv\\StoreLivingPopulation.csv");
        BufferedReader br = null;
        String line = "";

        try {
            br = new BufferedReader(new FileReader(csvFile));
            while((line = br.readLine())!=null){
                List<String> tmpLine = new ArrayList<>();
                String[] lineArr = line.split(",");
                tmpLine = Arrays.asList(lineArr);
                csvList.add(tmpLine);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        finally {
            try{
                if(br != null){
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return csvList;
    }
}