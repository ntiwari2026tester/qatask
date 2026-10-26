package HIMSTEST;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;



public class Billing_Deposit {
    static WebDriver driver = new ChromeDriver();
    public static void main(String[] args) throws InterruptedException{
        try {
        driver.manage().window().maximize();
        driver.get("https://hims.themediq.com:4097");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        // Username
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.name("username")
        )).sendKeys("admin@cmch.cmh");

        // Password
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("password")
        )).sendKeys("demo@123");

        System.out.println("Please enter CAPTCHA manually...");

        // click on CAPTCHA field
        wait.until(ExpectedConditions.elementToBeClickable(
                By.id("captchaInput")
        )).click();

        // CAPTCHA Entered Manualy
        wait.until(driver1 -> {
            try {
                WebElement captcha =
                        driver1.findElement(By.id("captchaInput"));

                String value = captcha.getAttribute("value");

                return value != null && value.trim().length() == 6;

            } catch (Exception e) {
                // Locate Element When refresh CAPTCHA
                return false;
            }
        });
        System.out.println("CAPTCHA entered.");
        // SIGN IN button ko fresh locate karo
        WebElement signIn = wait.until(
                ExpectedConditions.elementToBeClickable(
//                        By.xpath("//input[@value='SIGN IN']")
                        By.xpath("//button[@type='submit' and normalize-space()='SIGN IN']")
                )
        );
        signIn.click();
        System.out.println("SIGN IN clicked.");
        Thread.sleep(2000);

        String currentUrl = driver.getCurrentUrl();

        if (currentUrl.contains("auth-server.themediq.com:4096/login")) {
            System.out.println("❌ WRONG CAPTCHA ENTERED!");
        } else {
            System.out.println("✅ CAPTCHA ACCEPTED!");
        }

        System.out.println("Current URL: " + currentUrl);

// Wait for "Got it" popup button and click it
//            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(10));

            shortWait.until(ExpectedConditions.elementToBeClickable(
                    By.id("system-release-dismiss")
            )).click();

//            wait.until(ExpectedConditions.elementToBeClickable(
//                    By.id("system-release-dismiss")
//            )).click();
        Thread.sleep(2000);
        driver.findElement(By.partialLinkText("Billing")).click();
        Thread.sleep(2000);
        driver.findElement(By.partialLinkText("payment")).click();
        Thread.sleep(2000);
//            driver.findElement(By.id("services")).sendKeys("cbc");
//            wait.until(ExpectedConditions.elementToBeClickable(
//                    By.xpath("//div[@id='servicesBox']//div[@data-name='Cbc']")
//            )).click();
//            Thread.sleep(2000);
//            driver.findElement(By.id("services")).sendKeys("liver");
//
//            wait.until(ExpectedConditions.elementToBeClickable(
//                    By.xpath("//div[@id='servicesBox']//div[@data-name='Liver function test: LFt']")
//            )).click();
// Search test
        WebElement services = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("services"))
        );
        // CBC

        services.sendKeys("cbc");

        wait.until(ExpectedConditions.elementToBeClickable(
                By.cssSelector("#servicesBox .service-item")
        )).click();
//        handleDuplicateOrderPopup(driver);

// LIVER
        services.clear();
        services.sendKeys("liver");

        wait.until(ExpectedConditions.elementToBeClickable(
                By.cssSelector("#servicesBox .service-item")
        )).click();
//        handleDuplicateOrderPopup(driver);
//ELFA
        services.clear();
        services.sendKeys("ELFA");

        wait.until(ExpectedConditions.elementToBeClickable(
                By.cssSelector("#servicesBox .service-item")
        )).click();
//        handleDuplicateOrderPopup(driver);
        Thread.sleep(2000);
        driver.findElement(By.id("submitButton")).click();
        Thread.sleep(2000);
//            driver.findElement(By.partialLinkText("OK")).click();
//            driver.switchTo().alert().accept();
        WebElement okButton = wait.until(
                ExpectedConditions.elementToBeClickable(
                        By.className("confirm")
                )
        );

        okButton.click();
    }

        finally {
        Thread.sleep(2000);
//             driver.quit();
    }
}
}
