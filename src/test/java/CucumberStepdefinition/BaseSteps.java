package CucumberStepdefinition;


import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.FileInputStream;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class BaseSteps {
//     static taaki sabhi classes mein SAME browser instance use ho
    public static WebDriver driver;
    public static Properties prop;

    public static void initializeDriver() throws Exception {
        if (driver == null) {
            prop = new Properties();
            FileInputStream file = new FileInputStream("./config.properties");
            prop.load(file);

            WebDriverManager.chromedriver().setup();
            ChromeOptions handlingSSL = new ChromeOptions();
            handlingSSL.setAcceptInsecureCerts(true);
            driver = new ChromeDriver(handlingSSL);
            // Maximum window and set Wait Time
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        }

    }
    public static void quitDriver() {
        if (driver != null) {
            driver.quit();
            driver = null; // Resetting for next execution
        }
    }
    }
